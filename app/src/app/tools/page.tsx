import { Metadata } from "next";
import Link from "next/link";
import { cityPolicies } from "@/data/cityPolicies";

export const metadata: Metadata = {
  title: "权益保障工具箱 - 赔偿计算、失业金、社保、法律援助",
  description:
    "免费被裁维权工具箱：赔偿计算器、失业金计算器、社保断缴影响查询、法律援助、仲裁指引。覆盖全国20+城市2026年最新数据。",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "权益保障工具箱 - 赔偿计算、失业金、社保、法律援助",
    description:
      "免费被裁维权工具箱：赔偿计算器、失业金计算器、社保断缴影响查询、法律援助、仲裁指引。覆盖全国20+城市2026年最新数据。",
    url: "https://caileme.team/tools",
  },
};

const calculatorTools = [
  {
    title: "被裁赔偿计算器",
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
    desc: "被裁后社保断缴会影响什么？选择你所在城市，查看医保、购房、落户、购车、生育、养老全方位影响及应对方案。",
    href: "/tools/social-insurance",
    icon: "🛡️",
    tag: "必看",
    tagColor: "bg-danger/10 text-danger",
  },
];

const moreTools = [
  {
    title: "维权进度追踪",
    desc: "从收到通知到再就业的全程检查清单。勾选已完成步骤，记录笔记。数据保存在浏览器本地，完全隐私。",
    href: "/layoff-tracker",
    icon: "📋",
    tag: "实用",
    tagColor: "bg-purple-100 text-purple-700",
  },
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

const featuredCityCodes = new Set([
  "beijing",
  "shanghai",
  "guangzhou",
  "shenzhen",
  "hangzhou",
  "chengdu",
  "wuhan",
  "nanjing",
]);

const featuredCities = cityPolicies.filter((city) => featuredCityCodes.has(city.code));

const legalResources = [
  {
    title: "12348 法律援助热线",
    desc: "全国免费法律咨询热线，经济困难者可申请免费律师代理",
    icon: "⚖️",
    action: "拨打 12348",
    actionType: "phone" as const,
  },
  {
    title: "12333 劳动保障热线",
    desc: "全国统一服务热线，免费咨询劳动权益、社保、失业金等",
    icon: "📞",
    action: "拨打 12333",
    actionType: "phone" as const,
  },
  {
    title: "12351 工会维权热线",
    desc: "各地工会免费提供劳动争议法律咨询和代理服务",
    icon: "🤝",
    action: "拨打 12351",
    actionType: "phone" as const,
  },
  {
    title: "法律援助中心",
    desc: "各地司法局设立的法律援助机构，免费法律服务",
    icon: "🏛️",
    action: "访问网站",
    actionType: "link" as const,
    href: "https://www.12348.gov.cn",
  },
  {
    title: "劳动仲裁（免费）",
    desc: "劳动仲裁完全免费，不需要律师也可以自己申请",
    icon: "📋",
    action: "查看指南",
    actionType: "internal" as const,
    href: "/guides/arbitration",
  },
  {
    title: "中国裁判文书网",
    desc: "查阅劳动争议判例，了解类似案件判决结果",
    icon: "📖",
    action: "访问网站",
    actionType: "link" as const,
    href: "https://wenshu.court.gov.cn",
  },
  {
    title: "全国劳动仲裁委查询",
    desc: "查找你所在城市的劳动仲裁委地址和联系方式",
    icon: "🏢",
    action: "查询入口",
    actionType: "link" as const,
    href: "http://www.mohrss.gov.cn",
  },
  {
    title: "劳动法全文查询",
    desc: "《劳动合同法》《劳动法》等法律法规全文在线查阅",
    icon: "📖",
    action: "查看法律",
    actionType: "link" as const,
    href: "https://flk.npc.gov.cn",
  },
  {
    title: "全国社保查询平台",
    desc: "国家社会保险公共服务平台，查询个人社保缴费记录",
    icon: "🔍",
    action: "查询社保",
    actionType: "link" as const,
    href: "http://si.12333.gov.cn",
  },
  {
    title: "国家信访局投诉平台",
    desc: "劳动仲裁和诉讼都无法解决时的最后申诉渠道",
    icon: "📝",
    action: "访问平台",
    actionType: "link" as const,
    href: "https://www.gjxfj.gov.cn",
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
        <div className="mt-10 sm:mt-12">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>🔧</span> 计算工具
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>

        {/* 更多权益工具 */}
        <div className="mt-10 sm:mt-12">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>📐</span> 更多权益工具
          </h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>

        <div className="mt-10 sm:mt-12">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <span>🏙️</span> 热门城市政策专题
            </h2>
            <Link href="/cities" className="text-sm text-accent hover:underline">
              查看全部城市 →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {featuredCities.map((city) => (
              <Link
                key={city.code}
                href={`/cities/${city.code}`}
                className="block bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="font-semibold text-sm">{city.name}</div>
                <div className="mt-2 text-xs text-gray-500">
                  失业金约 {city.unemploymentBase} 元/月
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  赔偿封顶基数 {city.avgSalary3x} 元
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 免费法律援助 & 官方资源 */}
        <div className="mt-10 sm:mt-12">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <span>⚖️</span> 免费法律援助 &amp; 官方资源
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {legalResources.map((res, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="text-2xl mb-2">{res.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{res.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-2">{res.desc}</p>
                {res.actionType === 'link' ? (
                  <a href={res.href} target="_blank" rel="noopener noreferrer" className="text-accent text-xs font-medium hover:underline">{res.action} ↗</a>
                ) : res.actionType === 'internal' ? (
                  <Link href={res.href!} className="text-accent text-xs font-medium hover:underline">{res.action} →</Link>
                ) : (
                  <span className="text-accent text-xs font-medium">{res.action}</span>
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
