import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-3">裁了么 <span className="text-sm font-normal text-gray-400">牛马保护站</span></h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              帮助打工人应对裁员的保护站。
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
              <li><Link href="/layoff-tracker" className="text-sm text-gray-500 hover:text-black transition-colors">裁员维权进度追踪</Link></li>
              <li><Link href="/guides/non-compete" className="text-sm text-gray-500 hover:text-black transition-colors">竞业限制评估</Link></li>
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
              <li><Link href="/community" className="text-sm text-gray-500 hover:text-black transition-colors">保护站信息</Link></li>
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-black transition-colors">关于我们</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-black transition-colors">隐私政策</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-black transition-colors">服务条款</Link></li>
              <li>
                <a
                  href="https://github.com/IanCao/caileme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-black transition-colors inline-flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 border-t border-gray-200 space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} 裁了么 牛马保护站 (caileme.team). All rights reserved.
            </p>
            <p className="text-xs text-gray-400 text-center md:text-right">
              免责声明：本站内容仅供参考，不构成法律建议。具体问题请咨询专业律师。
            </p>
          </div>
          <p className="text-xs text-gray-400 text-center border-t border-gray-100 pt-3">
            本站依据《中华人民共和国网络安全法》《互联网信息服务管理办法》等相关法律法规运营，内容由用户投稿，不代表本站立场。
            如有内容侵权、违规或需要反馈，请通过&nbsp;
            <a
              href="https://github.com/IanCao/caileme/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub Issue
            </a>
            &nbsp;联系处理。
          </p>
        </div>
      </div>
    </footer>
  );
}
