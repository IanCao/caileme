import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '社保断缴影响查询 - 医保购房落户养老全面解析 | 裁了么',
  description: '离职后社保断缴会有什么影响？查询医疗保险、购房资格、落户积分、养老金等7大影响。覆盖全国20+城市2026年最新政策，提供断缴应对方案。',
  keywords: ['社保断缴影响', '社保断了怎么办', '离职后社保怎么交', '社保断缴对医保的影响', '社保断缴对购房的影响', '社保补缴'],
  openGraph: {
    title: '社保断缴影响查询 - 7大影响全面解析',
    description: '查询社保断缴对医保、购房、落户、养老的影响及应对方案。',
    url: 'https://caileme.team/tools/social-insurance',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
