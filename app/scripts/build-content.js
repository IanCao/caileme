#!/usr/bin/env node
/**
 * 构建脚本：将 content/ 目录下的 MD 文件编译为 JSON
 * 运行方式：node scripts/build-content.js
 * 会在 src/data/ 下生成 generatedPosts.json 和 generatedNews.json
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };
  
  const meta = {};
  match[1].split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (value === 'true') meta[key] = true;
      else if (value === 'false') meta[key] = false;
      else if (!isNaN(Number(value)) && value !== '') meta[key] = Number(value);
      else meta[key] = value;
    }
  });
  
  return { meta, body: match[2] };
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

// Process posts
const posts = processDirectory(path.join(CONTENT_DIR, 'posts')).map(p => ({
  id: String(p.id),
  nickname: p.nickname || '匿名投稿',
  avatar: p.avatar || '📝',
  title: p.title || '无标题',
  summary: p.summary || p.content.slice(0, 100) + '...',
  content: p.content,
  category: p.category || '经验分享',
  date: p.date || new Date().toISOString().split('T')[0],
  likes: p.likes || 0,
  comments: [],
}));

// Process news
const news = processDirectory(path.join(CONTENT_DIR, 'news')).map(n => ({
  id: Number(n.id),
  company: n.company || '未知',
  industry: n.industry || '未知',
  city: n.city || '未知',
  date: n.date || '',
  ratio: n.ratio || '未知',
  compensation: n.compensation || '未知',
  departments: n.departments || '未知',
  source: n.source || 'MD投稿',
  verified: n.verified || false,
  detail: n.content,
}));

// Write output
fs.writeFileSync(
  path.join(DATA_DIR, 'generatedPosts.json'),
  JSON.stringify(posts, null, 2),
  'utf-8'
);
fs.writeFileSync(
  path.join(DATA_DIR, 'generatedNews.json'),
  JSON.stringify(news, null, 2),
  'utf-8'
);

console.log(`✅ Built ${posts.length} posts and ${news.length} news items`);
