"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cityPolicies, getCityByCode, getUnemploymentMonths } from "@/data/cityPolicies";
import CitySelector from "@/components/CitySelector";
import RelatedPages from "@/components/RelatedPages";

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
  const [showShareCard, setShowShareCard] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

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

              {/* 分享按钮 */}
              <button
                onClick={() => setShowShareCard(true)}
                className="mt-4 w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                📤 分享结果
              </button>
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

        {/* 分享卡片弹窗 */}
        <AnimatePresence>
          {showShareCard && result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={(e) => { if (e.target === e.currentTarget) setShowShareCard(false); }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto"
              >
                {/* 可截图的卡片区域 */}
                <div ref={shareCardRef} style={{
                  width: 400,
                  background: "#ffffff",
                  borderRadius: 20,
                  overflow: "hidden",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                  padding: 0,
                }}>
                  <div style={{ padding: "28px 28px 24px" }}>
                    {/* Logo + Brand */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                      <img src="/logo.png" width="32" height="32" style={{ borderRadius: 8 }} />
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "#1d1d1f", letterSpacing: -0.3 }}>裁了么</div>
                        <div style={{ fontSize: 11, color: "#86868b" }}>失业金估算结果</div>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div style={{ background: "#f5f5f7", borderRadius: 14, padding: "16px 18px", marginBottom: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 13, color: "#86868b" }}>城市</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1d1d1f" }}>{result.cityName}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 13, color: "#86868b" }}>失业保险缴纳年限</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1d1d1f" }}>{insuranceYears}年</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#86868b" }}>最长领取月数</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#1d1d1f" }}>{result.totalMonths}个月</span>
                      </div>
                    </div>

                    {/* Hero Amount */}
                    <div style={{ textAlign: "center" as const, marginBottom: 24 }}>
                      <div style={{ fontSize: 13, color: "#86868b", marginBottom: 4 }}>每月失业金</div>
                      <div style={{ fontSize: 44, fontWeight: 700, color: "#1d1d1f", letterSpacing: -2, lineHeight: 1 }}>{fmt(result.monthlyAmount)}</div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#86868b", marginTop: 8 }}>{result.cityName}2026年标准</div>
                    </div>

                    {/* Total Estimate */}
                    <div style={{ background: "#f5f5f7", borderRadius: 14, padding: "16px 18px", marginBottom: 24 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#86868b" }}>预计总金额</span>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "#1d1d1f" }}>{fmt(result.totalAmount)}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div style={{ borderTop: "1px solid #e5e5e7", paddingTop: 16, textAlign: "center" as const }}>
                      <div style={{ fontSize: 12, color: "#86868b" }}>
                        裁了么 · caileme.team
                      </div>
                    </div>
                  </div>
                </div>

                {/* 操作按钮（不在截图区域内） */}
                <div style={{ padding: "0 24px 20px", display: "flex", gap: 12 }}>
                  <button
                    onClick={async () => {
                      if (!shareCardRef.current) return;
                      try {
                        const html2canvas = (await import("html2canvas")).default;
                        const canvas = await html2canvas(shareCardRef.current, {
                          scale: 2,
                          backgroundColor: "#ffffff",
                          useCORS: true,
                        });
                        const link = document.createElement("a");
                        link.download = "裁了么-失业金估算结果.png";
                        link.href = canvas.toDataURL("image/png");
                        link.click();
                      } catch (e) {
                        console.error("Failed to generate image:", e);
                      }
                    }}
                    style={{ flex: 1, padding: "10px 0", borderRadius: 12, backgroundColor: "#0071e3", color: "#ffffff", fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer" }}
                  >
                    💾 保存为图片
                  </button>
                  <button
                    onClick={() => {
                      const lines = [
                        "【裁了么 · 失业金估算结果】",
                        `城市：${result.cityName}`,
                        `缴纳年限：${insuranceYears}年`,
                        `每月失业金：${fmt(result.monthlyAmount)}`,
                        `可领取月数：${result.totalMonths}个月`,
                        `预计总金额：${fmt(result.totalAmount)}`,
                        "——裁了么 · caileme.team",
                      ];
                      const text = lines.join("\n");
                      navigator.clipboard.writeText(text).then(() => {
                        setShareCopied(true);
                        setTimeout(() => setShareCopied(false), 2000);
                      });
                    }}
                    style={{ flex: 1, padding: "10px 0", borderRadius: 12, backgroundColor: "transparent", color: "#424245", fontSize: 14, fontWeight: 500, border: "1px solid #d2d2d7", cursor: "pointer" }}
                  >
                    {shareCopied ? "✅ 已复制" : "📋 复制文本"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900">领失业金前，建议顺手看这几个页面</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            这一类用户通常还会继续关心赔偿金额、社保断缴和城市政策差异。把这些页面串起来，比单页停留更适合后续广告收益。
          </p>
          <RelatedPages current="/tools/unemployment" count={4} />
        </section>
      </div>
    </div>
  );
}
