import type { Metadata } from "next";
import Link from "next/link";
import { cityPolicies } from "@/data/cityPolicies";

export const metadata: Metadata = {
  title: "城市政策专题 - 裁员赔偿、失业金与社保断缴政策汇总",
  description:
    "汇总全国热门城市的裁员赔偿上限、失业金标准、社保断缴影响和购房资格规则，适合搜索北京、上海、深圳、广州、杭州等城市政策长尾词。",
  alternates: {
    canonical: "/cities",
  },
  openGraph: {
    title: "城市政策专题 - 裁员赔偿、失业金与社保断缴政策汇总",
    description:
      "汇总全国热门城市的裁员赔偿上限、失业金标准、社保断缴影响和购房资格规则。",
    url: "https://caileme.team/cities",
  },
};

const hotCityCodes = new Set([
  "beijing",
  "shanghai",
  "guangzhou",
  "shenzhen",
  "hangzhou",
  "chengdu",
  "wuhan",
  "nanjing",
]);

export default function CitiesPage() {
  const hotCities = cityPolicies.filter((city) => hotCityCodes.has(city.code));

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          城市政策专题
        </h1>
        <p className="mt-4 text-gray-500 text-center text-base md:text-lg max-w-3xl mx-auto">
          按城市查看裁员赔偿封顶基数、失业金标准、社保断缴影响和购房资格规则。
          这类页面就是站点后续拿城市长尾流量的基础模板。
        </p>

        <section className="mt-12">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
            <h2 className="text-xl font-semibold">热门城市</h2>
            <Link href="/tools" className="text-sm text-accent hover:underline">
              返回工具页 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotCities.map((city) => (
              <Link
                key={city.code}
                href={`/cities/${city.code}`}
                className="block bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{city.name}</h3>
                  <span className="text-xs text-gray-400">{city.province}</span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>赔偿封顶基数：{city.avgSalary3x.toLocaleString()} 元</p>
                  <p>失业金约：{city.unemploymentBase.toLocaleString()} 元/月</p>
                  <p>医保宽限：{city.medicalGraceDays} 天</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-5">全部城市</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityPolicies.map((city) => (
              <Link
                key={city.code}
                href={`/cities/${city.code}`}
                className="block bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{city.name}</h3>
                  <span className="text-xs text-gray-400">{city.province}</span>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>最低工资：{city.minWage.toLocaleString()} 元/月</p>
                  <p>失业金：{city.unemploymentBase.toLocaleString()} 元/月</p>
                  <p>
                    购房要求：
                    {city.housePurchaseMonths > 0
                      ? `连续 ${city.housePurchaseMonths} 个月`
                      : "多数场景已无连续社保要求"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-3">使用建议</h2>
          <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <p>先看你所在城市的赔偿封顶基数，再去用赔偿计算器核算具体金额。</p>
            <p>如果你更关心失业过渡期，就优先看失业金标准、医保宽限期和社保断缴等待期。</p>
            <p>这些城市页适合后续继续扩展到 “城市 + 工具” 和 “城市 + 问题” 的长尾模板。</p>
          </div>
        </section>
      </div>
    </div>
  );
}
