import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "法律援助 - 免费法律援助资源与专业律师服务",
  description:
    "裁员维权法律援助资源页，汇总免费法律援助热线、法律援助机构和专业律师服务，帮助打工人快速找到合适的法律支持。",
  alternates: {
    canonical: "/legal-aid",
  },
  openGraph: {
    title: "法律援助 - 免费法律援助资源与专业律师服务",
    description:
      "汇总免费法律援助热线、法律援助机构和专业律师服务，帮助打工人快速找到合适的法律支持。",
    url: "https://caileme.team/legal-aid",
  },
};

export default function LegalAidLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
