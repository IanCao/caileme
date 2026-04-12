import { getScenarioSystemPrompt, SCENARIOS, type Scenario } from "../../app/data/scenarios";

interface ChatMessage {
  role: string;
  content: string;
}

interface AIChatRequest {
  messages?: ChatMessage[];
  scenarioId?: string;
  generateReport?: boolean;
}

interface EnvBindings {
  CLOUDFLARE_ACCOUNT_ID?: string;
  CLOUDFLARE_API_TOKEN?: string;
  CLOUDFLARE_AI_MODEL?: string;
}

interface PagesContext {
  request: Request;
  env: EnvBindings;
}

const RETRY_TOMORROW_MESSAGE = "今日 AI 使用次数过多，请明天再试。";

function json(data: unknown, init?: ResponseInit): Response {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("X-Caileme-Function", "ai-chat");

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
}

function retryTomorrowResponse(status = 429): Response {
  return json({ error: RETRY_TOMORROW_MESSAGE }, { status });
}

export async function onRequestGet(context: PagesContext): Promise<Response> {
  return json({
    ok: true,
    function: "ai-chat",
    runtime: "pages-function",
    aiConfigured: Boolean(
      context.env.CLOUDFLARE_ACCOUNT_ID && context.env.CLOUDFLARE_API_TOKEN
    ),
  });
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  let body: AIChatRequest;

  try {
    body = (await context.request.json()) as AIChatRequest;
  } catch {
    return json({ error: "Invalid request body" }, { status: 400 });
  }

  const { messages, scenarioId = "standard", generateReport = false } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return json({ error: "Invalid messages format" }, { status: 400 });
  }

  const validScenario = SCENARIOS.find((scenario: Scenario) => scenario.id === scenarioId);
  if (!validScenario) {
    return json({ error: "Invalid scenario ID" }, { status: 400 });
  }

  const accountId = context.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = context.env.CLOUDFLARE_API_TOKEN;
  const model =
    context.env.CLOUDFLARE_AI_MODEL || "@cf/qwen/qwen2.5-7b-instruct";

  if (!accountId || !apiToken) {
    console.error("[AI Chat] Missing Cloudflare AI credentials");
    return retryTomorrowResponse();
  }

  const systemPrompt = generateReport
    ? `你是一个专业的劳动法顾问。请根据之前的对话内容，生成一份详细的模拟报告。

报告需要包含以下部分：

## 📊 对话总结
简要总结这次裁员模拟谈话的主要内容和HR采取的策略。

## 🎯 你的表现评估
从以下几个维度评估：
- 信息保护意识（是否透露了过多个人信息或弱点）
- 谈判立场（是否坚持要求明确赔偿方案）
- 心理素质（是否被HR的话术影响）
- 法律意识（是否善用了劳动法知识）

## 💡 改进建议
给出3-5条具体的改进建议，帮助用户在真实谈判中表现得更好。

## 🛡️ 实战贴士
给出3-5条在真实裁员谈判中的实用技巧。

请用中文回复，语言要专业但易懂，有鼓励性但不失客观性。`
    : getScenarioSystemPrompt(scenarioId);

  const conversation = [
    { role: "system", content: systemPrompt },
    ...messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
  ];

  let response: Response;

  try {
    response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversation,
          max_tokens: 512,
          temperature: 0.7,
        }),
      }
    );
  } catch (error) {
    console.error("[AI Chat] Upstream request failed:", error);
    return retryTomorrowResponse();
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Cloudflare AI API error:", {
      status: response.status,
      statusText: response.statusText,
      error: errorText,
    });

    return retryTomorrowResponse();
  }

  const result = await response.json();
  const aiResponse =
    result.result?.response || result.result?.choices?.[0]?.message?.content || "";

  if (!aiResponse) {
    console.error(
      "[AI Chat] Unexpected response format:",
      JSON.stringify(result).slice(0, 500)
    );
    return retryTomorrowResponse();
  }

  return json({ role: "assistant", content: aiResponse });
}
