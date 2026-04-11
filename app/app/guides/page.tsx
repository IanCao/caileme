import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "裁员维权百科 - 被裁员怎么办完整攻略",
  description:
    "最全裁员维权指南：被裁当天怎么办、裁员谈判技巧、劳动仲裁流程、证据收集方法、社保公积金处理、竞业限制解读、职业重启攻略。7篇深度指南帮你从容应对裁员。",
  keywords: [
    "裁员指南",
    "被裁员怎么办",
    "裁员维权",
    "劳动法裁员",
    "裁员赔偿标准",
  ],
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "裁员维权百科 - 被裁员怎么办完整攻略",
    description:
      "最全裁员维权指南：被裁当天怎么办、裁员谈判技巧、劳动仲裁流程、证据收集方法、社保公积金处理、竞业限制解读、职业重启攻略。",
    url: "https://caileme.team/guides",
  },
};

const guides = [
  {
    slug: "layoff-day",
    title: "裁员当天怎么办",
    desc: "收到裁员通知后的第一步该做什么？完整行动清单，帮你冷静应对。",
    tag: "必读",
    tagColor: "bg-danger/10 text-danger",
    readTime: "8分钟",
  },
  {
    slug: "negotiation",
    title: "裁员谈判技巧",
    desc: "如何跟HR谈判争取更好的赔偿方案？话术、策略和底线全攻略。",
    tag: "热门",
    tagColor: "bg-accent/10 text-accent",
    readTime: "10分钟",
  },
  {
    slug: "arbitration",
    title: "仲裁流程指南",
    desc: "从申请到开庭，劳动仲裁全流程详解。什么情况该仲裁？怎么准备证据？",
    tag: "深度",
    tagColor: "bg-yellow-100 text-yellow-700",
    readTime: "12分钟",
  },
  {
    slug: "evidence-collection",
    title: "证据收集完全手册",
    desc: "录音合法吗？哪些证据仲裁认可？如何保存电子证据？详细的证据收集和保全指南。",
    tag: "实用",
    tagColor: "bg-success/10 text-success",
    readTime: "8分钟",
  },
  {
    slug: "social-insurance-guide",
    title: "离职后社保公积金处理",
    desc: "社保断缴怎么办？公积金怎么提取？医保如何不断缴？离职后的五险一金全攻略。",
    tag: "必看",
    tagColor: "bg-danger/10 text-danger",
    readTime: "10分钟",
  },
  {
    slug: "career-restart",
    title: "被裁后的职业重启指南",
    desc: "调整心态、优化简历、面试准备、谈薪策略、灵活就业选择。从低谷到重启的完整路径。",
    tag: "推荐",
    tagColor: "bg-purple-100 text-purple-700",
    readTime: "15分钟",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          裁员指南
        </h1>
        <p className="mt-3 sm:mt-4 text-gray-500 text-center text-base sm:text-lg">
          从裁员到再出发，每一步都有指导
        </p>

        <div className="mt-10 sm:mt-12 space-y-4 sm:space-y-6">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block"
            >
              <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-100 card-hover">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${guide.tagColor}`}
                      >
                        {guide.tag}
                      </span>
                      <span className="text-xs text-gray-400">
                        {guide.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      {guide.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {guide.desc}
                    </p>
                  </div>
                  <div className="text-gray-300 text-xl flex-shrink-0">→</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
