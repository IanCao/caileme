import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '裁员赔偿计算器 - 精准计算N+1、2N经济补偿金',
  description: '2026年最新裁员赔偿计算器，输入月薪和工作年限，自动计算N、N+1、2N经济补偿金。支持社平工资3倍上限计算，覆盖全国20+城市最新数据。免费在线使用，帮你精准了解应得赔偿。',
  keywords: ['裁员赔偿计算器', 'N+1计算器', '2N赔偿计算', '经济补偿金计算', '裁员补偿怎么算', '裁员赔偿标准2026', '劳动法赔偿计算'],
  alternates: {
    canonical: '/tools/severance',
  },
  openGraph: {
    title: '裁员赔偿计算器 - 精准计算N+1、2N补偿金',
    description: '输入月薪+年限，一键计算裁员赔偿。支持N、N+1、2N三种方案对比。',
    url: 'https://caileme.team/tools/severance',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
