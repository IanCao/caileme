import CommunityPageClient from './CommunityPageClient';
import {
  allLayoffNews,
  allCommunityPosts,
  blackCompanies,
  newsCities,
  redCompanies,
} from '@/data/communityData';

const postItems = allCommunityPosts.map((post) => ({
  id: post.id,
  nickname: post.nickname,
  avatar: post.avatar,
  title: post.title,
  category: post.category,
  date: post.date,
  summary: post.summary,
}));

export default function CommunityPage() {
  return (
    <CommunityPageClient
      newsItems={allLayoffNews}
      postItems={postItems}
      newsCities={newsCities}
      redCompanies={redCompanies}
      blackCompanies={blackCompanies}
    />
  );
}
