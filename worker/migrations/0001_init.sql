-- 裁了么 Cloudflare D1 数据库 Schema（v3 精简版）
-- Migration: 0001_init.sql

-- 社区帖子表
CREATE TABLE IF NOT EXISTS community_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  nickname TEXT DEFAULT '匿名打工人',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '经验分享',
  city TEXT,
  company TEXT,
  status TEXT DEFAULT 'pending',
  likes INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  is_anonymous INTEGER DEFAULT 1,
  admin_note TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 反馈表
CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  feedback_type TEXT NOT NULL,
  page_url TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  admin_note TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 评论表
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id TEXT NOT NULL,
  nickname TEXT DEFAULT '匿名打工人',
  content TEXT NOT NULL,
  email TEXT,
  status TEXT DEFAULT 'pending',
  likes INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- 点赞表
CREATE TABLE IF NOT EXISTS likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id TEXT NOT NULL,
  post_type TEXT NOT NULL DEFAULT 'community_post',
  created_at TEXT DEFAULT (datetime('now'))
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_community_posts_status ON community_posts(status);
CREATE INDEX IF NOT EXISTS idx_community_posts_category ON community_posts(category);
CREATE INDEX IF NOT EXISTS idx_community_posts_created ON community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id, status);
CREATE INDEX IF NOT EXISTS idx_likes_post ON likes(post_id, post_type);
