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
      // 第1轮
      { role: "system", content: "场景：公司以业务调整为由进行裁员，HR约你谈话。以下是模拟对话：" },
      { role: "hr", content: "你好，感谢你来。今天找你聊一件事情。公司最近在做业务调整，你所在的部门需要优化人员结构。很抱歉，你的岗位受到了影响。" },
      { role: "system", content: "💡 建议：保持冷静，不要情绪化。可以说「我理解，请详细说明一下公司的方案。」" },
      // 第2轮
      { role: "hr", content: "公司会按照法律规定给你经济补偿。你在公司工作了3年，我们给你N+1的赔偿方案，也就是4个月工资。另外社保会帮你缴到月底。" },
      { role: "system", content: "💡 建议：确认N+1的计算方式是否正确。N应该按照你最近12个月的平均工资计算，包括奖金、补贴等。+1是代通知金，按实际工资计算，不受3倍社平封顶。" },
      // 第3轮
      { role: "hr", content: "你的月薪是15000，所以4个月就是60000。我们下周就能打款。" },
      { role: "system", content: "💡 建议：注意确认「月薪」的口径。N的基数应该是前12个月的平均工资，包括基本工资、绩效奖金、加班费、补贴等所有货币性收入。如果公司只按基本工资算，要指出来。" },
      // 第4轮
      { role: "hr", content: "这是协商解除协议，你看一下。如果没问题的话，今天签字，下周就可以把赔偿打到你账上。" },
      { role: "system", content: "💡 建议：不要当场签字！可以说「我需要时间仔细看一下协议内容，能带回去看看吗？明天给你答复。」协议中的每一条都要仔细审阅。" },
      // 第5轮
      { role: "hr", content: "好的，你可以带回去看。不过我提醒一下，这个方案是有有效期的，建议你三天内答复。" },
      { role: "system", content: "💡 建议：不要被时间限制裹挟。法律没有规定你必须在几天内答复。回家后重点审阅：1.赔偿金额计算方式 2.社保公积金截止日期 3.年终奖和未休年假条款 4.竞业限制条款。" },
      // 第6轮
      { role: "hr", content: "对了，协议里有一条竞业限制条款，限制期6个月，公司会每月支付你30%的月薪作为补偿。" },
      { role: "system", content: "💡 建议：竞业限制补偿金法律最低标准是离职前12个月平均工资的30%。注意确认：1.限制范围是否合理 2.限制期限（最长2年）3.如果公司3个月不支付补偿，你可以解除竞业限制。" },
      // 第7轮
      { role: "hr", content: "还有年终奖的问题，因为你没干满一年，按照公司规定离职员工不享受年终奖。" },
      { role: "system", content: "💡 建议：注意！如果劳动合同或公司制度中明确了年终奖的发放条件，且你符合条件，公司不能以离职为由拒绝发放。可以要求按在职月份折算。保留相关制度文件作为证据。" },
      // 第8轮
      { role: "hr", content: "你还有5天年假没休，我们会折算成工资一起发给你。" },
      { role: "system", content: "💡 建议：未休年假折算标准是：日工资 × 未休天数 × 200%（注意是额外200%，因为正常工资已经发过了）。确认公司按这个标准计算，而不是按100%。" },
      // 第9轮
      { role: "hr", content: "离职手续方面，我们会在15个工作日内为你办理社保和公积金转移，开具离职证明。你的工作交接请在本周内完成。" },
      { role: "system", content: "💡 建议：离职证明非常重要，公司必须在解除劳动合同时出具。确认离职证明上：1.不写负面评价 2.写明是「协商一致解除」3.包含入职时间、岗位等基本信息。同时办理失业保险金申领。" },
      // 第10轮
      { role: "hr", content: "好的，那你回去好好看看协议，有什么问题随时联系我。希望咱们好聚好散。" },
      { role: "system", content: "💡 总结：1.拿到协议后找律师审阅 2.核对所有金额计算 3.确认社保公积金缴纳到何时 4.保留所有沟通记录 5.了解失业保险金申领流程。记住：签字前一切都可以谈判。" },
    ],
  },
  lowball: {
    title: "低赔偿压价",
    messages: [
      // 第1轮
      { role: "system", content: "场景：公司只愿意给低于法定标准的赔偿，HR试图施压让你接受。" },
      { role: "hr", content: "公司现在情况不太好，能给你N的赔偿已经是尽力了。你也知道，现在大环境不好，很多公司裁员都不给赔偿的。" },
      { role: "system", content: "💡 建议：不要被「大环境不好」的说法影响。法律标准不会因为大环境改变。可以说「我理解公司的困难，但赔偿是法律规定的权利，不是公司的恩赐。」" },
      // 第2轮
      { role: "hr", content: "而且说实话，你最近的绩效也不是特别好。公司可以按不胜任工作来处理，那样连N都不一定有。" },
      { role: "system", content: "💡 建议：这是常见的施压话术。按「不胜任」辞退需要：1.有明确的考核标准 2.书面通知 3.经过培训或调岗后仍不胜任。可以反问「请问有书面的绩效考核不达标通知吗？」" },
      // 第3轮
      { role: "hr", content: "你别想太多了，这个方案是公司统一的。过了今天可能方案就变了。" },
      { role: "system", content: "💡 建议：这是催促签字的经典话术，不要被裹挟。可以说「我尊重公司的决定，但我需要按照法律标准来评估。我会在合理时间内给你答复。」" },
      // 第4轮
      { role: "hr", content: "我跟你说实话吧，公司账上真的没什么钱了。给N已经是领导特批的了，其他同事都是N-1走的。" },
      { role: "system", content: "💡 建议：不要被「别人更惨」的比较影响。每个人的赔偿应该独立按法律标准计算。如果其他同事真的拿了低于法定标准的赔偿，他们也有权申请仲裁。" },
      // 第5轮
      { role: "hr", content: "而且你想想，去仲裁要花好几个月时间，耗精力不说，拿到的也不一定比现在多。" },
      { role: "system", content: "💡 建议：仲裁确实需要时间（一般1-3个月），但这不应该成为接受低赔偿的理由。而且仲裁是免费的，不需要律师也可以自己申请。很多时候公司会在仲裁前主动加价和解。" },
      // 第6轮
      { role: "hr", content: "好吧，我再帮你争取一下。公司可以给你N+0.5，这已经是能谈到的最好方案了。" },
      { role: "system", content: "💡 建议：N+0.5还是低于法定标准N+1。可以说「感谢你的努力，但N+1是法律规定的最低标准，我希望公司能遵守法律。如果不行，我可能需要通过其他渠道解决。」" },
      // 第7轮
      { role: "hr", content: "你要这么说的话，那我只能如实跟领导汇报了。可能会影响后续的离职流程和背调。" },
      { role: "system", content: "🚨 注意：以背调威胁员工接受低赔偿是违法的！离职证明不得包含负面评价。可以说「离职证明的内容有法律规定，我相信公司会依法办事。」同时建议录音保存这段对话。" },
      // 第8轮
      { role: "hr", content: "不是威胁你啊，我只是提醒你考虑清楚。毕竟去仲裁的话，圈子就这么大，以后不好说。" },
      { role: "system", content: "🚨 注意：劳动仲裁是法律赋予的权利，受法律保护。没有任何企业可以因为员工申请仲裁而在行业内「封杀」。这是赤裸裸的恐吓话术，继续录音保留证据。" },
      // 第9轮
      { role: "hr", content: "那这样吧，我最后再帮你争取一下，看看能不能到N+1。你给我两天时间跟领导申请。" },
      { role: "system", content: "💡 建议：这是好的进展方向。可以说「好的，我等你消息。请以书面形式确认方案，包括具体金额和支付时间。」同时利用这两天时间咨询律师、计算应得赔偿。" },
      // 第10轮
      { role: "hr", content: "行，那你先回去。不过你工作上该做的还是要做好，别因为这个事情影响工作。" },
      { role: "system", content: "💡 总结：1.全程录音保存 2.不要签任何低于N+1的协议 3.正常上班打卡不要旷工 4.咨询劳动法律师 5.准备仲裁材料以备不时之需 6.不要被话术影响情绪。你的权利受法律保护。" },
    ],
  },
  illegal: {
    title: "违法裁员",
    messages: [
      // 第1轮
      { role: "system", content: "场景：公司没有合法理由，试图逼你主动辞职或以不正当理由辞退。" },
      { role: "hr", content: "我们觉得你不太适合现在的岗位。公司决定跟你解除劳动关系。你写个辞职报告吧，这样对你下份工作的背调也好看一些。" },
      { role: "system", content: "🚨 警告：千万不要写辞职报告！主动辞职 = 放弃所有经济补偿。可以说「我不同意主动辞职。如果公司要解除劳动合同，请出具书面的解除通知和理由。」" },
      // 第2轮
      { role: "hr", content: "那你要是不配合的话，公司可能会给你调岗降薪。到时候你自己受不了也会走的。" },
      { role: "system", content: "🚨 注意：恶意调岗降薪是违法的，属于变相逼迫离职。可以说「未经我同意的调岗降薪，我有权不接受。如果公司单方面变更劳动合同，我会通过法律途径维权。」" },
      // 第3轮
      { role: "hr", content: "别那么较真。你看看同组的小王，人家很配合，现在已经找到新工作了。" },
      { role: "system", content: "💡 建议：这是用同事的例子来施加社会压力。每个人的情况不同，不要被别人的选择影响。可以说「别人的选择是别人的，我需要维护自己的合法权益。」" },
      // 第4轮
      { role: "hr", content: "我跟你说，公司法务也看过了，你这个岗位是可以取消的，不需要给2N。" },
      { role: "system", content: "🚨 注意：即使岗位取消，公司也不能随意解除劳动合同。根据《劳动合同法》第40条，经济性裁员需要：1.提前30天通知 2.向工会说明情况 3.支付经济补偿金。没有走这些程序就是违法解除。" },
      // 第5轮
      { role: "hr", content: "公司已经决定了，你不同意的话，那就按旷工处理。你明天开始就不用来了。" },
      { role: "system", content: "🚨 关键：千万不要不来上班！口头通知不上班不等于正式解除。如果你不来上班，公司反而可以按旷工解除劳动合同，这样你就真的拿不到赔偿了。一定要正常打卡上班！" },
      // 第6轮
      { role: "hr", content: "好吧，那你继续上班。不过从下周开始，你的工位会调整到仓库办公。" },
      { role: "system", content: "🚨 注意：这是典型的「穿小鞋」逼离职手段。记录下来，拍照保存证据。如果工作环境明显不适合办公（如没有电脑、网络等），可以作为公司违法变更劳动条件的证据。" },
      // 第7轮
      { role: "hr", content: "而且你接下来的工作内容也会调整一下，先做一些基础的行政工作吧。" },
      { role: "system", content: "🚨 注意：未经协商一致的岗位调整是违法的。可以说「我的劳动合同约定的岗位是XX，任何岗位变更需要双方协商一致。请出具书面的调岗通知和理由。」保存所有沟通记录。" },
      // 第8轮
      { role: "hr", content: "你要是觉得公司做得不对，你可以去告啊。走法律程序也行。" },
      { role: "system", content: "💡 建议：这其实是个好信号，说明HR知道公司的做法站不住脚。可以说「好的，如果协商无法达成一致，我会依法维权。」开始准备仲裁材料：劳动合同、工资流水、谈话录音、调岗通知等。" },
      // 第9轮
      { role: "hr", content: "算了，这样吧，公司可以给你N+1的补偿，你考虑一下？" },
      { role: "system", content: "💡 建议：公司态度软化了，但违法裁员应该是2N赔偿而非N+1。可以说「公司单方面违法解除劳动合同，依法应支付2N赔偿金。N+1是合法解除的标准。我希望公司能给出合理的方案。」" },
      // 第10轮
      { role: "hr", content: "你的要求我记下了，我需要跟领导再商量一下。你先正常工作，我们再联系。" },
      { role: "system", content: "💡 总结：1.全程录音已保存 ✓ 2.继续正常上班打卡 3.不签任何辞职文件 4.咨询劳动法律师 5.准备劳动仲裁材料（合同、工资流水、考勤记录、录音、调岗通知）6.向当地劳动监察大队举报。违法裁员赔偿标准是2N！" },
    ],
  },
};

// 轮次选项：每轮 = 1条HR + 1条建议，加上开头的场景描述
const roundOptions = [5, 8, 10] as const;

function getMessageLimit(rounds: number): number {
  // 第1轮有3条（system场景 + hr + system建议），之后每轮2条（hr + system建议）
  return 3 + (rounds - 1) * 2;
}

export default function AISimulation() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [selectedRounds, setSelectedRounds] = useState<number>(10);
  const [showDevToast, setShowDevToast] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const messageLimit = selectedScenario
    ? Math.min(getMessageLimit(selectedRounds), scenarios[selectedScenario].messages.length)
    : 0;

  useEffect(() => {
    if (selectedScenario && visibleCount < messageLimit) {
      const timer = setTimeout(() => {
        setVisibleCount((c) => c + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [selectedScenario, visibleCount, messageLimit]);

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

            {/* 轮次选择器 */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm text-gray-500">对话轮次：</span>
              <div className="flex gap-2">
                {roundOptions.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setSelectedRounds(r);
                      setVisibleCount(0);
                      setTimeout(() => setVisibleCount(1), 100);
                    }}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedRounds === r
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {r}轮
                  </button>
                ))}
              </div>
            </div>

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
                  .slice(0, Math.min(visibleCount, messageLimit))
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
