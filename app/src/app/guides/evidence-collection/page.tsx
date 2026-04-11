import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "裁员证据收集手册 - 录音取证、劳动合同、工资流水",
  description:
    "裁员维权证据收集完全手册：录音是否合法？需要哪些证据？劳动合同、工资流水、考勤记录、裁员通知等关键证据的保存方法和注意事项。",
  keywords: [
    "裁员证据收集",
    "裁员录音合法吗",
    "劳动仲裁需要什么证据",
    "裁员取证",
    "劳动合同保存",
    "工资流水证据",
  ],
  alternates: {
    canonical: "/guides/evidence-collection",
  },
  openGraph: {
    title: "裁员证据收集手册 - 录音取证、劳动合同、工资流水",
    description:
      "裁员维权证据收集完全手册：录音是否合法？需要哪些证据？劳动合同、工资流水、考勤记录、裁员通知等关键证据的保存方法和注意事项。",
    url: "https://caileme.team/guides/evidence-collection",
  },
};

export default function EvidenceCollectionGuide() {
  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "证据收集完全手册 - 裁员维权必备",
              description:
                "录音是否合法？微信聊天记录能当证据吗？这份手册教你如何正确收集和保全证据，为可能的劳动仲裁做好准备。",
              author: { "@type": "Organization", name: "裁了么" },
              publisher: {
                "@type": "Organization",
                name: "裁了么",
                logo: { "@type": "ImageObject", url: "https://caileme.team/logo.png" },
              },
              datePublished: "2026-03-01",
              dateModified: "2026-03-22",
              mainEntityOfPage: "https://caileme.team/guides/evidence-collection",
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "首页", item: "https://caileme.team" },
                { "@type": "ListItem", position: 2, name: "维权百科", item: "https://caileme.team/guides" },
                { "@type": "ListItem", position: 3, name: "证据收集完全手册", item: "https://caileme.team/guides/evidence-collection" },
              ],
            },
          ]),
        }}
      />
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/guides" className="hover:text-black transition-colors">
            裁员指南
          </Link>
          <span>/</span>
          <span className="text-gray-700">证据收集完全手册</span>
        </div>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            证据收集完全手册
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            裁员维权，证据先行——教你合法、有效地收集和保全证据
          </p>
          <div className="mt-2 text-sm text-gray-400">阅读时间：约8分钟</div>

          <div className="mt-10 prose prose-gray max-w-none">
            {/* Section 1 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                🎙️ 录音是否合法？
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  <strong>结论：合法，但有条件。</strong>
                  根据《最高人民法院关于民事诉讼证据的若干规定》，未经对方同意的录音可以作为证据使用，前提是不侵犯他人合法权益、不违反法律禁止性规定。
                </p>
                <p>满足以下条件的录音属于合法证据：</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>你是对话的参与者（不是偷听第三方对话）</li>
                  <li>在合法场所进行（公司会议室、办公区域等）</li>
                  <li>没有使用窃听设备（手机自带录音功能即可）</li>
                  <li>录音内容完整，未经剪辑</li>
                </ul>
                <div className="p-3 bg-accent/5 rounded-xl mt-2">
                  <p className="text-accent font-medium">
                    实操建议：HR找你谈话时，提前打开手机录音。录音文件保存到云盘，本地和云端各留一份。录音时尽量引导对方说出关键信息：裁员原因、赔偿方案、时间节点。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                📱 哪些电子证据有效？
              </h2>
              <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                <p>
                  2020年修正的《最高人民法院关于民事诉讼证据的若干规定》明确将电子数据纳入证据种类。以下电子证据在劳动仲裁中常被采纳：
                </p>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">1</span>
                  <div>
                    <strong>微信聊天记录</strong>
                    <p className="mt-1">
                      与HR、领导的对话记录，尤其是涉及裁员通知、赔偿协商的内容。需保留完整对话上下文，不能只截取片段。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">2</span>
                  <div>
                    <strong>工作邮件</strong>
                    <p className="mt-1">
                      公司发送的裁员通知邮件、绩效评估邮件、项目分配邮件等。注意保存邮件头信息（发件人、时间戳）。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">3</span>
                  <div>
                    <strong>钉钉/飞书通知</strong>
                    <p className="mt-1">
                      系统内的审批记录、考勤打卡记录、通知消息。这些有平台时间戳，证明力较强。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">4</span>
                  <div>
                    <strong>工资条 / 银行流水</strong>
                    <p className="mt-1">
                      证明工资标准和发放记录。银行APP可以直接导出带银行章的电子流水。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">5</span>
                  <div>
                    <strong>社保缴纳记录</strong>
                    <p className="mt-1">
                      通过当地社保局官网或"掌上12333"APP下载，可以证明劳动关系存续期间和缴纳基数。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                📋 必须保留的实物证据
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  以下实物证据在劳动仲裁中至关重要，离职前务必确保自己手上有一份：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
                  <div className="p-4 bg-surface rounded-xl">
                    <div className="font-bold text-sm">📄 劳动合同</div>
                    <div className="text-xs mt-1">
                      原件最佳，没有原件的拍照留存。注意检查是否签署过补充协议或竞业限制协议。
                    </div>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <div className="font-bold text-sm">🕐 考勤记录</div>
                    <div className="text-xs mt-1">
                      截图保存最近12个月的考勤。证明你正常出勤，防止公司以旷工为由解除。
                    </div>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <div className="font-bold text-sm">🪪 工牌/门禁卡</div>
                    <div className="text-xs mt-1">
                      证明劳动关系的辅助证据。如果没有签劳动合同，工牌是证明事实劳动关系的关键。
                    </div>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <div className="font-bold text-sm">📊 绩效评价</div>
                    <div className="text-xs mt-1">
                      保存所有绩效评估记录。如果绩效一直合格，公司以"不胜任工作"裁你就站不住脚。
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-accent/5 rounded-xl mt-2">
                  <p className="text-accent font-medium">
                    提示：收到裁员消息后，第一时间用手机拍照备份以上所有文件。离职后公司可能会限制你的系统访问权限。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                💻 如何保全电子证据
              </h2>
              <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                <p>
                  电子证据容易被质疑"篡改"，正确的保全方式能大幅提升证据效力：
                </p>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">1</span>
                  <div>
                    <strong>截图 + 录屏</strong>
                    <p className="mt-1">
                      截图时要包含完整界面（包括时间、账号信息）。建议同时录屏操作过程，从打开APP到查看内容，一镜到底，不做剪辑。录屏保存为原始格式。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">2</span>
                  <div>
                    <strong>公证保全</strong>
                    <p className="mt-1">
                      去公证处做证据保全公证。公证员会在你面前操作手机/电脑，对证据进行截屏或录屏并出具公证书。费用约500-2000元，但证据效力最强。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">3</span>
                  <div>
                    <strong>可信时间戳</strong>
                    <p className="mt-1">
                      使用联合信任时间戳服务（TSA）对电子文件加盖时间戳，证明文件在某个时间点已存在且未被篡改。部分地区仲裁委认可此方式。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">4</span>
                  <div>
                    <strong>区块链存证</strong>
                    <p className="mt-1">
                      部分互联网法院（如杭州互联网法院）支持区块链存证。可以通过"至信链"等平台进行存证，成本低且方便。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                📁 证据整理建议
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  证据收集完成后，合理的整理方式会让你在仲裁时事半功倍：
                </p>
                <p>
                  <strong>按时间线整理：</strong>
                  将所有证据按发生时间排列，形成清晰的事件脉络。例如：入职→正常工作→收到裁员通知→协商过程→离职。
                </p>
                <p>
                  <strong>制作证据目录：</strong>
                  列出每份证据的编号、名称、证明目的、页码。仲裁庭要求提交证据目录，提前做好会节省大量时间。
                </p>
                <p>
                  <strong>准备纸质备份：</strong>
                  电子证据全部打印出来，一式三份（自己一份、仲裁庭一份、对方一份）。聊天记录打印时注意保留账号信息和时间。
                </p>
                <p>
                  <strong>分类归档：</strong>
                  建议按以下类别分类——① 劳动关系证明 ② 工资待遇证明 ③ 裁员过程证据 ④ 赔偿协商记录 ⑤ 其他补充材料。
                </p>
                <div className="p-3 bg-accent/5 rounded-xl mt-2">
                  <p className="text-accent font-medium">
                    提示：仲裁时，逻辑清晰的证据材料会给仲裁员留下好印象，也有助于仲裁员快速理解案情。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-4">📖 相关阅读</h3>
          <div className="space-y-3">
            <Link
              href="/guides/layoff-day"
              className="block text-sm text-accent hover:underline"
            >
              → 裁员当天怎么办
            </Link>
            <Link
              href="/guides/negotiation"
              className="block text-sm text-accent hover:underline"
            >
              → 裁员谈判技巧
            </Link>
            <Link
              href="/guides/arbitration"
              className="block text-sm text-accent hover:underline"
            >
              → 仲裁流程指南
            </Link>
            <Link
              href="/tools/severance"
              className="block text-sm text-accent hover:underline"
            >
              → 赔偿计算器
            </Link>
          </div>
        </div>

        {/* 相关工具 */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-3">🔧 相关工具</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/guides/arbitration" className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-gray-100 transition-colors">
              <span className="text-2xl">⚖️</span>
              <div>
                <div className="text-sm font-medium">仲裁流程指南</div>
                <div className="text-xs text-gray-400">劳动仲裁全流程详解</div>
              </div>
            </Link>
            <Link href="/tools/severance" className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-gray-100 transition-colors">
              <span className="text-2xl">🧮</span>
              <div>
                <div className="text-sm font-medium">被裁赔偿计算器</div>
                <div className="text-xs text-gray-400">精准计算N、N+1、2N赔偿金额</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
