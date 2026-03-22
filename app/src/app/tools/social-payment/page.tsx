"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cityPolicies, getCityByCode } from "@/data/cityPolicies";
import CitySelector from "@/components/CitySelector";

function fmt(n: number): string {
  return n.toLocaleString("zh-CN");
}

export default function SocialPaymentPage() {
  const [cityCode, setCityCode] = useState("beijing");
  const cityInfo = useMemo(
    () => getCityByCode(cityCode) ?? cityPolicies[0],
    [cityCode]
  );

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          离职后社保缴纳指南
        </h1>
        <p className="mt-4 text-gray-500 text-center text-lg">
          灵活就业社保 · 居民社保 · 代缴方式全解析
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
            {cityInfo.name}最低工资：{fmt(cityInfo.minWage)}元/月 · 社平工资：{fmt(cityInfo.avgSalary)}元/月
          </p>
        </div>

        {/* 灵活就业社保 */}
        <div className="mt-10 space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🏢</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-xl font-semibold">灵活就业社保</h2>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                    推荐
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                  <div className="p-4 bg-surface rounded-xl">
                    <p className="font-medium text-black mb-2">👤 适用人群</p>
                    <p>• 本地户籍居民（均可办理）</p>
                    <p>• 部分城市非本地户籍也可办理（如北京、上海、广州等已放宽限制）</p>
                    <p>• 自由职业者、个体工商户</p>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <p className="font-medium text-black mb-2">🛡️ 覆盖险种</p>
                    <p>• <strong>基本养老保险</strong>（必选）</p>
                    <p>• <strong>基本医疗保险</strong>（必选）</p>
                    <p>• 部分城市可加入失业保险（如广东、浙江等已试点）</p>
                    <p className="text-gray-400 mt-1">※ 不含工伤保险和生育保险</p>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <p className="font-medium text-black mb-2">📋 办理方式</p>
                    <p>• <strong>线下</strong>：携带身份证、户口本到当地社保局/社区服务中心办理</p>
                    <p>• <strong>线上</strong>：部分城市支持通过社保APP、支付宝、微信等线上渠道办理</p>
                    <p>• 办理后按月自行缴费（银行代扣或线上缴费）</p>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <p className="font-medium text-black mb-2">💰 缴费参考（{cityInfo.name}）</p>
                    <p>• 缴费基数范围：通常为当地社平工资的60%-300%</p>
                    <p>• 最低基数参考：约 {fmt(Math.round(cityInfo.avgSalary * 0.6))} 元/月（社平工资60%）</p>
                    <p>• 养老保险费率：个人承担20%（约 {fmt(Math.round(cityInfo.avgSalary * 0.6 * 0.2))} 元/月）</p>
                    <p>• 医疗保险费率：各地不同，通常为缴费基数的6%-10%</p>
                    <p className="mt-1 text-accent">💡 建议：经济压力大时可按最低基数缴纳，保持社保连续性最重要</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 城镇居民社保 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🏠</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-xl font-semibold">城镇居民社保</h2>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                    低成本
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                  <div className="p-4 bg-surface rounded-xl">
                    <p className="font-medium text-black mb-2">👤 适用人群</p>
                    <p>• 未参加职工社保的城镇居民</p>
                    <p>• 灵活就业人员、自由职业者</p>
                    <p>• 经济压力较大、无法承担灵活就业社保费用的人群</p>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <p className="font-medium text-black mb-2">🔄 居民医保 vs 职工医保</p>
                    <div className="mt-2 overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="pb-2 pr-4 font-medium text-black">对比项</th>
                            <th className="pb-2 pr-4 font-medium text-black">居民医保</th>
                            <th className="pb-2 font-medium text-black">职工医保</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-600">
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-4">年缴费</td>
                            <td className="py-2 pr-4">几百~千元/年</td>
                            <td className="py-2">数千元/年</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-4">报销比例</td>
                            <td className="py-2 pr-4">50%-70%</td>
                            <td className="py-2">70%-90%</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-4">个人账户</td>
                            <td className="py-2 pr-4">无</td>
                            <td className="py-2">有</td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4">缴费方式</td>
                            <td className="py-2 pr-4">按年缴费</td>
                            <td className="py-2">按月缴费</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="p-3 bg-accent/5 rounded-xl">
                    <p className="text-sm text-accent">
                      💡 居民医保费用低，但报销比例也低。如果只是短期过渡（3-6个月内会重新就业），建议优先选择灵活就业社保，保持职工医保待遇连续性。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 注意事项 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <span className="text-3xl">⚠️</span>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">重要注意事项</h2>
                <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                  <div className="p-4 bg-danger/5 rounded-xl border border-danger/10">
                    <p className="font-medium text-danger mb-2">🚨 社保代缴的风险</p>
                    <p>• 通过第三方公司「挂靠」缴社保属于<strong>法律灰色地带</strong></p>
                    <p>• 虚构劳动关系代缴社保可能构成骗保，面临法律风险</p>
                    <p>• 代缴费用高（含服务费），且单位+个人部分都需自己承担</p>
                    <p>• 2023年起多地已加强监管，部分代缴行为被认定为违法</p>
                    <p className="mt-2 text-danger font-medium">建议：优先选择灵活就业社保，避免代缴风险</p>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <p className="font-medium text-black mb-2">🏦 公积金停缴后的处理</p>
                    <p>• 离职后公积金账户自动封存，不会消失</p>
                    <p>• 公积金<strong>不支持个人缴纳</strong>（必须通过单位）</p>
                    <p>• 封存满6个月后可申请提取（各地政策不同）</p>
                    <p>• 部分城市允许离职后提取公积金用于租房</p>
                    <p>• 重新就业后新单位会为你开设或续接公积金账户</p>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <p className="font-medium text-black mb-2">🔄 异地社保转移接续</p>
                    <p>• 跨省就业需办理社保关系转移（养老+医保）</p>
                    <p>• 线上办理：国家社会保险公共服务平台或&quot;掌上12333&quot;APP</p>
                    <p>• 线下办理：向新参保地社保局提出转入申请</p>
                    <p>• 转移时间：一般需要15-45个工作日</p>
                    <p>• 养老保险个人账户全额转移，统筹账户按比例转移</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 行动清单 */}
        <div className="mt-10 bg-white rounded-2xl p-6 md:p-8 border border-gray-100">
          <h2 className="text-xl font-bold mb-4">✅ 离职后社保行动清单</h2>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="font-bold text-black">1.</span>
              确认公司最后缴纳社保的月份（查看工资条或社保APP）
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-black">2.</span>
              办理失业登记，申领失业金（领取期间国家代缴医保）
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-black">3.</span>
              到{cityInfo.name}社保局办理灵活就业社保登记（续缴养老+医保）
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-black">4.</span>
              评估是否有购房/落户需求，确保社保不断缴
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-black">5.</span>
              了解公积金封存和提取政策，必要时办理提取
            </li>
          </ol>
        </div>

        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-4">📖 相关工具</h3>
          <div className="space-y-3">
            <Link href="/tools/social-insurance" className="block text-sm text-accent hover:underline">→ 社保断缴影响查询</Link>
            <Link href="/tools/unemployment" className="block text-sm text-accent hover:underline">→ 失业金计算器</Link>
            <Link href="/guides/social-insurance-guide" className="block text-sm text-accent hover:underline">→ 社保权益完全指南</Link>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
          <p className="text-xs text-yellow-700 leading-relaxed">
            ⚠️ 免责声明：各城市社保政策不同，且政策会定期调整。以上信息仅供参考，具体情况请咨询{cityInfo.name}社保局（热线12333）或专业律师。
          </p>
        </div>
      </div>
    </div>
  );
}
