import Link from "next/link";
import dynamic from "next/dynamic";
import { FadeInSection } from "@/components/FadeInSection";

const ScrollingAvatars = dynamic(() => import("@/components/ScrollingAvatars"), {
  loading: () => <div className="h-20" />,
});

const tools = [
  {
    title: "赔偿计算器",
    desc: "输入收入明细，精准计算N、N+1、2N裁员赔偿金额，自动对比社平工资上限。",
    href: "/tools/severance",
    icon: "🧮",
  },
  {
    title: "失业金计算器",
    desc: "覆盖全国20+城市2026年最新标准，预估每月领取金额和时长。",
    href: "/tools/unemployment",
    icon: "💰",
  },
  {
    title: "社保断缴影响",
    desc: "了解社保断缴对医保、购房、落户、购车的影响及应对方案。",
    href: "/tools/social-insurance",
    icon: "🛡️",
  },
];

const guides = [
  {
    title: "被裁当天怎么办",
    desc: "收到被裁通知后的第一步该做什么？完整行动清单。",
    href: "/guides/layoff-day",
  },
  {
    title: "被裁谈判技巧",
    desc: "如何跟HR谈判争取更好的赔偿方案？",
    href: "/guides/negotiation",
  },
  {
    title: "仲裁流程指南",
    desc: "从申请到开庭，劳动仲裁全流程详解。",
    href: "/guides/arbitration",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section — CSS animations, no JS library needed */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-black/5 text-sm text-gray-600 animate-fade-up">
            🛡️ 打工人的权益保障平台
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight text-gray-900 animate-fade-up-delay-1">
            知道权利 才能守住权利
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-400">
              每个打工人都值得被认真对待
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto animate-fade-up-delay-2">
            赔偿计算 · 权益指南 · 谈判模拟 · 被裁情报
            <br />
            一个平台，全部搞定
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
            <Link
              href="/tools/severance"
              className="bg-black text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
            >
              计算我的赔偿
            </Link>
            <Link
              href="/ai-simulation"
              className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-50 transition-colors"
            >
              🤖 AI裁员模拟
            </Link>
            <Link
              href="/guides"
              className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-50 transition-colors"
            >
              查看维权指南
            </Link>
          </div>
        </div>
      </section>

      {/* 投稿人/贡献者滚动展示 — lazy loaded */}
      <section className="py-10 md:py-14 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">感谢每一位贡献者</h3>
          </div>
          <ScrollingAvatars />
        </div>
      </section>

      {/* Tools Section — fade in on scroll via CSS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">权益保障工具箱</h2>
            <p className="mt-4 text-gray-500 text-base sm:text-lg">
              用数据武装自己，合理维护你的合法权益
            </p>
          </FadeInSection>

          <FadeInSection stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="block h-full">
                  <div className="h-full p-6 sm:p-8 rounded-2xl bg-surface border border-gray-100 card-hover">
                    <div className="text-3xl sm:text-4xl mb-4">{tool.icon}</div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{tool.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {tool.desc}
                    </p>
                    <div className="mt-4 text-accent text-sm font-medium">
                      立即使用 →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeInSection>

          <div className="text-center mt-8">
            <Link
              href="/tools"
              className="inline-block text-accent font-medium hover:underline"
            >
              查看全部工具 →
            </Link>
          </div>
        </div>
      </section>

      {/* AI Simulation Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <FadeInSection>
            <div className="text-4xl sm:text-5xl mb-6">🤖</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">AI 被裁模拟</h2>
            <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              模拟被裁谈话场景，提前练习应对策略。
              <br />
              知己知彼，谈判不慌。
            </p>
            <Link
              href="/ai-simulation"
              className="inline-block mt-8 bg-white text-black px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              开始模拟
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">实用指南</h2>
            <p className="mt-4 text-gray-500 text-base sm:text-lg">
              从被裁到再出发，每一步都有指导
            </p>
          </FadeInSection>

          <FadeInSection stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {guides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="block h-full">
                  <div className="h-full p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 card-hover">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">
                      {guide.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {guide.desc}
                    </p>
                    <div className="mt-4 text-accent text-sm font-medium">
                      阅读全文 →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeInSection>

          <div className="text-center mt-10">
            <Link
              href="/guides"
              className="inline-block text-accent font-medium hover:underline"
            >
              查看全部指南 →
            </Link>
          </div>
        </div>
      </section>

      {/* 被裁情报预览 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">裁员情报</h2>
            <p className="mt-4 text-gray-500 text-base sm:text-lg">
              关注行业最新被裁信息
            </p>
          </FadeInSection>

          <FadeInSection stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { company: "某大厂A", date: "2026年3月", city: "北京", ratio: "约15%", compensation: "N+1" },
                { company: "某科技公司B", date: "2026年2月", city: "上海", ratio: "约20%", compensation: "N+3" },
                { company: "某互联网C", date: "2026年2月", city: "深圳", ratio: "整个事业部", compensation: "N+1" },
                { company: "某游戏公司D", date: "2026年1月", city: "广州", ratio: "约30%", compensation: "N" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-xl bg-surface border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{item.company}</span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{item.city}</span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded">被裁 {item.ratio}</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-accent rounded">赔偿 {item.compensation}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>

          <div className="text-center mt-8">
            <Link
              href="/community"
              className="inline-block text-accent font-medium hover:underline"
            >
              查看全部情报 →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { num: "20+", label: "城市覆盖" },
              { num: "2026", label: "最新数据" },
              { num: "免费", label: "全部工具" },
              { num: "100%", label: "匿名安全" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {stat.num}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
