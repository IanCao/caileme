import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '灵活就业社保缴纳计算器 - 离职后社保自己交多少钱 | 裁了么',
  description: '离职后社保自己交多少钱？灵活就业社保缴纳计算器，计算养老保险和医疗保险每月费用。覆盖全国20+城市2026年最新缴费基数。',
  keywords: ['灵活就业社保', '自己交社保多少钱', '离职后社保怎么交', '灵活就业养老保险', '社保缴纳计算器'],
  openGraph: {
    title: '灵活就业社保缴纳计算器',
    description: '计算离职后自己缴纳社保的每月费用。',
    url: 'https://caileme.team/tools/social-payment',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
