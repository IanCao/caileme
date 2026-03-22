import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "劳动仲裁流程指南 - 从申请到开庭全流程",
  description:
    "劳动仲裁怎么申请？需要什么材料？流程是什么？这份指南帮你了解劳动仲裁全流程。",
};

export default function ArbitrationGuide() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/guides" className="hover:text-black transition-colors">裁员指南</Link>
          <span>/</span>
          <span className="text-gray-700">仲裁流程指南</span>
        </div>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            劳动仲裁流程指南
          </h1>
          <p className="mt-4 text-gray-500 text-lg">从申请到开庭，全流程详解</p>
          <div className="mt-2 text-sm text-gray-400">阅读时间：约12分钟</div>

          <div className="mt-10 space-y-6">
            {/* 什么时候需要仲裁 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">🤔 什么情况需要劳动仲裁</h2>
              <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <p>• 公司拒绝支付经济补偿金</p>
                <p>• 公司给的赔偿远低于法定标准</p>
                <p>• 公司以"严重违纪"等理由违法辞退</p>
                <p>• 公司拖欠工资、加班费</p>
                <p>• 未签劳动合同（可要求双倍工资差额）</p>
                <p>• 公司强迫你写"主动辞职"</p>
              </div>
            </div>

            {/* 仲裁流程 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-6">📋 仲裁流程（时间线）</h2>
              <div className="relative pl-6 border-l-2 border-gray-200 space-y-8">
                {[
                  { step: "第1步", title: "收集证据", time: "1-2周", desc: "劳动合同、工资流水、社保记录、工作邮件、录音等。证据越充分胜率越高。" },
                  { step: "第2步", title: "撰写仲裁申请书", time: "1-3天", desc: "写明你的诉求（赔偿金额）、事实和理由。可以找模板或请律师帮忙。" },
                  { step: "第3步", title: "提交申请", time: "1天", desc: "到用人单位所在地或劳动合同履行地的劳动仲裁委员会提交。" },
                  { step: "第4步", title: "受理通知", time: "5个工作日", desc: "仲裁委会在5个工作日内决定是否受理，并通知双方。" },
                  { step: "第5步", title: "调解（可选）", time: "不定", desc: "仲裁委可能先安排调解。调解成功则出调解书，与裁决书同等效力。" },
                  { step: "第6步", title: "开庭审理", time: "受理后45天内", desc: "双方到场陈述、举证、质证。简单案件可能当庭裁决。" },
                  { step: "第7步", title: "裁决", time: "受理后45-60天", desc: "仲裁委作出裁决。对终局裁决（涉及金额不超过当地最低工资12个月），用人单位不能上诉。" },
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-black" />
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold bg-black text-white px-2 py-0.5 rounded">{item.step}</span>
                        <span className="font-semibold">{item.title}</span>
                        <span className="text-xs text-gray-400">{item.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 需要的材料 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">📑 需要准备的材料</h2>
              <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <p>☐ 身份证原件及复印件</p>
                <p>☐ 劳动合同原件及复印件</p>
                <p>☐ 工资流水（银行打印，6个月以上）</p>
                <p>☐ 社保缴纳记录</p>
                <p>☐ 解除劳动合同通知书（如有）</p>
                <p>☐ 录音、邮件、聊天记录等证据</p>
                <p>☐ 仲裁申请书（一式两份）</p>
                <p>☐ 证据清单</p>
              </div>
            </div>

            {/* 费用和胜率 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">💡 你需要知道的</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-success/5 rounded-xl">
                  <h3 className="font-semibold text-success mb-2">✅ 好消息</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• 劳动仲裁免费，不收取任何费用</p>
                    <p>• 劳动者胜诉率较高（70%+）</p>
                    <p>• 流程相对简单，可以自己代理</p>
                    <p>• 仲裁时效为1年</p>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <h3 className="font-semibold text-yellow-700 mb-2">⚠️ 注意事项</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• 注意仲裁时效（劳动争议发生后1年内）</p>
                    <p>• 证据是关键，越充分越好</p>
                    <p>• 复杂案件建议请律师</p>
                    <p>• 从申请到裁决通常需要2-3个月</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-4">📖 相关阅读</h3>
          <div className="space-y-3">
            <Link href="/guides/layoff-day" className="block text-sm text-accent hover:underline">→ 裁员当天怎么办</Link>
            <Link href="/guides/negotiation" className="block text-sm text-accent hover:underline">→ 裁员谈判技巧</Link>
            <Link href="/tools/severance" className="block text-sm text-accent hover:underline">→ 赔偿计算器</Link>
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
            <Link href="/guides/evidence-collection" className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-gray-100 transition-colors">
              <span className="text-2xl">📸</span>
              <div>
                <div className="text-sm font-medium">证据收集手册</div>
                <div className="text-xs text-gray-400">合法有效地收集和保全证据</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
