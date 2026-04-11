import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditorialTrustBlock from "@/components/EditorialTrustBlock";
import { cityPolicies, getCityByCode } from "@/data/cityPolicies";

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

  const title = `${city.name}裁员赔偿标准 2026：N+1、2N 和封顶基数怎么算`;
  const description = `${city.name}裁员赔偿标准 2026 汇总：三倍社平工资封顶基数 ${city.avgSalary3x.toLocaleString()} 元/月，教你看 N、N+1、2N、12 年上限和违法解除情形。`;
  const path = `/cities/${city.code}/severance`;

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

export default function CitySeverancePage({
  params,
}: {
  params: { code: string };
}) {
  const city = getCityByCode(params.code);

  if (!city) {
    notFound();
  }

  const canonicalUrl = `https://caileme.team/cities/${city.code}/severance`;
  const belowCapAmount = city.avgSalary * 3.5;
  const aboveCapSalary = Math.round(city.avgSalary3x * 1.35);
  const aboveCapAmount = city.avgSalary3x * 8;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${city.name}裁员赔偿的工资上限是多少？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${city.name} 2026 年经济补偿金计算时，三倍社平工资封顶基数约为 ${formatMoney(city.avgSalary3x)} 元/月。工资高于这个数时，通常按封顶基数计算。`,
        },
      },
      {
        "@type": "Question",
        name: `${city.name}N+1 和 2N 的区别是什么？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "N 是经济补偿金，N+1 通常是未提前 30 天通知时在 N 基础上加 1 个月工资，2N 常见于违法解除劳动合同情形。",
        },
      },
      {
        "@type": "Question",
        name: `${city.name}高工资被裁时赔偿年限有限制吗？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `如果工资高于 ${formatMoney(city.avgSalary3x)} 元/月，经济补偿金通常不仅按封顶基数计算，而且补偿年限最多按 12 年计算。`,
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
        name: `${city.name}裁员赔偿标准`,
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
          <span className="text-gray-700">{city.name}裁员赔偿标准</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">
          {city.name}裁员赔偿标准 2026：N、N+1、2N 怎么算
        </h1>
        <p className="mt-4 text-gray-500 text-base md:text-lg leading-relaxed">
          这页单独讲 {city.name} 被裁时最常见的赔偿问题：三倍社平工资封顶基数、
          高工资 12 年上限、N+1 和 2N 的区别，以及谈赔偿前应该先看哪些数字。
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">三倍封顶基数</div>
            <div className="mt-2 text-xl font-bold">
              {formatMoney(city.avgSalary3x)}
            </div>
            <div className="mt-1 text-xs text-gray-500">元 / 月</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">社平工资</div>
            <div className="mt-2 text-xl font-bold">
              {formatMoney(city.avgSalary)}
            </div>
            <div className="mt-1 text-xs text-gray-500">元 / 月</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">最低工资</div>
            <div className="mt-2 text-xl font-bold">
              {formatMoney(city.minWage)}
            </div>
            <div className="mt-1 text-xs text-gray-500">元 / 月</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="text-xs text-gray-400">高工资年限上限</div>
            <div className="mt-2 text-xl font-bold">12</div>
            <div className="mt-1 text-xs text-gray-500">年</div>
          </div>
        </div>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {city.name}裁员赔偿先看这三个数字
          </h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              第一，看你离职前 12 个月平均工资。这个数字决定赔偿基数，但如果高于{" "}
              {formatMoney(city.avgSalary3x)} 元/月，经济补偿部分通常按封顶基数算。
            </p>
            <p>
              第二，看工龄。每满 1 年通常按 1 个月工资补偿，6 个月以上不满 1 年按 1
              年算，不满 6 个月按半个月算。
            </p>
            <p>
              第三，看解除方式。协商解除常见是 N，未提前通知可能是 N+1，违法解除才更接近
              2N。
            </p>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {city.name}N、N+1、2N 的常见理解
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-surface p-5">
              <div className="text-sm font-semibold">N</div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                协商解除或合法解除时常见的经济补偿金，按工龄乘以工资基数计算。
              </p>
            </div>
            <div className="rounded-2xl bg-surface p-5">
              <div className="text-sm font-semibold">N+1</div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                如果公司没有提前 30 天书面通知，通常在 N 的基础上再加 1 个月工资作为代通知金。
              </p>
            </div>
            <div className="rounded-2xl bg-surface p-5">
              <div className="text-sm font-semibold">2N</div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                更常见于违法解除劳动合同，例如没有法定理由辞退、程序明显违法、保护期辞退等。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {city.name}高工资被裁时，为什么要先看封顶基数
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              {city.name} 当前三倍社平工资封顶基数约为 {formatMoney(city.avgSalary3x)} 元/月。
              如果你的平均工资超过这个数，经济补偿部分通常按封顶基数算，而不是按实际工资全额算。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-surface p-5">
                <div className="text-xs text-gray-400">样例 1：工资未超过封顶</div>
                <div className="mt-2 text-base font-semibold">
                  平均工资 {formatMoney(city.avgSalary)} 元，工龄 3.5 年
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  N 约为 {formatMoney(belowCapAmount)} 元，按实际平均工资计算。
                </p>
              </div>
              <div className="rounded-2xl bg-surface p-5">
                <div className="text-xs text-gray-400">样例 2：工资超过封顶</div>
                <div className="mt-2 text-base font-semibold">
                  平均工资 {formatMoney(aboveCapSalary)} 元，工龄 8 年
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  N 约为 {formatMoney(aboveCapAmount)} 元，经济补偿部分一般按封顶基数
                  {formatMoney(city.avgSalary3x)} 元/月计算。
                </p>
              </div>
            </div>
            <p>
              如果既高工资又长工龄，还要注意一个额外限制：经济补偿金常见按最多 12 年计算，
              所以高薪员工谈赔偿时更要先核清基数、年限和解除理由。
            </p>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-4">
            真的要谈赔偿时，下一步怎么做
          </h2>
          <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>先用计算器把平均工资、工龄、未休年假和不同解除方式全部跑一遍。</p>
            <p>再对照 {city.name} 的封顶基数，看自己是不是高工资封顶情形。</p>
            <p>如果公司理由站不住脚，或者程序明显违法，再评估是否往 2N 方向主张。</p>
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/tools/severance"
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">打开裁员赔偿计算器</div>
              <div className="mt-1 text-xs text-gray-500">
                结合 {city.name} 封顶基数计算 N、N+1、2N
              </div>
            </Link>
            <Link
              href={`/cities/${city.code}`}
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">返回 {city.name} 城市政策总页</div>
              <div className="mt-1 text-xs text-gray-500">
                继续看失业金、社保断缴和购房资格影响
              </div>
            </Link>
            <Link
              href={`/cities/${city.code}/unemployment`}
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">{city.name}失业金专题</div>
              <div className="mt-1 text-xs text-gray-500">
                被裁后要过渡现金流，可以接着看失业金标准和领取时长
              </div>
            </Link>
            <Link
              href="/guides/arbitration"
              className="block rounded-xl bg-surface p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium">劳动仲裁指南</div>
              <div className="mt-1 text-xs text-gray-500">
                如果赔偿谈不拢，下一步就看证据和仲裁流程
              </div>
            </Link>
          </div>
        </section>

        <EditorialTrustBlock
          updatedAt="2026-04-05"
          applicableScope={`${city.name} 经济补偿金、N+1、2N 和封顶基数规则摘要`}
          reviewedBy="裁了么编辑部"
          reviewMethod="结合劳动合同法通用规则与城市公开数据整理"
          disclaimer={`本页用于帮助你先判断 ${city.name} 被裁时的赔偿基数和常见争议点，不构成正式法律意见。涉及高工资封顶、违法解除或仲裁策略时，建议按个人材料再逐项复核。`}
          sources={[
            {
              label: `${city.name} 人社政策入口`,
              href: city.policyUrl,
            },
            {
              label: "全国人大法律法规数据库",
              href: "https://flk.npc.gov.cn",
            },
          ]}
        />

        <section className="mt-8 rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
          <p className="text-xs text-yellow-700 leading-relaxed">
            说明：本页是 {city.name} 裁员赔偿标准的搜索落地页，适合先快速判断赔偿基数和常见规则。
            真正核算时，仍建议回到计算器里按你的收入明细和工龄逐项计算。
          </p>
        </section>
      </div>
    </div>
  );
}
