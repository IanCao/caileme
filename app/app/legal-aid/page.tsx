"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { legalAidData, legalAidFilters, popularCities, LegalAid } from "@/data/legalAid";
import { LegalAidCard } from "@/components/LegalAidCard";

export default function LegalAidPage() {
  const [filter, setFilter] = useState<"all" | "free" | "paid">("all");
  const [city, setCity] = useState("全部城市");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAid = legalAidData.filter((aid) => {
    // 类型筛选
    if (filter !== "all" && aid.type !== filter) return false;

    // 城市筛选
    if (city !== "全部城市" && aid.city !== city) return false;

    // 搜索筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        aid.name.toLowerCase().includes(query) ||
        aid.description.toLowerCase().includes(query) ||
        aid.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        aid.expertise?.some((exp) => exp.toLowerCase().includes(query))
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-glass border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">⚖️ 法律援助</h1>
          <p className="text-gray-500 text-sm mb-6">
            免费法律援助资源 + 专业律师服务，守护你的合法权益
          </p>

          {/* Filters */}
          <div className="space-y-4">
            {/* Type Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {legalAidFilters.map((tab) => (
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

            {/* City Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {popularCities.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap
                    transition-colors duration-200
                    ${city === c
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索律师、机构或专业领域..."
                className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 text-sm"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          找到 {filteredAid.length} 个法律援助资源
        </div>

        {/* Free Aid Section */}
        {filter === "all" || filter === "free" ? (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🆓</span>
              <h2 className="text-xl font-semibold">免费法律援助</h2>
            </div>

            {filteredAid.filter((a) => a.type === "free").length === 0 ? (
              <div className="text-center py-12 bg-surface rounded-2xl">
                <p className="text-gray-500">没有找到符合条件的免费法律援助</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAid
                  .filter((a) => a.type === "free")
                  .map((aid, index) => (
                    <LegalAidCard key={aid.id} aid={aid} index={index} />
                  ))}
              </div>
            )}
          </section>
        ) : null}

        {/* Paid Aid Section */}
        {filter === "all" || filter === "paid" ? (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">⚖️</span>
              <h2 className="text-xl font-semibold">专业律师服务</h2>
            </div>

            {filteredAid.filter((a) => a.type === "paid").length === 0 ? (
              <div className="text-center py-12 bg-surface rounded-2xl">
                <p className="text-gray-500">没有找到符合条件的律师</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAid
                  .filter((a) => a.type === "paid")
                  .map((aid, index) => (
                    <LegalAidCard key={aid.id} aid={aid} index={index} />
                  ))}
              </div>
            )}
          </section>
        ) : null}

        {/* No Results */}
        {filteredAid.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-surface rounded-2xl"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-semibold mb-2">没有找到匹配的法律援助</h3>
            <p className="text-gray-500 text-sm mb-6">
              试试调整筛选条件或搜索关键词
            </p>
            <button
              onClick={() => {
                setFilter("all");
                setCity("全部城市");
                setSearchQuery("");
              }}
              className="text-sm px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              重置筛选
            </button>
          </motion.div>
        )}

        {/* Lawyer Partnership CTA */}
        {filter === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200"
          >
            <h3 className="font-semibold text-blue-900 mb-2">🤝 律师合作计划</h3>
            <p className="text-sm text-blue-800 mb-4">
              如果您是专业律师，欢迎加入我们的律师合作计划，为更多打工人提供法律援助服务。
              我们会为合作律师提供：
            </p>
            <ul className="text-sm text-blue-800 space-y-1 mb-4">
              <li>• 免费展示平台，扩大专业影响力</li>
              <li>• 精准获客，匹配有真实需求的客户</li>
              <li>• 灵活的合作模式和收益分配</li>
            </ul>
            <a
              href="mailto:contact@caileme.team?subject=%E5%BE%8B%E5%B8%88%E5%90%88%E4%BD%9C%E5%92%A8%E8%AF%A2"
              className="inline-block text-sm px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              申请成为合作律师
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
