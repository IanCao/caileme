import { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "裁了么隐私政策",
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
            <h2 className="text-lg font-semibold text-black mb-3">一、信息收集</h2>
            <p>裁了么（以下简称"本站"）尊重并保护所有用户的个人隐私权。本站的计算工具均在浏览器端运行，我们不会收集或存储你输入的薪资、工作年限等个人信息。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">二、数据使用</h2>
            <p>本站可能使用匿名的网站分析工具（如 Google Analytics）来了解网站的访问情况。这些工具不会收集你的个人身份信息。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">三、Cookie</h2>
            <p>本站可能使用 Cookie 来改善用户体验。你可以在浏览器设置中选择禁用 Cookie。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">四、第三方链接</h2>
            <p>本站可能包含第三方网站的链接。本站不对第三方网站的隐私政策负责。</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-black mb-3">五、政策更新</h2>
            <p>本隐私政策可能会不定期更新。更新后的政策将在本页面公布。</p>
          </section>
          <p className="text-gray-400 text-xs mt-8">最后更新日期：2026年3月</p>
        </div>
      </div>
    </div>
  );
}
