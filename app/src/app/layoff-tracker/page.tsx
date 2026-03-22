"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLayoffProgress } from "@/hooks/useLayoffProgress";
import { layoffSteps, stepCategories, Step } from "@/data/layoffSteps";
import { StepCard } from "@/components/StepCard";

export default function LayoffTrackerPage() {
  const { progress, isLoading, toggleStep, updateStepNotes, toggleCheckItem, resetProgress, getProgressPercentage } = useLayoffProgress();
  const [filter, setFilter] = useState<"all" | Step["category"]>("all");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const filteredSteps = filter === "all"
    ? layoffSteps
    : layoffSteps.filter((s) => s.category === filter);

  const progressPercentage = getProgressPercentage();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-glass border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">📋 维权进度追踪器</h1>
              <p className="mt-1 text-gray-500 text-sm">
                从收到通知到再就业，全程指引
              </p>
            </div>
            {progress && progress.completedSteps.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowShareCard(true)}
                  className="text-sm text-accent hover:text-accent/80 font-medium"
                >
                  📤 分享进度
                </button>
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  重置进度
                </button>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                完成进度
              </span>
              <span className="text-sm font-bold text-accent">
                {progressPercentage}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">
              已完成 {progress?.completedSteps.length || 0} / {layoffSteps.length} 个步骤
            </p>
            {/* Category Progress */}
            {progress && progress.completedSteps.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {stepCategories.filter(c => c.id !== "all").map(cat => {
                  const catSteps = layoffSteps.filter(s => s.category === cat.id);
                  const catCompleted = catSteps.filter(s => progress.completedSteps.includes(s.id)).length;
                  return (
                    <div key={cat.id} className="p-2 bg-surface rounded-lg text-center">
                      <div className="text-lg">{cat.icon}</div>
                      <div className="text-xs font-medium text-gray-600 mt-1">{cat.label}</div>
                      <div className="text-xs text-gray-400">{catCompleted}/{catSteps.length}</div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              数据保存在浏览器本地，不会上传到服务器
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {stepCategories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                  transition-colors duration-200
                  ${filter === tab.id
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto" />
          </div>
        ) : (
          <>
            {/* Quick Links */}
            {progressPercentage === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-100"
              >
                <h3 className="font-semibold text-blue-900 mb-2">🎯 快速开始</h3>
                <p className="text-sm text-blue-800 mb-4">
                  刚收到被裁通知？从这些步骤开始：
                </p>
                <div className="flex flex-wrap gap-2">
                  {layoffSteps.slice(0, 3).map((step) => (
                    <Link
                      key={step.id}
                      href={`#step-${step.id}`}
                      className="text-xs px-3 py-1.5 bg-white text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {step.icon} {step.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Steps List */}
            <div className="space-y-4">
              {filteredSteps.map((step, index) => (
                <div key={step.id} id={`step-${step.id}`}>
                  <StepCard
                    step={step}
                    isCompleted={progress?.completedSteps.includes(step.id) || false}
                    notes={progress?.stepProgress[step.id]?.notes || ""}
                    index={layoffSteps.indexOf(step)}
                    checkedItems={progress?.stepProgress[step.id]?.checkedItems || []}
                    onToggle={() => toggleStep(step.id)}
                    onNotesChange={(notes) => updateStepNotes(step.id, notes)}
                    onCheckItem={(item) => toggleCheckItem(step.id, item)}
                  />
                </div>
              ))}
            </div>

            {/* Completion Message */}
            {progressPercentage === 100 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-100 text-center"
              >
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-semibold text-green-900 mb-2">恭喜！你已经完成了所有步骤</h3>
                <p className="text-sm text-green-800 mb-4">
                  你已经顺利度过了裁员的全过程。现在可以专注于新的开始！
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/tools/severance"
                    className="text-sm px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  >
                    计算赔偿
                  </Link>
                  <Link
                    href="/tools/unemployment"
                    className="text-sm px-4 py-2 bg-white text-green-700 rounded-full hover:bg-green-100 transition-colors"
                  >
                    查询失业金
                  </Link>
                </div>
              </motion.div>
            )}

            {/* 相关权益工具 */}
            <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
              <h3 className="font-semibold mb-4">🔧 相关权益工具</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "被裁赔偿计算器", desc: "精准计算N、N+1、2N赔偿金额", href: "/tools/severance", icon: "🧮" },
                  { title: "失业金计算器", desc: "查询你所在城市的失业金标准", href: "/tools/unemployment", icon: "💰" },
                  { title: "社保断缴影响", desc: "了解断缴对医保、购房等的影响", href: "/tools/social-insurance", icon: "🛡️" },
                  { title: "仲裁流程指南", desc: "劳动仲裁全流程详解", href: "/guides/arbitration", icon: "⚖️" },
                  { title: "被裁谈判技巧", desc: "如何跟HR谈判争取更好方案", href: "/guides/negotiation", icon: "💪" },
                  { title: "AI裁员模拟", desc: "模拟HR谈话，练习应对策略", href: "/ai-simulation", icon: "🤖" },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl">{tool.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{tool.title}</div>
                      <div className="text-xs text-gray-400">{tool.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="font-semibold text-lg mb-2">确认重置进度？</h3>
            <p className="text-sm text-gray-600 mb-4">
              这将清除所有已完成的步骤和笔记，操作无法撤销。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 text-sm px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="flex-1 text-sm px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                确认重置
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Share Card Modal */}
      {showShareCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">分享维权进度</h3>
              <button
                onClick={() => setShowShareCard(false)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>

            {/* Share Card Content */}
            <div
              ref={shareCardRef}
              style={{
                width: 400,
                background: "#ffffff",
                borderRadius: 16,
                overflow: "hidden",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              }}
            >
              {/* Gradient top bar */}
              <div
                style={{
                  height: 8,
                  background: "linear-gradient(to right, #4ade80, #22c55e)",
                }}
              />

              <div style={{ padding: "24px 28px 20px" }}>
                {/* Title */}
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#111" }}>
                  📋 维权进度 · 追踪卡
                </div>

                {/* Progress info */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, color: "#6b7280" }}>完成进度</span>
                    <span style={{ fontSize: 22, fontWeight: 700, color: "#16a34a" }}>{progressPercentage}%</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: 8, background: "#f3f4f6", borderRadius: 4, overflow: "hidden", marginBottom: 6 }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${progressPercentage}%`,
                        background: "linear-gradient(to right, #4ade80, #22c55e)",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 13, color: "#9ca3af", textAlign: "right" as const }}>
                    {progress?.completedSteps.length || 0}/{layoffSteps.length} 步骤
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "#f3f4f6", marginBottom: 16 }} />

                {/* Completed steps */}
                {progress && progress.completedSteps.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 10 }}>
                      ✅ 已完成
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {layoffSteps
                        .filter((s) => progress.completedSteps.includes(s.id))
                        .slice(0, 8)
                        .map((step) => (
                          <div key={step.id} style={{ fontSize: 13, color: "#4b5563", display: "flex", alignItems: "flex-start", gap: 6 }}>
                            <span style={{ color: "#22c55e", flexShrink: 0 }}>{step.icon}</span>
                            <span>{step.title}</span>
                          </div>
                        ))}
                      {progress.completedSteps.length > 8 && (
                        <div style={{ fontSize: 12, color: "#9ca3af" }}>
                          ...还有 {progress.completedSteps.length - 8} 个步骤
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div style={{ height: 1, background: "#f3f4f6", marginBottom: 16 }} />
                <div style={{ textAlign: "center" as const }}>
                  <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 2 }}>
                    帮助你的牛马朋友们 →
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
                    裁了么 · caileme.team
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={async () => {
                  try {
                    const html2canvas = (await import("html2canvas")).default;
                    if (shareCardRef.current) {
                      const canvas = await html2canvas(shareCardRef.current, {
                        scale: 2,
                        backgroundColor: "#ffffff",
                        useCORS: true,
                      });
                      const link = document.createElement("a");
                      link.download = "维权进度追踪卡.png";
                      link.href = canvas.toDataURL("image/png");
                      link.click();
                    }
                  } catch {
                    alert("保存失败，请尝试截图保存");
                  }
                }}
                className="flex-1 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                💾 保存为图片
              </button>
              <button
                onClick={() => {
                  const completedNames = layoffSteps
                    .filter((s) => progress?.completedSteps.includes(s.id))
                    .map((s) => `${s.icon} ${s.title}`);
                  const text = [
                    `📋 维权进度 · 追踪卡`,
                    ``,
                    `完成进度: ${progressPercentage}% (${progress?.completedSteps.length || 0}/${layoffSteps.length}步骤)`,
                    ``,
                    `✅ 已完成:`,
                    ...completedNames.map((n) => `· ${n}`),
                    ``,
                    `帮助你的牛马朋友们 → caileme.team`,
                  ].join("\n");
                  navigator.clipboard.writeText(text).then(() => {
                    alert("已复制到剪贴板！");
                  }).catch(() => {
                    alert("复制失败，请手动复制");
                  });
                }}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                📋 复制文本
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
