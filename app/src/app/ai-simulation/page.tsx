"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { InteractiveSimulation } from "@/components/InteractiveSimulation";

export default function AISimulation() {
  const [showDevToast, setShowDevToast] = useState(false);

  useEffect(() => {
    if (showDevToast) {
      const timer = setTimeout(() => setShowDevToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showDevToast]);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            AI 裁员模拟
          </h1>
          <p className="mt-4 text-gray-500 text-center text-lg">
            模拟HR裁员对话，提前了解应对策略
          </p>
        </motion.div>

        {/* 互动模拟 */}
        <div className="mt-12">
          <InteractiveSimulation />
        </div>

        {/* AI 模拟场景（开发中） */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={() => setShowDevToast(true)}
            className="w-full text-left bg-gradient-to-r from-accent/5 to-purple-50 rounded-2xl p-6 border-2 border-accent/20 hover:border-accent/50 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">🤖 AI 模拟场景</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                    即将上线
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  AI 驱动的自由对话模拟，体验更真实的裁员谈判场景
                </p>
              </div>
              <span className="text-accent text-xl">→</span>
            </div>
          </button>
        </motion.div>

        {/* 免责 */}
        <div className="mt-8 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
          <p className="text-xs text-yellow-700 leading-relaxed">
            ⚠️ 免责声明：以上对话仅为模拟场景，供参考学习。不构成法律建议。每个人的情况不同，具体问题请咨询专业劳动法律师。
          </p>
        </div>
      </div>

      {/* Toast 通知 */}
      {showDevToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-full shadow-lg text-sm"
        >
          该功能正在开发中，敬请期待
        </motion.div>
      )}
    </div>
  );
}
