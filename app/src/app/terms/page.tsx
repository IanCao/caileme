import { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务条款",
  description: "裁了么 牛马保护站 服务条款",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl font-bold mb-8">服务条款</h1>
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 text-sm text-gray-600 space-y-6 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">一、服务说明</h2>
            <p>裁了么 牛马保护站（以下简称"本站"，域名：caileme.team）是一个提供裁员相关信息和工具的公益性平台。本站提供的所有工具和内容仅供参考，不构成法律建议。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">二、法律合规声明</h2>
            <p>本站依据以下法律法规运营，并严格遵守相关规定：</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>《中华人民共和国网络安全法》</li>
              <li>《互联网信息服务管理办法》</li>
              <li>《中华人民共和国个人信息保护法》</li>
              <li>《中华人民共和国劳动合同法》及相关劳动法规</li>
            </ul>
            <p className="mt-2">本站所有内容均以普及劳动法律知识、帮助劳动者了解自身权益为目的，不鼓励任何形式的违法行为。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">三、免责声明</h2>
            <p>本站提供的计算工具基于公开的法律法规和政策信息，计算结果仅供参考。由于各地政策差异及政策更新，实际情况可能与计算结果不同。用户应以当地相关部门的最新规定为准。</p>
            <p className="mt-2">本站的文章和指南内容仅为一般性信息，不针对任何个人的具体情况。如需法律帮助，请咨询专业律师或当地法律援助机构。</p>
            <p className="mt-2">社区内容由用户匿名投稿，本站已对明显违规内容进行审核，但无法保证所有内容的准确性，内容观点不代表本站立场。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">四、知识产权</h2>
            <p>本站所有原创内容（包括但不限于文章、工具、设计）的知识产权归本站所有。未经授权，不得转载或商用。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">五、用户行为规范</h2>
            <p>用户在使用本站服务时，应遵守相关法律法规，不得利用本站从事违法活动，包括但不限于：发布虚假信息、侵犯他人隐私、散布谣言等。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">六、侵权投诉</h2>
            <p>如您认为本站内容侵犯了您的合法权益（包括但不限于版权、名誉权、隐私权等），请通过以下方式联系我们，我们将在核实后及时处理：</p>
            <p className="mt-2 font-medium text-black">📮 侵权投诉邮箱：<a href="mailto:contact@caileme.team" className="text-blue-600 hover:underline">contact@caileme.team</a></p>
            <p className="mt-2 text-gray-500">请在邮件中说明：侵权内容的URL、您的权益证明材料、联系方式。我们将在3个工作日内回复。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">七、条款更新</h2>
            <p>本站保留随时修改服务条款的权利。修改后的条款将在本页面公布，继续使用本站即视为接受修改后的条款。</p>
          </section>
          <p className="text-gray-400 text-xs mt-8">最后更新日期：2026年3月</p>
        </div>
      </div>
    </div>
  );
}
