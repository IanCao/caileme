import type { Metadata } from "next";
import Link from "next/link";
import SeveranceCalculatorClient from "./SeveranceCalculatorClient";

export const metadata: Metadata = {
  title: "裁员赔偿计算器 - 精准计算N+1、2N经济补偿金",
  description: "2026年最新裁员赔偿计算器，输入月薪和工作年限，自动计算N、N+1、2N经济补偿金。支持社平工资3倍上限、年假补偿、个税计算，覆盖全国30+城市最新数据。免费在线使用。",
  keywords: ["裁员赔偿计算器", "N+1计算器", "2N赔偿计算", "经济补偿金计算", "裁员补偿怎么算", "裁员赔偿标准2026", "劳动法赔偿计算", "N+1是什么意思", "违法裁员赔偿"],
  alternates: {
    canonical: "/tools/severance",
  },
  openGraph: {
    title: "裁员赔偿计算器 - 精准计算N+1、2N补偿金",
    description: "输入月薪+年限，一键计算裁员赔偿。支持N、N+1、2N三种方案对比。",
    url: "https://caileme.team/tools/severance",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "裁员赔偿N+1是什么意思？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "N+1是最常见的裁员赔偿标准。N代表工作年限对应的经济补偿月数（每满一年支付一个月工资），+1是指额外支付一个月工资作为代通知金。例如工作3年，N+1就是4个月工资。代通知金在公司未提前30天书面通知时适用。",
      },
    },
    {
      "@type": "Question",
      name: "裁员赔偿2N是什么意思？什么情况下适用？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "2N是指违法解除劳动合同的赔偿金，为经济补偿标准的二倍。适用情形包括：无合法事由辞退、程序违法（未通知工会、未出具书面证明）、在孕期/产期/哺乳期辞退女职工、在医疗期内辞退患病员工、距法定退休不足5年辞退等。",
      },
    },
    {
      "@type": "Question",
      name: "经济补偿金的工资基数怎么算？有上限吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "经济补偿金按劳动者离职前12个月的平均工资计算，包含基本工资、奖金、津贴、加班费等所有税前收入。如果月工资高于当地社平工资3倍，则按3倍封顶计算，且补偿年限最高不超过12年。",
      },
    },
    {
      "@type": "Question",
      name: "裁员赔偿需要交个人所得税吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "经济补偿金在当地上年职工平均工资3倍数额以内的部分免征个人所得税。超过3倍的部分，单独适用综合所得税率表计税，不并入当年综合所得。大多数人的赔偿金都在免税额度内。",
      },
    },
    {
      "@type": "Question",
      name: "未休年假被裁了怎么补偿？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "根据《职工带薪年休假条例》，未休年假应按日工资的300%补偿（公司已正常支付的100%工资不重复计算，额外补200%）。日工资 = 月工资 ÷ 21.75。例如5天未休年假，额外补偿为 5 × (月薪/21.75) × 2。",
      },
    },
    {
      "@type": "Question",
      name: "工作不满一年有经济补偿吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "有。工作满六个月不满一年的，按一年计算（1个月工资）；不满六个月的，支付半个月工资的经济补偿。例如工作8个月，经济补偿为1个月工资。",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首页", item: "https://caileme.team" },
    { "@type": "ListItem", position: 2, name: "工具箱", item: "https://caileme.team/tools" },
    { "@type": "ListItem", position: 3, name: "赔偿计算器", item: "https://caileme.team/tools/severance" },
  ],
};

