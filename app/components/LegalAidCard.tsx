"use client";

import { motion } from "framer-motion";
import { LegalAid } from "@/data/legalAid";

interface LegalAidCardProps {
  aid: LegalAid;
  index: number;
}

export function LegalAidCard({ aid, index }: LegalAidCardProps) {
  const handleClick = () => {
    if (aid.url) {
      window.open(aid.url, "_blank");
    } else if (aid.phone) {
      window.location.href = `tel:${aid.phone}`;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`bg-white rounded-2xl border transition-all duration-200 ${
        aid.type === "free"
          ? "border-green-200 hover:border-green-300"
          : "border-gray-100 hover:border-gray-200"
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-lg px-2.5 py-0.5 rounded-full font-medium ${
                aid.type === "free"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {aid.type === "free" ? "免费" : "付费"}
              </span>
              {aid.verified && (
                <span className="text-sm">✓ 已认证</span>
              )}
            </div>
            <h3 className="font-semibold text-lg mb-1">{aid.name}</h3>
            {aid.organization && (
              <p className="text-sm text-gray-500">{aid.organization}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {aid.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {aid.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
          {aid.tags.length > 3 && (
            <span className="text-xs text-gray-400">
              +{aid.tags.length - 3}
            </span>
          )}
        </div>

        {/* Expertise */}
        {aid.expertise && aid.expertise.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-700 mb-2">专业领域</h4>
            <div className="flex flex-wrap gap-2">
              {aid.expertise.slice(0, 2).map((exp, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="space-y-2 mb-4">
          {aid.price && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">💰</span>
              <span className="font-medium">{aid.price}</span>
              {aid.discount && (
                <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  {aid.discount}
                </span>
              )}
            </div>
          )}
          {aid.phone && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">📞</span>
              <span>{aid.phone}</span>
            </div>
          )}
          {aid.city && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">📍</span>
              <span>{aid.city}</span>
            </div>
          )}
        </div>

        {/* Rating */}
        {aid.rating && (
          <div className="flex items-center gap-2 text-sm mb-4">
            <span className="text-yellow-500">⭐</span>
            <span className="font-medium">{aid.rating}</span>
            <span className="text-gray-400">({aid.reviewCount}评价)</span>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleClick}
          className={`w-full py-2.5 rounded-full text-sm font-medium transition-colors ${
            aid.type === "free"
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {aid.type === "free" ? "了解详情" : "联系律师"}
        </button>
      </div>
    </motion.div>
  );
}
