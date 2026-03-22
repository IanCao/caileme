// 腾讯云 SCF 云函数 - 转发请求到 Cloudflare Worker
// 运行时: Node.js 18.x

const CF_WORKER_URL = process.env.CF_WORKER_URL || "https://caileme-api.xxx.workers.dev";
const CF_AUTH_TOKEN = process.env.CF_AUTH_TOKEN || "";

// 路径映射：SCF路径 → Worker API路径
const PATH_MAP = {
  "/feedback": "/api/feedback",
  "/submit": "/api/community/submit",
  "/comment": "/api/comment",
  "/like": "/api/like",
  // 带 /api 前缀的也支持（直连时）
  "/api/feedback": "/api/feedback",
  "/api/community/submit": "/api/community/submit",
  "/api/comment": "/api/comment",
  "/api/like": "/api/like",
};

exports.main_handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "https://caileme.team",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST" && event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  try {
    // 获取路径，去掉 stage 前缀（如 /release/feedback → /feedback）
    let rawPath = event.path || event.requestContext?.path || "/unknown";
    // 腾讯云 API 网关路径可能带 stage 前缀，提取最后一段有意义的路径
    const stageMatch = rawPath.match(/^\/(release|test|prepub)(\/.*)?$/);
    if (stageMatch) rawPath = stageMatch[2] || "/";

    // 健康检查
    if (rawPath === "/health" || rawPath === "/api/health") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: "ok", version: "3.0", relay: "scf→cf-worker" }),
      };
    }

    // 解析请求体（处理 API 网关 base64 编码）
    let body = "{}";
    if (event.body) {
      body = event.isBase64Encoded
        ? Buffer.from(event.body, "base64").toString("utf-8")
        : event.body;
    }

    // 映射到 Worker 路径
    const workerPath = PATH_MAP[rawPath] || `/api${rawPath}`;

    // 转发到 Cloudflare Worker
    const response = await fetch(`${CF_WORKER_URL}${workerPath}`, {
      method: event.httpMethod || "POST",
      headers: {
        "Content-Type": "application/json",
        ...(CF_AUTH_TOKEN ? { Authorization: `Bearer ${CF_AUTH_TOKEN}` } : {}),
      },
      body: event.httpMethod !== "GET" ? body : undefined,
    });

    const result = await response.json();

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error("SCF proxy error:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "服务暂时不可用，请稍后重试",
        debug: process.env.NODE_ENV === "development" ? String(err) : undefined,
      }),
    };
  }
};
