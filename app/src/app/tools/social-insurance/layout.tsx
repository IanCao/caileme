import { Metadata } from "next";

export const metadata: Metadata = {
  title: "社保断缴影响 - 医保、落户、买房影响全解析",
  description:
    "裁员后社保断缴会有什么影响？了解医保、落户、买房、购车等方面的影响及应对方案。",
};

export default function SocialInsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
