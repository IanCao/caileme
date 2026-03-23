import Link from "next/link";
import dynamic from "next/dynamic";
import { FadeInSection } from "@/components/FadeInSection";
import { allLayoffNews, allCommunityPosts, newsCities } from "@/data/communityData";

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
    title: "裁员维权进度追踪器",
    desc: "全流程清单管理，从收到通知到仲裁维权，一步步守护你的权益。",
    href: "/layoff-tracker",
    icon: "📋",
  },
  {
    title: "失业金计算器",
    desc: "覆盖全国20+城市2026年最新标准，预估每月领取金额和时长。",
    href: "/tools/unemployment",
    icon: "💰",
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
      <h1 className="sr-only">裁了么 - 裁员赔偿计算器、失业金计算、维权指南、AI裁员模拟</h1>

      {/* Hero Section — CSS animations, no JS library needed */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-black/5 text-sm text-gray-600 animate-fade-up">
            🛡️ 打工人的权益保障平台
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight text-gray-900 animate-fade-up-delay-1">
            知道权利 才能守住权利
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-400">
              每个打工人都值得被认真对待
            </span>
          </h2>

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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">保护站信息</h2>
            <p className="mt-4 text-gray-500 text-base sm:text-lg">
              裁了么社区最新动态
            </p>
          </FadeInSection>

          <FadeInSection stagger>
            {allLayoffNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allLayoffNews.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
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
            ) : (
              <p className="text-center text-gray-400 py-8">暂无裁员情报，欢迎投稿！</p>
            )}
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

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-surface">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "裁员赔偿N+1是什么意思？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "N+1是最常见的裁员赔偿标准。N代表工作年限对应的经济补偿月数（每满一年支付一个月工资），+1是指额外支付一个月工资作为代通知金。例如工作3年，N+1就是4个月工资。",
                  },
                },
                {
                  "@type": "Question",
                  name: "被裁员当天应该做什么？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "首先不要签署任何文件，要求公司出具书面裁员通知。立即开始录音取证，拍照保存工牌、工位、考勤记录等。详细记录HR的谈话内容，了解自己的赔偿方案后再做决定。",
                  },
                },
                {
                  "@type": "Question",
                  name: "失业金怎么领取？需要什么条件？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "领取失业金需满足：①累计缴纳失业保险满1年；②非因本人意愿中断就业（被裁员符合条件）；③已办理失业登记。在离职后60天内到当地社保局办理。",
                  },
                },
                {
                  "@type": "Question",
                  name: "社保断缴有什么影响？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "社保断缴主要影响：①医保断缴次月起无法报销（有60-90天缓冲期）；②影响购房资格（需连续缴纳）；③影响落户积分；④养老保险是累计计算，断缴不影响但需累计满15年。",
                  },
                },
                {
                  "@type": "Question",
                  name: "裁员和主动辞职的赔偿区别是什么？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "裁员（公司单方面解除劳动合同）：公司需支付N+1或2N经济补偿金。主动辞职：员工无法获得经济补偿。因此千万不要签署辞职信或离职申请，被裁时应要求公司出具解除劳动合同通知书。",
                  },
                },
              ],
            }),
          }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeInSection className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">常见问题</h2>
            <p className="mt-4 text-gray-500 text-base sm:text-lg">
              裁员维权最常被问到的问题
            </p>
          </FadeInSection>

          <FadeInSection>
            <div className="space-y-4">
              <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  <h3 className="text-base sm:text-lg pr-4">裁员赔偿N+1是什么意思？</h3>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl flex-shrink-0">▼</span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600 leading-relaxed">
                  N+1是最常见的裁员赔偿标准。N代表工作年限对应的经济补偿月数（每满一年支付一个月工资），+1是指额外支付一个月工资作为代通知金。例如工作3年，N+1就是4个月工资。
                </div>
              </details>

              <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  <h3 className="text-base sm:text-lg pr-4">被裁员当天应该做什么？</h3>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl flex-shrink-0">▼</span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600 leading-relaxed">
                  首先不要签署任何文件，要求公司出具书面裁员通知。立即开始录音取证，拍照保存工牌、工位、考勤记录等。详细记录HR的谈话内容，了解自己的赔偿方案后再做决定。
                </div>
              </details>

              <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  <h3 className="text-base sm:text-lg pr-4">失业金怎么领取？需要什么条件？</h3>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl flex-shrink-0">▼</span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600 leading-relaxed">
                  领取失业金需满足：①累计缴纳失业保险满1年；②非因本人意愿中断就业（被裁员符合条件）；③已办理失业登记。在离职后60天内到当地社保局办理。
                </div>
              </details>

              <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  <h3 className="text-base sm:text-lg pr-4">社保断缴有什么影响？</h3>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl flex-shrink-0">▼</span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600 leading-relaxed">
                  社保断缴主要影响：①医保断缴次月起无法报销（有60-90天缓冲期）；②影响购房资格（需连续缴纳）；③影响落户积分；④养老保险是累计计算，断缴不影响但需累计满15年。
                </div>
              </details>

              <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-5 sm:p-6 font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  <h3 className="text-base sm:text-lg pr-4">裁员和主动辞职的赔偿区别是什么？</h3>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-xl flex-shrink-0">▼</span>
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600 leading-relaxed">
                  裁员（公司单方面解除劳动合同）：公司需支付N+1或2N经济补偿金。主动辞职：员工无法获得经济补偿。因此千万不要签署辞职信或离职申请，被裁时应要求公司出具解除劳动合同通知书。
                </div>
              </details>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { num: newsCities.length > 1 ? `${newsCities.length - 1}+` : "20+", label: "城市覆盖" },
              { num: allLayoffNews.length > 0 ? `${allLayoffNews.length}+` : "持续更新", label: "裁员情报" },
              { num: allCommunityPosts.length > 0 ? `${allCommunityPosts.length}+` : "持续增长", label: "社区帖子" },
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
