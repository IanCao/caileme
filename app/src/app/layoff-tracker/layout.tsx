import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '裁员维权进度追踪器 - 从被裁到维权全流程清单 | 裁了么',
  description: '裁员维权进度追踪器，从收到裁员通知到仲裁维权的完整清单。包含证据收集、赔偿谈判、社保处理、失业金申领等步骤，一步步守护你的权益。',
  keywords: ['裁员维权', '裁员流程', '劳动仲裁流程', '被裁员怎么办', '裁员维权清单'],
  openGraph: {
    title: '裁员维权进度追踪器 - 全流程清单',
    description: '从被裁到维权，一步步守护你的权益。',
    url: 'https://caileme.team/layoff-tracker',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
