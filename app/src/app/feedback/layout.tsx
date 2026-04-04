import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '意见反馈',
  description: '向裁了么提交意见反馈、功能建议或数据纠错。',
  alternates: {
    canonical: '/feedback',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
