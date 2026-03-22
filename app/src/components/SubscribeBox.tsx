"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscribe } from "@/hooks/useSubscribe";

interface SubscribeBoxProps {
  variant?: "hero" | "card" | "inline";
  showCity?: boolean;
  showIndustry?: boolean;
  defaultCity?: string;
  defaultIndustry?: string;
  className?: string;
}

export function SubscribeBox({
  variant = "card",
  showCity = false,
  showIndustry = false,
  defaultCity = "",
  defaultIndustry = "",
  className = "",
}: SubscribeBoxProps) {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(defaultCity);
  const [industry, setIndustry] = useState(defaultIndustry);
  const { subscribe, isLoading, message, setMessage } = useSubscribe();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage({ type: 'error', text: '请输入有效的邮箱地址' });
      return;
    }

    const success = await subscribe(email, city || undefined, industry || undefined);
    
    if (success) {
      setEmail("");
    }
  };

  const variantStyles = {
    hero: "bg-white border border-gray-200 shadow-lg",
    card: "bg-white border border-gray-100",
    inline: "bg-blue-50 border border-blue-100",
  };

  return (
    <div className={`${variantStyles[variant]} rounded-2xl p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="font-semibold text-base sm:text-lg mb-1">
          📧 订阅最新政策资讯
        </h3>
        <p className="text-xs text-gray-500">
          获取最新最低工资标准、失业保险金调整通知
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="请输入您的邮箱"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 text-sm"
          disabled={isLoading}
        />

        {/* City & Industry */}
        <div className="flex gap-3">
          {showCity && (
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 text-sm bg-white"
              disabled={isLoading}
            >
              <option value="">选择城市（可选）</option>
              <option value="北京">北京</option>
              <option value="上海">上海</option>
              <option value="广州">广州</option>
              <option value="深圳">深圳</option>
              <option value="杭州">杭州</option>
              <option value="南京">南京</option>
              <option value="成都">成都</option>
              <option value="武汉">武汉</option>
              <option value="重庆">重庆</option>
              <option value="天津">天津</option>
            </select>
          )}
          
          {showIndustry && (
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 text-sm bg-white"
              disabled={isLoading}
            >
              <option value="">选择行业（可选）</option>
              <option value="互联网">互联网</option>
              <option value="金融">金融</option>
              <option value="教育">教育</option>
              <option value="医疗">医疗</option>
              <option value="制造业">制造业</option>
              <option value="零售">零售</option>
              <option value="其他">其他</option>
            </select>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? "订阅中..." : "立即订阅"}
        </button>
      </form>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-3 p-3 rounded-lg text-sm ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Note */}
      <p className="mt-3 text-xs text-gray-400">
        🔒 我们尊重您的隐私，不会发送垃圾邮件
      </p>
    </div>
  );
}
