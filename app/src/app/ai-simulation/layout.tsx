import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI被裁模拟对话 - 免费模拟HR裁员谈判场景 | 裁了么",
  description:
    "免费AI模拟被裁谈话：正常裁员N+1谈判、低赔偿压价应对、违法裁员2N维权、互动模拟对话。提前练习裁员应对策略，掌握谈判技巧，保护打工人合法权益。覆盖赔偿谈判、竞业限制、社保维权等场景。",
  keywords: [
    "AI裁员模拟",
    "裁员谈判模拟",
    "HR裁员对话",
    "裁员应对策略",
    "N+1谈判",
    "2N赔偿",
    "违法裁员",
    "裁员赔偿谈判",
    "劳动仲裁",
    "裁了么",
  ],
  openGraph: {
    title: "AI被裁模拟对话 - 免费模拟HR裁员谈判",
    description:
      "5大裁员场景模拟：正常裁员、低赔偿压价、违法裁员、社保维权、竞业限制。提前练习，保护权益。",
    url: "https://caileme.team/ai-simulation",
  },
};

export default function AISimulationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
