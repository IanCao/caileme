'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { CompanyRating, CommunityPost, NewsItem } from '@/data/communityData';

type CommunityPostPreview = Pick<
  CommunityPost,
  'id' | 'nickname' | 'avatar' | 'title' | 'category' | 'date' | 'summary'
>;

type FeedItem =
  | { type: 'news'; tag: '被裁情报'; data: NewsItem }
  | { type: 'post'; tag: string; data: CommunityPostPreview };

interface CommunityPageClientProps {
  newsItems: NewsItem[];
  postItems: CommunityPostPreview[];
  newsCities: string[];
  redCompanies: CompanyRating[];
  blackCompanies: CompanyRating[];
}

const ALL_TAGS = ['全部', '被裁情报', '红黑厂信息', '经验分享', '避坑指南', '仲裁经验', '再就业'];

function formatNewsDetail(detail: string) {
  return detail.split('\n').map((line, index) => {
    const clean = line.replace(/\*\*/g, '').trim();

    if (!clean) {
      return <div key={index} className="h-2" />;
    }

    if (line.startsWith('**') && line.includes('：')) {
      return (
        <p key={index} className="mt-3 mb-1 font-semibold text-gray-900">
          {clean}
        </p>
      );
    }

    if (line.startsWith('- ')) {
      return (
        <p key={index} className="pl-4 text-sm text-gray-700">
          {'• '}
          {clean.slice(2)}
        </p>
      );
    }

    if (clean.startsWith('注意') || clean.startsWith('提示')) {
      return (
        <p key={index} className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
          {clean}
        </p>
      );
    }

    return (
      <p key={index} className="text-sm text-gray-700">
        {clean}
      </p>
    );
  });
}

