// Tencent Cloud Serverless API (SCF → Cloudflare Worker)
// All submissions go through Tencent Cloud SCF, which forwards to Cloudflare for storage

const API_BASE = "https://service-xxx.gz.tencentapigw.com/release";

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
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch {
    return { success: false, message: "提交失败，请稍后重试" };
  }
}

export async function submitPost(data: {
  email: string;
  nickname: string;
  category: string;
  title: string;
  content: string;
  images?: string[];
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch {
    return { success: false, message: "投稿失败，请稍后重试" };
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
    if (!res.ok) throw new Error("Network error");
    return await res.json();
  } catch {
    return { success: false, message: "评论失败，请稍后重试" };
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
