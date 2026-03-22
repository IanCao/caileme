-- 评论表
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id TEXT NOT NULL,
  nickname TEXT DEFAULT '匿名打工人',
  content TEXT NOT NULL,
  email TEXT,
  status TEXT DEFAULT 'pending',  -- pending, approved, rejected
  likes INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id, status);
