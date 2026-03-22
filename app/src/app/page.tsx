"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const tools = [
  {
    title: "赔偿计算器",
    desc: "输入收入明细，精准计算N、N+1、2N裁员赔偿金额，自动对比社平工资上限。",
    href: "/tools/severance",
    icon: "🧮",
  },
  {
    title: "失业金计算器",
    desc: "覆盖全国20+城市2026年最新标准，预估每月领取金额和时长。",
    href: "/tools/unemployment",
    icon: "💰",
  },
  {
    title: "社保断缴影响",
    desc: "了解社保断缴对医保、购房、落户、购车的影响及应对方案。",
    href: "/tools/social-insurance",
    icon: "🛡️",
  },
];

const guides = [
  {
    title: "裁员当天怎么办",
    desc: "收到裁员通知后的第一步该做什么？完整行动清单。",
    href: "/guides/layoff-day",
  },
  {
    title: "裁员谈判技巧",
    desc: "如何跟HR谈判争取更好的赔偿方案？",
    href: "/guides/negotiation",
  },
  {
    title: "仲裁流程指南",
    desc: "从申请到开庭，劳动仲裁全流程详解。",
    href: "/guides/arbitration",
  },
];

// 贡献者/投稿人数据
const contributors = [
  { name: "匿名打工人", avatar: "👨‍💻", contribution: "分享大厂裁员经历" },
  { name: "前端小张", avatar: "👩‍💻", contribution: "避坑指南投稿" },
  { name: "产品小王", avatar: "👨‍🎓", contribution: "仲裁全记录" },
  { name: "运营老李", avatar: "👨‍💼", contribution: "再就业经验" },
  { name: "测试老陈", avatar: "🧑‍🔧", contribution: "社保补缴攻略" },
  { name: "后端小赵", avatar: "👩‍🎓", contribution: "仲裁2N经历" },
  { name: "设计师小林", avatar: "👩‍🎨", contribution: "裁员谈判策略" },
  { name: "数据分析师", avatar: "📊", contribution: "城市数据贡献" },
  { name: "法务顾问", avatar: "⚖️", contribution: "法律知识审核" },
  { name: "HR转型者", avatar: "🤝", contribution: "HR视角分享" },
  { name: "创业者老刘", avatar: "🚀", contribution: "职业转型指南" },
  { name: "自由职业者", avatar: "💡", contribution: "灵活就业经验" },
];

