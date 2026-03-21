import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "离职后社保公积金处理 - 完整指南",
  description:
    "离职后医保断缴怎么办？公积金能提取吗？失业金怎么领？这份指南帮你搞清楚离职后社保公积金的所有问题。",
};

export default function SocialInsuranceGuide() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/guides" className="hover:text-black transition-colors">
            裁员指南
          </Link>
          <span>/</span>
          <span className="text-gray-700">离职后社保公积金处理</span>
        </div>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            离职后社保公积金处理
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            医保、公积金、失业金、社保转移——离职后的钱别忘了拿
          </p>
          <div className="mt-2 text-sm text-gray-400">阅读时间：约10分钟</div>

          <div className="mt-10 prose prose-gray max-w-none">
            {/* Section 1 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                🏥 医保断缴影响及应对
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  离职后公司不再为你缴纳医保，从次月起你的医保待遇将暂停。了解以下关键信息：
                </p>
                <p>
                  <strong>断缴影响：</strong>
                  医保断缴后，个人账户余额仍可使用（买药、门诊），但住院和大病报销会暂停。大部分城市有
                  <strong>3个月</strong>
                  的断缴窗口期——在3个月内重新参保，可以补缴并恢复待遇；超过3个月，部分城市会有6个月的等待期才能恢复报销。
                </p>
                <p>
                  <strong>应对方案一：灵活就业参保</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>携带身份证、户口本到户籍所在地社保局办理</li>
                  <li>按月缴费，费率通常为当地基数的4%-10%</li>
                  <li>只缴医保即可（无需养老），月费约200-600元</li>
                  <li>非本地户籍可咨询当地政策，部分城市允许灵活就业参保</li>
                </ul>
                <p>
                  <strong>应对方案二：城乡居民医保</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>费用低（每年380元左右），但报销比例低于职工医保</li>
                  <li>通常每年9-12月为集中参保期，次年1月生效</li>
                  <li>适合短期过渡</li>
                </ul>
                <div className="p-3 bg-accent/5 rounded-xl mt-2">
                  <p className="text-accent font-medium">
                    重要：离职当月社保由原公司缴纳。尽量在离职后1个月内办理灵活就业参保，避免断缴影响。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                🏠 住房公积金提取
              </h2>
              <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                <p>
                  离职后公积金账户会被封存，但符合条件可以提取。各城市政策有差异，以下是通用规则：
                </p>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">1</span>
                  <div>
                    <strong>离职提取条件</strong>
                    <p className="mt-1">
                      非本地户籍：离职后公积金账户封存满6个月，可全额提取。
                      本地户籍：通常不能以离职为由提取，需满足购房、租房、退休等条件。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">2</span>
                  <div>
                    <strong>租房提取</strong>
                    <p className="mt-1">
                      无论是否离职，在工作城市无自有住房即可申请租房提取。每季度或每年提取一次，额度因城市而异（通常每月1500-3000元）。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">3</span>
                  <div>
                    <strong>所需材料</strong>
                    <p className="mt-1">
                      身份证原件、公积金联名卡、离职证明（部分城市需要）、户籍证明（非本地户籍提取时）。大部分城市已支持线上办理（支付宝/微信搜索"公积金"或当地公积金官方APP）。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">4</span>
                  <div>
                    <strong>到账时间</strong>
                    <p className="mt-1">
                      审核通过后通常1-3个工作日到账。线上办理更快，柜台办理当天或次日到账。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                💰 失业金申领
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  被裁员属于"非因本人意愿中断就业"，符合领取失业保险金的条件。
                </p>
                <p>
                  <strong>申领条件（需同时满足）：</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>失业前用人单位和本人已缴纳失业保险费满一年</li>
                  <li>非因本人意愿中断就业（被裁员、合同到期不续签等）</li>
                  <li>已办理失业登记，并有求职要求</li>
                </ul>
                <p>
                  <strong>领取标准：</strong>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
                  <div className="p-4 bg-surface rounded-xl text-center">
                    <div className="font-bold text-lg">1-5年</div>
                    <div className="text-xs mt-1">最长领12个月</div>
                  </div>
                  <div className="p-4 bg-surface rounded-xl text-center">
                    <div className="font-bold text-lg">5-10年</div>
                    <div className="text-xs mt-1">最长领18个月</div>
                  </div>
                  <div className="p-4 bg-surface rounded-xl text-center">
                    <div className="font-bold text-lg">10年以上</div>
                    <div className="text-xs mt-1">最长领24个月</div>
                  </div>
                </div>
                <p>
                  金额一般为当地最低工资的70%-90%，各城市不同。例如北京约2000元/月，上海约2000元/月，深圳约2200元/月。
                </p>
                <p>
                  <strong>申领流程：</strong>
                </p>
                <p>☐ 公司办理退工手续（离职后15日内）</p>
                <p>☐ 携带身份证、离职证明到户籍所在区/就业地社保局办理失业登记</p>
                <p>☐ 也可通过"国家社会保险公共服务平台"线上申请</p>
                <p>☐ 审核通过后次月起按月发放到社保卡银行账户</p>
                <div className="p-3 bg-accent/5 rounded-xl mt-2">
                  <p className="text-accent font-medium">
                    注意：必须在离职之日起60天内申请失业登记，逾期可能影响领取。领取失业金期间，医保由失业保险基金代缴，不用自己出钱。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                📋 社保转移
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  如果你打算去其他城市工作，需要办理社保关系跨城转移。目前养老保险和医疗保险可以跨省转移。
                </p>
                <p>
                  <strong>转移流程：</strong>
                </p>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">1</span>
                  <div>
                    <strong>在新城市参保</strong>
                    <p className="mt-1">
                      入职新公司后，由新公司在新城市为你缴纳社保。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">2</span>
                  <div>
                    <strong>申请转移</strong>
                    <p className="mt-1">
                      通过"国家社会保险公共服务平台"或"掌上12333"APP在线申请转移，无需两地来回跑。也可到新参保地社保经办机构窗口办理。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">3</span>
                  <div>
                    <strong>等待审核</strong>
                    <p className="mt-1">
                      两地社保机构对接，通常需要15-45个工作日完成。转移完成后，缴费年限合并计算。
                    </p>
                  </div>
                </div>
                <p className="mt-2">
                  <strong>公积金转移：</strong>
                  在新城市开户后，通过"全国住房公积金服务平台"申请异地转移。部分城市支持"账随人走"自动转移。
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                ⏰ 重要时间节点
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  离职后有多项手续需要在规定时间内办理，逾期可能影响你的权益：
                </p>
                <div className="space-y-3 my-4">
                  <div className="p-4 bg-surface rounded-xl flex items-start gap-3">
                    <span className="font-bold text-black whitespace-nowrap">离职当天</span>
                    <span>确认公司已出具离职证明，交接工牌和办公设备，拿回个人物品。</span>
                  </div>
                  <div className="p-4 bg-surface rounded-xl flex items-start gap-3">
                    <span className="font-bold text-black whitespace-nowrap">15天内</span>
                    <span>公司应为你办理社保减员和退工手续。如未办理，可拨打12333投诉。</span>
                  </div>
                  <div className="p-4 bg-surface rounded-xl flex items-start gap-3">
                    <span className="font-bold text-black whitespace-nowrap">1个月内</span>
                    <span>办理灵活就业社保参保（避免医保断缴超过3个月）或确认新公司已接续社保。</span>
                  </div>
                  <div className="p-4 bg-surface rounded-xl flex items-start gap-3">
                    <span className="font-bold text-black whitespace-nowrap">60天内</span>
                    <span>申请失业登记和失业金领取。这是法定时限，逾期将影响申领资格。</span>
                  </div>
                  <div className="p-4 bg-surface rounded-xl flex items-start gap-3">
                    <span className="font-bold text-black whitespace-nowrap">6个月后</span>
                    <span>非本地户籍可申请公积金全额提取（账户封存满6个月）。</span>
                  </div>
                  <div className="p-4 bg-surface rounded-xl flex items-start gap-3">
                    <span className="font-bold text-black whitespace-nowrap">1年内</span>
                    <span>如需劳动仲裁，注意仲裁时效为劳动关系终止之日起1年内。</span>
                  </div>
                </div>
                <div className="p-3 bg-accent/5 rounded-xl mt-2">
                  <p className="text-accent font-medium">
                    建议：在手机日历中设置提醒，确保不错过任何重要时间节点。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-4">📖 相关阅读</h3>
          <div className="space-y-3">
            <Link
              href="/guides/layoff-day"
              className="block text-sm text-accent hover:underline"
            >
              → 裁员当天怎么办
            </Link>
            <Link
              href="/guides/evidence-collection"
              className="block text-sm text-accent hover:underline"
            >
              → 证据收集完全手册
            </Link>
            <Link
              href="/guides/career-restart"
              className="block text-sm text-accent hover:underline"
            >
              → 被裁后的职业重启指南
            </Link>
            <Link
              href="/tools/severance"
              className="block text-sm text-accent hover:underline"
            >
              → 赔偿计算器
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
