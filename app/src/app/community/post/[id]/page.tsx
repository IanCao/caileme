import { allCommunityPosts } from "@/data/communityData";
import PostDetailClient from "./PostDetailClient";

export function generateStaticParams() {
  return allCommunityPosts.map((p) => ({ id: p.id }));
}

export default function PostPage({ params }: { params: { id: string } }) {
  return <PostDetailClient params={params} />;
}
