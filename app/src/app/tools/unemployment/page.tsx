"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cityPolicies, getCityByCode, getUnemploymentMonths } from "@/data/cityPolicies";
import CitySelector from "@/components/CitySelector";

export default function UnemploymentCalculator() {
  const [city, setCity] = useState("beijing");
  const [tablePage, setTablePage] = useState(1);
  const [insuranceYears, setInsuranceYears] = useState("");
  const [result, setResult] = useState<null | {
    monthlyAmount: number;
    totalMonths: number;
    totalAmount: number;
    cityName: string;
    notes: string;
  }>(null);

  const calculate = () => {
    const years = parseFloat(insuranceYears);
    if (isNaN(years) || years < 1) return;

    const cityInfo = getCityByCode(city);
    if (!cityInfo) return;

    const totalMonths = getUnemploymentMonths(years);
    const monthlyAmount = cityInfo.unemploymentBase;

    setResult({
      monthlyAmount,
      totalMonths,
      totalAmount: monthlyAmount * totalMonths,
      cityName: cityInfo.name,
      notes: cityInfo.unemploymentNotes,
    });
  };

  const fmt = (amount: number) =>
    new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      minimumFractionDigits: 0,
    }).format(amount);

  const cityInfo = getCityByCode(city);

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(cityPolicies.length / PAGE_SIZE);
  const pagedCities = cityPolicies.slice((tablePage - 1) * PAGE_SIZE, tablePage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            失业金计算器
          </h1>
          <p className="mt-4 text-gray-500 text-center text-lg">
            覆盖全国30+城市2026年最新标准
          </p>
        </motion.div>

        <motion.div
          className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="space-y-6">
            {/* 城市 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                所在城市
              </label>
              <CitySelector value={city} onChange={setCity} />
              {cityInfo && (
                <p className="mt-2 text-xs text-gray-400">
                  {cityInfo.name}失业金标准：{fmt(cityInfo.unemploymentBase)}/月 · {cityInfo.unemploymentNotes}
                </p>
              )}
            </div>

            {/* 社保缴纳年限 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                失业保险缴纳年限（年）
              </label>
              <input
                type="number"
                value={insuranceYears}
                onChange={(e) => setInsuranceYears(e.target.value)}
                placeholder="请输入缴纳年限"
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-base"
              />
            </div>

            <button
              onClick={calculate}
              className="w-full bg-black text-white py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
            >
              计算失业金
            </button>
          </div>

          {result && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 rounded-xl bg-surface text-center">
                  <div className="text-sm text-gray-500 mb-1">每月失业金</div>
                  <div className="text-2xl font-bold">{fmt(result.monthlyAmount)}</div>
                  <div className="text-xs text-gray-400 mt-1">{result.cityName}2026年标准</div>
                </div>
                <div className="p-6 rounded-xl bg-black text-white text-center">
                  <div className="text-sm text-gray-300 mb-1">可领取月数</div>
                  <div className="text-2xl font-bold">{result.totalMonths} 个月</div>
                </div>
                <div className="p-6 rounded-xl bg-success/10 text-center">
                  <div className="text-sm text-success mb-1">预计总金额</div>
                  <div className="text-2xl font-bold text-success">{fmt(result.totalAmount)}</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-accent/5 rounded-xl">
                <p className="text-sm text-accent">{result.notes}</p>
              </div>

              {(() => {
                const ci = getCityByCode(city);
                return ci?.unemploymentUrl ? (
                  <div className="mt-3 p-3 bg-surface rounded-xl flex items-center justify-between">
                    <span className="text-sm text-gray-600">🏛️ {result.cityName}失业金申领官网</span>
                    <a
                      href={ci.unemploymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent font-medium hover:underline"
                    >
                      前往申领 →
                    </a>
                  </div>
                ) : null;
              })()}
            </motion.div>
          )}
        </motion.div>

        {/* 各城市标准对比 */}
        <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-semibold mb-4">📊 2026年主要城市失业金标准</h3>
          <div className="overflow-x-auto min-h-[420px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium">城市</th>
                  <th className="pb-2 font-medium">月标准</th>
                  <th className="pb-2 font-medium">说明</th>
                  <th className="pb-2 font-medium">官网</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pagedCities.map((c) => (
                  <tr key={c.code} className="h-[42px]">
                    <td className="py-2 font-medium whitespace-nowrap">{c.name}</td>
                    <td className="py-2 text-accent font-medium whitespace-nowrap">{fmt(c.unemploymentBase)}</td>
                    <td className="py-2 text-gray-500 text-xs max-w-[200px] truncate" title={c.unemploymentNotes}>{c.unemploymentNotes}</td>
                    <td className="py-2">
                      {c.unemploymentUrl ? (
                        <a href={c.unemploymentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline whitespace-nowrap">查看 →</a>
                      ) : <span className="text-xs text-gray-300">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  共 {cityPolicies.length} 个城市，第 {tablePage}/{totalPages} 页
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTablePage(p => Math.max(1, p - 1))}
                    disabled={tablePage === 1}
                    className="px-3 py-1 text-xs rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                  >
                    上一页
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setTablePage(p)}
                      className={`w-7 h-7 text-xs rounded-lg transition-colors ${
                        tablePage === p ? "bg-black text-white" : "border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setTablePage(p => Math.min(totalPages, p + 1))}
                    disabled={tablePage === totalPages}
                    className="px-3 py-1 text-xs rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                  >
                    下一页
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 领取条件 */}
        <div className="mt-6 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-3">📋 领取条件</h3>
          <ul className="text-sm text-gray-500 space-y-2 leading-relaxed">
            <li>• 失业保险累计缴费满1年</li>
            <li>• 非因本人意愿中断就业（被裁员符合条件）</li>
            <li>• 已办理失业登记，并有求职要求</li>
            <li>• 缴费1-5年：最长领12个月</li>
            <li>• 缴费5-10年：最长领18个月</li>
            <li>• 缴费10年以上：最长领24个月</li>
          </ul>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
          <p className="text-xs text-yellow-700 leading-relaxed">
            ⚠️ 免责声明：各城市失业金标准每年调整，本计算器数据仅供参考。实际金额请以当地社保局公布的最新标准为准。
          </p>
        </div>
      </div>
    </div>
  );
}
