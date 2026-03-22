'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  layoffNews, communityPosts, newsCities, postCategories,
  type NewsItem,
} from '@/data/communityData';

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
          <span className="text-xs px-2.5 py-1 bg-danger/5 rounded-lg text-danger">裁员 {item.ratio}</span>
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
  const [activeTab, setActiveTab] = useState<'news' | 'posts'>('news');
  const [selectedCity, setSelectedCity] = useState('全部');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showGroupToast, setShowGroupToast] = useState(false);

  useEffect(() => {
    if (showGroupToast) {
      const timer = setTimeout(() => setShowGroupToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showGroupToast]);

  const filteredNews = selectedCity === '全部'
    ? layoffNews
    : layoffNews.filter(n => n.city === selectedCity);

  const filteredPosts = selectedCategory === '全部'
    ? communityPosts
    : communityPosts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">社区广场</h1>
          <p className="mt-3 text-gray-500 text-base md:text-lg">
            裁员动态 · 经历分享 · 互助交流
          </p>
        </div>

        {/* Tab */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex bg-white rounded-full p-1 border border-gray-200 shadow-sm">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-5 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'news' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-black'
              }`}
            >
              📰 裁员动态
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-5 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'posts' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-black'
              }`}
            >
              💬 经历分享
            </button>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/community/submit"
            className="inline-flex items-center gap-1.5 bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            ✏️ 匿名投稿
          </Link>
          {activeTab === 'news' && (
            <Link
              href="/community/proof"
              className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 px-5 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors"
            >
              📋 提交裁员证明
            </Link>
          )}
          <button
            onClick={() => setShowGroupToast(true)}
            className="inline-flex items-center gap-1.5 bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
          >
            💬 加入社群
          </button>
        </div>

        {/* 裁员动态 */}
        {activeTab === 'news' && (
          <motion.div key="news" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mt-8 flex flex-wrap gap-2">
              {newsCities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm transition-colors ${
                    selectedCity === city
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              {filteredNews.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">暂无该城市的裁员动态</div>
              ) : (
                filteredNews.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedNews(item)}
                    className="w-full text-left bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <h3 className="font-semibold text-base sm:text-lg">{item.company}</h3>
                        {item.verified ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">已核实</span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">待核实</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs sm:text-sm text-gray-400">{item.date}</span>
                        <span className="text-gray-300">›</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                      <span className="text-xs px-2 py-0.5 bg-surface rounded-lg text-gray-600">{item.city}</span>
                      <span className="text-xs px-2 py-0.5 bg-surface rounded-lg text-gray-600">{item.industry}</span>
                      <span className="text-xs px-2 py-0.5 bg-danger/5 rounded-lg text-danger">裁员 {item.ratio}</span>
                      <span className="text-xs px-2 py-0.5 bg-accent/5 rounded-lg text-accent">赔偿 {item.compensation}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      <span>涉及：{item.departments}</span>
                      <span className="mx-2">·</span>
                      <span>来源：{item.source}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* 经历分享 */}
        {activeTab === 'posts' && (
          <motion.div key="posts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mt-8 flex flex-wrap gap-2">
              {postCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm transition-colors ${
                    selectedCategory === cat
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/post/${post.id}`}
                  className="block bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3">
                    <span className="text-lg">{post.avatar}</span>
                    <span className="text-xs font-medium text-gray-600">{post.nickname}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">{post.category}</span>
                    <span className="text-xs text-gray-400 ml-auto">{post.date}</span>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.summary}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">💬 {post.comments.length} 条评论</span>
                    <span className="text-xs text-gray-400">�� {post.likes}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* 底部 */}
        <div className="mt-10 p-5 sm:p-6 bg-white rounded-2xl border border-gray-100 text-center">
          <h3 className="font-semibold mb-2">📢 有信息要分享？</h3>
          <p className="text-sm text-gray-500 mb-4">匿名投稿裁员信息或经历，帮助更多人</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/community/submit" className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              匿名投稿
            </Link>
            <Link href="/community/proof" className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
              提交裁员证明
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

      {/* 社群 Toast */}
      <AnimatePresence>
        {showGroupToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium max-w-sm text-center"
          >
            💬 社群功能即将上线，敬请期待！
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
