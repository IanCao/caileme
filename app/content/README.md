# 社区内容目录

往这个目录下添加 Markdown 文件即可发布社区内容。添加后运行 `npm run build` 重新构建生效。

## 目录结构

```
content/
├── posts/       # 社区帖子（经验分享、避坑指南、仲裁经验、再就业）
├── news/        # 裁员情报
└── README.md    # 本文件
```

## 添加社区帖子

在 `posts/` 目录下创建 `.md` 文件，文件名随意（如 `my-story.md`）：

```markdown
---
id: "unique-post-id"
nickname: "匿名打工人"
avatar: "👤"
title: "文章标题"
summary: "文章摘要（可选，不填则自动截取正文前100字）"
category: "经验分享"
date: "2026-03-22"
likes: 0
---

文章正文内容（Markdown格式）
```

### 支持的分类（category）

- `经验分享` - 被裁经历、谈判心得等
- `避坑指南` - 需要注意的坑
- `仲裁经验` - 劳动仲裁相关
- `再就业` - 求职经验分享

### 必填字段

- `id` - 唯一标识（字符串，如 "my-story-01"）
- `title` - 文章标题

### 可选字段

- `nickname` - 昵称（默认"匿名投稿"）
- `avatar` - 头像emoji（默认"📝"）
- `summary` - 摘要（默认截取正文前100字）
- `category` - 分类（默认"经验分享"）
- `date` - 日期（默认当天，格式 "2026-03-22"）
- `likes` - 点赞数（默认0）

## 添加裁员情报

在 `news/` 目录下创建 `.md` 文件：

```markdown
---
id: 101
company: "公司名称"
industry: "行业"
city: "城市"
date: "2026年3月"
ratio: "约10%"
compensation: "N+1"
departments: "涉及部门"
source: "信息来源"
verified: false
---

**裁员规模**：约10%

**赔偿方案**：N+1

详细说明...
```

### 必填字段

- `id` - 唯一数字ID
- `company` - 公司名称

### 可选字段

- `industry` - 行业（默认"未知"）
- `city` - 城市（默认"未知"）
- `date` - 时间
- `ratio` - 裁员比例
- `compensation` - 赔偿方案
- `departments` - 涉及部门
- `source` - 信息来源
- `verified` - 是否已核实（true/false，默认false）

## 构建

```bash
# 开发时预览
npm run dev

# 构建（会自动处理MD文件）
npm run build
```

构建时会自动运行 `scripts/build-content.js`，将MD文件编译为JSON，合并到社区数据中。
