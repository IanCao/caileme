"use client";

import { useState, useRef, useEffect } from "react";
import { SCENARIOS, DEFAULT_SCENARIO, type Scenario } from "@/data/scenarios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatInterfaceProps {
  title?: string;
  subtitle?: string;
  defaultScenarioId?: string;
}

const SCENARIO_INTROS: Record<string, string> = {
  standard: `你好，我是今天的谈话负责人。

公司经过慎重考虑，想和你聊一下岗位调整的事情。

在正式开始之前，我想先了解一下，你最近的工作状态怎么样？

（提示：这是 HR 常见的开场白，目的是让你放松警惕或主动暴露信息。请谨慎回应。）`,
  aggressive: `（HR 推门进来，表情严肃，把文件夹往桌上一摔）

你还坐着呢？来来来，我们今天必须把这事定了。

我跟你说，这个位置，现在外面排着队等着的人多了去了。你不走，后面的人怎么进来？

快点快点，我没那么多时间跟你耗。你是自己谈，还是等我叫保安？

（提示：这是典型的强硬施压战术。保持冷静，不要被激怒，你有权利要求合理的时间考虑。）`,
  sweet_talk: `（HR 微笑着走进来，倒了杯咖啡递给你）

哎呀，最近怎么样？看你气色不错嘛！

说实话，我一直想找你聊聊。你在公司的这两年，大家都是有目共睹的，你的贡献我都记在心里。

其实...怎么说呢...这次调整也是不得已。公司有公司的难处，我也是夹在中间很难做。

我今天来呢，是想跟你商量一下后续的安排。说真的，你的条件我会尽力争取的...你看这样...

（提示：温柔不代表条件好！所有承诺必须白纸黑字。）`,
  legal_scare: `（HR 翻开一叠文件，表情严肃）

关于这次调整，我想先跟你说一下法律层面的一些事情。

你应该知道，劳动合同法第47条是这么规定的...（叹气）算了，这些我也不想说太多。

说实话，我接触过很多仲裁的案例，最终员工拿到的往往还没有我们现在给的多。周期长，成本高，最后得不偿失。

你今天签了，大家好聚好散。非要走仲裁的话...那个结果，我也不敢保证。

（提示：不要被吓住！劳动法保护员工权益，仲裁是免费的。）`,
  package_upgrade: `（HR 笑容满面地走进来）

哎，我专门来找你的。来来来，坐坐坐。

是这样的，我看了你的档案，你在公司的表现其实是很不错的。这次的调整呢，公司也考虑到你的贡献，想给你一些特殊的安排。

你看啊，基础方案你知道的，大家都有。但如果你今天能签字配合的话，我可以再去帮你争取一下这个...（指了指一张纸上的数字）...额外资源包。

不过这个名额确实有限，我也只能帮你到这了。你看...

（提示：警惕"配合"的条件！确认额外福利是否写进协议。）`,
  remote_worker: `（HR 坐下，翻开电脑）

说起来，正好趁今天这个机会，我们也想聊聊你这个居家办公的事情。

不是我针对你啊，但是...上面确实有反馈，说远程办公这块的效率不太好量化。

你看上次那个项目，客户那边也有一些意见...而且说实话，大家都在公司加班的时候，你那边的情况我们也不太清楚。

（叹气）其实这次调整，远程的员工确实是优先考虑的。你看...

（提示：远程办公是经过批准的。要求查看具体的绩效考核记录。）`,
};

const SCENARIO_TIPS: Record<string, string> = {
  standard: "先了解方案内容，不要急于表态。注意保留所有沟通记录。",
  aggressive: "保持冷静，不要被激怒。你有权要求时间考虑，不要当场签字。",
  sweet_talk: "温柔不代表条件好！所有承诺必须白纸黑字写进协议。",
  legal_scare: "不要被吓住！劳动法保护员工权益，仲裁免费且员工有优势。",
  package_upgrade: "警惕'放弃XX权利'的条件。竞业限制要仔细看，不要轻易答应。",
  remote_worker: "远程办公是批准的。要求查看绩效考核记录，用数据说话。",
};

// 检测 HR 回复是否表示对话结束
const END_DIALOGUE_PATTERNS = [
  '好聚好散',
  '翻篇了',
  '签了就好',
  '后续的事就翻篇',
  '这就是你',
  '明智的选择',
  '识时务',
  '聪明人',
  '好，这就是',
  '来，把字签了',
  '来，把这几页签一下',
  '来，这是主动离职',
  '来，这是协议',
  '签完就走人',
  '好聚好散',
];

function isDialogueEnded(aiResponse: string): boolean {
  return END_DIALOGUE_PATTERNS.some(pattern => aiResponse.includes(pattern));
}

