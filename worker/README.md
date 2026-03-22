# 裁了么 API — Cloudflare Worker + D1

Cloudflare Worker 后端 API，使用 D1 (SQLite) 存储数据。

## Prerequisites

- Node.js >= 18
- Cloudflare 账号（免费即可）
- Wrangler CLI：`npm install -g wrangler`
- 已登录 Wrangler：`wrangler login`

## Quick Start

```bash
# 1. 安装依赖
npm install

# 2. 一键部署（创建 D1 + 迁移 + 部署）
npm run setup
```

## Step-by-Step Setup

### 1. 创建 D1 数据库

```bash
npx wrangler d1 create caileme-db
```

将输出中的 `database_id` 复制到 `wrangler.toml`，替换 `YOUR_DATABASE_ID_HERE`。

### 2. 运行数据库迁移

```bash
# 本地测试
npm run migrate:local

# 远程（生产环境）
npm run migrate
```

### 3. 部署 Worker

```bash
npm run deploy
```

## Development

```bash
# 本地开发（自动创建本地 D1）
npm run dev
```

访问 `http://localhost:8787/api/health` 验证。

## API Endpoints

| Method | Path                    | Description |
|--------|-------------------------|-------------|
| GET    | `/api/health`           | 健康检查    |
| POST   | `/api/feedback`         | 提交反馈    |
| POST   | `/api/community/submit` | 提交社区帖子 |
| POST   | `/api/comment`          | 提交评论    |
| POST   | `/api/like`             | 点赞        |

### Testing Endpoints

```bash
# 健康检查
curl https://caileme-api.<your-subdomain>.workers.dev/api/health

# 提交反馈
curl -X POST https://caileme-api.<your-subdomain>.workers.dev/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"content":"测试反馈","feedback_type":"suggestion"}'
```

## Tencent SCF Setup

腾讯云 SCF 作为国内代理转发请求到 Cloudflare Worker。

### 部署步骤

1. 打包 SCF 函数：
   ```bash
   cd ../serverless/scf
   bash deploy.sh
   ```

2. 登录 [腾讯云控制台](https://console.cloud.tencent.com/scf) → 云函数

3. 创建函数：
   - 函数名: `caileme-api-proxy`
   - 运行时: Node.js 16
   - Handler: `index.main_handler`

4. 上传 `scf-proxy.zip`

5. 配置环境变量：
   - `CF_WORKER_URL` = `https://caileme-api.<subdomain>.workers.dev`
   - `CF_AUTH_TOKEN` = 你的鉴权 Token

6. 添加 API 网关触发器：
   - 路径: `/api/{proxy+}`
   - 方法: ANY

## Environment Variables

| Variable        | Location | Description               |
|-----------------|----------|---------------------------|
| `ENVIRONMENT`   | Worker   | 运行环境（wrangler.toml）  |
| `ADMIN_KEY`     | Worker   | 管理接口密钥（可选）       |
| `CF_WORKER_URL` | SCF      | Worker 完整 URL           |
| `CF_AUTH_TOKEN`  | SCF      | Worker 鉴权 Token         |

## NPM Scripts

| Script          | Description              |
|-----------------|--------------------------|
| `npm run dev`   | 本地开发服务器            |
| `npm run deploy`| 部署到 Cloudflare        |
| `npm run setup` | 一键创建 D1 + 迁移 + 部署 |
| `npm run migrate`| 远程 D1 迁移             |
| `npm run migrate:local`| 本地 D1 迁移       |
