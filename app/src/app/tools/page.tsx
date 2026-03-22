import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "权益保障工具箱 - 赔偿计算、失业金、社保、法律援助",
  description:
    "免费裁员工具箱：赔偿计算器、失业金计算器、社保断缴影响查询、法律援助、仲裁指引。覆盖全国20+城市2026年最新数据。",
};

const calculatorTools = [
  {
    title: "裁员赔偿计算器",
    desc: "输入前12个月收入明细，精准计算N、N+1、2N赔偿金额。自动对比当地社平工资3倍上限，引导你选择适合自己的赔偿方案。",
    href: "/tools/severance",
    icon: "🧮",
    tag: "最常用",
    tagColor: "bg-accent/10 text-accent",
  },
  {
    title: "失业金计算器",
    desc: "覆盖全国20+城市2026年最新失业金标准。选择城市和缴费年限，预估每月领取金额和可领取时长。",
    href: "/tools/unemployment",
    icon: "💰",
    tag: "实用",
    tagColor: "bg-success/10 text-success",
  },
  {
    title: "社保断缴影响查询",
    desc: "裁员后社保断缴会影响什么？选择你所在城市，查看医保、购房、落户、购车、生育、养老全方位影响及应对方案。",
    href: "/tools/social-insurance",
    icon: "🛡️",
    tag: "必看",
    tagColor: "bg-danger/10 text-danger",
  },
];

const moreTools = [
  {
    title: "竞业限制评估",
    desc: "评估竞业限制协议是否合理。了解竞业补偿标准（月均工资30%）、限制期限、违约金合理性等。",
    href: "/guides/non-compete",
    icon: "📜",
    tag: "重要",
    tagColor: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "社保缴纳指南",
    desc: "离职后如何继续缴纳社保？灵活就业社保、城镇居民社保、代缴方式全解析，附各城市缴费参考。",
    href: "/tools/social-payment",
    icon: "🏥",
    tag: "必看",
    tagColor: "bg-green-100 text-green-700",
  },
];

const officialResources = [
  {
    title: "12333 劳动保障热线",
    desc: "全国人力资源和社会保障服务热线，免费咨询劳动权益、社保、失业金等问题。",
    icon: "📞",
    action: "拨打 12333",
    actionType: "phone" as const,
  },
  {
    title: "全国法律援助热线",
    desc: "免费法律咨询服务，经济困难的劳动者可申请免费法律援助代理。",
    icon: "⚖️",
    action: "拨打 12348",
    actionType: "phone" as const,
  },
  {
    title: "中国裁判文书网",
    desc: "查阅各地劳动争议判例，了解类似案例的判决结果，为仲裁和诉讼提供参考。",
    icon: "📋",
    action: "访问网站",
    actionType: "link" as const,
    href: "https://wenshu.court.gov.cn",
  },
  {
    title: "全国劳动仲裁委查询",
    desc: "查找你所在城市的劳动人事争议仲裁委员会地址和联系方式。",
    icon: "🏛️",
    action: "查询入口",
    actionType: "link" as const,
    href: "http://www.mohrss.gov.cn",
  },
  {
    title: "国家信访局网上投诉",
    desc: "当劳动仲裁和诉讼都无法解决问题时，可通过网上信访平台反映情况。",
    icon: "📝",
    action: "访问平台",
    actionType: "link" as const,
    href: "https://www.gjxfj.gov.cn",
  },
  {
    title: "工会法律服务",
    desc: "各地工会为会员提供免费法律咨询和援助，帮助维护劳动权益。",
    icon: "🤝",
    action: "联系当地工会",
    actionType: "info" as const,
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          权益保障工具箱
        </h1>
        <p className="mt-3 sm:mt-4 text-gray-500 text-center text-base sm:text-lg">
          用数据武装自己，合理维护你的合法权益
        </p>

        {/* 计算工具 */}
        <div className="mt-10 sm:mt-12 space-y-4 sm:space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>🔧</span> 计算工具
          </h2>
          {calculatorTools.map((tool) => (
            <Link key={tool.href + tool.title} href={tool.href} className="block">
              <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-100 card-hover">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">{tool.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-semibold">{tool.title}</h3>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tool.tagColor}`}>
                        {tool.tag}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
                    <div className="mt-3 text-accent text-sm font-medium">立即使用 →</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 更多权益工具 */}
        <div className="mt-10 sm:mt-12 space-y-4 sm:space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>📐</span> 更多权益工具
          </h2>
          {moreTools.map((tool, i) => (
            <Link key={i} href={tool.href} className="block">
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 card-hover">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="text-3xl sm:text-4xl flex-shrink-0">{tool.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-semibold">{tool.title}</h3>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${tool.tagColor}`}>
                        {tool.tag}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{tool.desc}</p>
                    <div className="mt-3 text-accent text-sm font-medium">了解更多 →</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 官方资源 */}
        <div className="mt-10 sm:mt-12 space-y-4 sm:space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>🏛️</span> 官方维权资源
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {officialResources.map((res, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100">
                <div className="text-2xl sm:text-3xl mb-3">{res.icon}</div>
                <h3 className="font-semibold text-base mb-1">{res.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3">{res.desc}</p>
                {res.actionType === 'link' ? (
                  <a
                    href={res.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent text-sm font-medium hover:underline"
                  >
                    {res.action} ↗
                  </a>
                ) : (
                  <span className="text-accent text-sm font-medium">{res.action}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 p-5 sm:p-6 bg-white rounded-2xl border border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            💡 所有工具均基于《劳动合同法》及各地最新政策数据，计算结果仅供参考。
          </p>
        </div>
      </div>
    </div>
  );
}
