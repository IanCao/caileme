import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们 - 裁了么 共济社区",
  description: "裁了么共济社区是一个帮助打工人应对裁员的工具平台。",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          关于裁了么 共济社区
        </h1>
        <p className="mt-4 text-gray-500 text-center text-lg">
          让每一个打工人都能体面地应对裁员
        </p>

        <div className="mt-12 space-y-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-xl font-bold mb-4">🎯 我们的使命</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              在裁员频繁的时代，很多人在收到裁员通知时不知所措，不了解自己的权益，也不知道如何争取合理赔偿。
              <strong>裁了么 共济社区</strong>
              致力于提供专业的裁员信息、实用工具和行动指南，帮助每一位打工人在裁员面前都能从容应对。
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-xl font-bold mb-4">🛠️ 我们提供什么</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="p-4 bg-surface rounded-xl">
                <strong className="text-black">裁员工具</strong>
                <p className="mt-1">赔偿计算器、失业金计算器等，用数据保护你的权益。</p>
              </div>
              <div className="p-4 bg-surface rounded-xl">
                <strong className="text-black">裁员指南</strong>
                <p className="mt-1">裁员当天该做什么、谈判技巧、仲裁流程等实用指南。</p>
              </div>
              <div className="p-4 bg-surface rounded-xl">
                <strong className="text-black">AI裁员模拟</strong>
                <p className="mt-1">模拟HR谈话场景，提前练习应对策略。</p>
              </div>
              <div className="p-4 bg-surface rounded-xl">
                <strong className="text-black">行业信息</strong>
                <p className="mt-1">最新裁员动态和再就业信息。</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-xl font-bold mb-4">📧 联系我们</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              如果你有建议、问题或合作意向，欢迎联系我们：
            </p>
            <p className="mt-2 text-sm text-accent">contact@caileme.team</p>
          </div>
        </div>
      </div>
    </div>
  );
}
