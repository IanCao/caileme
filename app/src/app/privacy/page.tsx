import { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description:
    "了解裁了么如何处理站点访问数据、广告投放、Cookie 与用户主动提交的信息。",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl font-bold mb-8">隐私政策</h1>

        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 text-sm text-gray-600 space-y-6 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">一、适用范围</h2>
            <p>
              本政策适用于 `caileme.team` 及其相关页面。你访问本站、使用站内工具、提交投稿或评论时，可能会涉及本政策所述的数据处理方式。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">二、工具输入数据</h2>
            <p>
              赔偿计算器、失业金计算器、社保相关工具主要在浏览器本地运行。你输入的工资、工龄、城市等信息默认不会因为仅仅使用页面而被本站主动长期存储。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">三、你主动提交的信息</h2>
            <p>
              当你使用投稿、评论、反馈、订阅等功能时，你可能会主动提供昵称、邮箱、城市、行业、正文内容等信息。这些信息仅用于处理你的提交、审核展示、必要沟通或改进服务。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">四、统计与性能分析</h2>
            <p>
              本站可能使用站点分析与性能监测服务，例如 Cloudflare Web Analytics，用于了解访问量、页面表现、来源分布、异常请求和基础性能表现。这类服务可能会处理设备、浏览器、访问页面、访问时间、来源页面等技术信息。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">五、广告与第三方 Cookie</h2>
            <p>
              本站已接入 Google AdSense。Google 及其合作伙伴可能使用 Cookie 或类似技术，根据你访问本站及其他网站的情况展示广告、限制重复曝光、衡量广告效果，并进行防作弊和安全分析。
            </p>
            <p>
              如果 Google 提供个性化广告，广告内容可能基于你的兴趣推断；如果未提供个性化广告，仍可能基于大致地理位置、设备类型、当前页面主题等信号展示广告。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">六、Cookie 的使用</h2>
            <p>
              Cookie 可能被用于保存基础偏好、统计访问、广告投放与测量。你可以在浏览器设置中清除或阻止 Cookie，但这可能影响站点部分功能、广告相关体验或个性化内容展示。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">七、第三方链接</h2>
            <p>
              本站部分页面会链接到政府、法院、公共服务平台或其他第三方网站。跳转后你访问的页面不受本站控制，其数据处理规则以对方公开政策为准。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">八、信息安全与保留</h2>
            <p>
              我们会尽量将收集范围控制在完成服务所必需的程度，并采取合理措施防止未授权访问、泄露或滥用。对用户主动提交的信息，仅在完成审核、沟通、统计或合规处理所需期间内保留。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">九、你的选择</h2>
            <p>
              你可以选择不提交可识别你的信息，也可以通过浏览器设置管理 Cookie。若你希望更正、删除主动提交的信息，或对隐私处理有疑问，可通过下方邮箱联系我们。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">十、联系方式</h2>
            <p>
              如对本政策或数据处理方式有疑问，可联系：
              <a
                href="mailto:contact@caileme.team"
                className="text-accent hover:underline ml-1"
              >
                contact@caileme.team
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-3">十一、政策更新</h2>
            <p>
              本政策可能根据功能调整、广告接入方式、统计方案或法律要求进行更新。更新版本会发布在本页。
            </p>
          </section>

          <p className="text-gray-400 text-xs mt-8">最后更新日期：2026-04-05</p>
        </div>
      </div>
    </div>
  );
}
