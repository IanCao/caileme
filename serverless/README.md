# 后端架构：腾讯云 SCF → Cloudflare Worker

## 架构说明

```
前端 (caileme.team)
  ↓ POST /feedback, /submit, /comment, /like
腾讯云 API 网关 (service-xxx.gz.tencentapigw.com)
  ↓ 转发
腾讯云 SCF (云函数)
  ↓ 转发 + 鉴权
Cloudflare Worker (caileme-api.xxx.workers.dev)
  ↓ 存储
Cloudflare D1 (SQLite)
```

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| POST | `/api/feedback` | 提交反馈 |
| POST | `/api/community/submit` | 提交社区帖子 |
| POST | `/api/comment` | 提交评论 |
| POST | `/api/like` | 点赞 |

## 部署步骤

### 1. 腾讯云 SCF 部署

1. 登录腾讯云控制台 → 云函数 SCF
2. 创建函数，运行时选 Node.js 18
3. 上传 `scf/index.js`
4. 配置 API 网关触发器，路径：`/feedback`, `/submit`, `/comment`, `/like`
5. 记录 API 网关地址

### 2. Cloudflare Worker 部署

1. `cd worker && npm install && npx wrangler deploy`
2. 配置 D1 数据库绑定
3. 运行迁移：
   ```bash
   npx wrangler d1 execute caileme-db --file=migrations/0001_init.sql
   npx wrangler d1 execute caileme-db --file=migrations/0002_comments.sql
   npx wrangler d1 execute caileme-db --file=migrations/0003_simplify.sql
   ```

### 3. 前端配置

修改 `app/src/lib/api.ts` 中的 `API_BASE` 为腾讯云 API 网关地址。

## 环境变量

### SCF
- `CF_WORKER_URL`: Cloudflare Worker 地址
- `CF_AUTH_TOKEN`: Worker 鉴权 Token

### Worker
- `AUTH_TOKEN`: 与 SCF 配置的相同 Token
- D1 绑定名: `DB`
