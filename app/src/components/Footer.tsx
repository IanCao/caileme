import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-3">裁了么 <span className="text-sm font-normal text-gray-400">共济社区</span></h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              帮助打工人应对裁员的共济平台。
              <br />
              信息 · 工具 · 指南 · 再就业
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-semibold mb-3">权益工具</h4>
            <ul className="space-y-2">
              <li><Link href="/tools/severance" className="text-sm text-gray-500 hover:text-black transition-colors">赔偿计算器</Link></li>
              <li><Link href="/tools/unemployment" className="text-sm text-gray-500 hover:text-black transition-colors">失业金计算器</Link></li>
              <li><Link href="/tools/social-insurance" className="text-sm text-gray-500 hover:text-black transition-colors">社保断缴影响</Link></li>
              <li><Link href="/tools/social-payment" className="text-sm text-gray-500 hover:text-black transition-colors">社保缴纳指南</Link></li>
              <li><Link href="/tools" className="text-sm text-gray-500 hover:text-black transition-colors">官方维权资源</Link></li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="text-sm font-semibold mb-3">维权百科</h4>
            <ul className="space-y-2">
              <li><Link href="/guides/layoff-day" className="text-sm text-gray-500 hover:text-black transition-colors">裁员当天怎么办</Link></li>
              <li><Link href="/guides/negotiation" className="text-sm text-gray-500 hover:text-black transition-colors">裁员谈判技巧</Link></li>
              <li><Link href="/guides/arbitration" className="text-sm text-gray-500 hover:text-black transition-colors">仲裁流程指南</Link></li>
              <li><Link href="/guides/evidence-collection" className="text-sm text-gray-500 hover:text-black transition-colors">证据收集手册</Link></li>
              <li><Link href="/guides/non-compete" className="text-sm text-gray-500 hover:text-black transition-colors">竞业限制指南</Link></li>
              <li><Link href="/guides/career-restart" className="text-sm text-gray-500 hover:text-black transition-colors">职业重启指南</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold mb-3">更多</h4>
            <ul className="space-y-2">
              <li><Link href="/community" className="text-sm text-gray-500 hover:text-black transition-colors">社区广场</Link></li>
              <li><Link href="/feedback" className="text-sm text-gray-500 hover:text-black transition-colors">意见反馈</Link></li>
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-black transition-colors">关于我们</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-black transition-colors">隐私政策</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-black transition-colors">服务条款</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} 裁了么 共济社区 (caileme.team). All rights reserved.
          </p>
          <p className="text-xs text-gray-400 text-center md:text-right">
            免责声明：本站内容仅供参考，不构成法律建议。具体问题请咨询专业律师。
          </p>
        </div>
      </div>
    </footer>
  );
}
