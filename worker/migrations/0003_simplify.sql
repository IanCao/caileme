-- Migration: 0003_simplify.sql
-- 新增点赞记录表

CREATE TABLE IF NOT EXISTS likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id TEXT NOT NULL,
  post_type TEXT NOT NULL DEFAULT 'community_post', -- community_post, news, comment
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_likes_post ON likes(post_id, post_type);
