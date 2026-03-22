import { MetadataRoute } from "next";
import generatedPosts from "@/data/generatedPosts.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://caileme.team";
  const recentDate = "2026-03-22";
  const launchDate = "2026-03-01";

  const communityPostUrls: MetadataRoute.Sitemap = generatedPosts.map(
    (post: { id: string }) => ({
      url: `${baseUrl}/community/post/${post.id}`,
      lastModified: recentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })
  );

  return [
    { url: baseUrl, lastModified: recentDate, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/tools`, lastModified: recentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools/severance`, lastModified: recentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools/unemployment`, lastModified: recentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools/social-insurance`, lastModified: recentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tools/social-payment`, lastModified: recentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides`, lastModified: recentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/guides/layoff-day`, lastModified: recentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/negotiation`, lastModified: recentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/arbitration`, lastModified: recentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/evidence-collection`, lastModified: recentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/social-insurance-guide`, lastModified: recentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/non-compete`, lastModified: recentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/career-restart`, lastModified: recentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/layoff-tracker`, lastModified: recentDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/layoff-news`, lastModified: recentDate, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/legal-aid`, lastModified: recentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/share`, lastModified: recentDate, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/ai-simulation`, lastModified: recentDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/community`, lastModified: recentDate, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/community/submit`, lastModified: launchDate, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/feedback`, lastModified: launchDate, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/about`, lastModified: launchDate, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: launchDate, changeFrequency: "yearly", priority: 0.1 },
    { url: `${baseUrl}/terms`, lastModified: launchDate, changeFrequency: "yearly", priority: 0.1 },
    ...communityPostUrls,
  ];
}
