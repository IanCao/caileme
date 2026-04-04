import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '失业金计算器 - 2026年全国20+城市失业保险金估算',
  description: '2026年最新失业金计算器，覆盖北京、上海、广州、深圳等20+城市。输入缴纳年限，自动计算每月领取金额、可领月数和总金额。帮你了解失业保险待遇。',
  keywords: ['失业金计算器', '失业保险金计算', '失业金怎么领', '失业金多少钱一个月', '失业保险金标准2026', '领失业金的条件'],
  alternates: {
    canonical: '/tools/unemployment',
  },
  openGraph: {
    title: '失业金计算器 - 2026年最新标准',
    description: '覆盖全国20+城市，输入年限一键估算失业金。',
    url: 'https://caileme.team/tools/unemployment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
