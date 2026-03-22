export interface Step {
  id: string;
  title: string;
  description: string;
  tips: string[];
  icon: string;
  category: "preparation" | "negotiation" | "process" | "aftercare";
  order: number;
  link?: { href: string; label: string };
  checkItems?: string[];
}

export const layoffSteps: Step[] = [
  {
    id: "notice",
    title: "收到通知",
    description: "确认裁员通知的形式和时间",
    tips: [
      "要求公司出具书面裁员通知（加盖公章）",
      "不要随意签署任何文件，先拍照留存",
      "确认裁员理由是否符合法律规定",
      "记录沟通时间、地点、参与人员",
    ],
    icon: "📋",
    category: "preparation",
    order: 1,
    checkItems: ["已收到书面裁员通知（加盖公章）", "已拍照保存通知内容", "已记录谈话时间和参与人员", "确认裁员理由是否合法"],
  },
  {
    id: "rights",
    title: "了解权益",
    description: "查询法律条款和赔偿标准",
    tips: [
      "使用本站赔偿计算器估算应得赔偿",
      "了解N、N+1、2N的区别和适用情况",
      "确认是否有违法裁员嫌疑",
      "咨询专业人士或查看维权指南",
    ],
    icon: "📚",
    category: "preparation",
    order: 2,
    link: { href: "/guides", label: "查看维权百科" },
    checkItems: ["已使用赔偿计算器估算金额", "已了解N/N+1/2N区别", "确认是否存在违法裁员情况"],
  },
  {
    id: "evidence",
    title: "收集证据",
    description: "保存工作记录和沟通记录",
    tips: [
      "保留劳动合同、工资条、考勤记录",
      "保存与HR/管理层的沟通记录（聊天记录、邮件）",
      "如有必要，进行合法录音（需符合法律规定）",
      "整理工作成果、项目证明等材料",
    ],
    icon: "📁",
    category: "preparation",
    order: 3,
    checkItems: ["已保存劳动合同复印件", "已保存近12个月工资条/银行流水", "已保存绩效考核记录", "已保存与HR/管理层沟通记录", "已保存考勤记录"],
  },
  {
    id: "negotiate",
    title: "沟通谈判",
    description: "与公司HR/管理层协商",
    tips: [
      "保持冷静，理性表达诉求",
      "明确要求合理的赔偿方案",
      "可以要求使用AI模拟功能练习谈判",
      "不要被威胁，了解自己的底线",
      "谈判过程可以录音（告知对方）",
    ],
    icon: "💬",
    category: "negotiation",
    order: 4,
    checkItems: ["已明确赔偿诉求底线", "谈判过程已录音", "未签署任何文件", "已记录公司提出的方案"],
  },
  {
    id: "calculate",
    title: "计算赔偿",
    description: "使用计算器获得准确数据",
    tips: [
      "仔细核对收入数据（工资、奖金、补贴等）",
      "确认工作年限计算方式",
      "了解年假补偿的计算",
      "注意个税影响",
    ],
    icon: "🧮",
    category: "negotiation",
    order: 5,
    link: { href: "/tools/severance", label: "打开赔偿计算器" },
    checkItems: ["已核对月均工资（含奖金补贴）", "已确认工作年限", "已计算未休年假天数", "已了解个税影响"],
  },
  {
    id: "sign",
    title: "签署协议",
    description: "审核并签署离职协议",
    tips: [
      "仔细阅读协议条款，特别是赔偿金额",
      "确认离职原因、离职时间",
      "注意是否有竞业限制条款",
      "保留一份签署好的协议副本",
      "如有疑问，咨询法律专业人士",
    ],
    icon: "✍️",
    category: "process",
    order: 6,
    link: { href: "/guides/non-compete", label: "了解竞业限制" },
    checkItems: ["已仔细阅读协议全部条款", "确认赔偿金额正确", "确认离职原因表述", "确认竞业限制条款", "已保留签署好的协议副本"],
  },
  {
    id: "procedures",
    title: "办理手续",
    description: "社保转移、失业登记等",
    tips: [
      "领取离职证明（必须）",
      "办理社保转移或封存手续",
      "提取住房公积金（如符合条件）",
      "进行失业登记（申请失业金必需）",
      "处理好公司物品交接",
    ],
    icon: "📋",
    category: "process",
    order: 7,
    link: { href: "/tools/social-insurance", label: "查看社保断缴影响" },
    checkItems: ["已领取离职证明", "已办理社保转移/封存", "已办理公积金提取或转移", "已办理失业登记", "已完成工作交接"],
  },
  {
    id: "unemployment",
    title: "领取失业金",
    description: "申请失业保险金",
    tips: [
      "确保已办理失业登记",
      "准备好身份证、离职证明、银行卡",
      "使用本站失业金计算器查询可领金额",
      "了解领取期限和发放方式",
      "每月定期进行资格认证",
    ],
    icon: "💰",
    category: "aftercare",
    order: 8,
    link: { href: "/tools/unemployment", label: "打开失业金计算器" },
    checkItems: ["已办理失业登记", "已准备好所需材料", "已提交失业金申请", "已了解领取期限和认证要求"],
  },
  {
    id: "prepare",
    title: "求职准备",
    description: "简历优化、面试准备",
    tips: [
      "更新简历，突出最新工作经验",
      "准备常见的面试问题",
      "整理项目经验和技能",
      "关注行业招聘信息",
      "可以考虑自由职业或创业",
    ],
    icon: "📄",
    category: "aftercare",
    order: 9,
    checkItems: ["已更新简历", "已准备面试问题", "已整理项目经验", "已开通招聘平台账号"],
  },
  {
    id: "reemployment",
    title: "再就业",
    description: "找到新工作，开启新篇章",
    tips: [
      "不要急于接受低于预期的offer",
      "了解新公司的背景和口碑",
      "确认新offer的薪酬福利",
      "注意社保连续性问题",
      "保持积极心态，相信自己",
    ],
    icon: "🚀",
    category: "aftercare",
    order: 10,
    checkItems: ["已确认新offer薪酬福利", "已了解新公司背景", "已确认社保连续性"],
  },
];

export const stepCategories = [
  { id: "all", label: "全部步骤", icon: "📋" },
  { id: "preparation", label: "准备阶段", icon: "🛠️" },
  { id: "negotiation", label: "谈判阶段", icon: "💬" },
  { id: "process", label: "办理阶段", icon: "📝" },
  { id: "aftercare", label: "后续阶段", icon: "🌱" },
];
