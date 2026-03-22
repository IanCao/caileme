// Tencent Cloud SCF (Serverless Cloud Function) handler
// Forwards AI simulation requests to OpenAI/other LLM API
// Deploy: scf deploy

exports.main_handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  const body = JSON.parse(event.body || "{}");
  const { scenarioId, roundIndex, userChoice, history } = body;

  if (!scenarioId || userChoice === undefined) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Missing required fields: scenarioId, userChoice",
      }),
    };
  }

  // TODO: Implement LLM API call (OpenAI, Claude, etc.)
  // Example integration:
  //
  // const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     model: "gpt-4",
  //     messages: [
  //       { role: "system", content: `你是一个模拟裁员谈判的HR。场景ID: ${scenarioId}，当前第${roundIndex}轮。` },
  //       ...history,
  //       { role: "user", content: userChoice },
  //     ],
  //   }),
  // });

  // For now, return placeholder
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      hrResponse: "（后端AI响应占位）",
      feedback: "（后端反馈占位）",
      score: 0,
    }),
  };
};
