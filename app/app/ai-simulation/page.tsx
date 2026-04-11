import { Metadata } from "next";
import { AIChatInterface } from "@/components/AIChatInterface";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI 裁员模拟 - 模拟 HR 谈话练习应对策略",
  description:
    "使用 AI 模拟真实的 HR 裁员谈话场景，提前练习应对策略。知己知彼，谈判不慌。",
  keywords: ["AI裁员模拟", "裁员谈话练习", "HR谈判", "裁员谈判技巧"],
  alternates: {
    canonical: "/ai-simulation",
  },
};

export default function AISimulationPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 text-white text-3xl mb-4">
            🤖
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            AI 裁员模拟
          </h1>
          <p className="mt-2 text-gray-500 max-w-xl mx-auto">
            模拟真实的 HR 裁员谈话场景，提前练习应对策略。
            <br />
            <span className="text-amber-600">知己知彼，谈判不慌</span>
          </p>
        </div>

        {/* Tips */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <h3 className="font-semibold text-amber-800 mb-2">💡 使用提示</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 这是一个 AI 模拟器，扮演 HR 的角色与你对话</li>
            <li>• 括号内的提示（💡开头）是给你的参考建议</li>
            <li>• 尝试不同的回复方式，观察 AI 的反应</li>
            <li>• 练习保持冷静，不被带节奏</li>
          </ul>
        </div>

        {/* Chat Interface */}
        <div className="h-[600px] sm:h-[700px]">
          <AIChatInterface />
        </div>

        {/* Related Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/tools/severance"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">🧮</span>
            <div>
              <div className="font-medium text-gray-900">赔偿计算器</div>
              <div className="text-xs text-gray-500">计算 N+1、2N 赔偿金额</div>
            </div>
          </Link>
          <Link
            href="/guides/negotiation"
            className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <span className="text-2xl">📖</span>
            <div>
              <div className="font-medium text-gray-900">谈判技巧指南</div>
              <div className="text-xs text-gray-500">学习更多谈判策略</div>
            </div>
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-gray-400 text-center">
          免责声明：本模拟仅供练习使用，AI 回复仅供参考。实际裁员谈判中，请咨询专业律师。
        </p>
      </div>
    </div>
  );
}
