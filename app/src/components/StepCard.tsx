"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Step } from "@/data/layoffSteps";

interface StepCardProps {
  step: Step;
  isCompleted: boolean;
  notes: string;
  index: number;
  onToggle: () => void;
  onNotesChange: (notes: string) => void;
}

export function StepCard({ step, isCompleted, notes, index, onToggle, onNotesChange }: StepCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState(notes);

  const handleSaveNotes = () => {
    onNotesChange(tempNotes);
    setIsEditingNotes(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`bg-white rounded-2xl border transition-all duration-200 ${
        isCompleted
          ? "border-green-200 bg-green-50/30"
          : "border-gray-100 hover:border-gray-200"
      }`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <motion.button
            onClick={onToggle}
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
              isCompleted
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            }`}
            whileTap={{ scale: 0.95 }}
            aria-label={isCompleted ? "标记为未完成" : "标记为完成"}
          >
            {isCompleted ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="text-lg font-bold">{index + 1}</span>
            )}
          </motion.button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{step.icon}</span>
              <h3 className={`font-semibold ${isCompleted ? "text-green-700" : "text-gray-900"}`}>
                {step.title}
              </h3>
              {isCompleted && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                  已完成
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{step.description}</p>

            {/* Notes Preview */}
            {notes && !isEditingNotes && (
              <div className="mb-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-xs text-yellow-800 line-clamp-2">📝 {notes}</p>
              </div>
            )}
          </div>

          {/* Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={isExpanded ? "收起详情" : "展开详情"}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              {/* Tips */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">💡 建议</h4>
                <ul className="space-y-2">
                  {step.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-accent">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Link to related tool */}
              {step.link && (
                <div className="mt-4">
                  <Link
                    href={step.link.href}
                    className="inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:underline"
                  >
                    {step.link.label} →
                  </Link>
                </div>
              )}

              {/* Notes Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">📝 我的笔记</h4>
                  {!isEditingNotes && (
                    <button
                      onClick={() => {
                        setIsEditingNotes(true);
                        setTempNotes(notes);
                      }}
                      className="text-xs text-accent hover:underline"
                    >
                      {notes ? "编辑" : "添加笔记"}
                    </button>
                  )}
                </div>

                {isEditingNotes ? (
                  <div className="space-y-2">
                    <textarea
                      value={tempNotes}
                      onChange={(e) => setTempNotes(e.target.value)}
                      placeholder="记录你的想法、重要信息..."
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 text-sm resize-none"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveNotes}
                        className="text-xs px-3 py-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                      >
                        保存
                      </button>
                      <button
                        onClick={() => setIsEditingNotes(false)}
                        className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                ) : (
                  notes ? (
                    <p className="text-sm text-gray-600 italic">"{notes}"</p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">还没有笔记</p>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
