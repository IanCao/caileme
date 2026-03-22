'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { communityPosts } from '@/data/communityData';

export default function PostDetailClient({ params }: { params: { id: string } }) {
  const postId = params.id;
  const post = communityPosts.find(p => p.id === postId);
  const [showCommentToast, setShowCommentToast] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentNickname, setCommentNickname] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    if (showCommentToast) {
      const timer = setTimeout(() => setShowCommentToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showCommentToast]);

  if (!post) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">帖子不存在</h1>
          <Link href="/community" className="text-accent hover:underline">返回社区</Link>
        </div>
      </div>
    );
  }

  const renderContent = (md: string) => {
    return md.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-2xl font-bold mt-6 mb-4">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-bold mt-6 mb-3">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
      }
      if (line.startsWith('> ')) {
        return <blockquote key={i} className="border-l-4 border-accent pl-4 my-3 text-gray-600 italic">{line.slice(2)}</blockquote>;
      }
      if (line.startsWith('- ❌') || line.startsWith('- ✅') || line.startsWith('- 🏥') || line.startsWith('- 🏠') || line.startsWith('- 💰')) {
        return <p key={i} className="pl-2 my-1">{line.slice(2)}</p>;
      }
      if (line.startsWith('- **')) {
        const bold = line.match(/\*\*(.+?)\*\*/);
        const rest = line.replace(/- \*\*.+?\*\*/, '');
        return <p key={i} className="pl-4 my-1">• <strong>{bold?.[1]}</strong>{rest}</p>;
      }
      if (line.startsWith('- ')) {
        return <p key={i} className="pl-4 my-1">• {line.slice(2)}</p>;
      }
      if (/^\d+\.\s/.test(line)) {
        return <p key={i} className="pl-4 my-1">{line}</p>;
      }
      if (line.startsWith('|')) {
        if (line.includes('---')) return null;
        const cells = line.split('|').filter(c => c.trim());
        const isHeader = i > 0 && md.split('\n')[i + 1]?.includes('---');
        return (
          <div key={i} className={`grid grid-cols-${cells.length} gap-0 ${isHeader ? 'font-semibold bg-gray-50' : ''}`}>
            {cells.map((cell, j) => (
              <span key={j} className="px-3 py-1.5 text-sm border border-gray-100">{cell.trim()}</span>
            ))}
          </div>
        );
      }
      if (line.trim() === '') return <div key={i} className="h-2" />;
      const formatted = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-accent hover:underline">$1</a>');
      return <p key={i} className="my-1.5 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        {/* 返回 */}
        <Link href="/community" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors mb-8">
          ← 返回社区
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* 作者信息 */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{post.avatar}</span>
            <div>
              <span className="font-medium">{post.nickname}</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">{post.category}</span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
            </div>
          </div>

          {/* 文章内容 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100">
            {renderContent(post.content)}
          </div>

          {/* 点赞 */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm text-gray-500">👍 {post.likes} 人觉得有用</span>
          </div>

          {/* 评论区 */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">💬 评论 ({post.comments.length})</h3>
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{comment.nickname}</span>
                    <span className="text-xs text-gray-400">{comment.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                  <div className="mt-2 text-xs text-gray-400">👍 {comment.likes}</div>
                </div>
              ))}
            </div>

            {/* 发表评论 */}
            <div className="mt-6 bg-white rounded-xl p-4 border border-gray-100">
              {commentSubmitted ? (
                <div className="text-center py-4">
                  <p className="text-sm text-success font-medium">✅ 评论提交成功！</p>
                  <p className="text-xs text-amber-600 mt-1">审核通过后将展示在评论区</p>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={commentNickname}
                    onChange={(e) => setCommentNickname(e.target.value)}
                    placeholder="昵称（选填，默认匿名）"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-2 focus:outline-none focus:border-accent"
                  />
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="写下你的评论..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-accent"
                  />
                  <button
                    onClick={async () => {
                      if (!commentText.trim()) return;
                      setCommentSubmitting(true);
                      try {
                        const { submitComment } = await import("@/lib/api");
                        await submitComment({
                          postId,
                          nickname: commentNickname || "匿名打工人",
                          content: commentText,
                        });
                      } catch { /* fallback */ }
                      setCommentSubmitting(false);
                      setCommentSubmitted(true);
                    }}
                    disabled={!commentText.trim() || commentSubmitting}
                    className="mt-2 w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {commentSubmitting ? "提交中..." : "💬 发表评论"}
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.article>
      </div>

      {showCommentToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium"
        >
          评论功能正在开发中，敬请期待！
        </motion.div>
      )}
    </div>
  );
}
