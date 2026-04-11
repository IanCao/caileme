"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function BookmarkButton({
  isBookmarked,
  onToggle,
  size = "md",
  showLabel = false,
}: BookmarkButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    onToggle();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const sizeClasses = {
    sm: "w-8 h-8 text-base",
    md: "w-10 h-10 text-lg",
    lg: "w-12 h-12 text-xl",
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`
        flex items-center justify-center gap-2
        rounded-full transition-colors duration-200
        ${isBookmarked
          ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }
        ${sizeClasses[size]}
      `}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      aria-label={isBookmarked ? "取消收藏" : "添加收藏"}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isBookmarked ? "filled" : "outline"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isBookmarked ? "🔖" : "📑"}
        </motion.span>
      </AnimatePresence>

      {showLabel && (
        <span className="text-sm font-medium">
          {isBookmarked ? "已收藏" : "收藏"}
        </span>
      )}
    </motion.button>
  );
}
