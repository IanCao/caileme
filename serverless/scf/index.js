// 腾讯云 SCF 云函数 - 转发请求到 Cloudflare Worker
// 运行时: Node.js 18.x

const CF_WORKER_URL = process.env.CF_WORKER_URL || "https://caileme-api.xxx.workers.dev";
const CF_AUTH_TOKEN = process.env.CF_AUTH_TOKEN || "";

exports.main_handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "https://caileme.team",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  try {
    const path = event.path || event.requestContext?.path || "/unknown";
    const body = event.body || "{}";

    // Map SCF path to Worker API path
    const pathMap: Record<string, string> = {
      "/feedback": "/api/feedback",
      "/submit": "/api/community/submit",
      "/comment": "/api/comment",
    };
    const workerPath = pathMap[path] || `/api${path}`;

    // Forward to Cloudflare Worker
    const response = await fetch(`${CF_WORKER_URL}${workerPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CF_AUTH_TOKEN}`,
      },
      body,
    });

    const result = await response.json();

    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "服务暂时不可用，请稍后重试",
      }),
    };
  }
};
