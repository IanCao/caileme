"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cityPolicies, getCityByCode } from "@/data/cityPolicies";

type Situation = "negotiation" | "no_notice" | "illegal" | null;

interface CalcResult {
  avgSalary: number;
  effectiveSalary: number;
  isCapped: boolean;
  capAmount: number;
  compensationMonths: number;
  isYearsCapped: boolean;
  n: number;
  n1: number;
  n2: number;
  recommended: string;
  recommendedAmount: number;
  annualLeavePay: number;
  taxAmount: number;
  taxExempt: number;
  totalWithExtras: number;
}

export default function SeveranceCalculator() {
  const [city, setCity] = useState("beijing");
  const [monthlyIncomes, setMonthlyIncomes] = useState<string[]>(Array(12).fill(""));
  const [useSimple, setUseSimple] = useState(true);
  const [simpleSalary, setSimpleSalary] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("0");
  const [situation, setSituation] = useState<Situation>(null);
  const [unusedLeaveDays, setUnusedLeaveDays] = useState("");
  const [showIllegalInfo, setShowIllegalInfo] = useState(false);
  const [result, setResult] = useState<CalcResult | null>(null);

  const calculate = () => {
    if (!situation) return;
    const cityInfo = getCityByCode(city);
    if (!cityInfo) return;

    let avgSalary: number;
    if (useSimple) {
      avgSalary = parseFloat(simpleSalary);
      if (isNaN(avgSalary) || avgSalary <= 0) return;
    } else {
      const incomes = monthlyIncomes.map((v) => parseFloat(v) || 0);
      const total = incomes.reduce((a, b) => a + b, 0);
      const filledCount = incomes.filter((v) => v > 0).length;
      if (filledCount === 0) return;
      avgSalary = total / filledCount;
    }

    const workYears = parseFloat(years);
    if (isNaN(workYears)) return;
    const workMonths = parseFloat(months) || 0;

    const isCapped = avgSalary > cityInfo.avgSalary3x;
    const effectiveSalary = isCapped ? cityInfo.avgSalary3x : avgSalary;

    let compensationMonths = Math.floor(workYears);
    const remainingMonths = workMonths + (workYears - Math.floor(workYears)) * 12;
    if (remainingMonths >= 6) {
      compensationMonths += 1;
    } else if (remainingMonths > 0) {
      compensationMonths += 0.5;
    }

    const isYearsCapped = isCapped && compensationMonths > 12;
    if (isYearsCapped) compensationMonths = 12;

    const n = compensationMonths * effectiveSalary;
    const n1 = n + effectiveSalary;
    const n2 = compensationMonths * 2 * effectiveSalary;

    let recommended: string;
    let recommendedAmount: number;
    switch (situation) {
      case "negotiation":
        recommended = "经济补偿金（N）";
        recommendedAmount = n;
        break;
      case "no_notice":
        recommended = "代通知金（N+1）";
        recommendedAmount = n1;
        break;
      case "illegal":
        recommended = "违法裁员赔偿（2N）";
        recommendedAmount = n2;
        break;
      default:
        recommended = "";
        recommendedAmount = 0;
    }

    // 年假补偿：未休年假按日工资300%补偿（已发100%，额外补200%）
    const leaveDays = parseFloat(unusedLeaveDays) || 0;
    const dailyWage = avgSalary / 21.75;
    const annualLeavePay = leaveDays > 0 ? leaveDays * dailyWage * 2 : 0;

    // 经济补偿金个税计算
    // 免税额 = 当地上年职工平均工资3倍（注意这里是年平均工资3倍 = 月社平*12*3）
    const taxExempt = cityInfo.avgSalary * 3 * 12;
    const taxableBase = recommendedAmount - taxExempt;
    let taxAmount = 0;
    if (taxableBase > 0) {
      // 超过免税额的部分，单独适用综合所得税率表（不并入当年综合所得）
      // 简化计算：按年度一次性奖金税率表近似
      const taxableIncome = taxableBase;
      if (taxableIncome <= 36000) {
        taxAmount = taxableIncome * 0.03;
      } else if (taxableIncome <= 144000) {
        taxAmount = taxableIncome * 0.10 - 2520;
      } else if (taxableIncome <= 300000) {
        taxAmount = taxableIncome * 0.20 - 16920;
      } else if (taxableIncome <= 420000) {
        taxAmount = taxableIncome * 0.25 - 31920;
      } else if (taxableIncome <= 660000) {
        taxAmount = taxableIncome * 0.30 - 52920;
      } else if (taxableIncome <= 960000) {
        taxAmount = taxableIncome * 0.35 - 85920;
      } else {
        taxAmount = taxableIncome * 0.45 - 181920;
      }
      taxAmount = Math.max(0, Math.round(taxAmount * 100) / 100);
    }

    const totalWithExtras = recommendedAmount + annualLeavePay - taxAmount;

    setResult({
      avgSalary,
      effectiveSalary,
      isCapped,
      capAmount: cityInfo.avgSalary3x,
      compensationMonths,
      isYearsCapped,
      n, n1, n2,
      recommended,
      recommendedAmount,
      annualLeavePay,
      taxAmount,
      taxExempt,
      totalWithExtras,
    });
  };

  const fmt = (amount: number) =>
    new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      minimumFractionDigits: 0,
    }).format(Math.round(amount));

  const cityInfo = getCityByCode(city);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            裁员赔偿计算器
          </h1>
          <p className="mt-4 text-gray-500 text-center text-lg">
            精准计算赔偿金 + 年假补偿 + 个税
          </p>
        </motion.div>

        <motion.div
          className="mt-12 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-6">
            {/* Step 1: 城市选择 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">1</span>
                <label className="text-sm font-semibold">选择所在城市</label>
              </div>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-base bg-white"
              >
                {cityPolicies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}（{c.province}）
                  </option>
                ))}
              </select>
              {cityInfo && (
                <p className="mt-2 text-xs text-gray-400">
                  {cityInfo.name}社平工资：{fmt(cityInfo.avgSalary)}/月，3倍上限：{fmt(cityInfo.avgSalary3x)}/月
                </p>
              )}
            </div>

            {/* Step 2: 收入 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">2</span>
                <label className="text-sm font-semibold">填写收入信息</label>
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setUseSimple(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    useSimple ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  简单模式
                </button>
                <button
                  onClick={() => setUseSimple(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !useSimple ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  精确模式（12个月明细）
                </button>
              </div>

              {useSimple ? (
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">
                    税前月薪（含奖金、补贴等平均值）
                  </label>
                  <input
                    type="number"
                    value={simpleSalary}
                    onChange={(e) => setSimpleSalary(e.target.value)}
                    placeholder="请输入税前月薪"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 text-base"
                  />
                  <p className="mt-1.5 text-xs text-gray-400">
                    💡 应包含基本工资、奖金、津贴、加班费等所有税前收入
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-gray-500 mb-3">
                    请输入离职前12个月的每月税前收入（包含奖金、补贴等），系统自动计算平均工资：
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {monthlyIncomes.map((val, i) => (
                      <div key={i}>
                        <label className="text-xs text-gray-400 mb-1 block">
                          第{i + 1}个月
                        </label>
                        <input
                          type="number"
                          value={val}
                          onChange={(e) => {
                            const newIncomes = [...monthlyIncomes];
                            newIncomes[i] = e.target.value;
                            setMonthlyIncomes(newIncomes);
                          }}
                          placeholder="税前收入"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                  {(() => {
                    const incomes = monthlyIncomes.map((v) => parseFloat(v) || 0);
                    const filled = incomes.filter((v) => v > 0);
                    if (filled.length > 0) {
                      const avg = filled.reduce((a, b) => a + b, 0) / filled.length;
                      return (
                        <p className="mt-3 text-sm text-accent font-medium">
                          已填 {filled.length} 个月，平均工资：{fmt(avg)}
                        </p>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}
            </div>

            {/* Step 3: 工龄 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
                <label className="text-sm font-semibold">工作年限</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">年</label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    placeholder="例如：3"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">月</label>
                  <input
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    placeholder="例如：6"
                    min="0"
                    max="11"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 text-base"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: 年假 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">4</span>
                <label className="text-sm font-semibold">未休年假天数（选填）</label>
              </div>
              <input
                type="number"
                value={unusedLeaveDays}
                onChange={(e) => setUnusedLeaveDays(e.target.value)}
                placeholder="例如：5"
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 text-base"
              />
              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 leading-relaxed">
                  💡 <strong>年假标准：</strong>工作满1年不满10年 → 5天 · 满10年不满20年 → 10天 · 满20年 → 15天。
                  未休年假按<strong>日工资的200%</strong>额外补偿（公司已付的100%工资不重复计算）。
                </p>
              </div>
            </div>

            {/* Step 5: 裁员情况 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">5</span>
                <label className="text-sm font-semibold">你的裁员情况</label>
              </div>
              <div className="space-y-3">
                {[
                  {
                    key: "negotiation" as Situation,
                    label: "协商解除 → 经济补偿金（N）",
                    desc: "公司主动提出协商解除劳动合同，双方协商一致",
                  },
                  {
                    key: "no_notice" as Situation,
                    label: "未提前通知 → 代通知金（N+1）",
                    desc: "公司未提前30天书面通知，需额外支付1个月工资",
                  },
                  {
                    key: "illegal" as Situation,
                    label: "违法裁员 → 赔偿金（2N）",
                    desc: "公司没有合法理由辞退，或程序违法（点击查看详细定义 ↓）",
                  },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setSituation(opt.key);
                      if (opt.key === "illegal") setShowIllegalInfo(true);
                    }}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      situation === opt.key
                        ? "border-black bg-black/[0.02]"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="font-medium text-sm">{opt.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>

              {/* 2N 违法裁员定义 */}
              <AnimatePresence>
                {(situation === "illegal" || showIllegalInfo) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 p-5 bg-red-50 border border-red-100 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-red-800 text-sm">⚖️ 什么是违法裁员（2N）？</h4>
                        <button
                          onClick={() => setShowIllegalInfo(false)}
                          className="text-red-400 hover:text-red-600 text-xs"
                        >
                          收起
                        </button>
                      </div>
                      <p className="text-xs text-red-700 mb-3 leading-relaxed">
                        根据《劳动合同法》第87条，用人单位违法解除或终止劳动合同的，应当按照经济补偿标准的<strong>二倍</strong>向劳动者支付赔偿金。以下情形属于违法裁员：
                      </p>
                      <div className="space-y-2">
                        {[
                          { title: "🚫 无合法事由", desc: "不符合《劳动合同法》第39、40、41条规定的解除条件，无正当理由辞退员工" },
                          { title: "📝 程序违法", desc: "未提前通知工会、未说明理由、未出具解除证明、未按规定裁员程序执行（如经济性裁员未报告劳动行政部门）" },
                          { title: "🤰 保护期辞退", desc: "在孕期、产期、哺乳期辞退女职工；在医疗期内辞退患病员工；在工伤医疗期内辞退工伤员工" },
                          { title: "👴 临退休辞退", desc: "距法定退休年龄不足5年的员工，公司不得以不胜任工作或经济性裁员为由解除合同" },
                          { title: "⚠️ 歧视性辞退", desc: "因性别、年龄、民族、宗教信仰、残疾等原因辞退员工" },
                          { title: "🔔 打击报复", desc: "因员工举报违法行为、参加工会活动、拒绝违章作业等原因辞退" },
                        ].map((item) => (
                          <div key={item.title} className="flex gap-2">
                            <span className="text-xs font-medium text-red-800 whitespace-nowrap">{item.title}</span>
                            <span className="text-xs text-red-600 leading-relaxed">{item.desc}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-white/60 rounded-lg">
                        <p className="text-xs text-red-700 leading-relaxed">
                          💡 <strong>维权建议：</strong>保留裁员通知、谈话录音、聊天记录等证据。如公司拒绝支付2N赔偿，可向当地劳动仲裁委员会申请仲裁（免费），仲裁时效为1年。
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 计算按钮 */}
            <button
              onClick={calculate}
              disabled={!situation}
              className="w-full bg-black text-white py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              计算赔偿
            </button>
          </div>

          {/* 结果 */}
          {result && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* 总计 */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center mb-6">
                <div className="text-sm text-gray-300 mb-1">预计到手总额</div>
                <div className="text-4xl font-bold mt-2">{fmt(result.totalWithExtras)}</div>
                <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs text-gray-400">
                  <span>{result.recommended} {fmt(result.recommendedAmount)}</span>
                  {result.annualLeavePay > 0 && <span>+ 年假补偿 {fmt(result.annualLeavePay)}</span>}
                  {result.taxAmount > 0 && <span>- 个税 {fmt(result.taxAmount)}</span>}
                </div>
              </div>

              {/* 详细信息 */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm p-3 bg-surface rounded-lg">
                  <span className="text-gray-500">计算平均工资</span>
                  <span className="font-medium">{fmt(result.avgSalary)}/月</span>
                </div>
                {result.isCapped && (
                  <div className="flex justify-between text-sm p-3 bg-danger/5 rounded-lg">
                    <span className="text-danger">⚠️ 超过社平3倍上限，按上限计算</span>
                    <span className="font-medium text-danger">{fmt(result.capAmount)}/月</span>
                  </div>
                )}
                <div className="flex justify-between text-sm p-3 bg-surface rounded-lg">
                  <span className="text-gray-500">实际计算基数</span>
                  <span className="font-medium">{fmt(result.effectiveSalary)}/月</span>
                </div>
                <div className="flex justify-between text-sm p-3 bg-surface rounded-lg">
                  <span className="text-gray-500">补偿月数</span>
                  <span className="font-medium">
                    {result.compensationMonths} 个月
                    {result.isYearsCapped && <span className="text-danger text-xs ml-1">（上限12年）</span>}
                  </span>
                </div>
                {result.annualLeavePay > 0 && (
                  <div className="flex justify-between text-sm p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-700">🏖️ 未休年假补偿（{unusedLeaveDays}天 × 日工资200%）</span>
                    <span className="font-medium text-blue-700">+{fmt(result.annualLeavePay)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm p-3 bg-surface rounded-lg">
                  <span className="text-gray-500">个税免征额（社平年薪×3）</span>
                  <span className="font-medium">{fmt(result.taxExempt)}</span>
                </div>
                {result.taxAmount > 0 ? (
                  <div className="flex justify-between text-sm p-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-700">💰 经济补偿个税（超出免征部分）</span>
                    <span className="font-medium text-yellow-700">-{fmt(result.taxAmount)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-sm p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700">✅ 赔偿金额未超免征额，无需缴税</span>
                    <span className="font-medium text-green-700">{fmt(0)}</span>
                  </div>
                )}
              </div>

              {/* 三个方案对比 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className={`p-5 rounded-xl text-center ${situation === "negotiation" ? "ring-2 ring-black" : "bg-surface"}`}>
                  <div className="text-xs text-gray-500 mb-1">经济补偿金（N）</div>
                  <div className="text-xl font-bold">{fmt(result.n)}</div>
                </div>
                <div className={`p-5 rounded-xl text-center ${situation === "no_notice" ? "ring-2 ring-black" : "bg-surface"}`}>
                  <div className="text-xs text-gray-500 mb-1">代通知金（N+1）</div>
                  <div className="text-xl font-bold">{fmt(result.n1)}</div>
                </div>
                <div className={`p-5 rounded-xl text-center ${situation === "illegal" ? "ring-2 ring-danger" : "bg-surface"}`}>
                  <div className="text-xs text-gray-500 mb-1">违法裁员（2N）</div>
                  <div className="text-xl font-bold text-danger">{fmt(result.n2)}</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* 2N 违法裁员说明（始终可见） */}
        <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-3">⚖️ 违法裁员（2N）的认定标准</h3>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">
            根据《劳动合同法》第87条，用人单位违反本法规定解除或终止劳动合同的，应按经济补偿标准的<strong className="text-black">二倍</strong>支付赔偿金。常见违法情形包括：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: "🚫", title: "无合法事由辞退", desc: "不满足法定解除条件，口头辞退、逼迫离职等" },
              { icon: "📝", title: "程序严重违法", desc: "未通知工会、未出具书面证明、裁员未报告主管部门" },
              { icon: "🤰", title: "特殊保护期辞退", desc: "孕期/产期/哺乳期、医疗期、工伤医疗期内辞退" },
              { icon: "👴", title: "临退休员工辞退", desc: "距法定退休不足5年，不得以不胜任或裁员为由解除" },
              { icon: "⚠️", title: "歧视性辞退", desc: "因性别、年龄、民族、残疾、疾病等原因辞退" },
              { icon: "🔔", title: "报复性辞退", desc: "因举报违法、参加工会、拒绝违章作业而被辞退" },
            ].map((item) => (
              <div key={item.title} className="p-3 bg-surface rounded-lg">
                <div className="text-sm font-medium mb-1">{item.icon} {item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 计算规则说明 */}
        <div className="mt-6 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-3">📋 计算规则说明</h3>
          <ul className="text-sm text-gray-500 space-y-2 leading-relaxed">
            <li>• <strong>平均工资</strong>：按离职前12个月的税前收入（含基本工资、奖金、津贴、加班费）平均计算。</li>
            <li>• <strong>3倍上限</strong>：月工资高于当地社平工资3倍的，按3倍计算，且补偿年限最高不超过12年。</li>
            <li>• <strong>N（经济补偿）</strong>：每满一年支付一个月工资；六个月以上不满一年按一年算；不满六个月支付半个月。</li>
            <li>• <strong>N+1</strong>：未提前30天书面通知的，额外支付一个月工资（代通知金）。</li>
            <li>• <strong>2N（违法裁员）</strong>：违法解除劳动合同的，支付双倍经济补偿金。</li>
            <li>• <strong>年假补偿</strong>：未休年假按日工资的200%额外补偿（《职工带薪年休假条例》第5条）。日工资 = 月工资 ÷ 21.75。</li>
            <li>• <strong>个税计算</strong>：经济补偿金在当地上年职工平均工资3倍数额以内的部分免征个人所得税，超过部分单独适用综合所得税率表（财税〔2018〕164号）。</li>
          </ul>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
          <p className="text-xs text-yellow-700 leading-relaxed">
            ⚠️ 免责声明：本计算器仅供参考，计算结果不构成法律建议。各地政策可能有差异，实际赔偿金额请以当地劳动部门规定为准。如有争议，建议咨询专业劳动法律师。
          </p>
        </div>
      </div>
    </div>
  );
}
