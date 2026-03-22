"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  scenarios,
  Scenario,
  DialogueStep,
  ResponseOption,
} from "@/data/scenarios";
import { getAIResponse } from "@/lib/api";

interface ChatMessage {
  role: "hr" | "user" | "system" | "feedback";
  content: string;
  score?: number;
  quality?: "good" | "medium" | "bad";
}

function getQuality(score: number): "good" | "medium" | "bad" {
  if (score >= 80) return "good";
  if (score >= 50) return "medium";
  return "bad";
}

function getQualityLabel(quality: "good" | "medium" | "bad") {
  switch (quality) {
    case "good":
      return { text: "优秀选择 ✅", color: "text-green-600", bg: "bg-green-50 border-green-200" };
    case "medium":
      return { text: "一般选择 ⚠️", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" };
    case "bad":
      return { text: "需要改进 ❌", color: "text-red-600", bg: "bg-red-50 border-red-200" };
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "hard":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getDifficultyLabel(difficulty: string) {
  switch (difficulty) {
    case "easy":
      return "入门";
    case "medium":
      return "进阶";
    case "hard":
      return "挑战";
    default:
      return difficulty;
  }
}

function getSummary(
  score: number,
  maxScore: number
): { title: string; emoji: string; description: string; color: string } {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  if (pct >= 80) {
    return {
      title: "谈判高手！",
      emoji: "🏆",
      description:
        "你的应对非常出色！你很了解劳动法规，沟通技巧也很好。在真实谈判中继续保持这种冷静和专业的态度。",
      color: "from-green-500 to-emerald-600",
    };
  }
  if (pct >= 60) {
    return {
      title: "表现不错",
      emoji: "👍",
      description:
        "你有一定的法律意识和谈判基础，但某些关键节点还可以做得更好。建议多了解劳动合同法相关条款，增强谈判底气。",
      color: "from-yellow-500 to-orange-500",
    };
  }
  return {
    title: "需要加强",
    emoji: "📚",
    description:
      "你在谈判中容易妥协，建议系统学习劳动法基础知识。记住：签字前一切都可以谈判，不要被HR的话术影响判断。",
    color: "from-red-500 to-pink-500",
  };
}

export function InteractiveSimulation() {
  const [phase, setPhase] = useState<"select" | "play" | "summary">("select");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [roundCount, setRoundCount] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showOptions]);

  const getCurrentStep = (): DialogueStep | null => {
    if (!selectedScenario || !currentStepId) return null;
    return (
      selectedScenario.dialogues.find((d) => d.id === currentStepId) ?? null
    );
  };

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setPhase("play");
    setMessages([]);
    setTotalScore(0);
    setMaxScore(0);
    setRoundCount(0);
    setShowOptions(false);

    const firstStep = scenario.dialogues[0];
    if (firstStep) {
      setCurrentStepId(firstStep.id);
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{ role: firstStep.role, content: firstStep.message }]);
        setIsTyping(false);
        if (firstStep.options && firstStep.options.length > 0) {
          setTimeout(() => setShowOptions(true), 400);
        }
      }, 800);
    }
  };

  const handleOptionSelect = async (option: ResponseOption) => {
    setShowOptions(false);
    const quality = getQuality(option.score);
    const bestScore = getCurrentStep()?.options
      ? Math.max(...(getCurrentStep()!.options!.map((o) => o.score)))
      : option.score;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: option.text }]);

    // Add feedback
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "feedback",
          content: option.feedback,
          score: option.score,
          quality,
        },
      ]);
      setTotalScore((prev) => prev + option.score);
      setMaxScore((prev) => prev + bestScore);
      setRoundCount((prev) => prev + 1);
    }, 400);

    // Try API first (will fallback to client-side)
    if (selectedScenario) {
      getAIResponse({
        scenarioId: selectedScenario.id,
        roundIndex: roundCount,
        userChoice: option.text,
        history: messages.map((m) => ({
          role: m.role === "hr" ? "assistant" : "user",
          content: m.content,
        })),
      });
      // Fire-and-forget for now; use client-side logic regardless
    }

    // Navigate to next step
    if (option.nextStepId) {
      const nextStep = selectedScenario?.dialogues.find(
        (d) => d.id === option.nextStepId
      );
      if (nextStep) {
        setCurrentStepId(nextStep.id);

        if (nextStep.nextStepId === null && !nextStep.options) {
          // End step (system message)
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                { role: "system", content: nextStep.message },
              ]);
              setIsTyping(false);
              setTimeout(() => setPhase("summary"), 1500);
            }, 600);
          }, 800);
        } else {
          // Next HR message
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                { role: nextStep.role, content: nextStep.message },
              ]);
              setIsTyping(false);
              if (nextStep.options && nextStep.options.length > 0) {
                setTimeout(() => setShowOptions(true), 400);
              }
            }, 800);
          }, 1000);
        }
      }
    }
  };

  const resetAll = () => {
    setPhase("select");
    setSelectedScenario(null);
    setCurrentStepId(null);
    setMessages([]);
    setTotalScore(0);
    setMaxScore(0);
    setRoundCount(0);
    setShowOptions(false);
    setIsTyping(false);
  };

  // Scenario selection screen
  if (phase === "select") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">🎭 互动模拟场景</h2>
          <p className="mt-2 text-gray-500">
            选择一个场景，AI扮演HR与你实时互动
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((scenario, index) => (
            <motion.button
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              onClick={() => startScenario(scenario)}
              className="text-left bg-white rounded-2xl p-5 border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{scenario.icon}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(
                    scenario.difficulty
                  )}`}
                >
                  {getDifficultyLabel(scenario.difficulty)}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{scenario.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {scenario.description}
              </p>
              <p className="text-xs text-gray-400">
                ⏱️ {scenario.estimatedTime}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Summary screen
  if (phase === "summary" && selectedScenario) {
    const summary = getSummary(totalScore, maxScore);
    const pct = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center">
          <div className="text-5xl mb-4">{summary.emoji}</div>
          <h2 className="text-2xl font-bold">{summary.title}</h2>
          <p className="mt-2 text-gray-500">{selectedScenario.title} 模拟完成</p>
        </div>

        {/* Score card */}
        <div
          className={`bg-gradient-to-br ${summary.color} rounded-2xl p-6 text-white text-center`}
        >
          <div className="text-5xl font-bold">{pct}%</div>
          <div className="mt-1 text-white/80 text-sm">
            得分 {totalScore} / {maxScore}（共 {roundCount} 轮选择）
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold mb-2">📋 总结建议</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {summary.description}
          </p>
        </div>

        {/* Key tips */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold mb-3">💡 关键要点</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              保持冷静，不要被HR的话术影响情绪
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              了解法律规定的赔偿标准，不接受低于标准的方案
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              不要当场签字，给自己留出时间审阅协议
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              全程录音保存，保留所有书面证据
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              遇到困难及时咨询专业劳动法律师
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => startScenario(selectedScenario)}
            className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            🔄 重新挑战
          </button>
          <button
            onClick={resetAll}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            📋 选择其他场景
          </button>
        </div>
      </motion.div>
    );
  }

  // Play screen
  const currentStep = getCurrentStep();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={resetAll}
          className="text-sm text-gray-500 hover:text-black transition-colors"
        >
          ← 返回选择
        </button>
        {selectedScenario && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">
              得分: {totalScore}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(
                selectedScenario.difficulty
              )}`}
            >
              {selectedScenario.title}
            </span>
          </div>
        )}
      </div>

      {/* Chat area */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Chat header */}
        <div className="px-5 py-3 border-b border-gray-100 bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs">
              HR
            </div>
            <div>
              <div className="font-medium text-sm">
                {selectedScenario?.title}
              </div>
              <div className="text-xs text-gray-400">互动模拟对话</div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={chatRef}
          className="p-5 space-y-3 min-h-[400px] max-h-[500px] overflow-y-auto"
        >
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.role === "hr" && (
                  <div className="flex gap-3">
                    <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-1">
                      HR
                    </div>
                    <div className="bg-surface rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                )}
                {msg.role === "user" && (
                  <div className="flex justify-end">
                    <div className="bg-black text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                )}
                {msg.role === "feedback" && (
                  <div className="mx-4">
                    <div
                      className={`p-3 rounded-xl border ${
                        getQualityLabel(msg.quality || "medium").bg
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-medium ${
                            getQualityLabel(msg.quality || "medium").color
                          }`}
                        >
                          {getQualityLabel(msg.quality || "medium").text}
                        </span>
                        <span className="text-xs text-gray-400">
                          +{msg.score}分
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                )}
                {msg.role === "system" && (
                  <div className="mx-4 p-3 bg-accent/5 border border-accent/10 rounded-xl">
                    <p className="text-sm text-accent leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-1">
                HR
              </div>
              <div className="bg-surface rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Options */}
          {showOptions && currentStep?.options && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2 pt-2"
            >
              <p className="text-xs text-gray-400 text-center mb-2">
                选择你的回应：
              </p>
              {currentStep.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full text-left p-3 rounded-xl border border-gray-200 bg-white hover:border-accent hover:bg-accent/5 transition-all duration-200 group"
                >
                  <p className="text-sm leading-relaxed text-gray-700 group-hover:text-black">
                    {option.text}
                  </p>
                </button>
              ))}
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
