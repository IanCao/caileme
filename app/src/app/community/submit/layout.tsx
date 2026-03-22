import { Metadata } from "next";

export const metadata: Metadata = {
  title: "匿名投稿 - 分享裁员经历和信息",
  description: "匿名投稿裁员信息、经验分享、避坑指南、仲裁经验。帮助更多打工人了解真实情况。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