export function AIChatInterface({
  title = "AI HR 模拟谈话",
  subtitle = "选择场景，开始练习",
  defaultScenarioId = DEFAULT_SCENARIO,
}: AIChatInterfaceProps) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [isSimulationEnded, setIsSimulationEnded] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, report]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "hard":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "简单";
      case "medium":
        return "中等";
      case "hard":
        return "困难";
      default:
        return "";
    }
  };

  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setMessages([
      {
        role: "assistant",
        content: SCENARIO_INTROS[scenario.id] || SCENARIO_INTROS.standard,
      },
    ]);
    setCurrentRound(1);
    setIsSimulationEnded(false);
    setReport(null);
    setError(null);
    setInput("");
  };

  const handleEndSimulation = () => {
    setSelectedScenario(null);
    setMessages([]);
    setCurrentRound(0);
    setIsSimulationEnded(false);
    setReport(null);
    setError(null);
    setInput("");
  };

  const generateReport = async (allMessages: Message[]) => {
    if (!selectedScenario) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...allMessages.map((m) => ({ role: m.role, content: m.content })),
            {
              role: "user",
              content: `我们已经完成了10轮对话。请根据之前的对话内容，生成一份模拟报告，包括：1. 对话总结；2. 你的表现评估；3. 改进建议；4. 实战贴士。`,
            },
          ],
          scenarioId: selectedScenario.id,
          generateReport: true,
        }),
      });

      if (!response.ok) {
        throw new Error("生成报告失败");
      }

      const data = await response.json();
      setReport(data.content);
      setIsSimulationEnded(true);
    } catch (err) {
      setError("生成报告失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newRound = currentRound + 1;
    const allMessages = [...messages, userMessage];
    
    setMessages(allMessages);
    setCurrentRound(newRound);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages,
          scenarioId: selectedScenario?.id || DEFAULT_SCENARIO,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "AI 服务暂时不可用");
      }

      const data = await response.json();
      
      // 检测是否应该结束对话（HR 表示对话结束）
      if (isDialogueEnded(data.content)) {
        // 先显示 HR 的结束回复
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
        // 然后生成报告
        setTimeout(() => {
          generateReport([...allMessages, { role: "assistant", content: data.content }]);
        }, 1500);
        return;
      }
      
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "发送失败，请重试";
      setError(errorMessage);
      setMessages((prev) => prev.slice(0, -1));
      setCurrentRound((prev) => prev - 1);
      
      // 在控制台输出详细信息
      console.error("[AI Chat Error]", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header - 固定高度 */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-surface shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{title}</h3>
              {selectedScenario && (
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                  {selectedScenario.icon} {selectedScenario.name}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          </div>
          {selectedScenario && (
            <button
              onClick={handleEndSimulation}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              结束模拟
            </button>
          )}
        </div>

        {/* Round indicator */}
        {selectedScenario && !isSimulationEnded && (
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gray-800 to-gray-900 transition-all duration-300"
                style={{ width: `${Math.min((currentRound / 10) * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 shrink-0">
              第 {currentRound} 轮
            </span>
          </div>
        )}
      </div>

      {/* Scenario Picker - 固定高度，滚动内部 */}
      {!selectedScenario && (
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white shrink-0 overflow-y-auto max-h-[400px]">
          <p className="text-sm text-gray-500 mb-4">
            选择一个 HR 场景进行模拟练习：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario)}
                className="p-4 rounded-xl border-2 border-gray-100 bg-white text-left transition-all hover:border-gray-200 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{scenario.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 truncate">
                        {scenario.name}
                      </h4>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${getDifficultyColor(
                          scenario.difficulty
                        )}`}
                      >
                        {getDifficultyText(scenario.difficulty)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {scenario.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages - 固定flex-1，内部滚动 */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
      >
        {selectedScenario && messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} gap-2`}
          >
            {/* Avatar */}
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <span className="text-sm">👔</span>
              </div>
            )}
            
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-black text-white rounded-br-sm"
                  : "bg-surface text-gray-800 rounded-bl-sm"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
            
            {/* User Avatar */}
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                <span className="text-sm">😊</span>
              </div>
            )}
          </div>
        ))}

        {isLoading && !report && (
          <div className="flex justify-start">
            <div className="bg-surface rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs text-gray-400">HR 正在思考...</span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-full">
              {error}
            </div>
          </div>
        )}

        {/* Report */}
        {report && (
          <div className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📊</span>
              <h4 className="font-semibold text-gray-900">模拟报告</h4>
            </div>
            <div className="prose prose-sm max-w-none">
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {report}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                💡 这份报告仅供参考。实际裁员谈判中，请结合自身情况并咨询专业律师。
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Tips */}
      {selectedScenario && !isSimulationEnded && (
        <div className="px-4 sm:px-6 py-2 border-t border-gray-100 bg-yellow-50/50 shrink-0">
          <p className="text-xs text-amber-700 flex items-center gap-1.5">
            <span>💡</span>
            <span>
              {SCENARIO_TIPS[selectedScenario.id] || "提示：括号内的内容是你的参考建议，实际对话中无需回复"}
            </span>
          </p>
        </div>
      )}

      {/* Input */}
      {selectedScenario && !isSimulationEnded && (
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 border-t border-gray-200 shrink-0">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入你的回复..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100 outline-none transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-black text-white rounded-full font-medium text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              发送
            </button>
          </div>
        </form>
      )}

      {/* Actions after simulation ended */}
      {isSimulationEnded && (
        <div className="p-4 sm:p-6 border-t border-gray-200 shrink-0">
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => handleSelectScenario(selectedScenario!)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              再练一次
            </button>
            <button
              onClick={handleEndSimulation}
              className="px-6 py-3 bg-black text-white rounded-full font-medium text-sm hover:bg-gray-800 transition-colors"
            >
              选择其他场景
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
