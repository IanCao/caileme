'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function ProofPage() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [ratio, setRatio] = useState('');
  const [compensation, setCompensation] = useState('');
  const [departments, setDepartments] = useState('');
  const [details, setDetails] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) return false;
      if (file.size > MAX_FILE_SIZE) return false;
      return true;
    });
    setImages((prev) => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, MAX_FILES);
    });
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
    if (!email || !company || !city) return;
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    setCompany('');
    setCity('');
    setDate('');
    setRatio('');
    setCompensation('');
    setDepartments('');
    setDetails('');
    setImages([]);
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {submitted ? (
          <div className="text-center py-20">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-6xl mb-6">✅</div>
              <h1 className="text-2xl font-bold mb-3">裁员证明提交成功</h1>
              <p className="text-gray-500 mb-8">感谢你的贡献！我们会核实信息后发布。</p>
              <div className="flex gap-4 justify-center">
                <Link href="/community" className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800">
                  返回社区
                </Link>
                <button onClick={handleReset} className="border border-gray-300 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white">
                  继续提交
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link href="/community" className="hover:text-black transition-colors">社区广场</Link>
                <span>/</span>
                <span className="text-gray-700">提交裁员证明</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold">提交裁员证明</h1>
              <p className="mt-3 text-gray-500 text-sm sm:text-base">
                提供裁员相关信息，帮助更多人了解行业动态。所有信息将在核实后发布。
              </p>
            </motion.div>

            <motion.form
              className="mt-8 bg-white rounded-2xl p-5 sm:p-8 border border-gray-100"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    你的邮箱 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="用于审核联系，不会公开" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      公司名称 <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                      placeholder="可使用代称，如'某大厂'" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      所在城市 <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text" value={city} onChange={(e) => setCity(e.target.value)}
                      placeholder="如：北京" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">裁员时间</label>
                    <input
                      type="text" value={date} onChange={(e) => setDate(e.target.value)}
                      placeholder="如：2026年3月"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">裁员比例</label>
                    <input
                      type="text" value={ratio} onChange={(e) => setRatio(e.target.value)}
                      placeholder="如：约20%"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">赔偿方案</label>
                    <input
                      type="text" value={compensation} onChange={(e) => setCompensation(e.target.value)}
                      placeholder="如：N+1"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">涉及部门</label>
                    <input
                      type="text" value={departments} onChange={(e) => setDepartments(e.target.value)}
                      placeholder="如：技术部、市场部"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">详细说明</label>
                  <textarea
                    value={details} onChange={(e) => setDetails(e.target.value)}
                    placeholder="补充更多信息，如裁员原因、沟通过程等。注意保护个人隐私。"
                    rows={5}
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
                        ? 'border-[#0071e3] bg-blue-50/50'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
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
                        e.target.value = '';
                      }}
                    />
                    <div className="text-3xl mb-2">📷</div>
                    <p className="text-sm text-gray-500">
                      点击或拖拽上传图片
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      支持 JPG、PNG、GIF、WebP，最多 {MAX_FILES} 张，每张不超过 5MB
                    </p>
                  </div>

                  {images.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {images.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="relative group rounded-xl overflow-hidden border border-gray-100 bg-white"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-24 object-cover"
                            onLoad={(e) =>
                              URL.revokeObjectURL(
                                (e.target as HTMLImageElement).src
                              )
                            }
                          />
                          <div className="px-2 py-1.5">
                            <p className="text-xs text-gray-600 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatFileSize(file.size)}
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
                  disabled={submitting || !email || !company || !city}
                  className="w-full bg-black text-white py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? '提交中...' : '提交裁员证明'}
                </button>
              </div>
            </motion.form>

            <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
              <p className="text-xs text-yellow-700 leading-relaxed">
                提交须知：请确保信息真实准确。我们会对提交的信息进行核实，核实后会标记"已核实"状态。不要包含个人隐私信息或公司商业机密。
              </p>
            </div>

            {/* Email Fallback */}
            <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                也可以直接发送邮件到{' '}
                <a
                  href="mailto:submit@caileme.com?subject=裁员证明投稿"
                  className="text-[#0071e3] hover:underline font-medium"
                >
                  submit@caileme.com
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
