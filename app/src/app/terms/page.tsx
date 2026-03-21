import { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务条款",
  description: "裁了么服务条款",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl font-bold mb-8">服务条款</h1>
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 text-sm text-gray-600 space-y-6 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">一、服务说明</h2>
            <p>裁了么（以下简称"本站"）是一个提供裁员相关信息和工具的平台。本站提供的所有工具和内容仅供参考，不构成法律建议。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">二、免责声明</h2>
            <p>本站提供的计算工具基于公开的法律法规和政策信息，计算结果仅供参考。由于各地政策差异及政策更新，实际情况可能与计算结果不同。用户应以当地相关部门的最新规定为准。</p>
            <p className="mt-2">本站的文章和指南内容仅为一般性信息，不针对任何个人的具体情况。如需法律帮助，请咨询专业律师。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">三、知识产权</h2>
            <p>本站所有原创内容（包括但不限于文章、工具、设计）的知识产权归本站所有。未经授权，不得转载或商用。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">四、用户行为</h2>
            <p>用户在使用本站服务时，应遵守相关法律法规，不得利用本站从事违法活动。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">五、条款更新</h2>
            <p>本站保留随时修改服务条款的权利。修改后的条款将在本页面公布。</p>
          </section>
          <p className="text-gray-400 text-xs mt-8">最后更新日期：2026年3月</p>
        </div>
      </div>
    </div>
  );
}