// 荣誉榜数据
const honorBoard = [
  { title: "最佳经验分享", name: "后端小赵", desc: "详细记录仲裁全过程，帮助500+人了解维权流程" },
  { title: "最受欢迎避坑指南", name: "前端小张", desc: "血泪教训分享，阅读量破万" },
  { title: "数据贡献之星", name: "数据分析师", desc: "整理20+城市最新政策数据" },
  { title: "最暖心回复", name: "运营老李", desc: "在社区积极回复帮助他人" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

function ScrollingAvatars() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let pos = 0;
    const speed = 0.5;
    const animate = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const doubled = [...contributors, ...contributors];

  return (
    <div className="overflow-hidden" ref={scrollRef} style={{ scrollBehavior: 'auto' }}>
      <div className="flex gap-4 sm:gap-6 w-max">
        {doubled.map((c, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[80px] sm:min-w-[100px]">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl sm:text-2xl shadow-sm">
              {c.avatar}
            </div>
            <span className="text-xs text-gray-600 font-medium whitespace-nowrap">{c.name}</span>
            <span className="text-[10px] text-gray-400 whitespace-nowrap">{c.contribution}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
          <motion.div
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-black/5 text-sm text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🛡️ 打工人的权益保障平台
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            裁员不是终点
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-400">
              而是下一段旅程的开始
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            赔偿计算 · 权益指南 · 谈判模拟 · 裁员情报
            <br />
            一个平台，全部搞定
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/tools/severance"
              className="bg-black text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-black/10"
            >
              计算我的赔偿
            </Link>
            <Link
              href="/guides"
              className="border border-gray-300 text-gray-700 px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-50 transition-colors"
            >
              查看裁员指南
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 投稿人/贡献者滚动展示 */}
      <section className="py-10 md:py-14 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">感谢每一位贡献者</h3>
          </div>
          <ScrollingAvatars />
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12 md:mb-16" {...fadeUp}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">权益保障工具箱</h2>
            <p className="mt-4 text-gray-500 text-base sm:text-lg">
              用数据武装自己，合理维护你的合法权益
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={tool.href} className="block h-full">
                  <div className="h-full p-6 sm:p-8 rounded-2xl bg-surface border border-gray-100 card-hover">
                    <div className="text-3xl sm:text-4xl mb-4">{tool.icon}</div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{tool.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {tool.desc}
                    </p>
                    <div className="mt-4 text-accent text-sm font-medium">
                      立即使用 →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/tools"
              className="inline-block text-accent font-medium hover:underline"
            >
              查看全部工具 →
            </Link>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12 md:mb-16" {...fadeUp}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">实用指南</h2>
            <p className="mt-4 text-gray-500 text-base sm:text-lg">
              从裁员到再出发，每一步都有指导
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {guides.map((guide, i) => (
              <motion.div
                key={guide.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={guide.href} className="block h-full">
                  <div className="h-full p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 card-hover">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">
                      {guide.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {guide.desc}
                    </p>
                    <div className="mt-4 text-accent text-sm font-medium">
                      阅读全文 →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/guides"
              className="inline-block text-accent font-medium hover:underline"
            >
              查看全部指南 →
            </Link>
          </div>
        </div>
      </section>

      {/* AI Simulation Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <div className="text-4xl sm:text-5xl mb-6">🤖</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">AI 裁员模拟</h2>
            <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              模拟HR裁员对话，提前练习应对策略。
              <br />
              知己知彼，谈判不慌。
            </p>
            <Link
              href="/ai-simulation"
              className="inline-block mt-8 bg-white text-black px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              开始模拟
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 裁员情报预览 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12 md:mb-16" {...fadeUp}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">裁员情报</h2>
            <p className="mt-4 text-gray-500 text-base sm:text-lg">
              关注行业最新裁员信息
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { company: "某大厂A", date: "2026年3月", city: "北京", ratio: "约15%", compensation: "N+1" },
              { company: "某科技公司B", date: "2026年2月", city: "上海", ratio: "约20%", compensation: "N+3" },
              { company: "某互联网C", date: "2026年2月", city: "深圳", ratio: "整个事业部", compensation: "N+1" },
              { company: "某游戏公司D", date: "2026年1月", city: "广州", ratio: "约30%", compensation: "N" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-4 sm:p-5 rounded-xl bg-surface border border-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{item.company}</span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span className="px-2 py-0.5 bg-gray-100 rounded">{item.city}</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded">裁员 {item.ratio}</span>
                  <span className="px-2 py-0.5 bg-blue-50 text-accent rounded">赔偿 {item.compensation}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/community"
              className="inline-block text-accent font-medium hover:underline"
            >
              查看全部情报 →
            </Link>
          </div>
        </div>
      </section>

      {/* 荣誉榜 */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">🏆 荣誉榜</h2>
            <p className="mt-4 text-gray-500 text-base sm:text-lg">
              感谢这些勇敢的分享者，他们的经历帮助了无数人
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {honorBoard.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">🏅</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-50 text-yellow-700 font-medium">
                    {item.title}
                  </span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm mb-4">每一份分享都是力量，团结起来守护我们的权益</p>
            <Link
              href="/community/submit"
              className="inline-block bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              ✏️ 我也要贡献
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { num: "20+", label: "城市覆盖" },
              { num: "2026", label: "最新数据" },
              { num: "免费", label: "全部工具" },
              { num: "100%", label: "匿名安全" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {stat.num}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
