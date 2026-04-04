// 社区内容数据 - 从 MD 文件生成，由 build-content.js 构建

import generatedPosts from './generatedPosts.json';
import generatedNews from './generatedNews.json';
import generatedCompanies from './generatedCompanies.json';

export type NewsItem = {
  id: string;
  company: string;
  industry: string;
  city: string;
  date: string;
  ratio: string;
  compensation: string;
  departments: string;
  source: string;
  sourceUrl: string;
  verified: boolean;
  detail: string;
  viewCount?: number;
};

export type CommunityPost = {
  id: string;
  nickname: string;
  avatar: string;
  title: string;
  category: string;
  date: string;
  city: string;
  summary: string;
  excerpt?: string;
  content: string;
  source?: string;
  sourceUrl?: string;
  cover?: string;
  likes: number;
  viewCount?: number;
  comments: { nickname: string; avatar: string; content: string; date: string }[];
};

export type CompanyRating = {
  name: string;
  type: 'red' | 'black';
  city: string;
  complaints: number;
  praises: number;
  note: string;
};

export const allLayoffNews: NewsItem[] = generatedNews as NewsItem[];
export const allCommunityPosts: CommunityPost[] = generatedPosts as CommunityPost[];
export const allCompanies: CompanyRating[] = generatedCompanies as CompanyRating[];

export const redCompanies = allCompanies.filter(c => c.type === 'red');
export const blackCompanies = allCompanies.filter(c => c.type === 'black');

export const newsCities = ['全部', ...Array.from(new Set(allLayoffNews.map(n => n.city)))];

export const postCategories = ["全部", "经验分享", "避坑指南", "仲裁经验", "再就业"];
