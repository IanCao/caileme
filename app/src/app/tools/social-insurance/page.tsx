"use client";

import { useState, useMemo } from "react";
import {
  cityPolicies,
  getCityByCode,
  type CityPolicy,
} from "@/data/cityPolicies";
import CitySelector from "@/components/CitySelector";

function fmt(n: number): string {
  return n.toLocaleString("zh-CN");
}

function getImpacts(city: CityPolicy) {
  const graceDays = city.medicalGraceDays || 90;
  return [
    {
      icon: "🏥",
      title: "医疗保险",
      severity: "高",
      severityColor: "text-red-600",
      bgColor: "bg-red-50",
      content: [
        "断缴次月起无法使用医保报销（个人账户余额仍可用）",
        `${city.name}医保断缴宽限期为 ${graceDays} 天，超过后需重新缴费等待期`,
        `断缴超过${graceDays}天，重新参保后通常有3-6个月等待期`,
        "连续缴费年限将重新计算，影响退休后终身医保资格",
        `${city.name}最低工资 ${fmt(city.minWage)} 元/月，灵活就业医保缴费基数参考此标准`,
      ],
      solution:
        `建议：离职后${graceDays}天内以灵活就业身份续缴医保（${city.name}可到社保局办理）。过渡期购买短期商业医疗险。`,
    },
    {
      icon: "🏠",
      title: "购房资格",
      severity: city.housePurchaseMonths >= 48 ? "高" : "中",
      severityColor: city.housePurchaseMonths >= 48 ? "text-red-600" : "text-yellow-600",
      bgColor: city.housePurchaseMonths >= 48 ? "bg-red-50" : "bg-yellow-50",
      content: [
        `${city.name}购房要求：${city.housePurchaseNote}`,
        `需连续缴纳社保 ${city.housePurchaseMonths} 个月（${Math.round(city.housePurchaseMonths / 12)} 年）`,
        "断缴将导致连续缴费月数重新计算",
        "非本地户籍受影响最大",
      ],
      solution:
        "建议：如有购房计划，务必确保社保不断缴。可通过灵活就业或代缴（注意风险）维持。",
    },
    {
      icon: "💰",
      title: "失业保险金",
      severity: "利好",
      severityColor: "text-green-600",
      bgColor: "bg-green-50",
      content: [
        `${city.name}失业金标准：${fmt(city.unemploymentBase)} 元/月${city.unemploymentHigh ? `（最高档 ${fmt(city.unemploymentHigh)} 元/月）` : ""}`,
        `发放规则：${city.unemploymentNotes}`,
        "领取失业金期间，国家代缴基本医疗保险（无需自己交！）",
        "非因本人意愿中断就业（被裁员）即可申领",
        "累计缴费满1年可申领，最长可领24个月",
      ],
      solution:
        `建议：被裁员后尽快到${city.name}社保局办理失业登记。领失业金的同时国家代缴医保，一举两得。`,
    },
    {
      icon: "📋",
      title: "落户积分",
      severity: "中",
      severityColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      content: [
        "积分落户：社保缴纳年限影响积分",
        "居转户通常需连续多年社保",
        "断缴可能导致之前累计清零",
        `${city.name}具体落户政策请咨询当地人社局（12333热线）`,
      ],
      solution: "建议：如正在办理落户，断缴影响极大，需尽快处理续缴问题。",
    },
    {
      icon: "🚗",
      title: "购车摇号/竞价",
      severity: "中",
      severityColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      content: [
        "部分城市购车摇号需连续社保",
        "断缴将重新计算连续缴费时间",
        `具体要求以${city.name}最新政策为准`,
      ],
      solution: "建议：如有购车需求，注意维持社保连续性。",
    },
    {
      icon: "👶",
      title: "生育保险",
      severity: "中",
      severityColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      content: [
        "需连续缴费满一定月数（各地不同，通常6-12个月）",
        "断缴后无法享受生育津贴和报销",
        "配偶一方缴纳也可享受部分待遇",
      ],
      solution: "建议：如有生育计划，务必保持社保连续缴纳。",
    },
    {
      icon: "👴",
      title: "养老保险",
      severity: "低",
      severityColor: "text-green-600",
      bgColor: "bg-green-50",
      content: [
        "累计缴费满15年即可领取养老金（不要求连续）",
        "断缴不影响已累计年限",
        "但断缴期间不计入缴费年限，影响最终养老金金额",
        "可通过灵活就业身份继续缴纳",
      ],
      solution:
        "建议：养老保险影响相对较小，短期断缴问题不大，但建议尽快续缴。",
    },
  ];
}

export default function SocialInsurancePage() {
  const [cityCode, setCityCode] = useState("beijing");
  const cityInfo = useMemo(
    () => getCityByCode(cityCode) ?? cityPolicies[0],
    [cityCode]
  );
  const impacts = useMemo(() => getImpacts(cityInfo), [cityInfo]);

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          社保断缴影响全解析
        </h1>
        <p className="mt-4 text-gray-500 text-center text-lg">
          裁员后社保断缴，到底会影响什么？
        </p>

        {/* 城市选择 */}
        <div className="mt-10 bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center font-bold">
              📍
            </span>
            <label className="text-sm font-semibold">选择你的城市</label>
          </div>
          <CitySelector value={cityCode} onChange={setCityCode} />
          <p className="mt-3 text-xs text-gray-400">
            {cityInfo.name}社平工资：{fmt(cityInfo.avgSalary)}/月 · 失业金标准：
            {fmt(cityInfo.unemploymentBase)}/月 · 购房需连续{cityInfo.housePurchaseMonths}个月社保
          </p>
        </div>

        {/* 紧急提醒 */}
        <div className="mt-8 p-6 bg-danger/5 rounded-2xl border border-danger/10">
          <h2 className="text-lg font-bold text-danger flex items-center gap-2">
            🚨 紧急提醒
          </h2>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            裁员后，公司会在当月或次月停止缴纳社保。你需要在
            <strong>15天内</strong>
            决定是否以灵活就业身份续缴。在{cityInfo.name}，购房需连续
            {cityInfo.housePurchaseMonths}个月社保，断缴将导致重新计算。
          </p>
        </div>

        {/* 影响列表 */}
        <div className="mt-10 space-y-6">
          {impacts.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.severityColor} ${item.bgColor}`}
                    >
                      影响: {item.severity}
                    </span>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {item.content.map((line, i) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 leading-relaxed"
                      >
                        • {line}
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 bg-accent/5 rounded-xl">
                    <p className="text-sm text-accent leading-relaxed">
                      💡 {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 行动清单 */}
        <div className="mt-10 bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-4">✅ 裁员后社保行动清单</h2>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="font-bold text-black">1.</span>
              确认公司最后缴纳社保的月份
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-black">2.</span>
              到{cityInfo.name}社保局办理灵活就业登记（可续缴养老和医保）
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-black">3.</span>
              办理失业登记，领取失业金（{cityInfo.name}标准：
              {fmt(cityInfo.unemploymentBase)}元/月，国家代缴医保）
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-black">4.</span>
              如有购房/落户需求，评估断缴影响并制定对策（{cityInfo.name}购房需{cityInfo.housePurchaseNote}）
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-black">5.</span>
              购买短期商业医疗险作为过渡
            </li>
          </ol>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
          <p className="text-xs text-yellow-700 leading-relaxed">
            ⚠️ 免责声明：各城市社保政策不同，且政策会定期调整。以上信息仅供参考，具体情况请咨询{cityInfo.name}社保局或专业律师。
          </p>
        </div>
      </div>
    </div>
  );
}
