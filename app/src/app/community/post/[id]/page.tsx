import { communityPosts } from "@/data/communityData";
import PostDetailClient from "./PostDetailClient";

export function generateStaticParams() {
  return communityPosts.map((p) => ({ id: p.id }));
}

export default function PostPage({ params }: { params: { id: string } }) {
  return <PostDetailClient params={params} />;
}
