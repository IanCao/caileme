"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLayoffProgress } from "@/hooks/useLayoffProgress";
import { layoffSteps, stepCategories, Step } from "@/data/layoffSteps";
import { StepCard } from "@/components/StepCard";

export default function LayoffTrackerPage() {
  const { progress, isLoading, toggleStep, updateStepNotes, resetProgress, getProgressPercentage } = useLayoffProgress();
  const [filter, setFilter] = useState<"all" | Step["category"]>("all");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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
              <button
                onClick={() => setShowResetConfirm(true)}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                重置进度
              </button>
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
                    onToggle={() => toggleStep(step.id)}
                    onNotesChange={(notes) => updateStepNotes(step.id, notes)}
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
    </div>
  );
}
