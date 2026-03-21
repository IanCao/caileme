import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI裁员模拟 - 模拟HR裁员对话",
  description:
    "AI模拟裁员谈话场景，提前练习应对策略。包含正常裁员、低赔偿压价、违法裁员等多种场景。",
};

export default function AISimulationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
