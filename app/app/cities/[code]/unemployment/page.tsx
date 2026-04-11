import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialTrustBlock from "@/components/EditorialTrustBlock";
import {
  cityPolicies,
  getCityByCode,
  getUnemploymentMonths,
} from "@/data/cityPolicies";

export const dynamicParams = false;

export function generateStaticParams() {
  return cityPolicies.map((city) => ({ code: city.code }));
}

export function generateMetadata({
  params,
}: {
  params: { code: string };
}): Metadata {
  const city = getCityByCode(params.code);

  if (!city) {
    return {
      title: "城市政策不存在",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${city.name}失业金领取条件 2026：每月多少钱，能领多久`;
  const description = `${city.name}失业金领取条件 2026 汇总：当前月标准约 ${city.unemploymentBase.toLocaleString()} 元，附领取月数、申领入口、常见条件和被裁后的办理顺序。`;
  const path = `/cities/${city.code}/unemployment`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: `https://caileme.team${path}`,
    },
  };
}

function formatMoney(amount: number): string {
  return amount.toLocaleString();
}

export default function CityUnemploymentPage({
  params,
}: {
  params: { code: string };
}) {
  const city = getCityByCode(params.code);

  if (!city) {
    notFound();
  }

  const canonicalUrl = `https://caileme.team/cities/${city.code}/unemployment`;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${city.name}失业金多少钱一个月？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: city.unemploymentHigh
            ? `${city.name} 当前失业金参考标准约为 ${formatMoney(city.unemploymentBase)} 至 ${formatMoney(city.unemploymentHigh)} 元/月，具体档次通常和缴费年限、当地发放规则有关。`
            : `${city.name} 当前失业金参考标准约为 ${formatMoney(city.unemploymentBase)} 元/月。`,
        },
      },
      {
        "@type": "Question",
        name: `${city.name}失业金最多能领多久？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "通常累计缴费 1 到 5 年最长约 12 个月，5 到 10 年最长约 18 个月，10 年以上最长约 24 个月。",
        },
      },
      {
        "@type": "Question",
        name: `${city.name}被裁后怎么领失业金？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "一般要先确认属于非本人意愿中断就业，再办理失业登记，准备解除劳动关系材料，然后通过当地人社或社保平台在线申领。",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: "https://caileme.team",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "城市政策专题",
        item: "https://caileme.team/cities",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.name,
        item: `https://caileme.team/cities/${city.code}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: `${city.name}失业金领取条件`,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
          <Link href="/cities" className="hover:text-black transition-colors">
            城市政策专题
          </Link>
          <span>/</span>
          <Link
            href={`/cities/${city.code}`}
            className="hover:text-black transition-colors"
          >
            {city.name}
          </Link>
          <span>/</span>
          <span className="text-gray-700">{city.name}失业金领取条件</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">
          {city.name}失业金领取条件 2026：每月多少钱，能领多久
        </h1>
        <p className="mt-4 text-gray-500 text-base md:text-lg leading-relaxed">
          这页单独讲 {city.name} 失业金最核心的问题：月标准、领取月数、被裁后申领条件、
          官方入口，以及赔偿谈判和失业金申领之间应该怎么安排顺序。
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">月标准参考</div>
            <div className="mt-2 text-xl font-bold">
              {formatMoney(city.unemploymentBase)}
            </div>
            <div className="mt-1 text-xs text-gray-500">元 / 月</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">较高档参考</div>
            <div className="mt-2 text-xl font-bold">
              {city.unemploymentHigh
                ? formatMoney(city.unemploymentHigh)
                : "无分档"}
            </div>
            <div className="mt-1 text-xs text-gray-500">元 / 月</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">最多领取</div>
            <div className="mt-2 text-xl font-bold">{getUnemploymentMonths(12)}</div>
            <div className="mt-1 text-xs text-gray-500">个月</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">医保宽限期</div>
            <div className="mt-2 text-xl font-bold">{city.medicalGraceDays}</div>
            <div className="mt-1 text-xs text-gray-500">天</div>
          </div>
        </div>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {city.name}失业金多少钱一个月
          </h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>{city.unemploymentNotes}</p>
            {city.unemploymentHigh ? (
              <p>
                如果当地按缴费年限或档次分层发放，较高档参考可以到
                {formatMoney(city.unemploymentHigh)} 元/月。
              </p>
            ) : null}
            <p>
              对很多被裁用户来说，失业金不能替代工资，但足够用来覆盖过渡期的一部分房租、
              医保和日常现金流，所以要尽快确认自己符不符合申领条件。
            </p>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {city.name}失业金能领多久
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-surface p-5">
              <div className="text-xs text-gray-400">累计缴费 1 年</div>
              <div className="mt-2 text-lg font-semibold">
                约 {getUnemploymentMonths(1)} 个月
              </div>
            </div>
            <div className="rounded-2xl bg-surface p-5">
              <div className="text-xs text-gray-400">累计缴费 5 年</div>
              <div className="mt-2 text-lg font-semibold">
                约 {getUnemploymentMonths(5)} 个月
              </div>
            </div>
            <div className="rounded-2xl bg-surface p-5">
              <div className="text-xs text-gray-400">累计缴费 10 年</div>
              <div className="mt-2 text-lg font-semibold">
                约 {getUnemploymentMonths(10)} 个月
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              常见规则是：累计缴费 1 到 5 年最长约 12 个月，5 到 10 年最长约 18 个月，
              10 年以上最长约 24 个月。
            </p>
            <p>
              真正能领多久，还是要看你在 {city.name} 或外地累计缴纳失业保险的年限，以及当地合并计算规则。
            </p>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {city.name}被裁后怎么领失业金
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <div className="rounded-2xl bg-surface p-5">
              <div className="font-medium">1. 确认属于非本人意愿中断就业</div>
              <p className="mt-2">
                一般被裁员、合同到期公司不续签、单位解除劳动关系等情形，更接近失业金申领范围。
              </p>
            </div>
            <div className="rounded-2xl bg-surface p-5">
              <div className="font-medium">2. 处理好离职材料</div>
              <p className="mt-2">
                重点保留解除或终止劳动关系证明、社保缴费记录、身份证明和银行卡信息。
              </p>
            </div>
            <div className="rounded-2xl bg-surface p-5">
              <div className="font-medium">3. 先做失业登记，再走线上申领</div>
              <p className="mt-2">
                大多数城市都支持通过人社局、社保局或政务平台线上办理，{city.name} 官方入口见下方。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">
            赔偿和失业金，哪个要先处理
          </h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              一般先把赔偿方案和离职证明处理清楚，再尽快做失业登记和申领失业金，避免材料不完整拖慢进度。
            </p>
            <p>
              如果你还在和公司谈 N+1、2N，至少先把解除时间、解除原因和证明材料固定下来，这些会直接影响后续申领。
            </p>
            <p>
              同时别忽略医保宽限期。{city.name} 断缴超过 {city.medicalGraceDays} 天后，医保待遇通常会受影响。
            </p>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">相关工具与官方入口</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/tools/unemployment"
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">打开失业金计算器</div>
              <div className="mt-1 text-xs text-gray-500">
                结合 {city.name} 标准和你的缴费年限估算金额
              </div>
            </Link>
            <Link
              href={`/cities/${city.code}`}
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">返回 {city.name} 城市政策总页</div>
              <div className="mt-1 text-xs text-gray-500">
                继续看裁员赔偿、社保断缴和购房资格影响
              </div>
            </Link>
            <Link
              href={`/cities/${city.code}/severance`}
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">{city.name}裁员赔偿专题</div>
              <div className="mt-1 text-xs text-gray-500">
                先核清赔偿金额，再安排失业过渡现金流
              </div>
            </Link>
            <a
              href={city.unemploymentUrl || city.policyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">{city.name}失业金官方入口</div>
              <div className="mt-1 text-xs text-gray-500">
                {city.unemploymentUrl || city.policyUrl}
              </div>
            </a>
          </div>
        </section>

        <EditorialTrustBlock
          updatedAt="2026-04-05"
          applicableScope={`${city.name} 失业保险待遇、申领条件和办理顺序摘要`}
          reviewedBy="裁了么编辑部"
          reviewMethod="依据城市公开失业保险信息整理，并与站内申领规则模板交叉检查"
          disclaimer={`本页主要帮助你快速判断 ${city.name} 失业金的大致金额、领取月数和办理顺序。实际可领金额、资格和材料要求，请以当地线上申领系统和人社部门最新说明为准。`}
          sources={[
            {
              label: `${city.name} 人社政策入口`,
              href: city.policyUrl,
            },
            {
              label: `${city.name} 失业金申领入口`,
              href: city.unemploymentUrl || city.policyUrl,
            },
          ]}
        />

        <section className="mt-8 rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
          <p className="text-xs text-yellow-700 leading-relaxed">
            说明：本页是 {city.name} 失业金领取条件的搜索落地页，适合先快速判断金额和领取时长。
            实际办理时，请以当地人社部门最新规则和线上系统显示为准。
          </p>
        </section>
      </div>
    </div>
  );
}