function NewsModal({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">{item.company}</h2>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  item.verified
                    ? 'bg-success/10 text-success'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {item.verified ? '已核实' : '待核实'}
              </span>
            </div>
            <p className="text-sm text-gray-400">{item.date}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-gray-100"
            aria-label="关闭"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          <span className="rounded-lg bg-surface px-2.5 py-1 text-xs text-gray-600">{item.city}</span>
          <span className="rounded-lg bg-surface px-2.5 py-1 text-xs text-gray-600">{item.industry}</span>
          <span className="rounded-lg bg-danger/5 px-2.5 py-1 text-xs text-danger">被裁 {item.ratio}</span>
          <span className="rounded-lg bg-accent/5 px-2.5 py-1 text-xs text-accent">赔偿 {item.compensation}</span>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="space-y-1 leading-relaxed">{formatNewsDetail(item.detail)}</div>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-400">
          来源：{item.source}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CommunityPageClient({
  newsItems,
  postItems,
  newsCities,
  redCompanies,
  blackCompanies,
}: CommunityPageClientProps) {
  const [activeTag, setActiveTag] = useState('全部');
  const [selectedCity, setSelectedCity] = useState('全部');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [page, setPage] = useState(1);

  const allItems = useMemo<FeedItem[]>(
    () =>
      [
        ...newsItems.map((item) => ({ type: 'news' as const, tag: '被裁情报' as const, data: item })),
        ...postItems.map((item) => ({ type: 'post' as const, tag: item.category, data: item })),
      ].sort((a, b) => b.data.date.localeCompare(a.data.date)),
    [newsItems, postItems]
  );

  const filteredItems = allItems.filter((item) => {
    if (activeTag !== '全部' && item.tag !== activeTag) return false;
    if (
      activeTag === '被裁情报' &&
      selectedCity !== '全部' &&
      item.type === 'news' &&
      item.data.city !== selectedCity
    ) {
      return false;
    }
    return true;
  });

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const pagedItems = filteredItems.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold md:text-4xl">保护站信息</h1>
          <p className="mt-3 text-base text-gray-500 md:text-lg">被裁情报 · 经验分享 · 互助交流</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag);
                setSelectedCity('全部');
                setPage(1);
              }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeTag === tag
                  ? 'bg-black text-white shadow-sm'
                  : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-400'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {activeTag === '被裁情报' && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {newsCities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setPage(1);
                }}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
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

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/community/submit"
            className="inline-flex items-center gap-1.5 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            匿名投稿
          </Link>
          <button
            onClick={() => setShowGroupModal(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-green-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
          >
            加入社群
          </button>
        </div>

        {activeTag === '红黑厂信息' && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-green-100 bg-white p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <h3 className="font-bold text-green-700">红厂 · 值得尊重</h3>
              </div>
              {redCompanies.length > 0 ? (
                <div className="space-y-2">
                  {redCompanies.map((company, index) => (
                    <div key={`${company.name}-${index}`} className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-3">
                      <div>
                        <span className="text-sm font-medium">{company.name}</span>
                        {company.city ? <span className="ml-2 text-xs text-gray-400">{company.city}</span> : null}
                        {company.note ? <p className="mt-0.5 text-xs text-gray-500">{company.note}</p> : null}
                      </div>
                      <span className="whitespace-nowrap text-xs font-medium text-green-600">
                        👍 {company.praises} 次好评
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-gray-400">暂无数据，等你来推荐。</p>
              )}
            </div>

            <div className="rounded-2xl border border-red-100 bg-white p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <h3 className="font-bold text-red-700">黑厂 · 避坑预警</h3>
              </div>
              {blackCompanies.length > 0 ? (
                <div className="space-y-2">
                  {blackCompanies.map((company, index) => (
                    <div key={`${company.name}-${index}`} className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3">
                      <div>
                        <span className="text-sm font-medium">{company.name}</span>
                        {company.city ? <span className="ml-2 text-xs text-gray-400">{company.city}</span> : null}
                        {company.note ? <p className="mt-0.5 text-xs text-gray-500">{company.note}</p> : null}
                      </div>
                      <span className="whitespace-nowrap text-xs font-medium text-red-600">
                        ⚠️ {company.complaints} 次投诉
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-gray-400">暂无数据，等你来曝光。</p>
              )}
            </div>

            <div className="text-center md:col-span-2">
              <Link
                href="/community/submit"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                投稿红黑厂信息
              </Link>
              <p className="mt-2 text-xs text-gray-400">投稿后经审核展示，支持匿名。</p>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {activeTag !== '红黑厂信息' &&
            (filteredItems.length === 0 ? (
              <div className="py-12 text-center text-sm text-gray-400">暂无相关内容</div>
            ) : (
              pagedItems.map((item) =>
                item.type === 'news' ? (
                  <button
                    key={`news-${item.data.id}`}
                    onClick={() => setSelectedNews(item.data)}
                    className="w-full cursor-pointer rounded-2xl border border-gray-100 bg-white p-4 text-left transition-all hover:border-gray-300 hover:shadow-sm sm:p-5"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-danger/10 px-2 py-0.5 text-xs font-medium text-danger">
                          被裁情报
                        </span>
                        <h3 className="text-base font-semibold">{item.data.company}</h3>
                        {item.data.verified ? (
                          <span className="rounded-full bg-success/10 px-1.5 py-0.5 text-xs text-success">已核实</span>
                        ) : null}
                      </div>
                      <span className="flex-shrink-0 text-xs text-gray-400">{item.data.date}</span>
                    </div>
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      <span className="rounded bg-surface px-2 py-0.5 text-xs text-gray-500">{item.data.city}</span>
                      <span className="rounded bg-surface px-2 py-0.5 text-xs text-gray-500">{item.data.industry}</span>
                      <span className="rounded bg-danger/5 px-2 py-0.5 text-xs text-danger">被裁 {item.data.ratio}</span>
                      <span className="rounded bg-accent/5 px-2 py-0.5 text-xs text-accent">赔偿 {item.data.compensation}</span>
                    </div>
                    <div className="text-xs text-gray-400">涉及：{item.data.departments} · 来源：{item.data.source}</div>
                  </button>
                ) : (
                  <Link
                    key={`post-${item.data.id}`}
                    href={`/community/post/${item.data.id}`}
                    className="block rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-sm sm:p-5"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                        {item.data.category}
                      </span>
                      <span className="text-sm">{item.data.avatar}</span>
                      <span className="text-xs text-gray-500">{item.data.nickname}</span>
                      <span className="ml-auto text-xs text-gray-400">{item.data.date}</span>
                    </div>
                    <h3 className="mb-1.5 text-base font-semibold">{item.data.title}</h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">{item.data.summary}</p>
                    <div className="mt-3 text-xs text-gray-400">查看详情 →</div>
                  </Link>
                )
              )
            ))}
        </div>

        {activeTag !== '红黑厂信息' && totalPages > 1 ? (
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              共 {filteredItems.length} 条，第 {page}/{totalPages} 页
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                className="rounded-lg border border-gray-200 px-3 py-1 text-xs transition-colors hover:bg-gray-50 disabled:opacity-30"
              >
                上一页
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`h-7 w-7 rounded-lg text-xs transition-colors ${
                    page === pageNumber ? 'bg-black text-white' : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-gray-200 px-3 py-1 text-xs transition-colors hover:bg-gray-50 disabled:opacity-30"
              >
                下一页
              </button>
            </div>
          </div>
        ) : null}

        <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-5 text-center sm:p-6">
          <h3 className="mb-2 font-semibold">有信息要分享？</h3>
          <p className="mb-4 text-sm text-gray-500">匿名投稿裁员信息或经历，帮助更多人。</p>
          <Link
            href="/community/submit"
            className="inline-flex rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            匿名投稿
          </Link>
        </div>

        <div className="mt-6 rounded-xl border border-yellow-100 bg-yellow-50 p-4">
          <p className="text-xs leading-relaxed text-yellow-700">
            ⚠️ 免责声明：裁员信息来自公开报道和用户投稿，可能存在不准确之处。所有信息仅供参考，不代表本站立场。如信息有误，请联系我方更正。
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selectedNews ? <NewsModal item={selectedNews} onClose={() => setSelectedNews(null)} /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {showGroupModal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowGroupModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <h3 className="mb-2 text-xl font-bold">加入打工人互助社群</h3>
              <p className="mb-4 text-sm text-gray-500">扫描下方二维码，加入社群。</p>
              <Image
                src="/commu.png"
                alt="社群二维码"
                width={320}
                height={320}
                className="mx-auto rounded-xl object-contain"
              />
              <button
                onClick={() => setShowGroupModal(false)}
                className="mt-4 text-sm text-gray-500 transition-colors hover:text-gray-700"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
