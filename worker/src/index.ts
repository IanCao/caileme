// 裁了么 Cloudflare Workers API（v3 精简版）
// ==========================================
// API Endpoints:
//   GET    /api/health               - 健康检查
//   POST   /api/feedback             - 提交反馈
//   POST   /api/community/submit     - 提交社区帖子
//   POST   /api/comment              - 提交评论
//   POST   /api/view                 - 浏览计数
//   POST   /api/like                 - 点赞
// ==========================================

export interface Env {
  DB: D1Database;
  ADMIN_KEY?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function err(message: string, status = 400) {
  return json({ error: message }, status);
}

// 简单邮箱校验
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================
// Route handlers
// ============================

async function submitCommunityPost(env: Env, request: Request) {
  let body: Record<string, string | undefined>;
  try { body = await request.json(); } catch { return err("Invalid JSON"); }

  const { email, nickname, title, content, category, city, company, companyName } = body;
  if (!email || !title || !content) return err("必填字段：email, title, content");
  if (!isValidEmail(email)) return err("邮箱格式不正确");
  if ((title?.length || 0) > 200) return err("标题最长200字");
  if ((content?.length || 0) > 10000) return err("内容最长10000字");

  const validCategories = ["经验分享", "避坑指南", "仲裁经验", "裁员信息", "红厂推荐", "黑厂曝光", "再就业", "维权成功", "其他"];
  const safeCategory = validCategories.includes(category || "") ? category : "其他";

  // For company-related posts, use companyName if provided
  const safeCompany = companyName || company || null;

  const result = await env.DB.prepare(
    "INSERT INTO community_posts (email, nickname, title, content, category, city, company) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).bind(email, nickname || "匿名打工人", title, content, safeCategory, city || null, safeCompany).run();

  return json({ success: true, message: "投稿提交成功，审核后将会展示", id: result.meta.last_row_id }, 201);
}

async function submitFeedback(env: Env, request: Request) {
  let body: Record<string, string | undefined>;
  try { body = await request.json(); } catch { return err("Invalid JSON"); }

  const { email, feedback_type, page_url, content } = body;
  if (!content) return err("反馈内容不能为空");
  if ((content?.length || 0) > 5000) return err("内容最长5000字");
  if (email && !isValidEmail(email)) return err("邮箱格式不正确");

  const validTypes = ["bug", "suggestion", "data_error", "other"];
  const safeType = validTypes.includes(feedback_type || "") ? feedback_type : "other";

  await env.DB.prepare(
    "INSERT INTO feedback (email, feedback_type, page_url, content) VALUES (?, ?, ?, ?)"
  ).bind(email || null, safeType, page_url || null, content).run();

  return json({ success: true, message: "感谢反馈！我们会尽快处理" }, 201);
}

async function submitComment(env: Env, request: Request) {
  let body: Record<string, string | undefined>;
  try { body = await request.json(); } catch { return err("Invalid JSON"); }

  const { postId, nickname, content, email } = body;
  if (!postId || !content) return err("必填字段：postId, content");
  if ((content?.length || 0) > 2000) return err("评论最长2000字");
  if (email && !isValidEmail(email)) return err("邮箱格式不正确");

  await env.DB.prepare(
    "INSERT INTO comments (post_id, nickname, content, email, status) VALUES (?, ?, ?, ?, 'pending')"
  ).bind(postId, nickname || "匿名打工人", content, email || null).run();

  return json({ success: true, message: "评论提交成功，审核通过后将展示" }, 201);
}

async function trackView(env: Env, request: Request) {
  let body: Record<string, string | undefined>;
  try { body = await request.json(); } catch { return err("Invalid JSON"); }

  const { postId, postType } = body;
  if (!postId) return err("必填字段：postId");

  const validTypes = ["community_post", "news"];
  const safeType = validTypes.includes(postType || "") ? postType : "community_post";

  if (safeType === "community_post") {
    await env.DB.prepare(
      "UPDATE community_posts SET view_count = view_count + 1 WHERE id = ?"
    ).bind(postId).run();
  }

  return json({ success: true });
}

async function submitLike(env: Env, request: Request) {
  let body: Record<string, string | undefined>;
  try { body = await request.json(); } catch { return err("Invalid JSON"); }

  const { postId, postType } = body;
  if (!postId) return err("必填字段：postId");

  const validTypes = ["community_post", "news", "comment"];
  const safeType = validTypes.includes(postType || "") ? postType : "community_post";

  await env.DB.prepare(
    "INSERT INTO likes (post_id, post_type) VALUES (?, ?)"
  ).bind(postId, safeType).run();

  if (safeType === "community_post") {
    await env.DB.prepare(
      "UPDATE community_posts SET likes = likes + 1 WHERE id = ?"
    ).bind(postId).run();
  } else if (safeType === "comment") {
    await env.DB.prepare(
      "UPDATE comments SET likes = likes + 1 WHERE id = ?"
    ).bind(postId).run();
  }

  return json({ success: true, message: "点赞成功" }, 201);
}

// ============================
// Main router
// ============================

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    try {
      if (path === "/api/health") return json({ status: "ok", version: "3.0", timestamp: new Date().toISOString() });
      if (path === "/api/feedback" && method === "POST") return submitFeedback(env, request);
      if (path === "/api/community/submit" && method === "POST") return submitCommunityPost(env, request);
      if (path === "/api/comment" && method === "POST") return submitComment(env, request);
      if (path === "/api/view" && method === "POST") return trackView(env, request);
      if (path === "/api/like" && method === "POST") return submitLike(env, request);

      return err("Not found", 404);
    } catch (e) {
      console.error("API Error:", e);
      return err("Internal server error", 500);
    }
  },
};
