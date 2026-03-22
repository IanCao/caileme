import { Metadata } from "next";

export const metadata: Metadata = {
  title: "离职后社保缴纳指南 - 灵活就业社保、居民社保、代缴方式",
  description:
    "离职后如何继续缴纳社保？灵活就业社保、城镇居民社保、社保代缴全解析。了解各地缴费标准、办理流程、注意事项。",
};

export default function SocialPaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
