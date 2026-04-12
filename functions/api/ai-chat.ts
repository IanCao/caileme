import { getScenarioSystemPrompt, SCENARIOS, type Scenario } from "../../app/data/scenarios";
import {
  generateFallbackReport,
  getFallbackResponse,
  SCENARIO_INTROS,
} from "../../app/lib/aiChatFallback";

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

function json(data: unknown, init?: ResponseInit): Response {
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
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
    return json(buildFallbackPayload(messages, scenarioId, generateReport));
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

  const response = await fetch(
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

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Cloudflare AI API error:", {
      status: response.status,
      statusText: response.statusText,
      error: errorText,
    });

    let errorMessage = "AI 服务暂时不可用，请稍后重试";
    if (response.status === 403) {
      errorMessage = "AI 权限不足，请检查 API Token 权限配置";
    } else if (response.status === 404) {
      errorMessage = "AI 模型不存在或账户 ID 错误";
    } else if (response.status === 429) {
      errorMessage = "AI 请求次数超限，请稍后再试";
    }

    return json({ error: errorMessage }, { status: 503 });
  }

  const result = await response.json();
  const aiResponse =
    result.result?.response || result.result?.choices?.[0]?.message?.content || "";

  if (!aiResponse) {
    console.error(
      "[AI Chat] Unexpected response format:",
      JSON.stringify(result).slice(0, 500)
    );
    return json({ role: "assistant", content: "抱歉，我现在无法回答。" });
  }

  return json({ role: "assistant", content: aiResponse });
}

function buildFallbackPayload(
  messages: ChatMessage[],
  scenarioId: string,
  generateReport: boolean
) {
  if (generateReport) {
    return {
      role: "assistant",
      content: generateFallbackReport(),
    };
  }

  const userMessages = messages.filter((message) => message.role === "user");
  if (userMessages.length === 0) {
    return {
      role: "assistant",
      content: SCENARIO_INTROS[scenarioId] || SCENARIO_INTROS.standard,
    };
  }

  const lastUserMessage = userMessages[userMessages.length - 1];
  return {
    role: "assistant",
    content: getFallbackResponse(lastUserMessage.content || "", scenarioId),
  };
}
