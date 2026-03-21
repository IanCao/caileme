"use client";

import { useState } from "react";
import Link from "next/link";

const feedbackTypes = [
  "功能建议",
  "内容纠错",
  "数据更新",
  "Bug反馈",
  "其他",
];

export default function FeedbackPage() {
  const [type, setType] = useState(feedbackTypes[0]);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // TODO: Replace with actual API call
    console.log({ type, description, email });

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3">感谢您的反馈！</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            我们已收到您的反馈，会认真阅读并持续改进。
            {email && "如有需要，我们会通过邮件与您联系。"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
            >
              返回首页
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setType(feedbackTypes[0]);
                setDescription("");
                setEmail("");
              }}
              className="inline-flex items-center justify-center px-6 py-2.5 border border-gray-300 text-sm rounded-full hover:bg-gray-50 transition-colors"
            >
              继续反馈
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          返回首页
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-3">意见反馈</h1>
        <p className="text-gray-500 leading-relaxed">
          您的建议是我们改进的动力。无论是功能建议、内容纠错还是Bug反馈，我们都非常欢迎。
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Feedback Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            反馈类型
          </label>
          <div className="flex flex-wrap gap-2">
            {feedbackTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                  type === t
                    ? "bg-[#0071e3] text-white border-[#0071e3]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            详细描述 <span className="text-red-400">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            placeholder="请描述您的建议或遇到的问题..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm leading-relaxed placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all duration-200 resize-none bg-white"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            联系方式{" "}
            <span className="text-gray-400 font-normal">（选填）</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="您的邮箱，方便我们回复您"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all duration-200 bg-white"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!description.trim() || submitting}
            className="w-full sm:w-auto px-8 py-3 bg-[#0071e3] text-white text-sm font-medium rounded-full hover:bg-[#0077ED] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
          >
            {submitting ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                提交中...
              </span>
            ) : (
              "提交反馈"
            )}
          </button>
        </div>
      </form>

      {/* Privacy note */}
      <p className="mt-8 text-xs text-gray-400 leading-relaxed">
        您提交的反馈仅用于改进裁了么的产品和服务。如提供联系方式，仅用于反馈沟通。详见{" "}
        <Link href="/privacy" className="underline hover:text-gray-600">
          隐私政策
        </Link>
        。
      </p>
    </div>
  );
}