export default function SeverancePage() {
  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 计算器（客户端组件） */}
      <SeveranceCalculatorClient />

      {/* SSR SEO 内容 — 爬虫可索引 */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">📖 裁员赔偿计算规则详解</h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              根据《中华人民共和国劳动合同法》第四十七条，经济补偿按劳动者在本单位工作的年限计算：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>每满一年支付一个月工资的标准向劳动者支付</li>
              <li>六个月以上不满一年的，按一年计算</li>
              <li>不满六个月的，向劳动者支付半个月工资的经济补偿</li>
            </ul>
            <p>
              劳动者月工资高于用人单位所在直辖市、设区的市级人民政府公布的本地区上年度职工月平均工资三倍的，向其支付经济补偿的标准按职工月平均工资三倍的数额支付，向其支付经济补偿的年限最高不超过十二年。
            </p>
          </div>
        </section>

        <section className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">💰 N、N+1、2N 的区别</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-surface rounded-xl">
              <div className="text-2xl font-bold text-center mb-2">N</div>
              <div className="text-xs text-gray-500 text-center mb-3">经济补偿金</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                公司主动提出协商解除劳动合同，按工作年限支付经济补偿。每满一年一个月工资。
              </p>
            </div>
            <div className="p-4 bg-black text-white rounded-xl">
              <div className="text-2xl font-bold text-center mb-2">N+1</div>
              <div className="text-xs text-gray-300 text-center mb-3">代通知金</div>
              <p className="text-xs text-gray-300 leading-relaxed">
                公司未提前30天书面通知解除劳动合同，除经济补偿外，额外支付一个月工资作为代通知金。
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-center mb-2 text-red-600">2N</div>
              <div className="text-xs text-red-500 text-center mb-3">违法裁员赔偿</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                公司违法解除劳动合同（无合法事由、程序违法、保护期辞退等），按经济补偿标准的二倍支付赔偿金。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">❓ 常见问题</h2>
          <div className="space-y-4">
            <details className="group bg-surface rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                <span>裁员赔偿N+1是什么意思？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                N+1是最常见的裁员赔偿标准。N代表工作年限对应的经济补偿月数（每满一年支付一个月工资），+1是指额外支付一个月工资作为代通知金。例如工作3年，N+1就是4个月工资。代通知金在公司未提前30天书面通知时适用。
              </div>
            </details>

            <details className="group bg-surface rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                <span>2N赔偿什么情况下适用？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                2N适用于违法解除劳动合同的情形。包括：无合法事由辞退、程序违法（未通知工会、未出具书面证明）、在孕期/产期/哺乳期辞退女职工、在医疗期内辞退患病员工、距法定退休不足5年辞退、歧视性辞退等。
              </div>
            </details>

            <details className="group bg-surface rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                <span>经济补偿金的工资基数怎么算？有上限吗？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                经济补偿金按劳动者离职前12个月的平均工资计算，包含基本工资、奖金、津贴、加班费等所有税前收入。如果月工资高于当地社平工资3倍，则按3倍封顶计算，且补偿年限最高不超过12年。
              </div>
            </details>

            <details className="group bg-surface rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                <span>裁员赔偿需要交税吗？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                经济补偿金在当地上年职工平均工资3倍数额以内的部分免征个人所得税。超过3倍的部分，单独适用综合所得税率表计税。大多数人的赔偿金都在免税额度内。
              </div>
            </details>

            <details className="group bg-surface rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                <span>未休年假被裁了怎么补偿？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                根据《职工带薪年休假条例》，未休年假按日工资的300%补偿（公司已正常支付的100%不重复计算，额外补200%）。日工资 = 月工资 ÷ 21.75。
              </div>
            </details>

            <details className="group bg-surface rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                <span>工作不满一年有经济补偿吗？</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                有。工作满六个月不满一年的，按一年计算（1个月工资）；不满六个月的，支付半个月工资。
              </div>
            </details>
          </div>
        </section>

        <section className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">📋 相关法律依据</h2>
          <ul className="text-sm text-gray-600 space-y-2 leading-relaxed">
            <li>• 《中华人民共和国劳动合同法》第四十七条 — 经济补偿计算标准</li>
            <li>• 《中华人民共和国劳动合同法》第八十七条 — 违法解除赔偿（2N）</li>
            <li>• 《中华人民共和国劳动合同法》第四十条 — 代通知金（+1）</li>
            <li>• 《职工带薪年休假条例》第五条 — 未休年假补偿</li>
            <li>• 财税〔2018〕164号 — 经济补偿金个税政策</li>
          </ul>
        </section>

        <section className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">🔗 相关推荐</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/tools/unemployment" className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors">
              <div className="font-medium">💰 失业金计算器</div>
              <div className="mt-1 text-xs text-gray-500">覆盖30+城市，预估每月领取金额和时长</div>
            </Link>
            <Link href="/tools/social-insurance" className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors">
              <div className="font-medium">🛡️ 社保断缴影响查询</div>
              <div className="mt-1 text-xs text-gray-500">医保、购房、落户全方位影响分析</div>
            </Link>
            <Link href="/guides/negotiation" className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors">
              <div className="font-medium">💪 裁员谈判技巧</div>
              <div className="mt-1 text-xs text-gray-500">如何跟HR谈判争取更好的赔偿方案</div>
            </Link>
            <Link href="/guides/arbitration" className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors">
              <div className="font-medium">⚖️ 仲裁流程指南</div>
              <div className="mt-1 text-xs text-gray-500">从申请到开庭，劳动仲裁全流程详解</div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
