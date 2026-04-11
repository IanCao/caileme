/**
 * 社区内容加载器
 * 
 * 使用方式：
 * 1. 在 content/posts/ 目录下创建 .md 文件（经验分享、避坑指南等）
 * 2. 在 content/news/ 目录下创建 .md 文件（裁员情报）
 * 3. 文件头部使用 YAML front matter 定义元数据
 * 4. 重新构建项目即可生效（npm run build）
 * 
 * 注意：由于使用静态导出(output: 'export')，内容在构建时加载。
 * 新增MD文件后需要重新构建才能看到更新。
 * 
 * 未来可以接入CMS或后端API实现动态内容加载。
 */

import { CommunityPost, NewsItem } from '@/data/communityData';

// Front matter 解析（简单实现，不依赖外部库）
function parseFrontMatter(content: string): { meta: Record<string, any>; body: string } {
  const normalized = content.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: normalized };
  
  const meta: Record<string, any> = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // Parse numbers and booleans
      if (value === 'true') meta[key] = true;
      else if (value === 'false') meta[key] = false;
      else if (!isNaN(Number(value)) && value !== '') meta[key] = Number(value);
      else meta[key] = value;
    }
  });
  
  return { meta, body: match[2] };
}

/**
 * 将MD文件内容转换为CommunityPost
 */
export function mdToPost(content: string): CommunityPost | null {
  try {
    const { meta, body } = parseFrontMatter(content);
    if (!meta.id || !meta.title) return null;
    
    return {
      id: String(meta.id),
      nickname: meta.nickname || '匿名投稿',
      avatar: meta.avatar || '📝',
      title: meta.title,
      summary: meta.summary || body.slice(0, 100) + '...',
      content: body,
      category: meta.category || '经验分享',
      date: meta.date || new Date().toISOString().split('T')[0],
      city: meta.city || '',
      likes: meta.likes || 0,
      comments: [],
    };
  } catch {
    return null;
  }
}

/**
 * 将MD文件内容转换为NewsItem
 */
export function mdToNews(content: string): NewsItem | null {
  try {
    const { meta, body } = parseFrontMatter(content);
    if (!meta.id || !meta.company) return null;
    
    return {
      id: String(meta.id),
      company: meta.company,
      industry: meta.industry || '未知',
      city: meta.city || '未知',
      date: meta.date || '',
      ratio: meta.ratio || '未知',
      compensation: meta.compensation || '未知',
      departments: meta.departments || '未知',
      source: meta.source || 'MD文件投稿',
      sourceUrl: meta.sourceUrl || '',
      verified: meta.verified || false,
      detail: body,
    };
  } catch {
    return null;
  }
}

/**
 * 使用说明（README）
 * 
 * ## 添加社区帖子
 * 
 * 在 `content/posts/` 目录下创建 `.md` 文件：
 * 
 * ```markdown
 * ---
 * id: "unique-post-id"
 * nickname: "匿名打工人"
 * avatar: "👤"
 * title: "文章标题"
 * summary: "文章摘要"
 * category: "经验分享"
 * date: "2026-03-22"
 * likes: 0
 * ---
 * 
 * 文章正文内容（Markdown格式）
 * ```
 * 
 * ## 添加裁员情报
 * 
 * 在 `content/news/` 目录下创建 `.md` 文件：
 * 
 * ```markdown
 * ---
 * id: 101
 * company: "公司名称"
 * industry: "行业"
 * city: "城市"
 * date: "2026年3月"
 * ratio: "约10%"
 * compensation: "N+1"
 * departments: "部门"
 * source: "来源"
 * verified: false
 * ---
 * 
 * **裁员规模**：约10%
 * **赔偿方案**：N+1
 * ```
 * 
 * ## 构建生效
 * 
 * 添加或修改MD文件后，运行 `npm run build` 重新构建即可。
 */
