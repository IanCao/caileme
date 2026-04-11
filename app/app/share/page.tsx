"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getShareDataFromUrl, formatAmount } from "@/lib/shareUtils";
import { BookmarkButton } from "@/components/BookmarkButton";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function SharePage() {
  const [shareData, setShareData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleBookmark } = useBookmarks();

  useEffect(() => {
    const data = getShareDataFromUrl();
    if (data) {
      setShareData(data);
    } else {
      setError('无法解析分享链接，链接可能已过期或无效');
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
      </div>
    );
  }

  if (error || !shareData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold mb-2">链接无效</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/tools/severance"
            className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            开始计算赔偿
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <Link
            href="/tools/severance"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回计算器
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">计算结果分享</h1>
          <p className="mt-1 text-gray-500 text-sm">
            来自 {shareData.cityName} 的计算结果
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Summary Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{shareData.type === 'severance' ? '🧮' : '💰'}</span>
                <div>
                  <h2 className="font-semibold text-lg">
                    {shareData.type === 'severance' ? '赔偿计算结果' : '失业金计算结果'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    计算时间: {new Date(shareData.calculatedAt).toLocaleString('zh-CN')}
                  </p>
                </div>
              </div>
              <BookmarkButton
                isBookmarked={false}
                onToggle={() => {
                  toggleBookmark({
                    type: shareData.type,
                    title: `${shareData.recommended} - ${shareData.cityName}`,
                    data: shareData,
                    cityName: shareData.cityName,
                    summary: `赔偿金额: ${formatAmount(shareData.compensation)}`,
                  });
                }}
                size="lg"
              />
            </div>

            {/* Main Result */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center mb-4">
              <div className="text-sm text-gray-300 mb-1">
                {shareData.type === 'severance' ? '赔偿金额' : '每月可领'}
              </div>
              <div className="text-4xl font-bold mt-2">
                {formatAmount(shareData.compensation)}
              </div>
              {shareData.type === 'severance' && (
                <div className="mt-2 text-sm text-gray-300">
                  {shareData.recommended}
                </div>
              )}
              {shareData.type === 'unemployment' && (
                <div className="mt-2 text-sm text-gray-300">
                  可领取 {shareData.months} 个月
                </div>
              )}
            </div>

            {/* Extras */}
            {shareData.extras && (
              <div className="space-y-2">
                {shareData.extras.annualLeave && (
                  <div className="flex justify-between text-sm p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">🏖️ 年假补偿</span>
                    <span className="font-medium text-blue-700">
                      {formatAmount(shareData.extras.annualLeave)}
                    </span>
                  </div>
                )}
                {shareData.extras.tax && (
                  <div className="flex justify-between text-sm p-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-700">💰 个税扣除</span>
                    <span className="font-medium text-yellow-700">
                      {formatAmount(shareData.extras.tax)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-semibold mb-3">ℹ️ 关于此分享</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• 此结果仅供参考，实际赔偿金额以公司最终确定为准</p>
              <p>• 计算基于{shareData.cityName}的最新政策数据</p>
              <p>• 如有疑问，建议咨询专业人士</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href={`/tools/${shareData.type}`}
              className="inline-block bg-black text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
            >
              我也要计算
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
