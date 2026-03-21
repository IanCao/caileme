-- 裁了么 Cloudflare D1 数据库 Schema（v2 重新设计）
-- Migration: 0001_init.sql

-- ========================================
-- 1. 城市政策数据表（前端 cityPolicies.ts 同步）
-- ========================================
CREATE TABLE IF NOT EXISTS city_policy (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT NOT NULL,
  city_code TEXT NOT NULL UNIQUE,
  province TEXT NOT NULL,
  avg_salary REAL NOT NULL,             -- 月社会平均工资（城镇非私营单位）
  avg_salary_3x REAL NOT NULL,          -- 3倍上限（经济补偿金）
  min_wage REAL NOT NULL DEFAULT 0,     -- 月最低工资标准
  unemployment_base REAL NOT NULL,      -- 失业保险金月标准（基础档）
  unemployment_high REAL,               -- 失业金较高档（如上海分档）
  unemployment_notes TEXT,              -- 发放规则说明
  house_purchase_months INTEGER,        -- 购房社保月数要求
  house_purchase_note TEXT,
  medical_grace_days INTEGER DEFAULT 90,-- 医保断缴宽限天数
  data_year INTEGER DEFAULT 2025,       -- 数据年份
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ========================================
-- 2. 裁员动态表（社区投稿 + 编辑录入）
-- ========================================
CREATE TABLE IF NOT EXISTS layoff_news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company TEXT NOT NULL,
  industry TEXT,
  city TEXT,
  layoff_date TEXT,                      -- 裁员时间（2025-01 格式）
  layoff_count TEXT,                     -- 裁员人数/比例
  compensation TEXT,                     -- 赔偿方案描述（N、N+1、2N等）
  departments TEXT,                      -- 涉及部门
  source TEXT,                           -- 信息来源（脉脉/微博/知乎等）
  source_url TEXT,                       -- 来源链接
  verified INTEGER DEFAULT 0,            -- 0=未核实 1=已核实
  status TEXT DEFAULT 'pending',         -- pending/approved/rejected
  submitted_by TEXT,                     -- 投稿者邮箱（加密存储）
  admin_note TEXT,                       -- 审核备注
  view_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ========================================
-- 3. 社区帖子表（经历分享、避坑指南等）
-- ========================================
CREATE TABLE IF NOT EXISTS community_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  nickname TEXT DEFAULT '匿名打工人',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT '经验分享',
  -- 分类：经验分享/避坑指南/仲裁经验/裁员信息/再就业/维权成功/其他
  city TEXT,                              -- 发生城市
  company TEXT,                           -- 涉及公司（可选）
  status TEXT DEFAULT 'pending',          -- pending/approved/rejected
  likes INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  is_anonymous INTEGER DEFAULT 1,         -- 是否匿名展示
  admin_note TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ========================================
-- 4. 裁员证明/证据表
-- ========================================
CREATE TABLE IF NOT EXISTS proof_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  city TEXT,
  description TEXT NOT NULL,              -- 证明描述
  proof_type TEXT DEFAULT 'layoff',       -- layoff/wage_arrears/illegal/other
  status TEXT DEFAULT 'pending',          -- pending/approved/rejected
  admin_note TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ========================================
-- 5. 图片附件表（关联各类投稿）
-- ========================================
CREATE TABLE IF NOT EXISTS attachments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref_type TEXT NOT NULL,                 -- community_post/proof/feedback/layoff_news
  ref_id INTEGER NOT NULL,                -- 关联记录ID
  file_key TEXT NOT NULL,                 -- R2 存储 key
  file_name TEXT,                         -- 原始文件名
  file_size INTEGER,                      -- 文件大小（字节）
  mime_type TEXT,                         -- image/jpeg, image/png 等
  created_at TEXT DEFAULT (datetime('now'))
);

-- ========================================
-- 6. 反馈表（浮动反馈按钮）
-- ========================================
CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  feedback_type TEXT NOT NULL,            -- bug/suggestion/data_error/other
  page_url TEXT,                          -- 来源页面
  content TEXT NOT NULL,
  status TEXT DEFAULT 'unread',           -- unread/read/resolved
  admin_note TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ========================================
-- 7. 计算器使用日志（匿名统计，用于数据分析）
-- ========================================
CREATE TABLE IF NOT EXISTS calculator_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_type TEXT NOT NULL,                -- severance/unemployment/social_insurance
  city TEXT,
  -- 匿名聚合数据（不存储具体工资）
  salary_range TEXT,                      -- 5k-10k/10k-20k/20k-30k/30k-50k/50k+
  work_years_range TEXT,                  -- 0-1/1-3/3-5/5-10/10+
  situation TEXT,                         -- negotiation/no_notice/illegal
  user_agent TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ========================================
-- 8. 邮件订阅表（裁员动态通知）
-- ========================================
CREATE TABLE IF NOT EXISTS email_subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  city TEXT,                              -- 关注的城市（空=全部）
  industry TEXT,                          -- 关注的行业（空=全部）
  is_active INTEGER DEFAULT 1,
  unsubscribe_token TEXT,                 -- 退订token
  created_at TEXT DEFAULT (datetime('now'))
);

-- ========================================
-- 索引
-- ========================================
-- 裁员动态
CREATE INDEX IF NOT EXISTS idx_layoff_news_status ON layoff_news(status);
CREATE INDEX IF NOT EXISTS idx_layoff_news_city ON layoff_news(city);
CREATE INDEX IF NOT EXISTS idx_layoff_news_created ON layoff_news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_layoff_news_company ON layoff_news(company);

