import type { Metadata } from "next";
import { allCommunityPosts } from "@/data/communityData";
import PostDetailClient from "./PostDetailClient";

function getPostById(id: string) {
  return allCommunityPosts.find((item) => item.id === id) ?? null;
}

function getRelatedPosts(id: string) {
  const post = getPostById(id);
  if (!post) return [];

  return allCommunityPosts
    .filter((item) => item.id !== post.id)
    .sort((a, b) => {
      const aScore =
        (a.category === post.category ? 2 : 0) + (a.city && a.city === post.city ? 1 : 0);
      const bScore =
        (b.category === post.category ? 2 : 0) + (b.city && b.city === post.city ? 1 : 0);

      if (bScore !== aScore) {
        return bScore - aScore;
      }

      return b.date.localeCompare(a.date);
    })
    .slice(0, 3)
    .map(({ id: relatedId, title, summary, category, date }) => ({
      id: relatedId,
      title,
      summary,
      category,
      date,
    }));
}

export function generateStaticParams() {
  const params = allCommunityPosts.map((post) => ({ id: post.id }));
  return params.length > 0 ? params : [{ id: "_" }];
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const post = getPostById(params.id);

  if (!post) {
    return {
      title: "帖子不存在",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    post.excerpt?.trim() ||
    post.summary?.trim() ||
    post.content.replace(/\s+/g, " ").trim().slice(0, 140);
  const canonicalPath = `/community/post/${post.id}`;
  const imagePath = post.cover || "/logo.png";
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : `https://caileme.team${imagePath}`;

  return {
    title: `${post.title} - 保护站信息`,
    description,
    keywords: [
      post.title,
      post.category,
      post.city,
      "保护站信息",
      "裁了么社区",
      "互联网裁员",
      "劳动权益",
    ].filter(Boolean),
    authors: [{ name: post.nickname || "匿名投稿" }],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: post.title,
      description,
      url: `https://caileme.team${canonicalPath}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.nickname || "匿名投稿"],
      section: post.category,
      images: [
        {
          url: imageUrl,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

export default function PostPage({ params }: { params: { id: string } }) {
  const post = getPostById(params.id);
  const relatedPosts = getRelatedPosts(params.id);

  if (!post) {
    return <PostDetailClient params={params} post={null} relatedPosts={[]} />;
  }

  const canonicalUrl = `https://caileme.team/community/post/${post.id}`;
  const description =
    post.excerpt?.trim() ||
    post.summary?.trim() ||
    post.content.replace(/\s+/g, " ").trim().slice(0, 140);
  const imagePath = post.cover || "/logo.png";
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : `https://caileme.team${imagePath}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    inLanguage: "zh-CN",
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: post.nickname || "匿名投稿",
    },
    publisher: {
      "@type": "Organization",
      name: "裁了么",
      logo: {
        "@type": "ImageObject",
        url: "https://caileme.team/logo.png",
      },
    },
    isAccessibleForFree: true,
    keywords: [post.category, post.city].filter(Boolean).join(", "),
    ...(post.source ? { isBasedOn: post.source } : {}),
    ...(post.sourceUrl ? { citation: post.sourceUrl } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: "https://caileme.team",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "保护站信息",
        item: "https://caileme.team/community",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PostDetailClient params={params} post={post} relatedPosts={relatedPosts} />
    </>
  );
}
