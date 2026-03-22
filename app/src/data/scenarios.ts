export interface ResponseOption {
  id: string;
  text: string;
  feedback: string;
  score: number;
  nextStepId: string;
}

export interface DialogueStep {
  id: string;
  role: 'hr' | 'user' | 'system';
  message: string;
  options?: ResponseOption[];
  nextStepId?: string | null;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  estimatedTime: string;
  dialogues: DialogueStep[];
}

export const scenarios: Scenario[] = [
  {
    id: "scenario-1",
    title: "N赔偿谈判",
    description: "公司提出裁员，只愿意支付N赔偿。如何争取更好的条件？",
    difficulty: "easy",
    icon: "💬",
    estimatedTime: "5-10分钟",
    dialogues: [
      {
        id: "step-1",
        role: "hr",
        message: "你好，很遗憾地通知你，由于公司业务调整，你的岗位被裁撤了。公司决定给你N个月的工资作为经济补偿。",
        options: [
          {
            id: "opt-1-1",
            text: "好的，我接受",
            feedback: "太轻易接受了，可能错失争取更好条件的机会。N是法律规定的最低标准。",
            score: 30,
            nextStepId: "step-end-low",
          },
          {
            id: "opt-1-2",
            text: "我理解公司的困难，但希望了解具体原因和赔偿细节",
            feedback: "不错！既表现出理解，又要求了解详情。这是谈判的良好开端。",
            score: 70,
            nextStepId: "step-2",
          },
          {
            id: "opt-1-3",
            text: "根据《劳动合同法》，经济补偿金应该按我的实际工作年限和工资标准计算。请先说明我的N是多少",
            feedback: "很好！直接引用法律条款，表现出你的法律意识。但语气可以更柔和一些。",
            score: 90,
            nextStepId: "step-2-strong",
          },
        ],
      },
      {
        id: "step-2",
        role: "hr",
        message: "好的，你的N是6个月工资，按每月15000元计算，总计90000元。公司会在离职后7天内打款。",
        options: [
          {
            id: "opt-2-1",
            text: "好的，谢谢",
            feedback: "没有争取就接受了，建议至少要求了解是否有N+1的可能性。",
            score: 50,
            nextStepId: "step-end-medium",
          },
          {
            id: "opt-2-2",
            text: "我理解。不过根据我的情况，是否有N+1的可能性？比如代通知金？",
            feedback: "很好！主动提出N+1的可能性，这是合理的谈判策略。",
            score: 85,
            nextStepId: "step-3",
          },
          {
            id: "opt-2-3",
            text: "我需要考虑一下，能否给我几天时间？",
            feedback: "明智的做法！给自己留出时间思考和准备，而不是当场做决定。",
            score: 90,
            nextStepId: "step-end-high",
          },
        ],
      },
      {
        id: "step-3",
        role: "hr",
        message: "N+1的话，公司需要再考虑一下。你的工作年限是6年，确实可以申请代通知金。我们上报一下，尽快给你答复。",
        options: [
          {
            id: "opt-3-1",
            text: "好的，我等你们消息",
            feedback: "合理。等待公司的答复，同时可以准备其他谈判筹码。",
            score: 85,
            nextStepId: "step-end-high",
          },
          {
            id: "opt-3-2",
            text: "谢谢！另外，我还有一些年假未休，这个怎么算？",
            feedback: "非常好！提到了年假补偿，这是你的合法权益。",
            score: 95,
            nextStepId: "step-end-excellent",
          },
        ],
      },
      {
        id: "step-2-strong",
        role: "hr",
        message: "嗯，你了解得挺清楚的。确实，你的N是6个月工资，但公司现在的政策就是N。不过如果你有其他困难，我们可以商量。",
        options: [
          {
            id: "opt-2s-1",
            text: "没有困难，就这样吧",
            feedback: "太可惜了！已经掌握主动权，却放弃了争取的机会。",
            score: 40,
            nextStepId: "step-end-low",
          },
          {
            id: "opt-2s-2",
            text: "根据法律规定，裁员未提前通知应该支付代通知金N+1。而且我还有未休年假",
            feedback: "很好！明确提出了N+1和年假，维护自己的合法权益。",
            score: 95,
            nextStepId: "step-end-excellent",
          },
        ],
      },
      {
        id: "step-end-low",
        role: "system",
        message: "谈判结束。你获得的赔偿：N",
        nextStepId: null,
      },
      {
        id: "step-end-medium",
        role: "system",
        message: "谈判结束。你获得的赔偿：N（建议下次争取更好的条件）",
        nextStepId: null,
      },
      {
        id: "step-end-high",
        role: "system",
        message: "谈判结束。你获得的赔偿：N + 代通知金",
        nextStepId: null,
      },
      {
        id: "step-end-excellent",
        role: "system",
        message: "谈判结束！你获得的赔偿：N + 代通知金 + 年假补偿。谈判非常成功！",
        nextStepId: null,
      },
    ],
  },
  {
    id: "scenario-2",
    title: "违法裁员维权",
    description: "公司没有合法理由就裁员，而且没有提前通知。如何维护自己的权益？",
    difficulty: "medium",
    icon: "⚖️",
    estimatedTime: "8-15分钟",
    dialogues: [
      {
        id: "step-1",
        role: "hr",
        message: "今天是你最后一天工作日，收拾一下东西明天就不用来了。公司给你N的赔偿，签字就可以走了。",
        options: [
          {
            id: "opt-2-1-1",
            text: "好的，我签",
            feedback: "太危险了！没有弄清楚情况就签字，可能放弃了2N赔偿的权利。",
            score: 10,
            nextStepId: "step-end-danger",
          },
          {
            id: "opt-2-1-2",
            text: "等一下，我没有收到任何书面通知，这是什么情况？",
            feedback: "很好！要求书面通知，这是你的合法权益。不要在情况不明确时签字。",
            score: 85,
            nextStepId: "step-2",
          },
          {
            id: "opt-2-1-3",
            text: "我需要先咨询一下律师，不能现在签",
            feedback: "明智的决定！在不确定的情况下，寻求专业帮助是最好的选择。",
            score: 90,
            nextStepId: "step-3-lawyer",
          },
        ],
      },
      {
        id: "step-2",
        role: "hr",
        message: "这就是公司的决定。你如果不签，公司就一分钱都不给了。",
        options: [
          {
            id: "opt-2-2-1",
            text: "那我还是签吧",
            feedback: "被威胁了！这是典型的违法行为，你应该维护自己的权益。",
            score: 20,
            nextStepId: "step-end-bad",
          },
          {
            id: "opt-2-2-2",
            text: "根据《劳动合同法》，违法解除劳动合同应该支付2N赔偿。而且你们没有提前30天通知",
            feedback: "非常好！明确引用法律条款，指出了公司的违法行为。",
            score: 95,
            nextStepId: "step-4-claim",
          },
        ],
      },
      {
        id: "step-3-lawyer",
        role: "hr",
        message: "你要找律师？那律师费得你自己出，公司不会报销的。不如现在签了算了，还能拿点钱。",
        options: [
          {
            id: "opt-3-1",
            text: "好吧，那我先签",
            feedback: "太可惜了！已经决定要咨询律师，却被HR说动了。",
            score: 30,
            nextStepId: "step-end-medium",
          },
          {
            id: "opt-3-2",
            text: "我还是需要先了解我的权利。法律援助中心提供免费咨询，我会先去问问",
            feedback: "很好！提到了法律援助，这是明智的选择。",
            score: 90,
            nextStepId: "step-4-claim",
          },
        ],
      },
      {
        id: "step-4-claim",
        role: "hr",
        message: "你这样很麻烦啊。要不这样，公司给你N+1，你签了吧。",
        options: [
          {
            id: "opt-4-1",
            text: "N+1可以接受",
            feedback: "虽然争取到了N+1，但如果公司确实是违法裁员，你应该坚持2N。",
            score: 70,
            nextStepId: "step-end-2n1",
          },
          {
            id: "opt-4-2",
            text: "我考虑一下。但我还是想了解2N赔偿的可能性",
            feedback: "坚持自己的立场！继续争取2N赔偿，这是你的合法权益。",
            score: 95,
            nextStepId: "step-end-2n",
          },
        ],
      },
      {
        id: "step-end-danger",
        role: "system",
        message: "⚠️ 警告：你在没有了解清楚情况就签字了，可能放弃了重要的权利！建议咨询律师确认。",
        nextStepId: null,
      },
      {
        id: "step-end-bad",
        role: "system",
        message: "谈判结束。你获得了N赔偿。但公司可能存在违法行为，建议咨询律师。",
        nextStepId: null,
      },
      {
        id: "step-end-medium",
        role: "system",
        message: "谈判结束。你获得了N赔偿。建议下次遇到这种情况时，坚持咨询专业人士。",
        nextStepId: null,
      },
      {
        id: "step-end-2n1",
        role: "system",
        message: "谈判结束。你获得了N+1赔偿。不错的结果！但继续争取2N可能更好。",
        nextStepId: null,
      },
      {
        id: "step-end-2n",
        role: "system",
        message: "谈判结束！你坚持维护了自己的权益，获得了2N赔偿。维权成功！🎉",
        nextStepId: null,
      },
    ],
  },
  {
    id: "scenario-3",
    title: "多轮谈判博弈",
    description: "更复杂的谈判场景，涉及多种情况和策略。适合有经验的用户挑战。",
    difficulty: "hard",
    icon: "🎯",
    estimatedTime: "15-20分钟",
    dialogues: [
      {
        id: "step-1",
        role: "hr",
        message: "公司决定裁员，给你N的赔偿。但考虑到你在公司的时间，我们愿意给你一个选择：要么签协议拿N，要么公司给你安排转岗，但薪资要降20%。",
        options: [
          {
            id: "opt-3-1-1",
            text: "我选N赔偿",
            feedback: "太直接了！没有考虑其他选项和谈判空间。",
            score: 40,
            nextStepId: "step-2a",
          },
          {
            id: "opt-3-1-2",
            text: "转岗的岗位是什么？薪资降低20%具体是多少？",
            feedback: "很好！先了解细节，这是谈判的基础。",
            score: 80,
            nextStepId: "step-2b",
          },
          {
            id: "opt-3-1-3",
            text: "我需要时间考虑这两个选项。另外，还有其他补偿方案吗？",
            feedback: "非常好！给自己留出时间，同时探索更多可能性。",
            score: 90,
            nextStepId: "step-2c",
          },
        ],
      },
      {
        id: "step-2a",
        role: "hr",
        message: "好的，那我们按N赔偿来办理。这是协议，请签字。",
        options: [
          {
            id: "opt-3-2a-1",
            text: "签了",
            feedback: "没有争取就放弃了，建议重新思考你的选择。",
            score: 30,
            nextStepId: "step-end-low",
          },
          {
            id: "opt-3-2a-2",
            text: "等等，我还没考虑清楚。能给我几天时间吗？",
            feedback: "很好！给自己时间思考，不要在压力下做决定。",
            score: 85,
            nextStepId: "step-3-delay",
          },
        ],
      },
      {
        id: "step-2b",
        role: "hr",
        message: "转岗到客服部，工作内容类似，但需要接受轮班。你的薪资会从15000降到12000。但如果你在3个月内表现好，有机会恢复原薪资。",
        options: [
          {
            id: "opt-3-2b-1",
            text: "我接受转岗",
            feedback: "转岗可能带来新的挑战，但薪资降低20%是不小的损失。",
            score: 60,
            nextStepId: "step-end-transfer",
          },
          {
            id: "opt-3-2b-2",
            text: "我理解公司的考虑。但我觉得N+1的赔偿可能更适合我。能谈谈这个吗？",
            feedback: "很好！提出了自己的需求，同时保持谈判的开放性。",
            score: 90,
            nextStepId: "step-3-n1",
          },
        ],
      },
      {
        id: "step-2c",
        role: "hr",
        message: "当然，除了N和转岗，我们还可以考虑N+1，或者给你更长的离职缓冲期（带薪留职2个月）。你想了解更多吗？",
        options: [
          {
            id: "opt-3-2c-1",
            text: "请详细说明所有选项",
            feedback: "非常好！全面了解所有选项后，才能做出最优选择。",
            score: 95,
            nextStepId: "step-3-options",
          },
          {
            id: "opt-3-2c-2",
            text: "N+1听起来不错",
            feedback: "不错，但也应该了解其他选项，确保不会错过更好的机会。",
            score: 80,
            nextStepId: "step-3-n1",
          },
        ],
      },
      {
        id: "step-3-options",
        role: "hr",
        message: "好的，让我详细说明：1. N赔偿：90000元，离职当天结算；2. N+1：105000元，同样当天结算；3. 带薪留职：2个月全额工资，期间可以找新工作，但需配合交接。你选哪个？",
        options: [
          {
            id: "opt-3-3-1",
            text: "我选N+1",
            feedback: "明智的选择！N+1是最直接、最安全的选项。",
            score: 90,
            nextStepId: "step-end-n1-good",
          },
          {
            id: "opt-3-3-2",
            text: "带薪留职2个月，这期间我找新工作",
            feedback: "很有想法！带薪留职给你更多时间和机会，但需要注意交接义务。",
            score: 95,
            nextStepId: "step-end-pay-leave",
          },
          {
            id: "opt-3-3-3",
            text: "我需要和家人商量一下",
            feedback: "很好！重要决定需要和家人商量，这是负责任的态度。",
            score: 90,
            nextStepId: "step-end-decision",
          },
        ],
      },
      {
        id: "step-3-delay",
        role: "hr",
        message: "可以，给你3天时间考虑。但你要知道，这个offer是有期限的。",
        options: [
          {
            id: "opt-3-3d-1",
            text: "好的，3天足够了",
            feedback: "很好！利用这3天做好充分的准备和调研。",
            score: 90,
            nextStepId: "step-end-decision",
          },
        ],
      },
      {
        id: "step-3-n1",
        role: "hr",
        message: "N+1可以，但我们需要你签署保密协议，不透露任何关于公司的信息。可以接受吗？",
        options: [
          {
            id: "opt-3-3n1-1",
            text: "可以，我签",
            feedback: "保密协议是常见的，但要确保不违反你的合法权益。",
            score: 80,
            nextStepId: "step-end-n1-nda",
          },
          {
            id: "opt-3-3n1-2",
            text: "我需要先看一下保密协议的内容",
            feedback: "非常好！永远不要在没看清楚条款的情况下签字。",
            score: 95,
            nextStepId: "step-end-review",
          },
        ],
      },
      {
        id: "step-end-low",
        role: "system",
        message: "谈判结束。你获得了N赔偿。建议下次更主动地争取更好的条件。",
        nextStepId: null,
      },
      {
        id: "step-end-transfer",
        role: "system",
        message: "谈判结束。你选择了转岗。希望新岗位能给你带来新的机会。",
        nextStepId: null,
      },
      {
        id: "step-end-n1",
        role: "system",
        message: "谈判结束。你获得了N+1赔偿。不错的结果！",
        nextStepId: null,
      },
      {
        id: "step-end-n1-good",
        role: "system",
        message: "谈判结束！你获得了N+1赔偿。这是明智的选择！🎉",
        nextStepId: null,
      },
      {
        id: "step-end-pay-leave",
        role: "system",
        message: "谈判结束！你获得了2个月带薪留职的机会。这给你更多时间准备下一步！🎉",
        nextStepId: null,
      },
      {
        id: "step-end-decision",
        role: "system",
        message: "谈判结束。你要求时间考虑，这是明智的做法。给自己留出思考和准备的空间。",
        nextStepId: null,
      },
      {
        id: "step-end-n1-nda",
        role: "system",
        message: "谈判结束。你获得了N+1赔偿，但签署了保密协议。请确保你了解协议的所有条款。",
        nextStepId: null,
      },
      {
        id: "step-end-review",
        role: "system",
        message: "谈判结束。你要求查看保密协议的内容，这是非常正确的做法！永远不要在没看清条款的情况下签字。🎉",
        nextStepId: null,
      },
    ],
  },
  {
    id: "scenario-4",
    title: "社保公积金维权",
    description: "被裁后发现公司一直按最低基数缴纳社保，如何追回差额？",
    difficulty: "medium",
    icon: "🛡️",
    estimatedTime: "5-8分钟",
    dialogues: [
      {
        id: "s4-1",
        role: "hr",
        message: "你的离职手续已经办好了，社保会缴到这个月月底。这是你的离职证明。",
        options: [
          {
            id: "s4-1-1",
            text: "好的，谢谢",
            feedback: "先别急着走！你应该核实社保缴纳基数是否正确。很多公司会按最低基数而非实际工资缴纳。",
            score: 20,
            nextStepId: "s4-end-low",
          },
          {
            id: "s4-1-2",
            text: "我想确认一下社保缴纳基数，能帮我查一下吗？",
            feedback: "很好！主动核实社保缴纳情况。如果公司长期按最低基数缴纳，你有权要求补缴差额。",
            score: 80,
            nextStepId: "s4-2",
          },
        ],
      },
      {
        id: "s4-2",
        role: "hr",
        message: "社保都是按公司统一标准缴的，没什么问题。你放心吧。",
        options: [
          {
            id: "s4-2-1",
            text: "公司统一标准是按实际工资缴纳的吗？我工资15000，但社保缴费基数好像只有5000多",
            feedback: "精准追问！社保应按实际工资缴纳。如果工资15000但基数只有5000，公司涉嫌违规。",
            score: 90,
            nextStepId: "s4-3",
          },
          {
            id: "s4-2-2",
            text: "那就算了吧",
            feedback: "放弃了可能的权益。社保基数差额直接影响你的养老金、医保报销和公积金贷款额度。",
            score: 20,
            nextStepId: "s4-end-low",
          },
        ],
      },
      {
        id: "s4-3",
        role: "hr",
        message: "这个...是公司的统一做法。你要是有异议的话，可以自己去社保局查询。",
        options: [
          {
            id: "s4-3-1",
            text: "好的，我会去社保局核实。如果确实存在少缴情况，公司需要补缴差额，这是法律规定的",
            feedback: "非常好！你有权向社保局投诉要求公司补缴。社保局会强制要求公司补缴差额及滞纳金。",
            score: 90,
            nextStepId: "s4-4",
          },
          {
            id: "s4-3-2",
            text: "这是不是行业普遍现象？",
            feedback: "虽然确实很普遍，但不代表合法。《社会保险法》明确规定应按实际工资缴纳。",
            score: 50,
            nextStepId: "s4-4",
          },
        ],
      },
      {
        id: "s4-4",
        role: "hr",
        message: "你真的要这么做吗？补缴的话公司需要补，你个人部分也需要补缴一部分的。",
        options: [
          {
            id: "s4-4-1",
            text: "我个人部分可以补，但公司部分也必须补。而且公积金也需要按实际工资基数补缴",
            feedback: "完全正确！社保和公积金都应按实际工资缴纳。公积金投诉可找住房公积金管理中心。🎉",
            score: 90,
            nextStepId: "s4-end-high",
          },
          {
            id: "s4-4-2",
            text: "那算了，不想麻烦了",
            feedback: "这会让你损失不少。以15000工资算，按5000基数缴纳可能让你少拿几万甚至十几万的养老金和公积金。",
            score: 20,
            nextStepId: "s4-end-low",
          },
        ],
      },
      {
        id: "s4-end-high",
        role: "system",
        message: "恭喜！你成功维护了社保公积金权益。下一步：1. 去社保局打印缴费明细 2. 对比工资流水 3. 向社保局投诉 4. 向公积金中心投诉。记住保留工资条、银行流水等证据。🎉",
        nextStepId: null,
      },
      {
        id: "s4-end-low",
        role: "system",
        message: "你放弃了追回社保差额的机会。建议：离职后仍可在2年内向社保局投诉要求补缴。保留好工资流水和劳动合同。",
        nextStepId: null,
      },
    ],
  },
  {
    id: "scenario-5",
    title: "竞业限制谈判",
    description: "公司要求签竞业协议，补偿金只有30%，如何评估和谈判？",
    difficulty: "hard",
    icon: "📜",
    estimatedTime: "8-12分钟",
    dialogues: [
      {
        id: "s5-1",
        role: "hr",
        message: "还有一件事，公司需要你签署竞业限制协议。限制期12个月，期间公司每月支付你离职前工资的30%作为竞业补偿。",
        options: [
          {
            id: "s5-1-1",
            text: "好的，我签",
            feedback: "太草率了！竞业限制会严重限制你的就业选择。30%虽然是法律最低标准，但你可以谈判更高的补偿。",
            score: 20,
            nextStepId: "s5-end-low",
          },
          {
            id: "s5-1-2",
            text: "我需要看一下协议的具体内容，包括限制范围和竞争企业清单",
            feedback: "非常好！竞业限制的范围、地域、期限都需要合理，不能过于宽泛。",
            score: 80,
            nextStepId: "s5-2",
          },
          {
            id: "s5-1-3",
            text: "我不想签竞业协议，可以拒绝吗？",
            feedback: "如果劳动合同中没有竞业限制条款，你确实可以拒绝。但如果合同已有约定，需要看具体条款。",
            score: 60,
            nextStepId: "s5-2b",
          },
        ],
      },
      {
        id: "s5-2",
        role: "hr",
        message: "协议里列了同行业所有主要公司都不能去，包括BAT、字节、美团等。限制范围是全国。",
        options: [
          {
            id: "s5-2-1",
            text: "这个范围太宽了。竞业限制应该限定在与我岗位直接竞争的业务领域，不能把整个行业都限制住",
            feedback: "说得对！过于宽泛的竞业限制可能被认定为无效。你可以要求缩小范围到直接竞争业务。",
            score: 90,
            nextStepId: "s5-3",
          },
          {
            id: "s5-2-2",
            text: "那我12个月不能去这些公司了？",
            feedback: "你还可以谈判。建议：1.缩小限制范围 2.缩短限制期 3.提高补偿金比例。",
            score: 40,
            nextStepId: "s5-3",
          },
        ],
      },
      {
        id: "s5-2b",
        role: "hr",
        message: "你的劳动合同里有竞业限制条款，所以这是约定好的义务。",
        options: [
          {
            id: "s5-2b-1",
            text: "合同有约定我理解，但具体的竞业协议内容需要重新协商，包括限制范围和补偿标准",
            feedback: "好的策略。即使合同有约定，具体执行协议的内容仍可协商。",
            score: 70,
            nextStepId: "s5-3",
          },
        ],
      },
      {
        id: "s5-3",
        role: "hr",
        message: "范围可以稍微调整，但30%的补偿是公司的统一标准。",
        options: [
          {
            id: "s5-3-1",
            text: "30%是法定最低标准。考虑到限制范围较广，我希望补偿能提高到50%以上，否则我可能需要申请仲裁确认竞业协议的合理性",
            feedback: "谈判得很好！引用法律标准并提出合理诉求。如果公司3个月不支付补偿金，你可以自动解除竞业限制。🎉",
            score: 90,
            nextStepId: "s5-end-high",
          },
          {
            id: "s5-3-2",
            text: "30%太少了，能不能多一点？",
            feedback: "方向对但力度不够。建议明确你的期望数字，并说明理由（限制范围广、影响就业等）。",
            score: 50,
            nextStepId: "s5-end-mid",
          },
        ],
      },
      {
        id: "s5-end-high",
        role: "system",
        message: "出色的谈判！记住：1.竞业限制最长不超过2年 2.公司连续3个月不付补偿金可自动解除 3.违约金应合理（不能过高）4.保留所有沟通记录。🎉",
        nextStepId: null,
      },
      {
        id: "s5-end-mid",
        role: "system",
        message: "谈判还行，但可以更强硬。建议继续协商或咨询律师评估竞业协议的合理性。记住：不合理的竞业限制可申请仲裁认定无效。",
        nextStepId: null,
      },
      {
        id: "s5-end-low",
        role: "system",
        message: "你接受了竞业限制。注意：如果公司不按时支付补偿金，你可以解除竞业限制。保留好协议原件和补偿金发放记录。",
        nextStepId: null,
      },
    ],
  },
];
