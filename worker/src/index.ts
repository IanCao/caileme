// 裁了么 Cloudflare Workers API（v2 重新设计）
// ==========================================
// API Endpoints:
//   GET    /api/health               - 健康检查
//   GET    /api/city-policy           - 获取城市政策数据
//   GET    /api/layoff-news           - 获取已审核裁员动态（分页）
//   GET    /api/community             - 获取已审核社区帖子（分页+分类筛选）
//   POST   /api/community/submit      - 提交社区帖子
//   POST   /api/proof/submit          - 提交裁员证明
//   POST   /api/feedback              - 提交反馈
//   POST   /api/calculator-log        - 记录计算器使用（匿名）
//   POST   /api/subscribe             - 邮件订阅
//   DELETE /api/subscribe             - 取消订阅
//   POST   /api/upload                - 上传图片到R2（可选）
// ==========================================

export interface Env {
  DB: D1Database;
  BUCKET?: R2Bucket;       // 可选：R2 图片存储
  ADMIN_KEY?: string;       // 管理接口密钥
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
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

// 分页参数提取
function getPagination(url: URL) {
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "20")));
  return { page, limit, offset: (page - 1) * limit };
}

// 简单邮箱校验
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================
// Route handlers
// ============================

async function getCityPolicy(env: Env, url: URL) {
  const code = url.searchParams.get("code");
  if (code) {
    const result = await env.DB.prepare("SELECT * FROM city_policy WHERE city_code = ?").bind(code).first();
    return result ? json({ data: result }) : err("City not found", 404);
  }
  const { results } = await env.DB.prepare("SELECT * FROM city_policy ORDER BY avg_salary DESC").all();
  return json({ data: results });
}

