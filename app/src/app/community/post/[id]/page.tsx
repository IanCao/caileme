import { allCommunityPosts } from "@/data/communityData";
import PostDetailClient from "./PostDetailClient";

export function generateStaticParams() {
  const params = allCommunityPosts.map((p) => ({ id: p.id }));
  // Next.js output:export requires at least one prerendered route for dynamic segments.
  // When there are no posts yet, return a placeholder that renders the "not found" state.
  return params.length > 0 ? params : [{ id: '_' }];
}

export default function PostPage({ params }: { params: { id: string } }) {
  return <PostDetailClient params={params} />;
}
