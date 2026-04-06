import { Metadata } from "next";

export const metadata: Metadata = {
  title: "保护站信息 - 裁了么社区",
  description:
    "实时追踪互联网行业裁员情报，分享真实裁员经历和维权经验。覆盖全国30+城市，包含裁员信息、经验分享、避坑指南、仲裁经验、红黑厂曝光等。",
  keywords: ["裁员情报", "裁员经历", "裁员社区", "劳动仲裁", "经验分享", "避坑指南", "裁员赔偿", "互联网裁员", "劳动权益"],
  alternates: {
    canonical: "/community",
  },
  openGraph: {
    title: "保护站信息 - 裁了么社区",
    description:
      "实时追踪互联网行业裁员情报，分享真实裁员经历和维权经验。覆盖全国30+城市，包含裁员信息、经验分享、避坑指南、仲裁经验、红黑厂曝光等。",
    url: "https://caileme.team/community",
  },
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
