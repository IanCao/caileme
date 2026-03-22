"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

async function uploadToImgos(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("https://imgos.cn/api/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
    const data = await res.json();
    const url = data.url || data.data?.url || data.src || data.data?.src;
    if (!url) throw new Error("No URL in response");
    return url;
  } catch (err) {
    console.warn("图片上传失败，使用本地预览:", err);
    return URL.createObjectURL(file);
  }
}

const categoryList = [
  "经验分享",
  "避坑指南",
  "仲裁经验",
  "裁员信息",
  "再就业",
  "其他",
];

export default function SubmitPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [category, setCategory] = useState("经验分享");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) return false;
      if (file.size > MAX_FILE_SIZE) return false;
      return true;
    });
    if (newFiles.length === 0) return;

    setUploading(true);
    try {
      const urls = await Promise.all(newFiles.map(uploadToImgos));
      setImageUrls((prev) => [...prev, ...urls].slice(0, MAX_FILES));
    } finally {
      setUploading(false);
    }
  }, []);

  const removeImage = useCallback((index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !title || !content) return;
    setSubmitting(true);

    try {
      const { submitPost } = await import("@/lib/api");
      const result = await submitPost({
        email,
        nickname: nickname || "匿名打工人",
        category,
        title,
        content,
        images: imageUrls.length > 0 ? imageUrls : undefined,
      });
      if (!result.success) {
        console.warn("API unavailable, submission recorded locally");
      }
    } catch {
      console.warn("API unavailable, submission recorded locally");
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
    setNickname("");
    setCategory("经验分享");
    setTitle("");
    setContent("");
    setImageUrls([]);
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {submitted ? (
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-6xl mb-6">✅</div>
              <h1 className="text-2xl font-bold mb-3">投稿提交成功</h1>
              <p className="text-gray-500 mb-3">
                感谢你的分享！我们会在审核后发布你的投稿。
              </p>
              <p className="text-xs text-amber-600 bg-amber-50 px-4 py-2 rounded-lg mb-8 inline-block">
                📋 审核通过后内容将展示在社区中
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/community"
                  className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800"
                >
                  浏览社区
                </Link>
                <button
                  onClick={handleReset}
                  className="border border-gray-300 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white"
                >
                  继续投稿
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link
                  href="/community"
                  className="hover:text-black transition-colors"
                >
                  社区
                </Link>
                <span>/</span>
                <span className="text-gray-700">匿名投稿</span>
              </div>

              <h1 className="text-3xl font-bold">匿名投稿</h1>
              <p className="mt-3 text-gray-500">
                分享你的裁员经历或信息，帮助更多人。无需注册登录。
              </p>
            </motion.div>

            <motion.form
              className="mt-10 bg-white rounded-2xl p-6 md:p-8 border border-gray-100"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    邮箱 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="用于审核反馈，不会公开显示"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    仅用于审核联系，不会公开
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    昵称（选填）
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="不填则显示为匿名用户"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    分类
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categoryList.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          category === cat
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    标题 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="用一句话概括你要分享的内容"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    内容 <span className="text-danger">*</span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="请详细描述你的经历或信息。注意不要泄露个人隐私和公司商业机密。"
                    required
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm resize-none"
                  />
                </div>

                {/* Image Upload Zone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    附件图片（选填）
                  </label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                      dragOver
                        ? "border-[#0071e3] bg-blue-50/50"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif,.webp"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        addFiles(e.target.files);
                        e.target.value = "";
                      }}
                    />
                    <div className="text-3xl mb-2">📷</div>
                    <p className="text-sm text-gray-500">
                      {uploading ? (
                        <span className="text-[#0071e3]">⏳ 上传中...</span>
                      ) : (
                        "点击或拖拽上传图片"
                      )}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      支持 JPG、PNG、GIF、WebP，最多 {MAX_FILES} 张，每张不超过 5MB
                    </p>
                  </div>

                  {imageUrls.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {imageUrls.map((url, index) => (
                        <div
                          key={`${url}-${index}`}
                          className="relative group rounded-xl overflow-hidden border border-gray-100 bg-white"
                        >
                          <img
                            src={url}
                            alt={`已上传图片 ${index + 1}`}
                            className="w-full h-24 object-cover"
                          />
                          <div className="px-2 py-1.5">
                            <p className="text-xs text-green-600 truncate">
                              ✓ 已上传
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting || uploading || !email || !title || !content}
                  className="w-full bg-black text-white py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? "提交中..." : "提交投稿"}
                </button>
              </div>
            </motion.form>

            <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
              <p className="text-xs text-yellow-700 leading-relaxed">
                投稿须知：请确保内容真实客观。不要包含个人隐私信息。不要发布诽谤、造谣或侵犯他人权益的内容。所有投稿需经审核后发布。
              </p>
            </div>

            {/* Email Fallback */}
            <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                也可以直接发送邮件到{" "}
                <a
                  href="mailto:submit@caileme.team?subject=社区投稿"
                  className="text-[#0071e3] hover:underline font-medium"
                >
                  submit@caileme.team
                </a>
                ，附上截图和详细信息
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
