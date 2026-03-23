// Tencent Cloud Serverless API (SCF → Cloudflare Worker)
// All submissions go through Tencent Cloud SCF, which forwards to Cloudflare for storage

const API_BASE = "https://1256007055-7opxncjdg9.ap-hongkong.tencentscf.com";

export interface ApiResponse {
  success: boolean;
  message: string;
}

export async function submitFeedback(data: {
  type: string;
  description: string;
  email: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: data.description,
        feedback_type: data.type,
        email: data.email,
      }),
    });
    const json = await res.json();
    if (!res.ok) return { success: false, message: json?.message || "提交失败，请稍后重试" };
    return json;
  } catch {
    return { success: false, message: "网络异常，请检查网络后重试" };
  }
}

export async function submitPost(data: {
  email: string;
  nickname: string;
  category: string;
  title: string;
  content: string;
  images?: string[];
  companyName?: string;
  companyType?: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) return { success: false, message: json?.message || "投稿失败，请稍后重试" };
    return json;
  } catch {
    return { success: false, message: "网络异常，请检查网络后重试" };
  }
}

export async function submitComment(data: {
  postId: string;
  nickname: string;
  content: string;
  email?: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) return { success: false, message: json?.message || "评论失败，请稍后重试" };
    return json;
  } catch {
    return { success: false, message: "网络异常，请检查网络后重试" };
  }
}

export async function trackView(postId: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, postType: "community_post" }),
    });
  } catch {}
}

export async function likePost(postId: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, postType: "community_post" }),
    });
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch {
    return { success: false, message: "点赞失败，请稍后重试" };
  }
}

export async function getAIResponse(data: {
  scenarioId: string;
  roundIndex: number;
  userChoice: string;
  history: { role: string; content: string }[];
}): Promise<{ hrResponse: string; feedback: string; score: number } | null> {
  try {
    const res = await fetch(`${API_BASE}/ai-simulation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch {
    return null; // fallback to client-side logic
  }
}
