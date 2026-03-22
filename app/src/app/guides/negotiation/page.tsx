import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "裁员谈判技巧 - 如何争取更好的赔偿方案",
  description:
    "被裁员怎么跟HR谈判？掌握这些话术和策略，争取更好的赔偿方案。",
};

export default function NegotiationGuide() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/guides" className="hover:text-black transition-colors">
            裁员指南
          </Link>
          <span>/</span>
          <span className="text-gray-700">裁员谈判技巧</span>
        </div>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            裁员谈判技巧
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            如何跟HR谈判争取更好的赔偿方案
          </p>
          <div className="mt-2 text-sm text-gray-400">阅读时间：约10分钟</div>

          <div className="mt-10 space-y-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">🎯 谈判核心原则</h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p><strong>1. 保持冷静</strong> - 情绪化是谈判的大忌。把这当成一次商业谈判。</p>
                <p><strong>2. 知道底线</strong> - 法律规定的最低标准是N，低于这个标准不要接受。</p>
                <p><strong>3. 不要着急</strong> - 时间是你的朋友。公司希望快速解决，你不用配合。</p>
                <p><strong>4. 留好证据</strong> - 所有谈话都录音，所有文件都拍照。</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">💬 常见HR话术及应对</h2>
              <div className="text-sm text-gray-600 space-y-5 leading-relaxed">
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black">HR: "公司效益不好，只能给N"</p>
                  <p className="mt-2 text-accent">✅ 回应: "我理解公司的情况，但根据劳动合同法，未提前30天通知应该是N+1。我希望按照法律标准来。"</p>
                </div>
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black">HR: "你的绩效不达标，属于不胜任"</p>
                  <p className="mt-2 text-accent">✅ 回应: "请问有书面的绩效考核标准和不达标的书面通知吗？是否经过了培训或调岗流程？"</p>
                </div>
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black">HR: "今天不签明天就没有这个方案了"</p>
                  <p className="mt-2 text-accent">✅ 回应: "我需要时间仔细看协议内容。如果方案合理，我不会拖延。请给我2-3天时间。"</p>
                </div>
                <div className="p-4 bg-surface rounded-xl">
                  <p className="font-medium text-black">HR: "其他人都已经签了"</p>
                  <p className="mt-2 text-accent">✅ 回应: "每个人情况不同，我需要根据自己的情况做决定。"</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">📈 谈判策略</h2>
              <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">1</span>
                  <div>
                    <strong>先听后说</strong>
                    <p className="mt-1">先听清楚公司的方案和理由，不要急于回应。记录所有细节。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">2</span>
                  <div>
                    <strong>合理诉求</strong>
                    <p className="mt-1">基于法律标准提出你的诉求。N+1是基本标准，如果是违法裁员，可以要求2N。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">3</span>
                  <div>
                    <strong>谈额外权益</strong>
                    <p className="mt-1">除了赔偿金，还可以谈：年终奖发放、股票归属、社保多缴几个月、竞业协议解除、推荐信等。</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">4</span>
                  <div>
                    <strong>书面确认</strong>
                    <p className="mt-1">所有达成的口头协议都要体现在书面文件里。口头承诺不具有法律效力。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
              <h2 className="text-xl font-bold mb-4">⚖️ 什么时候该找律师</h2>
              <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <p>• 公司赔偿方案明显低于法定标准</p>
                <p>• 公司以"严重违纪"等理由拒绝赔偿</p>
                <p>• 涉及竞业限制协议</p>
                <p>• 涉及股票期权等复杂权益</p>
                <p>• 公司威胁或施压</p>
                <p>• 你感到无法独自应对</p>
              </div>
              <div className="mt-4 p-3 bg-accent/5 rounded-xl">
                <p className="text-sm text-accent">
                  💡 很多劳动法律师提供免费初始咨询。先咨询了解情况，再决定是否聘请。
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-4">📖 相关阅读</h3>
          <div className="space-y-3">
            <Link href="/guides/layoff-day" className="block text-sm text-accent hover:underline">→ 裁员当天怎么办</Link>
            <Link href="/guides/arbitration" className="block text-sm text-accent hover:underline">→ 仲裁流程指南</Link>
            <Link href="/ai-simulation" className="block text-sm text-accent hover:underline">→ AI裁员模拟 - 提前练习谈判</Link>
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
            <Link href="/ai-simulation" className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-gray-100 transition-colors">
              <span className="text-2xl">🤖</span>
              <div>
                <div className="text-sm font-medium">AI裁员模拟</div>
                <div className="text-xs text-gray-400">模拟HR谈话，练习应对策略</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
