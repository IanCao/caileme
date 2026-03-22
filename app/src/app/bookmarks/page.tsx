"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useBookmarks, Bookmark } from "@/hooks/useBookmarks";
import { BookmarkButton } from "@/components/BookmarkButton";

export default function BookmarksPage() {
  const { bookmarks, isLoading, removeBookmark, clearAll } = useBookmarks();
  const [filter, setFilter] = useState<"all" | "severance" | "unemployment" | "article" | "guide">("all");

  const filteredBookmarks = bookmarks.filter(b =>
    filter === "all" || b.type === filter
  );

  const getTypeLabel = (type: string) => {
    const labels = {
      severance: "赔偿计算",
      unemployment: "失业金计算",
      article: "文章",
      guide: "指南",
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      severance: "🧮",
      unemployment: "💰",
      article: "📄",
      guide: "📋",
    };
    return icons[type as keyof typeof icons] || "📌";
  };

  const getTypeColor = (type: string) => {
    const colors = {
      severance: "bg-blue-50 text-blue-700",
      unemployment: "bg-green-50 text-green-700",
      article: "bg-purple-50 text-purple-700",
      guide: "bg-orange-50 text-orange-700",
    };
    return colors[type as keyof typeof colors] || "bg-gray-50 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-glass border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">我的收藏</h1>
              <p className="mt-1 text-gray-500 text-sm">
                共 {bookmarks.length} 个收藏项
              </p>
            </div>
            {bookmarks.length > 0 && (
              <button
                onClick={clearAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                清空全部
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: "all", label: "全部" },
              { id: "severance", label: "赔偿" },
              { id: "unemployment", label: "失业金" },
              { id: "article", label: "文章" },
              { id: "guide", label: "指南" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                  transition-colors duration-200
                  ${filter === tab.id
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
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
        ) : filteredBookmarks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📑</div>
            <h3 className="text-lg font-semibold mb-2">
              {filter === "all" ? "还没有收藏" : "该分类下没有收藏"}
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {filter === "all"
                ? "收藏计算结果或文章，方便随时查看"
                : "切换到其他分类看看吧"}
            </p>
            <Link
              href="/tools/severance"
              className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              开始计算赔偿
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredBookmarks.map((bookmark, index) => (
                <motion.div
                  key={bookmark.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-surface rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {getTypeIcon(bookmark.type)}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getTypeColor(bookmark.type)}`}>
                          {getTypeLabel(bookmark.type)}
                        </span>
                        {bookmark.cityName && (
                          <span className="text-xs text-gray-400">
                            {bookmark.cityName}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold mb-1 truncate">
                        {bookmark.title}
                      </h3>
                      {bookmark.summary && (
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {bookmark.summary}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        收藏于 {new Date(bookmark.createdAt).toLocaleDateString("zh-CN")}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <BookmarkButton
                        isBookmarked={true}
                        onToggle={() => removeBookmark(bookmark.id)}
                        size="md"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
