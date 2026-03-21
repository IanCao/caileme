import { Metadata } from "next";

export const metadata: Metadata = {
  title: "社区广场 - 裁员动态与经历分享",
  description:
    "实时追踪互联网行业裁员动态，分享真实裁员经历。覆盖全国20+城市，包含裁员信息、经验分享、避坑指南、仲裁经验等。",
  keywords: ["裁员动态", "裁员经历", "裁员社区", "劳动仲裁", "经验分享"],
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
