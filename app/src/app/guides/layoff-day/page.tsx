import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "裁员当天怎么办 - 完整行动清单",
  description:
    "收到裁员通知不要慌。这份清单告诉你裁员当天要做什么、不要做什么，帮你冷静应对，保护自己的权益。",
};

export default function LayoffDayGuide() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/guides" className="hover:text-black transition-colors">
            裁员指南
          </Link>
          <span>/</span>
          <span className="text-gray-700">裁员当天怎么办</span>
        </div>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            裁员当天怎么办
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            收到裁员通知的完整行动清单
          </p>
          <div className="mt-2 text-sm text-gray-400">阅读时间：约8分钟</div>

          <div className="mt-10 prose prose-gray max-w-none">
            {/* Section 1 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                🚫 第一原则：不要当场签字
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  无论HR说什么，<strong>不要当场签署任何文件</strong>。常见话术包括：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>"今天签字才能拿到赔偿"</li>
                  <li>"过了今天就没有这个方案了"</li>
                  <li>"大家都已经签了"</li>
                </ul>
                <p>
                  这些都是施压策略。根据劳动法，公司不能强迫你当场签字。你完全有权利说：
                </p>
                <div className="p-3 bg-accent/5 rounded-xl mt-2">
                  <p className="text-accent font-medium">
                    "我需要时间仔细看看协议内容，明天给你答复。"
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                📱 立即要做的事
              </h2>
              <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">1</span>
                  <div>
                    <strong>录音</strong>
                    <p className="mt-1">
                      打开手机录音功能，记录HR谈话全过程。这是合法的，也是重要证据。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">2</span>
                  <div>
                    <strong>拍照备份重要文件</strong>
                    <p className="mt-1">
                      劳动合同、工资条、考勤记录、工作邮件、绩效评价等，用手机拍照备份。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">3</span>
                  <div>
                    <strong>记录谈话要点</strong>
                    <p className="mt-1">
                      HR说了什么赔偿方案？理由是什么？都记下来。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">4</span>
                  <div>
                    <strong>要求书面通知</strong>
                    <p className="mt-1">
                      要求公司出具书面的解除劳动合同通知，明确解除理由。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                ❌ 不要做的事
              </h2>
              <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <p>• 不要当场签署任何文件（包括离职申请、协商解除协议）</p>
                <p>• 不要写辞职信或主动提离职</p>
                <p>• 不要情绪化地与HR争吵</p>
                <p>• 不要删除工作相关的证据（邮件、聊天记录等）</p>
                <p>• 不要在同事群里发表过激言论</p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                💰 了解你的赔偿标准
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>根据《劳动合同法》，经济补偿标准为：</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                  <div className="p-4 bg-surface rounded-xl text-center">
                    <div className="font-bold text-lg">N</div>
                    <div className="text-xs mt-1">协商解除</div>
                  </div>
                  <div className="p-4 bg-black text-white rounded-xl text-center">
                    <div className="font-bold text-lg">N+1</div>
                    <div className="text-xs mt-1">未提前30天通知</div>
                  </div>
                  <div className="p-4 bg-danger/10 rounded-xl text-center">
                    <div className="font-bold text-lg text-danger">2N</div>
                    <div className="text-xs mt-1">违法裁员</div>
                  </div>
                </div>
                <p>
                  使用我们的
                  <Link
                    href="/tools/severance"
                    className="text-accent hover:underline"
                  >
                    赔偿计算器
                  </Link>
                  ，快速计算你应得的赔偿金额。
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                📋 回家后的待办清单
              </h2>
              <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <p>☐ 整理所有证据材料（合同、工资流水、考勤等）</p>
                <p>☐ 仔细阅读公司给的协议文件</p>
                <p>☐ 使用赔偿计算器核算应得金额</p>
                <p>☐ 了解当地失业金领取政策</p>
                <p>☐ 考虑是否需要咨询劳动法律师</p>
                <p>☐ 12333劳动保障热线了解维权渠道</p>
                <p>☐ 更新简历，开始看新机会</p>
              </div>
            </div>
          </div>
        </article>

        {/* Related */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-4">📖 相关阅读</h3>
          <div className="space-y-3">
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
            <Link href="/tools/severance" className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-gray-100 transition-colors">
              <span className="text-2xl">🧮</span>
              <div>
                <div className="text-sm font-medium">被裁赔偿计算器</div>
                <div className="text-xs text-gray-400">精准计算N、N+1、2N赔偿金额</div>
              </div>
            </Link>
            <Link href="/layoff-tracker" className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-gray-100 transition-colors">
              <span className="text-2xl">📋</span>
              <div>
                <div className="text-sm font-medium">维权进度追踪</div>
                <div className="text-xs text-gray-400">从被裁到再就业，全程指引</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
