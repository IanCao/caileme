import Link from 'next/link';

interface RelatedPage {
  title: string;
  href: string;
  desc: string;
}

const allRelated: RelatedPage[] = [
  { title: '裁员赔偿计算器', href: '/tools/severance', desc: '计算N+1、2N赔偿金额' },
  { title: '失业金计算器', href: '/tools/unemployment', desc: '估算每月失业金' },
  { title: '社保断缴影响', href: '/tools/social-insurance', desc: '查询断缴影响和应对' },
  { title: '裁员维权追踪器', href: '/layoff-tracker', desc: '全流程维权清单' },
  { title: '裁员当天怎么办', href: '/guides/layoff-day', desc: '完整行动清单' },
  { title: '裁员谈判技巧', href: '/guides/negotiation', desc: '争取更好赔偿' },
  { title: '劳动仲裁指南', href: '/guides/arbitration', desc: '从申请到胜诉' },
  { title: 'AI裁员模拟', href: '/ai-simulation', desc: '模拟HR裁员谈判' },
];

export default function RelatedPages({ current, count = 4 }: { current: string; count?: number }) {
  const pages = allRelated.filter(p => p.href !== current).slice(0, count);
  return (
    <nav aria-label="相关页面" className="mt-12 pt-8 border-t border-gray-100">
      <h3 className="text-lg font-bold mb-4">你可能还需要</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pages.map(p => (
          <Link key={p.href} href={p.href} className="block p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="font-medium text-sm">{p.title}</div>
            <div className="text-xs text-gray-500 mt-1">{p.desc}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
