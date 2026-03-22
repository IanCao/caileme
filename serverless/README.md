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

### 1. Cloudflare Worker 部署

```bash
cd worker
npm install
npm run setup    # 创建 D1 + 迁移 + 部署
```

或手动操作：

```bash
npx wrangler d1 create caileme-db
# 将 database_id 填入 wrangler.toml
npm run migrate  # 远程迁移
npm run deploy
```

详见 [worker/README.md](../worker/README.md)。

### 2. 腾讯云 SCF 部署

#### 自动打包

```bash
cd scf
bash deploy.sh
```

#### 手动部署

1. 登录 [腾讯云控制台](https://console.cloud.tencent.com/scf) → 云函数 SCF
2. 创建函数：
   - 函数名: `caileme-api-proxy`
   - 运行时: Node.js 16
   - Handler: `index.main_handler`
3. 上传 `scf/index.js`（或 `deploy.sh` 生成的 `scf-proxy.zip`）
4. 配置环境变量：
   - `CF_WORKER_URL`: Cloudflare Worker 完整地址（如 `https://caileme-api.xxx.workers.dev`）
   - `CF_AUTH_TOKEN`: Worker 鉴权 Token
5. 添加 API 网关触发器：
   - 路径: `/api/{proxy+}`
   - 方法: ANY
6. 记录 API 网关地址

### 3. 前端配置

修改 `app/src/lib/api.ts` 中的 `API_BASE` 为腾讯云 API 网关地址。

## 环境变量

### SCF
| 变量 | 说明 |
|------|------|
| `CF_WORKER_URL` | Cloudflare Worker 地址 |
| `CF_AUTH_TOKEN` | Worker 鉴权 Token |

### Worker
| 变量 | 说明 |
|------|------|
| `ENVIRONMENT` | 运行环境（wrangler.toml 中配置） |
| `ADMIN_KEY` | 管理接口密钥（可选） |
| D1 绑定名 `DB` | 自动绑定，无需手动设置 |
