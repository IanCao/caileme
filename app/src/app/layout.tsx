import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeedbackButton } from "@/components/FeedbackButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://caileme.team"),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.png",
    apple: "/logo.png",
  },
  title: {
    default: "裁了么 - 被裁员怎么办？赔偿计算器 | 维权指南 | AI裁员模拟",
    template: "%s | 裁了么",
  },
  description:
    "裁了么是帮助被裁打工人维权的免费工具平台。提供裁员赔偿计算器（N+1/2N）、失业金计算器、社保断缴影响查询、劳动仲裁指南、AI裁员谈判模拟。覆盖全国30+城市2026年最新政策数据，已帮助10000+打工人。",
  keywords: [
    "裁员赔偿",
    "裁员赔偿计算器",
    "N+1赔偿",
    "2N赔偿",
    "经济补偿金",
    "失业金计算",
    "失业金怎么领",
    "失业保险金",
    "社保断缴",
    "社保断缴影响",
    "离职后社保怎么交",
    "裁员指南",
    "被裁员怎么办",
    "裁员谈判",
    "劳动仲裁",
    "劳动仲裁流程",
    "裁员维权",
    "AI裁员模拟",
    "裁了么",
    "裁员补偿标准2026",
    "互联网裁员",
  ],
  authors: [{ name: "裁了么" }],
  verification: {
    other: {
      "baidu-site-verification": "codeva-HTv7mW5lhT",
      "sogou_site_verification": "wf7vxZV1H8",
      "360-site-verification": "58255a9eb03c06abf95c75f3cb14bcb3",
      "msvalidate.01": "8CB938A2C545220A9A5E510A38281AE0",
      "bytedance-verification-code":"Zax5ygxoyhqYhpzfa2We"
    },
  },
  openGraph: {
    title: "裁了么 牛马保护站 - 知道权利，才能守住权利",
    description:
      "被裁赔偿计算器、失业金计算、维权百科、AI模拟被裁谈话。帮助你应对被裁，争取合理赔偿。",
    url: "https://caileme.team",
    siteName: "裁了么 牛马保护站",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1416,
        height: 1402,
        alt: "裁了么",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "裁了么 牛马保护站 - 裁员赔偿计算器 | 维权百科 | AI裁员模拟",
    description:
      "裁员赔偿计算器、失业金计算、维权百科、AI模拟裁员谈话。帮助你应对裁员，争取合理赔偿。",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "applicable-device": "pc,mobile",
    renderer: "webkit",
    "force-rendering": "webkit",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "裁了么",
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
        {/* Baidu SEO */}
        <meta name="baiduImageplus" content="1" />
        <meta
          name="google-adsense-account"
          content="ca-pub-1331537179356559"
        />
        <meta name="author" content="裁了么 牛马保护站" />
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
        {/* Baidu auto-push for faster indexing */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var bp = document.createElement('script');
            var curProtocol = window.location.protocol.split(':')[0];
            if (curProtocol === 'https') {
              bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
            } else {
              bp.src = 'http://push.zhanzhang.baidu.com/push.js';
            }
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(bp, s);
          })();
        `}} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Script
          id="adsense-init"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1331537179356559"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FeedbackButton />
      </body>
    </html>
  );
}
