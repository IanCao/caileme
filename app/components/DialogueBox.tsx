"use client";

import { motion, AnimatePresence } from "framer-motion";

interface DialogueBoxProps {
  messages: Array<{ role: "hr" | "user" | "system"; message: string }>;
}

export function DialogueBox({ messages }: DialogueBoxProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === "hr"
                  ? "bg-gray-100 text-gray-800 rounded-tl-sm"
                  : msg.role === "user"
                  ? "bg-black text-white rounded-tr-sm"
                  : "bg-blue-50 text-blue-800 w-full text-center"
              }`}
            >
              {msg.role === "hr" && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">👔</span>
                  <span className="text-xs font-medium text-gray-600">HR</span>
                </div>
              )}
              {msg.role === "system" && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">🎯</span>
                  <span className="text-xs font-medium text-blue-600">系统提示</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{msg.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
