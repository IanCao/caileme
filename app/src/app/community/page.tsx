'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  allLayoffNews, allCommunityPosts, newsCities,
  type NewsItem, type CommunityPost,
} from '@/data/communityData';

type FeedItem =
  | { type: 'news'; tag: '被裁情报'; data: NewsItem }
  | { type: 'post'; tag: string; data: CommunityPost };

const allTags = ['全部', '被裁情报', '经验分享', '避坑指南', '仲裁经验', '再就业'];

function NewsModal({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold">{item.company}</h2>
              {item.verified ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">已核实</span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">待核实</span>
              )}
            </div>
            <p className="text-sm text-gray-400">{item.date}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-xs px-2.5 py-1 bg-surface rounded-lg text-gray-600">{item.city}</span>
          <span className="text-xs px-2.5 py-1 bg-surface rounded-lg text-gray-600">{item.industry}</span>
          <span className="text-xs px-2.5 py-1 bg-danger/5 rounded-lg text-danger">被裁 {item.ratio}</span>
          <span className="text-xs px-2.5 py-1 bg-accent/5 rounded-lg text-accent">赔偿 {item.compensation}</span>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="text-gray-700 leading-relaxed space-y-1">
            {item.detail.split('\n').map((line, i) => {
              const clean = line.replace(/\*\*/g, '');
              if (line.startsWith('**') && line.includes('**：')) {
                return <p key={i} className="font-bold text-black mt-3 mb-1">{clean}</p>;
              }
              if (line.startsWith('- ')) {
                return <p key={i} className="pl-4 text-sm">• {line.slice(2)}</p>;
              }
              if (line.startsWith('⚠️')) {
                return <p key={i} className="mt-3 text-sm text-yellow-700 bg-yellow-50 p-2 rounded-lg">{line}</p>;
              }
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="text-sm">{clean}</p>;
            })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
          来源：{item.source}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CommunityPage() {
  const [activeTag, setActiveTag] = useState('全部');
  const [selectedCity, setSelectedCity] = useState('全部');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [page, setPage] = useState(1);

  const allItems: FeedItem[] = [
    ...allLayoffNews.map((n): FeedItem => ({ type: 'news', tag: '被裁情报', data: n })),
    ...allCommunityPosts.map((p): FeedItem => ({ type: 'post', tag: p.category, data: p })),
  ].sort((a, b) => {
    const da = a.type === 'news' ? a.data.date : a.data.date;
    const db = b.type === 'news' ? b.data.date : b.data.date;
    return db.localeCompare(da);
  });

  const filteredItems = allItems.filter((item) => {
    if (activeTag !== '全部' && item.tag !== activeTag) return false;
    if (activeTag === '被裁情报' && selectedCity !== '全部' && item.type === 'news' && item.data.city !== selectedCity) return false;
    return true;
  });

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const pagedItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">社区广场</h1>
          <p className="mt-3 text-gray-500 text-base md:text-lg">
            被裁情报 · 经验分享 · 互助交流
          </p>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => { setActiveTag(tag); setSelectedCity('全部'); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTag === tag
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* City sub-filter for 裁员情报 */}
        {activeTag === '被裁情报' && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {newsCities.map((city) => (
              <button
                key={city}
                onClick={() => { setSelectedCity(city); setPage(1); }}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  selectedCity === city
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        )}

        {/* 操作按钮 */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/community/submit"
            className="inline-flex items-center gap-1.5 bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            ✏️ 匿名投稿
          </Link>
          <button
            onClick={() => setShowGroupModal(true)}
            className="inline-flex items-center gap-1.5 bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
          >
            💬 加入社群
          </button>
        </div>

        {/* Unified Feed */}
        <div className="mt-8 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">暂无相关内容</div>
          ) : (
            pagedItems.map((item) =>
              item.type === 'news' ? (
                <button
                  key={`news-${item.data.id}`}
                  onClick={() => setSelectedNews(item.data)}
                  className="w-full text-left bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-danger/10 text-danger font-medium">裁员情报</span>
                      <h3 className="font-semibold text-base">{item.data.company}</h3>
                      {item.data.verified && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-success/10 text-success">✓ 已核实</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{item.data.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-surface rounded text-gray-500">{item.data.city}</span>
                    <span className="text-xs px-2 py-0.5 bg-surface rounded text-gray-500">{item.data.industry}</span>
                    <span className="text-xs px-2 py-0.5 bg-danger/5 rounded text-danger">裁员 {item.data.ratio}</span>
                    <span className="text-xs px-2 py-0.5 bg-accent/5 rounded text-accent">赔偿 {item.data.compensation}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    涉及：{item.data.departments} · 来源：{item.data.source}
                    <span className="ml-2">👀 {item.data.viewCount || 0} 次查看</span>
                  </div>
                </button>
              ) : (
                <Link
                  key={`post-${item.data.id}`}
                  href={`/community/post/${item.data.id}`}
                  className="block bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{item.data.category}</span>
                    <span className="text-sm">{item.data.avatar}</span>
                    <span className="text-xs text-gray-500">{item.data.nickname}</span>
                    <span className="text-xs text-gray-400 ml-auto">{item.data.date}</span>
                  </div>
                  <h3 className="font-semibold text-base mb-1.5">{item.data.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.data.summary}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                    <span>💬 {item.data.comments.length} 条评论</span>
                    <span>👍 {item.data.likes}</span>
                    <span>👀 {item.data.viewCount || 0} 次查看</span>
                  </div>
                </Link>
              )
            )
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <span className="text-xs text-gray-400">
              共 {filteredItems.length} 条，第 {page}/{totalPages} 页
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-xs rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
              >
                上一页
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 text-xs rounded-lg transition-colors ${
                    page === p ? "bg-black text-white" : "border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 text-xs rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
              >
                下一页
              </button>
            </div>
          </div>
        )}

        {/* 底部 */}
        <div className="mt-10 p-5 sm:p-6 bg-white rounded-2xl border border-gray-100 text-center">
          <h3 className="font-semibold mb-2">📢 有信息要分享？</h3>
          <p className="text-sm text-gray-500 mb-4">匿名投稿裁员信息或经历，帮助更多人</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/community/submit" className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              匿名投稿
            </Link>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
          <p className="text-xs text-yellow-700 leading-relaxed">
            ⚠️ 免责声明：裁员信息来自公开报道和用户投稿，可能存在不准确之处。所有信息仅供参考，不代表本站立场。如信息有误，请联系我们更正。
          </p>
        </div>
      </div>

      {/* News Modal */}
      <AnimatePresence>
        {selectedNews && (
          <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} />
        )}
      </AnimatePresence>

      {/* 社群二维码弹窗 */}
      <AnimatePresence>
        {showGroupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowGroupModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-2">加入打工人互助社群</h3>
              <p className="text-sm text-gray-500 mb-4">扫描下方二维码，加入社群</p>
              <img src="/commu.jpg" alt="社群二维码" className="w-64 h-64 mx-auto rounded-xl object-cover" />
              <button
                onClick={() => setShowGroupModal(false)}
                className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
