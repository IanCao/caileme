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

  const title = `${city.name}裁员赔偿、失业金和社保断缴政策 2026`;
  const description = `${city.name}最新政策汇总：赔偿封顶基数 ${city.avgSalary3x.toLocaleString()} 元，失业金约 ${city.unemploymentBase.toLocaleString()} 元/月，医保宽限 ${city.medicalGraceDays} 天。`;
  const path = `/cities/${city.code}`;

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

export default function CityPolicyPage({
  params,
}: {
  params: { code: string };
}) {
  const city = getCityByCode(params.code);

  if (!city) {
    notFound();
  }

  const canonicalUrl = `https://caileme.team/cities/${city.code}`;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${city.name}裁员赔偿封顶基数是多少？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name}当前用于经济补偿金计算的三倍社平工资上限约为 ${city.avgSalary3x.toLocaleString()} 元/月。高于这个数的工资部分通常不再按实际工资计算。`,
        },
      },
      {
        "@type": "Question",
        name: `${city.name}失业金大概能领多少？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name}当前失业金月标准约为 ${city.unemploymentBase.toLocaleString()} 元。具体金额还要看当地发放档次和你的缴费年限。`,
        },
      },
      {
        "@type": "Question",
        name: `${city.name}社保断缴后医保多久受影响？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name}通常在断缴超过 ${city.medicalGraceDays} 天后，医保待遇会中断或进入等待期。超过宽限期后，恢复报销前的等待期约为 ${city.medicalWaitMonths} 个月。`,
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
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/cities" className="hover:text-black transition-colors">
            城市政策专题
          </Link>
          <span>/</span>
          <span className="text-gray-700">{city.name}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">
          {city.name}裁员赔偿、失业金和社保断缴政策
        </h1>
        <p className="mt-4 text-gray-500 text-base md:text-lg leading-relaxed">
          这页聚合的是 {city.name} 当前与被裁打工人最相关的几个政策点：
          赔偿封顶基数、失业金标准、医保断缴影响、购房和落户连续缴纳要求。
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">赔偿封顶基数</div>
            <div className="mt-2 text-xl font-bold">
              {city.avgSalary3x.toLocaleString()}
            </div>
            <div className="mt-1 text-xs text-gray-500">元 / 月</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">最低工资</div>
            <div className="mt-2 text-xl font-bold">
              {city.minWage.toLocaleString()}
            </div>
            <div className="mt-1 text-xs text-gray-500">元 / 月</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">失业金参考</div>
            <div className="mt-2 text-xl font-bold">
              {city.unemploymentBase.toLocaleString()}
            </div>
            <div className="mt-1 text-xs text-gray-500">元 / 月</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">医保宽限期</div>
            <div className="mt-2 text-xl font-bold">{city.medicalGraceDays}</div>
            <div className="mt-1 text-xs text-gray-500">天</div>
          </div>
        </div>

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href={`/cities/${city.code}/severance`}
            className="block rounded-2xl border border-gray-100 bg-white p-6 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="text-xs text-gray-400">高意图专题</div>
            <h2 className="mt-2 text-xl font-semibold">
              {city.name}裁员赔偿标准 2026
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              单独看 {city.name} 的 N、N+1、2N、三倍封顶和 12 年上限，适合承接
              “{city.name}裁员赔偿标准”“{city.name}N+1 怎么算” 这类长尾词。
            </p>
            <div className="mt-4 text-sm font-medium text-accent">查看专题 →</div>
          </Link>
          <Link
            href={`/cities/${city.code}/unemployment`}
            className="block rounded-2xl border border-gray-100 bg-white p-6 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <div className="text-xs text-gray-400">高意图专题</div>
            <h2 className="mt-2 text-xl font-semibold">
              {city.name}失业金领取条件 2026
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              单独看 {city.name} 的失业金月标准、领取时长、申领入口和办理步骤，适合吃
              “{city.name}失业金多少钱”“{city.name}失业金怎么领” 这类词。
            </p>
            <div className="mt-4 text-sm font-medium text-accent">查看专题 →</div>
          </Link>
        </section>

        <section className="mt-10 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">{city.name}裁员赔偿怎么计算</h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              {city.name} 当前月社平工资约为 {city.avgSalary.toLocaleString()} 元，三倍封顶基数约为{" "}
              {city.avgSalary3x.toLocaleString()} 元。
            </p>
            <p>
              如果你的月平均工资高于这个封顶数，经济补偿金通常按封顶基数计算，而不是按你的实际工资全额计算。
            </p>
            <p>
              粗略理解就是：`N` 按工作年限算月数，`N+1` 是在此基础上多 1 个月代通知金，`2N` 常见于违法解除情形。
            </p>
            <p>
              真正落到个人，需要结合近 12 个月平均工资、工作年限、是否提前通知、年假补偿和税务处理一起核算。
            </p>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">{city.name}失业金标准与领取时长</h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>{city.unemploymentNotes}</p>
            {city.unemploymentHigh ? (
              <p>较高档标准约为 {city.unemploymentHigh.toLocaleString()} 元 / 月。</p>
            ) : null}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="rounded-xl bg-surface p-4">
                <div className="text-xs text-gray-400">缴费 1 年</div>
                <div className="mt-2 font-semibold">
                  约可领 {getUnemploymentMonths(1)} 个月
                </div>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <div className="text-xs text-gray-400">缴费 5 年</div>
                <div className="mt-2 font-semibold">
                  约可领 {getUnemploymentMonths(5)} 个月
                </div>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <div className="text-xs text-gray-400">缴费 10 年</div>
                <div className="mt-2 font-semibold">
                  约可领 {getUnemploymentMonths(10)} 个月
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">{city.name}社保断缴影响</h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              医保层面：断缴超过 {city.medicalGraceDays} 天后，通常会中断待遇或进入等待期，
              恢复报销前等待约 {city.medicalWaitMonths} 个月。
            </p>
            {city.medicalSpecialNote ? <p>{city.medicalSpecialNote}</p> : null}
            <p>购房资格：{city.housePurchaseNote}</p>
            {city.housePurchaseBreakNote ? <p>{city.housePurchaseBreakNote}</p> : null}
            {city.settlementNote ? <p>落户 / 积分：{city.settlementNote}</p> : null}
            {city.maternityNote ? <p>生育待遇：{city.maternityNote}</p> : null}
            {city.carLotteryNote ? <p>购车摇号：{city.carLotteryNote}</p> : null}
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">相关工具与专题入口</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={`/cities/${city.code}/severance`}
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">{city.name}裁员赔偿标准专题</div>
              <div className="mt-1 text-xs text-gray-500">
                先看本地封顶基数、12 年上限和 N+1 / 2N 规则
              </div>
            </Link>
            <Link
              href={`/cities/${city.code}/unemployment`}
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">{city.name}失业金专题</div>
              <div className="mt-1 text-xs text-gray-500">
                单独查看本地失业金金额、领取时长和申领入口
              </div>
            </Link>
            <Link
              href="/tools/severance"
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">裁员赔偿计算器</div>
              <div className="mt-1 text-xs text-gray-500">
                结合 {city.name} 封顶基数，核算 N、N+1、2N
              </div>
            </Link>
            <Link
              href="/tools/unemployment"
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">失业金计算器</div>
              <div className="mt-1 text-xs text-gray-500">
                查看 {city.name} 的失业金参考标准
              </div>
            </Link>
            <Link
              href="/tools/social-insurance"
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">社保断缴影响查询</div>
              <div className="mt-1 text-xs text-gray-500">
                快速看医保、购房、落户等影响
              </div>
            </Link>
            <a
              href={city.policyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">{city.name} 官方政策入口</div>
              <div className="mt-1 text-xs text-gray-500">{city.policyUrl}</div>
            </a>
          </div>
        </section>

        <EditorialTrustBlock
          updatedAt="2026-04-05"
          applicableScope={`${city.name} 劳动权益、失业金和社保断缴公开政策摘要`}
          reviewedBy="裁了么编辑部"
          reviewMethod="依据当地人社公开信息整理，并由站内规则模板复核"
          disclaimer={`本页适合快速了解 ${city.name} 的赔偿、失业金和社保断缴规则，但不同区县、不同办理场景可能存在执行差异，提交材料前请再核对官方最新口径。`}
          sources={[
            {
              label: `${city.name} 人社 / 政策入口`,
              href: city.policyUrl,
            },
            ...(city.unemploymentUrl
              ? [
                  {
                    label: `${city.name} 失业金申领入口`,
                    href: city.unemploymentUrl,
                  },
                ]
              : []),
          ]}
        />

        <section className="mt-8 rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
          <p className="text-xs text-yellow-700 leading-relaxed">
            说明：这个城市页现在已经作为专题枢纽页使用，下面继续拆出了
            “城市 + 裁员赔偿” 和 “城市 + 失业金” 两类长尾落地页。
            后面还可以继续扩到 “城市 + 仲裁流程” 和 “城市 + 证据清单”。
          </p>
        </section>
      </div>
    </div>
  );
}
