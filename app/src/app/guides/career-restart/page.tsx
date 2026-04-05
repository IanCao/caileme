import { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "被裁后职业重启指南 - 从低谷到重新出发",
  description:
    "被裁员后如何重新找工作？职业重启完整指南：心态调整、简历优化、面试技巧、如何解释被裁经历、副业方向、转型建议。已帮助数千名打工人成功再就业。",
  keywords: [
    "被裁后怎么找工作",
    "裁员后简历怎么写",
    "被裁怎么解释",
    "裁员后面试",
    "职业重启",
    "再就业指南",
  ],
  alternates: {
    canonical: "/guides/career-restart",
  },
  openGraph: {
    title: "被裁后职业重启指南 - 从低谷到重新出发",
    description:
      "被裁员后如何重新找工作？职业重启完整指南：心态调整、简历优化、面试技巧、如何解释被裁经历、副业方向、转型建议。",
    url: "https://caileme.team/guides/career-restart",
  },
};

export default function CareerRestartGuide() {
  return (
    <div className="min-h-screen bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "被裁后的职业重启指南",
              description:
                "被裁员不是终点。这份指南从心态调整、简历优化、求职策略、面试准备到灵活就业，帮你系统性地完成职业重启。",
              author: { "@type": "Organization", name: "裁了么" },
              publisher: {
                "@type": "Organization",
                name: "裁了么",
                logo: { "@type": "ImageObject", url: "https://caileme.team/logo.png" },
              },
              datePublished: "2026-03-01",
              dateModified: "2026-03-22",
              mainEntityOfPage: "https://caileme.team/guides/career-restart",
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "首页", item: "https://caileme.team" },
                { "@type": "ListItem", position: 2, name: "维权百科", item: "https://caileme.team/guides" },
                { "@type": "ListItem", position: 3, name: "被裁后的职业重启指南", item: "https://caileme.team/guides/career-restart" },
              ],
            },
          ]),
        }}
      />
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/guides" className="hover:text-black transition-colors">
            裁员指南
          </Link>
          <span>/</span>
          <span className="text-gray-700">被裁后的职业重启指南</span>
        </div>

        <article>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            被裁后的职业重启指南
          </h1>
          <p className="mt-4 text-gray-500 text-lg">
            被裁员不是终点，而是一次重新审视职业方向的机会
          </p>
          <div className="mt-2 text-sm text-gray-400">阅读时间：约15分钟</div>

          <div className="mt-10 prose prose-gray max-w-none">
            {/* Section 1 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                🧘 心态调整
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  被裁员后感到焦虑、愤怒、自我怀疑都是正常的。在开始找工作之前，先花时间处理好情绪。
                </p>
                <p>
                  <strong>接受现实：</strong>
                  裁员在绝大多数情况下不是你的错。公司裁员是商业决策——营收下滑、业务调整、战略收缩。你被裁不代表你能力不行，而是你恰好在那个被砍的业务线上。
                </p>
                <p>
                  <strong>给自己缓冲期：</strong>
                  不要被"马上要找到工作"的焦虑驱动。如果经济上允许，给自己1-2周的缓冲期。这段时间可以：
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>好好休息，处理积累的疲劳</li>
                  <li>和家人朋友聊聊，获得情感支持</li>
                  <li>复盘过去的工作经历，想清楚下一步方向</li>
                  <li>处理社保、公积金等离职手续（参考我们的社保指南）</li>
                </ul>
                <p>
                  <strong>建立日常节奏：</strong>
                  失业后最怕作息混乱。建议保持规律作息，每天固定时间段用于求职，其他时间锻炼、学习或做自己喜欢的事。
                </p>
                <div className="p-3 bg-accent/5 rounded-xl mt-2">
                  <p className="text-accent font-medium">
                    如果焦虑持续影响你的睡眠和日常生活，考虑寻求专业心理咨询。许多城市有免费的心理援助热线（如12320）。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                📝 简历优化
              </h2>
              <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                <p>
                  被裁后的简历需要特别注意措辞和呈现方式，把劣势转化为中性甚至优势。
                </p>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">1</span>
                  <div>
                    <strong>如何解释被裁经历</strong>
                    <p className="mt-1">
                      离职原因写"公司业务调整/组织架构优化"即可，不需要详细解释。简历上不必主动提及被裁——离职原因通常在面试中才会被问到。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">2</span>
                  <div>
                    <strong>突出成果而非职责</strong>
                    <p className="mt-1">
                      把"负责XX项目"改为"主导XX项目，实现了XX成果"。用数据说话：提升了多少效率、节省了多少成本、覆盖了多少用户。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">3</span>
                  <div>
                    <strong>针对性定制简历</strong>
                    <p className="mt-1">
                      不要用一份简历海投。针对不同岗位调整项目经验的描述重点。应聘管理岗突出团队管理经验，应聘技术岗突出技术深度。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">4</span>
                  <div>
                    <strong>处理空窗期</strong>
                    <p className="mt-1">
                      3个月以内的空窗期通常不需要特别解释。如果空窗期较长，可以写"自学XX技能"或"独立项目"来填充，但必须是真实的。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                🎯 求职策略
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  有策略地求职比盲目海投有效得多。把找工作当成一个项目来管理。
                </p>
                <p>
                  <strong>求职渠道优先级：</strong>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
                  <div className="p-4 bg-surface rounded-xl">
                    <div className="font-bold text-sm">🥇 内推（成功率最高）</div>
                    <div className="text-xs mt-1">
                      主动联系前同事、朋友，让他们帮你内推。LinkedIn上联系目标公司的在职员工也很有效。内推简历被查看的概率远高于网投。
                    </div>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <div className="font-bold text-sm">🥈 猎头</div>
                    <div className="text-xs mt-1">
                      更新猎头平台简历（猎聘等），主动联系行业猎头。中高端岗位很多通过猎头渠道招聘。
                    </div>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <div className="font-bold text-sm">🥉 招聘平台</div>
                    <div className="text-xs mt-1">
                      Boss直聘、拉勾、脉脉等。保持活跃状态（每天刷新简历、主动沟通），算法会给你更多曝光。
                    </div>
                  </div>
                  <div className="p-4 bg-surface rounded-xl">
                    <div className="font-bold text-sm">🏢 公司官网</div>
                    <div className="text-xs mt-1">
                      大厂和外企的许多岗位只在官网发布。直接去目标公司招聘页面投递。
                    </div>
                  </div>
                </div>
                <p>
                  <strong>最佳求职时机：</strong>
                  每年3-4月（金三银四）和9-10月（金九银十）是招聘高峰。但在经济波动期，好机会随时可能出现，不要等"完美时机"。
                </p>
                <p>
                  <strong>目标公司研究：</strong>
                  在投递前研究公司的业务方向、财务状况（上市公司看财报）、员工评价（看脉脉、Glassdoor）。避开正在裁员或经营不善的公司。
                </p>
              </div>
            </div>

            <AdSlot variant="inArticle" className="mb-6" />

            {/* Section 4 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                💬 面试准备
              </h2>
              <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                <p>
                  面试中最尴尬的问题就是"你为什么从上家离职？"。提前准备好回答，把它变成加分项。
                </p>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">1</span>
                  <div>
                    <strong>如何回答被裁问题</strong>
                    <p className="mt-1">
                      诚实但简洁："公司进行了业务调整/组织优化，我所在的部门/产品线整体裁撤了。"然后立刻转向积极面："这让我有机会重新审视职业方向，我发现贵公司的XX方向非常契合我的经验和兴趣。"
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">2</span>
                  <div>
                    <strong>面试中的注意事项</strong>
                    <ul className="list-disc list-inside space-y-1 ml-2 mt-1">
                      <li>不要说前公司的坏话，即使你有怨气</li>
                      <li>不要过度解释被裁原因，越解释越像在掩饰</li>
                      <li>展示你在空窗期也没有停止学习和成长</li>
                      <li>准备2-3个你过去的成功案例，用STAR法则描述</li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="font-bold text-black text-base">3</span>
                  <div>
                    <strong>薪资谈判</strong>
                    <p className="mt-1">
                      被裁不意味着要降薪。了解市场行情（看招聘平台同类岗位薪资范围），基于自己的能力和经验谈薪。如果对方以"你目前没有工作"来压价，可以说："我的薪资期望是基于岗位要求和市场行情，而不是我当前的就业状态。"
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-accent/5 rounded-xl mt-2">
                  <p className="text-accent font-medium">
                    提示：拿到offer不要急着接受。给自己1-2天考虑时间，评估公司文化、发展空间、团队情况，避免仓促决定再次踩坑。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                🚀 灵活就业选项
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  全职工作不是唯一选择。越来越多人在被裁后发现了新的工作方式。
                </p>
                <p>
                  <strong>自由职业 / 独立顾问：</strong>
                  如果你有专业技能（设计、开发、营销、咨询等），可以在Upwork、猪八戒、程序员客栈等平台接活。初期收入不稳定，但自由度高，做得好收入可能超过打工。
                </p>
                <p>
                  <strong>远程工作：</strong>
                  很多海外公司招聘远程中国员工。电鸭社区、Remote OK、We Work Remotely等平台有大量远程职位。英语好的同学可以关注这个方向，薪资通常以美元计价。
                </p>
                <p>
                  <strong>创业：</strong>
                  如果你有好的idea和一定积蓄，被裁可能是创业的契机。但要理性评估：你的项目是否有真实需求？你能承受多久不盈利？建议先做MVP验证市场。
                </p>
                <p>
                  <strong>副业过渡：</strong>
                  在找全职的同时发展副业。写公众号、做自媒体、线上教学、翻译等都可以提供额外收入，也能充实空窗期。
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                📖 技能提升
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  空窗期是提升技能的黄金时间。把"被裁"变成"充电"，让下一份工作站在更高的起点。
                </p>
                <p>
                  <strong>盘点技能短板：</strong>
                  回想过去工作中哪些事情做起来吃力？面试中被问倒的是什么？这些就是你需要补的地方。
                </p>
                <p>
                  <strong>免费学习资源：</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>技术类：GitHub上的开源教程、B站技术视频、Coursera/edX免费课程</li>
                  <li>产品/运营类：人人都是产品经理、知乎专栏、行业报告</li>
                  <li>通用技能：英语（多邻国）、数据分析（Kaggle）、AI工具使用</li>
                </ul>
                <p>
                  <strong>考证加分：</strong>
                  PMP（项目管理）、AWS/阿里云认证（技术岗）、CFA（金融岗）等行业认证在简历上有加分作用，也能填充空窗期。
                </p>
                <p>
                  <strong>做个人项目：</strong>
                  开发一个自己的项目、撰写技术博客、参与开源社区贡献。这些既能提升能力，又能作为面试中的谈资。
                </p>
                <div className="p-3 bg-accent/5 rounded-xl mt-2">
                  <p className="text-accent font-medium">
                    建议：每天拿出2-3小时专注学习，制定具体的学习计划和阶段性目标。不要贪多，聚焦1-2个方向深入学习。
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
              href="/guides/social-insurance-guide"
              className="block text-sm text-accent hover:underline"
            >
              → 离职后社保公积金处理
            </Link>
            <Link
              href="/guides/evidence-collection"
              className="block text-sm text-accent hover:underline"
            >
              → 证据收集完全手册
            </Link>
            <Link
              href="/guides/negotiation"
              className="block text-sm text-accent hover:underline"
            >
              → 裁员谈判技巧
            </Link>
            <Link
              href="/tools/severance"
              className="block text-sm text-accent hover:underline"
            >
              → 赔偿计算器
            </Link>
          </div>
        </div>

        {/* 相关工具 */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-gray-100">
          <h3 className="font-semibold mb-3">🔧 相关工具</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/tools/unemployment" className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-gray-100 transition-colors">
              <span className="text-2xl">💰</span>
              <div>
                <div className="text-sm font-medium">失业金计算器</div>
                <div className="text-xs text-gray-400">查询你所在城市的失业金标准</div>
              </div>
            </Link>
            <Link href="/tools/social-insurance" className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-surface hover:bg-gray-100 transition-colors">
              <span className="text-2xl">🛡️</span>
              <div>
                <div className="text-sm font-medium">社保断缴影响</div>
                <div className="text-xs text-gray-400">了解断缴对医保、购房等的影响</div>
              </div>
            </Link>
          </div>
        </div>

        <AdSlot variant="multiplex" className="mt-10" />
      </div>
    </div>
  );
}
