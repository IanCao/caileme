import { Metadata } from "next";

export const metadata: Metadata = {
  title: "被裁赔偿计算器 - 快速计算N+1赔偿金额",
  description:
    "免费被裁赔偿计算器，输入月薪和工作年限，快速计算N、N+1、N+2赔偿金额。了解你的合法权益。",
};

export default function SeveranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
