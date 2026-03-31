#!/usr/bin/env node
/**
 * 构建脚本：将 content/posts/ 目录下的 MD 文件编译为 JSON
 * 通过 front matter 中的 category 字段区分文章类型
 * 运行方式：node scripts/build-content.js
 * 会在 src/data/ 下生成 generatedPosts.json
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const meta = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  let currentArrayItem = null;
  let currentArray = null;
  let inMultilineValue = false;
  let multilineValue = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (inMultilineValue) {
      if (line.match(/^[a-zA-Z]/) || (line.trim() === '' && i + 1 < lines.length && lines[i + 1].match(/^[a-zA-Z]/))) {
        meta[currentKey] = multilineValue.replace(/\n+$/, '');
        inMultilineValue = false;
        currentKey = null;
        multilineValue = '';
      } else {
        const stripped = line.startsWith('  ') ? line.slice(2) : line;
        multilineValue += (multilineValue ? '\n' : '') + stripped;
        continue;
      }
    }

    const arrayItemMatch = line.match(/^  - (\w+):\s*"?(.*?)"?\s*$/);
    if (arrayItemMatch && currentArray !== null) {
      if (currentArrayItem) {
        meta[currentArray].push(currentArrayItem);
      }
      currentArrayItem = {};
      const val = arrayItemMatch[2];
      currentArrayItem[arrayItemMatch[1]] = parseScalar(val);
      continue;
    }

    const nestedMatch = line.match(/^    (\w+):\s*"?(.*?)"?\s*$/);
    if (nestedMatch && currentArrayItem) {
      currentArrayItem[nestedMatch[1]] = parseScalar(nestedMatch[2]);
      continue;
    }

    if (currentArray !== null && !line.match(/^  /)) {
      if (currentArrayItem) {
        meta[currentArray].push(currentArrayItem);
        currentArrayItem = null;
      }
      currentArray = null;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();

      if (value === '|') {
        currentKey = key;
        inMultilineValue = true;
        multilineValue = '';
        continue;
      }

      if (value === '' && i + 1 < lines.length && lines[i + 1].match(/^  -/)) {
        currentArray = key;
        meta[key] = [];
        currentArrayItem = null;
        continue;
      }

      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      meta[key] = parseScalar(value);
    }
  }

  if (inMultilineValue && currentKey) {
    meta[currentKey] = multilineValue.replace(/\n+$/, '');
  }
  if (currentArray !== null && currentArrayItem) {
    meta[currentArray].push(currentArrayItem);
  }

  return { meta, body: match[2] };
}

function parseScalar(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!isNaN(Number(value)) && value !== '') return Number(value);
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const content = fs.readFileSync(path.join(dir, f), 'utf-8');
      const { meta, body } = parseFrontMatter(content);
      return { ...meta, content: body, _file: f };
    })
    .filter(item => item.id);
}

// Process posts - 所有文章都通过 category 区分类型
const posts = processDirectory(path.join(CONTENT_DIR, 'posts')).map(p => ({
  id: String(p.id),
  nickname: p.nickname || '匿名投稿',
  avatar: p.avatar || '📝',
  title: p.title || '无标题',
  summary: p.summary || p.content.slice(0, 100) + '...',
  content: p.content,
  category: p.category || '经验分享',
  date: p.date || new Date().toISOString().split('T')[0],
  city: p.city || '',
  likes: p.likes || 0,
  viewCount: p.viewCount || 0,
  comments: Array.isArray(p.comments) ? p.comments.map(c => ({
    nickname: c.nickname || '匿名',
    avatar: c.avatar || '💬',
    content: c.content || '',
    date: c.date || '',
  })) : [],
}));

// 处理 news 目录 - 也合并到 posts 中，使用 type: 'news' 标记
const newsDir = path.join(CONTENT_DIR, 'news');
if (fs.existsSync(newsDir)) {
  const newsItems = processDirectory(newsDir).map(n => ({
    id: String(n.id),
    nickname: '情报员',
    avatar: '📰',
    title: `${n.company} 裁员动态`,
    summary: n.detail || n.content?.slice(0, 100) + '...' || '',
    content: n.content || n.detail || '',
    category: '被裁情报',  // news 类型映射为被裁情报
    type: 'news',  // 标记为新闻类型
    date: n.date || '',
    company: n.company || '',
    industry: n.industry || '',
    city: n.city || '',
    ratio: n.ratio || '',
    compensation: n.compensation || '',
    departments: n.departments || '',
    source: n.source || '',
    sourceUrl: n.sourceUrl || '',
    verified: n.verified || false,
    viewCount: n.viewCount || 0,
    likes: 0,
    comments: [],
  }));
  posts.push(...newsItems);
}

// 按日期排序
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write generatedPosts.json
fs.writeFileSync(
  path.join(DATA_DIR, 'generatedPosts.json'),
  JSON.stringify(posts, null, 2),
  'utf-8'
);

// generatedNews.json - news items are now stored as posts with category '被裁情报'
// Keep this file as an empty array for backward compatibility
fs.writeFileSync(
  path.join(DATA_DIR, 'generatedNews.json'),
  JSON.stringify([], null, 2),
  'utf-8'
);

// Process companies.md
function processCompanies(file) {
  if (!fs.existsSync(file)) return [];
  const content = fs.readFileSync(file, 'utf-8');
  const { meta } = parseFrontMatter(content);
  return Array.isArray(meta.companies) ? meta.companies : [];
}

const companies = processCompanies(path.join(CONTENT_DIR, 'companies.md'));
fs.writeFileSync(
  path.join(DATA_DIR, 'generatedCompanies.json'),
  JSON.stringify(companies, null, 2),
  'utf-8'
);

// Process contributors.md
function processContributors(file) {
  if (!fs.existsSync(file)) return [];
  const content = fs.readFileSync(file, 'utf-8');
  const { meta } = parseFrontMatter(content);
  return Array.isArray(meta.contributors) ? meta.contributors : [];
}

const contributors = processContributors(path.join(CONTENT_DIR, 'contributors.md'));
fs.writeFileSync(
  path.join(DATA_DIR, 'generatedContributors.json'),
  JSON.stringify(contributors, null, 2),
  'utf-8'
);

console.log(`✅ Built ${posts.length} posts, ${companies.length} companies, ${contributors.length} contributors`);