'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const layoffNews = [
  { id: 1, company: '某大厂A', industry: '电商', city: '北京', date: '2026年3月', ratio: '约15%', compensation: 'N+1', departments: '社区团购、本地生活', source: '多名员工确认', verified: true },
  { id: 2, company: '某科技公司B', industry: '云计算', city: '上海', date: '2026年3月', ratio: '约20%', compensation: 'N+3', departments: '海外业务、非核心部门', source: '内部邮件', verified: true },
  { id: 3, company: '某互联网C', industry: '社交', city: '深圳', date: '2026年2月', ratio: '整个事业部', compensation: 'N+1', departments: '教育事业部', source: '媒体报道', verified: true },
  { id: 4, company: '某游戏公司D', industry: '游戏', city: '广州', date: '2026年2月', ratio: '约30%', compensation: 'N', departments: '多个项目组', source: '脉脉爆料', verified: false },
  { id: 5, company: '某出行平台E', industry: '出行', city: '北京', date: '2026年1月', ratio: '约10%', compensation: 'N+1', departments: '国际化业务', source: '多名员工确认', verified: true },
  { id: 6, company: '某金融科技F', industry: '金融', city: '杭州', date: '2026年1月', ratio: '约25%', compensation: 'N+1', departments: '信贷、保险', source: '内部消息', verified: false },
  { id: 7, company: '某教育公司G', industry: '教育', city: '成都', date: '2026年1月', ratio: '约40%', compensation: 'N', departments: 'K12业务', source: '媒体报道', verified: true },
  { id: 8, company: '某电商H', industry: '电商', city: '武汉', date: '2025年12月', ratio: '约20%', compensation: 'N+1', departments: '自营物流', source: '内部消息', verified: false },
  { id: 9, company: '某AI公司I', industry: 'AI', city: '南京', date: '2026年2月', ratio: '约15%', compensation: 'N+2', departments: '商业化部门', source: '多名员工确认', verified: true },
  { id: 10, company: '某直播平台J', industry: '娱乐', city: '杭州', date: '2026年3月', ratio: '约10%', compensation: 'N+1', departments: '海外业务', source: '脉脉爆料', verified: false },
];

const communityPosts = [
  { id: 1, nickname: '匿名打工人', title: '大厂5年被裁经历，最终拿到N+3', content: '工作5年突然被约谈，一开始HR只给N，我坚持不签字，最后谈到了N+3。分享一下我的谈判过程和心路历程...', category: '经验分享', date: '2026-03-18', likes: 128 },
  { id: 2, nickname: '前端小张', title: '千万不要写辞职信！我的血泪教训', content: '被HR谈话后稀里糊涂签了"主动辞职"的文件，结果一分钱赔偿都没拿到。希望大家不要犯我同样的错...', category: '避坑指南', date: '2026-03-15', likes: 256 },
  { id: 3, nickname: '产品小王', title: '劳动仲裁全记录：从申请到胜诉', content: '公司违法裁员拒绝赔偿，我申请了劳动仲裁。整个过程花了2个月，最终裁决2N赔偿。分享完整流程...', category: '仲裁经验', date: '2026-03-10', likes: 342 },
  { id: 4, nickname: '运营老李', title: '被裁后3个月找到新工作的经验', content: '年初被裁后经历了一段迷茫期，后来通过调整心态、优化简历、扩大求职渠道，最终找到了更好的工作...', category: '再就业', date: '2026-03-05', likes: 89 },
  { id: 5, nickname: '测试老陈', title: '社保断缴3个月后的补缴经验', content: '被裁后没有及时处理社保，断缴了3个月。后来通过灵活就业方式补缴成功，这里记录一下流程...', category: '经验分享', date: '2026-03-01', likes: 67 },
  { id: 6, nickname: '后端小赵', title: '仲裁拿到2N赔偿的详细经过', content: '公司以"绩效不合格"为由裁员，我收集了所有证据，最终仲裁胜诉拿到2N。详细分享证据准备和庭审过程...', category: '仲裁经验', date: '2026-02-25', likes: 456 },
];

const newsCities = [
  '全部', '北京', '上海', '深圳', '广州', '杭州', '南京', '苏州',
  '成都', '武汉', '西安', '重庆', '天津', '长沙', '郑州', '厦门',
  '青岛', '东莞', '合肥', '佛山', '无锡',
];

const postCategories = ['全部', '经验分享', '避坑指南', '仲裁经验', '再就业'];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'news' | 'posts'>('news');
  const [selectedCity, setSelectedCity] = useState('全部');
  const [selectedCategory, setSelectedCategory] = useState('全部');

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

        {/* Tab 切换 */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex bg-white rounded-full p-1 border border-gray-200 shadow-sm">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-5 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'news'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              📰 裁员动态
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-5 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'posts'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              💬 经历分享
            </button>
          </div>
        </div>

        {/* 投稿入口 */}
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
        </div>

        {/* 裁员动态 Tab */}
        {activeTab === 'news' && (
          <motion.div
            key="news"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 城市筛选 */}
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

            {/* 动态列表 */}
            <div className="mt-6 space-y-4">
              {filteredNews.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  暂无该城市的裁员动态
                </div>
              ) : (
                filteredNews.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <h3 className="font-semibold text-base sm:text-lg">{item.company}</h3>
                        {item.verified ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">已核实</span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">待核实</span>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-400 flex-shrink-0">{item.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                      <span className="text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 bg-surface rounded-lg text-gray-600">{item.city}</span>
                      <span className="text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 bg-surface rounded-lg text-gray-600">{item.industry}</span>
                      <span className="text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 bg-danger/5 rounded-lg text-danger">裁员 {item.ratio}</span>
                      <span className="text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 bg-accent/5 rounded-lg text-accent">赔偿 {item.compensation}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">
                      <span>涉及：{item.departments}</span>
                      <span className="mx-2">·</span>
                      <span>来源：{item.source}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* 经历分享 Tab */}
        {activeTab === 'posts' && (
          <motion.div
            key="posts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* 分类筛选 */}
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

            {/* 帖子列表 */}
            <div className="mt-6 space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 card-hover">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">{post.category}</span>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.content}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{post.nickname}</span>
                    <span className="text-xs text-gray-400">👍 {post.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 底部投稿 CTA */}
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

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            更多内容正在路上...欢迎
            <Link href="/community/submit" className="text-accent hover:underline mx-1">投稿</Link>
            分享你的经历
          </p>
        </div>
      </div>
    </div>
  );
}
