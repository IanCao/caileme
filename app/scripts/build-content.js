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

    // Handle YAML multiline scalar (key: |)
    if (inMultilineValue) {
      if (line.match(/^[a-zA-Z]/) || (line.trim() === '' && i + 1 < lines.length && lines[i + 1].match(/^[a-zA-Z]/))) {
        // End of multiline value - new top-level key or blank line before one
        meta[currentKey] = multilineValue.replace(/\n+$/, '');
        inMultilineValue = false;
        currentKey = null;
        multilineValue = '';
        // Fall through to process this line normally
      } else {
        // Strip 2-space indent from multiline block
        const stripped = line.startsWith('  ') ? line.slice(2) : line;
        multilineValue += (multilineValue ? '\n' : '') + stripped;
        continue;
      }
    }

    // Check for array item: "  - key: value"
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

    // Check for nested key in array item: "    key: value"
    const nestedMatch = line.match(/^    (\w+):\s*"?(.*?)"?\s*$/);
    if (nestedMatch && currentArrayItem) {
      currentArrayItem[nestedMatch[1]] = parseScalar(nestedMatch[2]);
      continue;
    }

    // Flush pending array
    if (currentArray !== null && !line.match(/^  /)) {
      if (currentArrayItem) {
        meta[currentArray].push(currentArrayItem);
        currentArrayItem = null;
      }
      currentArray = null;
    }

    // Top-level key
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();

      // Check for multiline scalar indicator
      if (value === '|') {
        currentKey = key;
        inMultilineValue = true;
        multilineValue = '';
        continue;
      }

      // Check for array start (empty value, next line starts with "  -")
      if (value === '' && i + 1 < lines.length && lines[i + 1].match(/^  -/)) {
        currentArray = key;
        meta[key] = [];
        currentArrayItem = null;
        continue;
      }

      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      meta[key] = parseScalar(value);
    }
  }

  // Flush remaining state
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
  // Remove surrounding quotes if present
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

// Process news
const news = processDirectory(path.join(CONTENT_DIR, 'news')).map(n => ({
  id: String(n.id),
  company: n.company || '未知',
  industry: n.industry || '未知',
  city: n.city || '未知',
  date: n.date || '',
  ratio: n.ratio || '未知',
  compensation: n.compensation || '未知',
  departments: n.departments || '未知',
  source: n.source || 'MD投稿',
  sourceUrl: n.sourceUrl || '',
  verified: n.verified || false,
  detail: n.detail || n.content || '',
  viewCount: n.viewCount || 0,
}));

// Process contributors
const contributorsFile = path.join(CONTENT_DIR, 'contributors.md');
let contributors = [];
if (fs.existsSync(contributorsFile)) {
  const raw = fs.readFileSync(contributorsFile, 'utf-8');
  const yamlMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (yamlMatch) {
    const lines = yamlMatch[1].split('\n');
    let current = null;
    for (const line of lines) {
      const itemMatch = line.match(/^\s+-\s+name:\s*"(.+)"/);
      if (itemMatch) {
        if (current) contributors.push(current);
        current = { name: itemMatch[1], avatar: '', contribution: '' };
        continue;
      }
      if (current) {
        const avatarMatch = line.match(/^\s+avatar:\s*"(.+)"/);
        if (avatarMatch) { current.avatar = avatarMatch[1]; continue; }
        const contribMatch = line.match(/^\s+contribution:\s*"(.+)"/);
        if (contribMatch) { current.contribution = contribMatch[1]; continue; }
      }
    }
    if (current) contributors.push(current);
  }
}

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
fs.writeFileSync(
  path.join(DATA_DIR, 'generatedContributors.json'),
  JSON.stringify(contributors, null, 2),
  'utf-8'
);

console.log(`✅ Built ${posts.length} posts, ${news.length} news items, and ${contributors.length} contributors`);
