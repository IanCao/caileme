import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "竞业限制指南 - 竞业协议、补偿标准、违约金全解析",
  description:
    "竞业限制完全指南：了解竞业限制的法律依据、适用人群、补偿标准（月均工资30%）、最长期限（2年）、违约金合理性评估，以及常见问题解答。",
};

export default function NonCompeteGuide() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/guides" className="hover:text-black transition-colors">
            裁员指南
          </Link>
          <span>/</span>
          <span className="text-gray-700">竞业限制指南</span>
        </div>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            竞业限制完全指南
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            竞业协议、补偿标准、违约金、常见问题一文讲清
          </p>
          <div className="mt-2 text-sm text-gray-400">阅读时间：约12分钟</div>

          <div className="mt-10 space-y-6">
            {/* 什么是竞业限制 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">📜 什么是竞业限制</h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  <strong>竞业限制</strong>是指用人单位与劳动者约定，在劳动关系解除或终止后的一定期限内，劳动者不得到与原单位有竞争关系的企业工作，或者自己经营同类业务。
                </p>
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black mb-2">⚖️ 法律依据</p>
                  <p>
                    <strong>《劳动合同法》第23条</strong>：用人单位与劳动者可以在劳动合同中约定保守用人单位的商业秘密和与知识产权相关的保密事项。对负有保密义务的劳动者，用人单位可以在劳动合同或者保密协议中与劳动者约定竞业限制条款。
                  </p>
                  <p className="mt-2">
                    <strong>《劳动合同法》第24条</strong>：竞业限制的人员限于用人单位的高级管理人员、高级技术人员和其他负有保密义务的人员。竞业限制期限不得超过二年。
                  </p>
                </div>
              </div>
            </div>

            {/* 适用人群 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">👤 谁需要遵守竞业限制</h2>
              <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                <p>
                  根据《劳动合同法》第24条，竞业限制<strong>仅适用于以下三类人员</strong>：
                </p>
                <div className="grid gap-3">
                  <div className="p-4 bg-surface rounded-xl">
                    <p className="font-medium text-black">1. 高级管理人员</p>
                    <p className="mt-1">如公司董事、总经理、副总经理、财务负责人等。</p>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <p className="font-medium text-black">2. 高级技术人员</p>
                    <p className="mt-1">掌握公司核心技术、研发机密的技术骨干。</p>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <p className="font-medium text-black">3. 其他负有保密义务的人员</p>
                    <p className="mt-1">如接触商业秘密、客户资源的销售、运营等岗位。但公司不能将竞业限制扩大到全体员工。</p>
                  </div>
                </div>
                <div className="p-3 bg-accent/5 rounded-xl">
                  <p className="text-sm text-accent">
                    💡 关键点：如果你是普通员工（如前台、行政），即使签了竞业协议，也可以主张该协议不合理。
                  </p>
                </div>
              </div>
            </div>

            {/* 期限和补偿 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">⏰ 期限与补偿标准</h2>
              <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black mb-2">📅 最长期限</p>
                  <p>竞业限制期限<strong className="text-danger">不得超过2年</strong>。超过2年的部分无效。</p>
                </div>
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black mb-2">💰 补偿标准</p>
                  <div className="space-y-2">
                    <p>用人单位在竞业限制期限内必须<strong>按月支付</strong>经济补偿：</p>
                    <p>• 约定金额：按劳动合同或竞业协议约定执行</p>
                    <p>• 未约定金额：按<strong>离职前12个月平均工资的30%</strong>支付</p>
                    <p>• 最低标准：不得低于<strong>劳动合同履行地的最低工资标准</strong></p>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <p className="text-sm text-yellow-700">
                    ⚠️ 法律依据：《最高人民法院关于审理劳动争议案件适用法律问题的解释(四)》第6条。如果月平均工资的30%低于当地最低工资，则按最低工资标准支付。
                  </p>
                </div>
              </div>
            </div>

            {/* 违约金 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">⚠️ 违约金与合理性评估</h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  如果劳动者违反竞业限制约定，需要按约定向用人单位支付违约金。但违约金的金额需要合理：
                </p>
                <div className="space-y-2">
                  <p>• <strong>违约金过高</strong>：法院可以根据实际情况酌情调低</p>
                  <p>• <strong>参考因素</strong>：补偿金总额、劳动者收入水平、违约行为造成的实际损失</p>
                  <p>• <strong>实践中</strong>：违约金一般不超过补偿金总额的2-3倍</p>
                  <p>• <strong>支付违约金后</strong>：用人单位仍可要求继续履行竞业义务</p>
                </div>
                <div className="p-3 bg-danger/5 rounded-xl">
                  <p className="text-sm text-danger">
                    🚨 注意：即使违约金过高可以调低，也不建议故意违约。一旦被起诉，举证和应诉成本很高。
                  </p>
                </div>
              </div>
            </div>

            {/* 常见问题 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">❓ 常见问题</h2>
              <div className="text-sm text-gray-600 space-y-5 leading-relaxed">
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black">
                    Q: 没签竞业协议，但公司说离职后不能去竞对？
                  </p>
                  <p className="mt-2 text-accent">
                    ✅ 竞业限制必须以书面形式约定。如果没有签署竞业限制协议或竞业条款，公司的口头要求<strong>没有法律效力</strong>。你可以自由择业。
                  </p>
                </div>
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black">
                    Q: 公司不付竞业补偿金怎么办？
                  </p>
                  <p className="mt-2 text-accent">
                    ✅ 根据司法解释，用人单位<strong>超过3个月未支付</strong>竞业限制经济补偿的，劳动者可以请求解除竞业限制约定。建议保留未收到补偿的证据（银行流水等），然后书面通知公司解除竞业限制。
                  </p>
                </div>
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black">
                    Q: 竞业限制范围太广，限制了几乎所有同行业公司？
                  </p>
                  <p className="mt-2 text-accent">
                    ✅ 竞业限制的范围应当合理，不能过分限制劳动者的就业权。如果竞业范围明显过宽（如限制整个行业而非具体竞争对手），可以通过仲裁或诉讼<strong>主张竞业范围不合理</strong>，请求缩小范围或认定无效。
                  </p>
                </div>
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black">
                    Q: 公司裁员后还能要求竞业限制吗？
                  </p>
                  <p className="mt-2 text-accent">
                    ✅ 可以。只要之前签署了有效的竞业限制协议，即使是被裁员，竞业限制义务仍然有效。但公司必须按约定支付竞业补偿金。如果被裁员时公司未提及竞业限制或未开始支付补偿，建议主动确认。
                  </p>
                </div>
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black">
                    Q: 公司可以在离职时才要求签竞业协议吗？
                  </p>
                  <p className="mt-2 text-accent">
                    ✅ 从法律角度，竞业限制需要双方自愿协商签署。如果你在离职时才被要求签署，<strong>你有权拒绝</strong>。签署与否不影响你获得经济补偿金（N/N+1/2N）的权利。
                  </p>
                </div>
              </div>
            </div>

            {/* 实用建议 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">💡 实用建议</h2>
              <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">1</span>
                  <div>
                    <strong>入职时仔细审查竞业条款</strong>
                    <p className="mt-1">关注竞业范围、期限、补偿金额、违约金金额。不合理的条款可以在入职时协商修改。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">2</span>
                  <div>
                    <strong>离职时确认竞业限制是否启动</strong>
                    <p className="mt-1">要求公司书面确认是否需要履行竞业限制。如果公司不要求，可以要求出具书面放弃竞业限制的通知。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">3</span>
                  <div>
                    <strong>保留补偿金支付记录</strong>
                    <p className="mt-1">每月确认竞业补偿金是否到账，保留银行流水。连续3个月未支付是解除竞业限制的法定条件。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">4</span>
                  <div>
                    <strong>谈判赔偿时一并谈竞业限制</strong>
                    <p className="mt-1">被裁员时，可以把「解除竞业限制」作为谈判筹码。竞业限制对你的职业发展影响很大，值得认真对待。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">5</span>
                  <div>
                    <strong>遇到纠纷及时咨询律师</strong>
                    <p className="mt-1">竞业限制纠纷涉及复杂的法律问题，不建议自行处理。很多劳动法律师提供免费初始咨询。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-4">📖 相关阅读</h3>
          <div className="space-y-3">
            <Link href="/guides/negotiation" className="block text-sm text-accent hover:underline">→ 裁员谈判技巧</Link>
            <Link href="/guides/evidence-collection" className="block text-sm text-accent hover:underline">→ 证据收集手册</Link>
            <Link href="/guides/arbitration" className="block text-sm text-accent hover:underline">→ 仲裁流程指南</Link>
            <Link href="/tools/severance" className="block text-sm text-accent hover:underline">→ 裁员赔偿计算器</Link>
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
            <Link href="/guides/negotiation" className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-gray-100 transition-colors">
              <span className="text-2xl">💪</span>
              <div>
                <div className="text-sm font-medium">被裁谈判技巧</div>
                <div className="text-xs text-gray-400">如何跟HR谈判争取更好方案</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
