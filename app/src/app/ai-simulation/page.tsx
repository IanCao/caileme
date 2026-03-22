"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Message {
  role: "hr" | "user" | "system";
  content: string;
}

const scenarios: Record<string, { title: string; messages: Message[] }> = {
  normal: {
    title: "正常裁员（N+1）",
    messages: [
      {
        role: "system",
        content:
          "场景：公司以业务调整为由进行裁员，HR约你谈话。以下是模拟对话：",
      },
      {
        role: "hr",
        content:
          "你好，感谢你来。今天找你聊一件事情。公司最近在做业务调整，你所在的部门需要优化人员结构。很抱歉，你的岗位受到了影响。",
      },
      {
        role: "system",
        content:
          '💡 建议：保持冷静，不要情绪化。可以说"我理解，请详细说明一下公司的方案。"',
      },
      {
        role: "hr",
        content:
          "公司会按照法律规定给你经济补偿。你在公司工作了3年，我们给你N+1的赔偿方案，也就是4个月工资。另外社保会帮你缴到月底。",
      },
      {
        role: "system",
        content:
          "💡 建议：确认N+1的计算方式是否正确。N应该按照你最近12个月的平均工资计算，包括奖金、补贴等。",
      },
      {
        role: "hr",
        content:
          "这是协商解除协议，你看一下。如果没问题的话，今天签字，下周就可以把赔偿打到你账上。",
      },
      {
        role: "system",
        content:
          '💡 建议：不要当场签字！可以说"我需要时间仔细看一下协议内容，能带回去看看吗？明天给你答复。"',
      },
      {
        role: "hr",
        content: "当然可以，你拿回去看看。如果有什么问题，随时来找我。",
      },
      {
        role: "system",
        content:
          "💡 回家后：仔细核对赔偿金额计算、社保截止时间、年终奖条款、竞业限制条款等。如有疑问，可以咨询律师。",
      },
    ],
  },
  lowball: {
    title: "低赔偿压价",
    messages: [
      {
        role: "system",
        content:
          "场景：公司只愿意给低于法定标准的赔偿，HR试图施压让你接受。",
      },
      {
        role: "hr",
        content:
          "公司现在情况不太好，能给你N的赔偿已经是尽力了。你也知道，现在大环境不好，很多公司裁员都不给赔偿的。",
      },
      {
        role: "system",
        content:
          '💡 建议：不要被"大环境不好"的说法影响。法律标准不会因为大环境改变。可以说"我理解公司的困难，但赔偿是法律规定的权利，不是公司的恩赐。"',
      },
      {
        role: "hr",
        content:
          "而且说实话，你最近的绩效也不是特别好。公司可以按不胜任工作来处理，那样连N都不一定有。",
      },
      {
        role: "system",
        content:
          '💡 建议：这是常见的施压话术。按"不胜任"辞退需要：1.有明确的考核标准 2.书面通知 3.经过培训或调岗。可以问"请问有书面的绩效考核不达标通知吗？"',
      },
      {
        role: "hr",
        content: "你别想太多了，这个方案是公司统一的。过了今天可能方案就变了。",
      },
      {
        role: "system",
        content:
          '💡 建议：这是催促签字的话术，不要被裹挟。可以说"我尊重公司的决定，但我需要按照法律标准来评估。我会在3天内给你答复。"如果协商不成，可以考虑劳动仲裁。',
      },
    ],
  },
  illegal: {
    title: "违法裁员",
    messages: [
      {
        role: "system",
        content:
          "场景：公司没有合法理由，试图逼你主动辞职或以不正当理由辞退。",
      },
      {
        role: "hr",
        content:
          "我们觉得你不太适合现在的岗位。公司决定跟你解除劳动关系。你写个辞职报告吧，这样对你下份工作的背调也好看一些。",
      },
      {
        role: "system",
        content:
          '🚨 警告：千万不要写辞职报告！主动辞职 = 放弃所有经济补偿。可以说"我不同意主动辞职。如果公司要解除劳动合同，请出具书面的解除通知和理由。"',
      },
      {
        role: "hr",
        content:
          "那你要是不配合的话，公司可能会给你调岗降薪。到时候你自己受不了也会走的。",
      },
      {
        role: "system",
        content:
          '🚨 注意：恶意调岗降薪是违法的，属于变相逼迫离职。可以说"未经我同意的调岗降薪，我有权不接受。如果公司单方面变更劳动合同，我会通过法律途径维权。"',
      },
      {
        role: "hr",
        content: "你好好想想吧，这对你最好。我给你两天时间考虑。",
      },
      {
        role: "system",
        content:
          "💡 建议：1. 录音保存所有谈话 2. 正常上班打卡 3. 不要交出工作账号 4. 咨询劳动法律师 5. 准备劳动仲裁材料。违法裁员可以要求2N赔偿。",
      },
    ],
  },
};