async function getLayoffNews(env: Env, url: URL) {
  const { page, limit, offset } = getPagination(url);
  const city = url.searchParams.get("city");
  const industry = url.searchParams.get("industry");

  const conditions = ["status = 'approved'"];
  const params: (string | number)[] = [];

  if (city) { conditions.push("city = ?"); params.push(city); }
  if (industry) { conditions.push("industry = ?"); params.push(industry); }

  const where = conditions.join(" AND ");
  const dataParams = [...params, limit, offset];

  const query = `SELECT id, company, industry, city, layoff_date, layoff_count, compensation, departments, source, source_url, verified, view_count, created_at FROM layoff_news WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  const { results } = await env.DB.prepare(query).bind(...dataParams).all();

  const countResult = await env.DB.prepare(`SELECT COUNT(*) as total FROM layoff_news WHERE ${where}`).bind(...params).first<{ total: number }>();
  const total = countResult?.total || 0;

  return json({ data: results, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
}

async function getCommunityPosts(env: Env, url: URL) {
  const { page, limit, offset } = getPagination(url);
  const category = url.searchParams.get("category");
  const city = url.searchParams.get("city");

  const conditions = ["status = 'approved'"];
  const params: (string | number)[] = [];

  if (category) { conditions.push("category = ?"); params.push(category); }
  if (city) { conditions.push("city = ?"); params.push(city); }

  const where = conditions.join(" AND ");
  const query = `SELECT id, nickname, title, content, category, city, company, likes, view_count, is_anonymous, created_at FROM community_posts WHERE ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  const { results } = await env.DB.prepare(query).bind(...params, limit, offset).all();

  const countResult = await env.DB.prepare(`SELECT COUNT(*) as total FROM community_posts WHERE ${where}`).bind(...params).first<{ total: number }>();
  const total = countResult?.total || 0;

  return json({ data: results, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
}

async function submitCommunityPost(env: Env, request: Request) {
  let body: Record<string, string | undefined>;
  try { body = await request.json(); } catch { return err("Invalid JSON"); }

  const { email, nickname, title, content, category, city, company } = body;
  if (!email || !title || !content) return err("必填字段：email, title, content");
  if (!isValidEmail(email)) return err("邮箱格式不正确");
  if ((title?.length || 0) > 200) return err("标题最长200字");
  if ((content?.length || 0) > 10000) return err("内容最长10000字");

  const validCategories = ["经验分享", "避坑指南", "仲裁经验", "裁员信息", "再就业", "维权成功", "其他"];
  const safeCategory = validCategories.includes(category || "") ? category : "其他";

  const result = await env.DB.prepare(
    "INSERT INTO community_posts (email, nickname, title, content, category, city, company) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).bind(email, nickname || "匿名打工人", title, content, safeCategory, city || null, company || null).run();

  return json({ success: true, message: "投稿提交成功，审核后将会展示", id: result.meta.last_row_id }, 201);
}

async function submitProof(env: Env, request: Request) {
  let body: Record<string, string | undefined>;
  try { body = await request.json(); } catch { return err("Invalid JSON"); }

  const { email, company, city, description, proof_type } = body;
  if (!email || !company || !description) return err("必填字段：email, company, description");
  if (!isValidEmail(email)) return err("邮箱格式不正确");
  if ((description?.length || 0) > 10000) return err("描述最长10000字");

  const validTypes = ["layoff", "wage_arrears", "illegal", "other"];
  const safeType = validTypes.includes(proof_type || "") ? proof_type : "layoff";

  const result = await env.DB.prepare(
    "INSERT INTO proof_submissions (email, company, city, description, proof_type) VALUES (?, ?, ?, ?, ?)"
  ).bind(email, company, city || null, description, safeType).run();

  return json({ success: true, message: "证明提交成功，审核后将用于维权参考", id: result.meta.last_row_id }, 201);
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

async function logCalculatorUsage(env: Env, request: Request) {
  let body: Record<string, string | undefined>;
  try { body = await request.json(); } catch { return err("Invalid JSON"); }

  const { tool_type, city, salary_range, work_years_range, situation } = body;
  const validTools = ["severance", "unemployment", "social_insurance"];
  if (!tool_type || !validTools.includes(tool_type)) return err("Invalid tool_type");

  const ua = request.headers.get("User-Agent") || null;

  await env.DB.prepare(
    "INSERT INTO calculator_logs (tool_type, city, salary_range, work_years_range, situation, user_agent) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(tool_type, city || null, salary_range || null, work_years_range || null, situation || null, ua).run();

  return json({ success: true });
}

async function subscribe(env: Env, request: Request) {
  let body: Record<string, string | undefined>;
  try { body = await request.json(); } catch { return err("Invalid JSON"); }

  const { email, city, industry } = body;
  if (!email || !isValidEmail(email)) return err("请输入有效邮箱");

  const token = crypto.randomUUID();
  try {
    await env.DB.prepare(
      "INSERT INTO email_subscriptions (email, city, industry, unsubscribe_token) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO UPDATE SET city = ?, industry = ?, is_active = 1, unsubscribe_token = ?"
    ).bind(email, city || null, industry || null, token, city || null, industry || null, token).run();
  } catch {
    return err("订阅失败，请稍后重试", 500);
  }

  return json({ success: true, message: "订阅成功！有最新裁员动态会通过邮件通知你" }, 201);
}

async function unsubscribe(env: Env, request: Request) {
  let body: Record<string, string | undefined>;
  try { body = await request.json(); } catch { return err("Invalid JSON"); }

  const { email, token } = body;
  if (!email || !token) return err("缺少参数");

  const result = await env.DB.prepare(
    "UPDATE email_subscriptions SET is_active = 0 WHERE email = ? AND unsubscribe_token = ?"
  ).bind(email, token).run();

  return result.meta.changes > 0
    ? json({ success: true, message: "已取消订阅" })
    : err("取消订阅失败，请检查链接是否正确", 404);
}

async function uploadImage(env: Env, request: Request) {
  if (!env.BUCKET) return err("图片上传服务未配置", 503);

  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.includes("multipart/form-data")) return err("请使用 multipart/form-data 上传");

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const refType = formData.get("ref_type") as string | null;
  const refId = formData.get("ref_id") as string | null;

  if (!file) return err("请选择文件");
  if (file.size > 5 * 1024 * 1024) return err("文件大小不能超过5MB");

  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!allowedTypes.includes(file.type)) return err("仅支持 JPG/PNG/GIF/WebP 格式");

  const ext = file.name.split(".").pop() || "jpg";
  const key = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  await env.BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
  });

  if (refType && refId) {
    await env.DB.prepare(
      "INSERT INTO attachments (ref_type, ref_id, file_key, file_name, file_size, mime_type) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(refType, parseInt(refId), key, file.name, file.size, file.type).run();
  }

  return json({ success: true, key, url: `/cdn/${key}` }, 201);
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
      if (path === "/api/health") return json({ status: "ok", version: "2.0", timestamp: new Date().toISOString() });
      if (path === "/api/city-policy" && method === "GET") return getCityPolicy(env, url);
      if (path === "/api/layoff-news" && method === "GET") return getLayoffNews(env, url);
      if (path === "/api/community" && method === "GET") return getCommunityPosts(env, url);
      if (path === "/api/community/submit" && method === "POST") return submitCommunityPost(env, request);
      if (path === "/api/proof/submit" && method === "POST") return submitProof(env, request);
      if (path === "/api/feedback" && method === "POST") return submitFeedback(env, request);
      if (path === "/api/calculator-log" && method === "POST") return logCalculatorUsage(env, request);
      if (path === "/api/subscribe" && method === "POST") return subscribe(env, request);
      if (path === "/api/subscribe" && method === "DELETE") return unsubscribe(env, request);
      if (path === "/api/upload" && method === "POST") return uploadImage(env, request);
      if (path === "/api/comment" && method === "POST") return submitComment(env, request);

      return err("Not found", 404);
    } catch (e) {
      console.error("API Error:", e);
      return err("Internal server error", 500);
    }
  },
};
