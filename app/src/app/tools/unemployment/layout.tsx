import { Metadata } from "next";

export const metadata: Metadata = {
  title: "失业金计算器 - 估算失业保险金领取金额",
  description:
    "免费失业金计算器，根据城市和社保缴纳年限，估算每月失业金金额和领取时长。",
};

export default function UnemploymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