export default function AISimulation() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [showDevToast, setShowDevToast] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedScenario && visibleCount < scenarios[selectedScenario].messages.length) {
      const timer = setTimeout(() => {
        setVisibleCount((c) => c + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [selectedScenario, visibleCount]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleCount]);

  useEffect(() => {
    if (showDevToast) {
      const timer = setTimeout(() => setShowDevToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showDevToast]);

  const startScenario = (key: string) => {
    setSelectedScenario(key);
    setVisibleCount(0);
    requestAnimationFrame(() => {
      chatAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            AI 裁员模拟
          </h1>
          <p className="mt-4 text-gray-500 text-center text-lg">
            模拟HR裁员对话，提前了解应对策略
          </p>
        </motion.div>

        {/* 场景选择 */}
        {!selectedScenario && (
          <motion.div
            className="mt-12 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-center mb-6">
              选择一个场景开始模拟
            </h2>
            {Object.entries(scenarios).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => startScenario(key)}
                className="w-full text-left bg-white rounded-2xl p-6 border border-gray-100 card-hover"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{scenario.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {scenario.messages[0].content}
                    </p>
                  </div>
                  <span className="text-gray-300 text-xl">→</span>
                </div>
              </button>
            ))}

            {/* 互动模拟场景按钮 */}
            <button
              onClick={() => setShowDevToast(true)}
              className="w-full text-left bg-gradient-to-r from-accent/5 to-purple-50 rounded-2xl p-6 border-2 border-dashed border-accent/30 hover:border-accent/60 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">🎭 互动模拟场景</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">即将上线</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    自由对话模式，AI扮演HR与你实时互动，根据你的回答给出专业建议
                  </p>
                </div>
                <span className="text-accent text-xl">✨</span>
              </div>
            </button>
          </motion.div>
        )}

        {/* 开发中提示 Toast */}
        {showDevToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium"
          >
            🚀 互动模拟场景正在开发中，敬请期待！
          </motion.div>
        )}

        {/* 对话界面 */}
        {selectedScenario && (
          <div className="mt-8" ref={chatAreaRef}>
            <button
              onClick={() => {
                setSelectedScenario(null);
                setVisibleCount(0);
              }}
              className="mb-6 text-sm text-gray-500 hover:text-black transition-colors"
            >
              ← 返回选择场景
            </button>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-surface">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs">
                    HR
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {scenarios[selectedScenario].title}
                    </div>
                    <div className="text-xs text-gray-400">模拟对话</div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div ref={chatContainerRef} className="p-6 space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto">
                {scenarios[selectedScenario].messages
                  .slice(0, visibleCount)
                  .map((msg, i) => (
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
                            <p className="text-sm leading-relaxed">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      )}
                      {msg.role === "system" && (
                        <div className="mx-8 p-3 bg-accent/5 border border-accent/10 rounded-xl">
                          <p className="text-sm text-accent leading-relaxed">
                            {msg.content}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 免责 */}
        <div className="mt-8 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
          <p className="text-xs text-yellow-700 leading-relaxed">
            ⚠️ 免责声明：以上对话仅为模拟场景，供参考学习。不构成法律建议。每个人的情况不同，具体问题请咨询专业劳动法律师。
          </p>
        </div>
      </div>
    </div>
  );
}