-- 社区帖子
CREATE INDEX IF NOT EXISTS idx_community_posts_status ON community_posts(status);
CREATE INDEX IF NOT EXISTS idx_community_posts_category ON community_posts(category);
CREATE INDEX IF NOT EXISTS idx_community_posts_created ON community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_posts_city ON community_posts(city);

-- 证明
CREATE INDEX IF NOT EXISTS idx_proof_status ON proof_submissions(status);
CREATE INDEX IF NOT EXISTS idx_proof_company ON proof_submissions(company);

-- 附件
CREATE INDEX IF NOT EXISTS idx_attachments_ref ON attachments(ref_type, ref_id);

-- 反馈
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);

-- 日志
CREATE INDEX IF NOT EXISTS idx_calc_logs_type ON calculator_logs(tool_type);
CREATE INDEX IF NOT EXISTS idx_calc_logs_created ON calculator_logs(created_at DESC);

-- 订阅
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON email_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_active ON email_subscriptions(is_active);

-- 城市
CREATE INDEX IF NOT EXISTS idx_city_policy_code ON city_policy(city_code);

-- ========================================
-- 初始城市数据（与前端 cityPolicies.ts 同步）
-- ========================================
INSERT INTO city_policy (city, city_code, province, avg_salary, avg_salary_3x, min_wage, unemployment_base, unemployment_high, unemployment_notes, house_purchase_months, house_purchase_note, medical_grace_days, data_year) VALUES
('北京', 'beijing', '北京市', 13930, 41790, 2420, 2234, NULL, '固定标准¥2234/月（2024年起），不分档次', 60, '连续60个月社保或个税', 90, 2025),
('上海', 'shanghai', '上海市', 13680, 41040, 2690, 2055, 2590, '按缴费年限分4档：1年内¥2055，1-2年¥2295，2-3年¥2420，3年以上¥2590', 60, '连续60个月社保', 90, 2025),
('广州', 'guangzhou', '广东省', 12100, 36300, 2300, 2070, NULL, '按最低工资标准的90%发放', 60, '连续60个月社保', 90, 2025),
('深圳', 'shenzhen', '广东省', 13730, 41190, 2360, 2124, NULL, '按最低工资标准的90%发放', 36, '连续36个月社保', 60, 2025),
('杭州', 'hangzhou', '浙江省', 12540, 37620, 2280, 2052, NULL, '按最低工资标准的90%发放', 48, '连续48个月社保', 90, 2025),
('南京', 'nanjing', '江苏省', 11820, 35460, 2280, 2052, NULL, '按最低工资标准的90%发放', 24, '连续24个月社保', 90, 2025),
('苏州', 'suzhou', '江苏省', 11350, 34050, 2280, 2052, NULL, '按最低工资标准的90%发放（一类地区）', 24, '连续24个月社保', 90, 2025),
('成都', 'chengdu', '四川省', 9860, 29580, 2100, 1680, NULL, '按最低工资标准的80%发放', 24, '连续24个月社保', 90, 2025),
('武汉', 'wuhan', '湖北省', 10220, 30660, 2210, 1768, NULL, '按最低工资标准的80%发放', 24, '连续24个月社保', 90, 2025),
('西安', 'xian', '陕西省', 9450, 28350, 2160, 1728, NULL, '按最低工资标准的80%发放', 24, '连续24个月社保', 90, 2025),
('重庆', 'chongqing', '重庆市', 9180, 27540, 2100, 1680, NULL, '按最低工资标准的80%发放', 12, '连续12个月社保', 90, 2025),
('天津', 'tianjin', '天津市', 10560, 31680, 2180, 1744, NULL, '按最低工资标准的80%发放', 24, '连续24个月社保', 90, 2025),
('长沙', 'changsha', '湖南省', 9320, 27960, 2100, 1680, NULL, '按最低工资标准的80%发放', 24, '连续24个月社保', 60, 2025),
('郑州', 'zhengzhou', '河南省', 8750, 26250, 2000, 1600, NULL, '按最低工资标准的80%发放', 24, '连续24个月社保', 90, 2025),
('厦门', 'xiamen', '福建省', 11100, 33300, 2060, 1854, NULL, '按最低工资标准的90%发放', 36, '连续36个月社保', 90, 2025),
('青岛', 'qingdao', '山东省', 9680, 29040, 2100, 1680, NULL, '按最低工资标准的80%发放', 12, '连续12个月社保', 90, 2025),
('东莞', 'dongguan', '广东省', 10180, 30540, 1900, 1710, NULL, '按最低工资标准的90%发放', 12, '连续12个月社保', 60, 2025),
('合肥', 'hefei', '安徽省', 9100, 27300, 2060, 1648, NULL, '按最低工资标准的80%发放', 12, '连续12个月社保', 90, 2025),
('佛山', 'foshan', '广东省', 9870, 29610, 1900, 1710, NULL, '按最低工资标准的90%发放', 12, '连续12个月社保', 60, 2025),
('无锡', 'wuxi', '江苏省', 10850, 32550, 2280, 2052, NULL, '按最低工资标准的90%发放（一类地区）', 24, '连续24个月社保', 90, 2025);
