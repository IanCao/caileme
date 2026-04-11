import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "分享结果",
  description: "用于展示计算结果的分享页。",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
