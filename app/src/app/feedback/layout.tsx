import { Metadata } from "next";

export const metadata: Metadata = {
  title: "功能反馈 - 帮助我们改进",
  description: "提交功能建议、内容纠错、数据更新、Bug反馈。你的反馈帮助裁了么牛马保护站变得更好。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
