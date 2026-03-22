import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeedbackButton } from "@/components/FeedbackButton";

export const metadata: Metadata = {
  title: {
    default: "裁了么 牛马保护站 - 裁员赔偿计算器 | 维权百科 | AI裁员模拟",
    template: "%s | 裁了么 牛马保护站",
  },
  description:
    "裁了么牛马保护站是一个帮助打工人应对裁员的工具平台。提供裁员赔偿计算器、失业金计算器、社保断缴影响、维权百科、AI裁员模拟等功能，帮助你争取合理赔偿，顺利过渡。",
  keywords: [
    "裁员赔偿",
    "N+1",
    "裁员赔偿计算器",
    "失业金计算",
    "社保断缴",
    "裁员指南",
    "裁员谈判",
    "AI裁员模拟",
    "裁了么",
  ],
  authors: [{ name: "裁了么 牛马保护站" }],
  alternates: {
    canonical: "https://caileme.team",
  },
  verification: {
    google: "GOOGLE_VERIFICATION_CODE",
    other: {
      "baidu-site-verification": "BAIDU_VERIFICATION_CODE",
      "sogou_site_verification": "SOGOU_VERIFICATION_CODE",
      "360-site-verification": "360_VERIFICATION_CODE",
      "msvalidate.01": "BING_VERIFICATION_CODE",
    },
  },
  openGraph: {
    title: "裁了么 牛马保护站 - 知道权利，才能守住权利",
    description:
      "裁员赔偿计算器、失业金计算、维权百科、AI模拟裁员谈话。帮助你应对裁员，争取合理赔偿。",
    url: "https://caileme.team",
    siteName: "裁了么 牛马保护站",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "https://caileme.team/og-image.png",
        width: 1200,
        height: 630,
        alt: "裁了么 牛马保护站 - 裁员赔偿计算器 | 维权百科 | AI裁员模拟",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "裁了么 牛马保护站 - 裁员赔偿计算器 | 维权百科 | AI裁员模拟",
    description:
      "裁员赔偿计算器、失业金计算、维权百科、AI模拟裁员谈话。帮助你应对裁员，争取合理赔偿。",
    images: ["https://caileme.team/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "applicable-device": "pc,mobile",
    renderer: "webkit",
    "force-rendering": "webkit",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://caileme.team/#website",
      url: "https://caileme.team",
      name: "裁了么 牛马保护站",
      description:
        "裁了么牛马保护站是一个帮助打工人应对裁员的工具平台。提供裁员赔偿计算器、失业金计算器、社保断缴影响、维权百科、AI裁员模拟等功能。",
      inLanguage: "zh-CN",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://caileme.team/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://caileme.team/#organization",
      name: "裁了么 牛马保护站",
      url: "https://caileme.team",
      logo: {
        "@type": "ImageObject",
        url: "https://caileme.team/logo.png",
      },
      description:
        "帮助打工人应对裁员的工具平台，提供裁员赔偿计算、失业金计算、维权百科等服务。",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to CDN */}
        <link rel="preconnect" href="https://static.cloudflareinsights.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "YOUR_CF_ANALYTICS_TOKEN"}'
        />
        {/* Zaraz (managed via Cloudflare dashboard, auto-injected if enabled) */}
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FeedbackButton />
      </body>
    </html>
  );
}
