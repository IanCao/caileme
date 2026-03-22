import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/share"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/api/", "/_next/", "/share"],
        crawlDelay: 5,
      },
      {
        userAgent: "Sogou web spider",
        allow: "/",
        disallow: ["/api/", "/_next/", "/share"],
        crawlDelay: 5,
      },
      {
        userAgent: "360Spider",
        allow: "/",
        disallow: ["/api/", "/_next/", "/share"],
        crawlDelay: 5,
      },
      {
        userAgent: "bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/share"],
        crawlDelay: 5,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/", "/share"],
      },
    ],
    sitemap: "https://caileme.team/sitemap.xml",
  };
}
