# 📝 我的博客（Astro 静态博客）

一个本地优先的个人博客：分享学习进度、软件资源与折腾心得。

## ✨ 功能

- 📝 **文章系统** — Markdown 写作，标签/分类/归档
- 📈 **学习进度时间线** — 按「已完成/进行中/计划中/暂停」追踪学习
- 📦 **软件资源库** — 外链整理，不占服务器空间
- 🔍 **全文搜索** — 构建期生成索引，前端实时过滤，零后端
- 📡 **RSS** — `/rss.xml`
- ⭐ **点赞按钮** — GitHub 风格；本地演示 + 可选远程 API
- 💬 **评论区** — Giscus（免费，基于 GitHub Discussions），配置即用
- 🌓 **深色模式** + 访问统计（不蒜子）

## 🚀 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 本地开发（浏览器打开 http://localhost:4321）
npm run dev

# 3. 构建静态站点（输出到 dist/）
npm run build

# 4. 本地预览构建产物
npm run preview
```

## 🎨 个性化配置

所有全站设置都在 **`src/site.config.ts`**：

| 配置项 | 说明 |
| ------ | ---- |
| `siteConfig.name` | 站点名称 |
| `siteConfig.author` | 作者署名 |
| `siteConfig.github` | 你的 GitHub 用户名（显示页脚链接） |
| `siteConfig.copyright` | 版权行 |
| `commentConfig` | Giscus 评论区配置（见下） |
| `likeConfig` | 点赞模式（local / remote） |

> 站点图标：替换 `public/favicon.svg` 即可。
> 部署域名：改 `astro.config.mjs` 里的 `site` 字段。

## ✍️ 写文章 / 更新内容

| 想做什么 | 操作 |
| -------- | ---- |
| 发新文章 | 在 `src/content/blog/` 新建 `xxx.md` |
| 更新学习进度 | 在 `src/content/progress/` 新建 `xxx.md` |
| 添加软件资源 | 在 `src/content/resources/` 新建 `xxx.md` |
| 打标签 | 改文件顶部的 `tags: [...]` |

文章格式示例（frontmatter 必填 `title`、`pubDate`；`description` 建议写）：

```markdown
---
title: '我的新文章'
description: '一句话摘要，会显示在列表和搜索里'
pubDate: 2025-04-01
tags: ['教程']
category: '学习'   # 学习 / 资源 / 随想 / 教程
draft: false       # true = 草稿不发布
---

正文 Markdown……
```

## 💬 开启评论区（Giscus，约 5 分钟）

1. 博客仓库设为 **public**，仓库 Settings → Features 开启 **Discussions**
2. 安装 [giscus App](https://github.com/apps/giscus) 到该仓库
3. 打开 [giscus.app](https://giscus.app) 按提示生成配置
4. 把 `data-repo` / `data-repo-id` / `data-category-id` 等填入
   `src/site.config.ts` 的 `commentConfig`
5. `npm run build` 重新部署即生效

> 备选方案：Waline / Twikoo（需自建或 serverless 后端），思路相同。

## ⭐ 点赞功能说明

默认 `likeConfig.mode = 'local'`：用 localStorage 记录，**纯前端演示**，
每个访客各记各的，刷新不清空。

想要「真实全局点赞数」（像 GitHub star 一样所有人共享一个数）：
1. 部署一个极简 like API（约 30 行），例如 Cloudflare Worker + KV
   ```js
   // Worker 伪代码
   // GET  /api/like?slug=xxx  -> { likes, liked }
   // POST /api/like  body:{slug} -> { likes, liked }
   ```
2. 把 `likeConfig` 改为：
   ```ts
   { mode: 'remote', likeApiUrl: 'https://your-worker.workers.dev/api/like' }
   ```
3. 组件会自动切换为远程计数（网络失败时降级本地）

## ☁️ 部署（任选其一，全部免费）

### GitHub Pages
```bash
# 1. 推代码到 GitHub（仓库如 your-name/my-blog）
git remote add origin https://github.com/your-name/my-blog.git
git push -u origin main

# 2. 仓库 Settings → Pages → Build and deployment
#    Source: GitHub Actions（Astro 官方模板）
```
或手动：`npm run build` 后把 `dist/` 推送到 `gh-pages` 分支。

### Cloudflare Pages / Vercel / Netlify
连接 GitHub 仓库 → 构建命令 `npm run build` → 输出目录 `dist`，
保存即可，之后每次 push 自动部署。

## 📁 目录结构

```
my-blog/
├── public/              # 静态资源（favicon 等）
├── src/
│   ├── content/         # ✍️ 所有内容（三组集合）
│   │   ├── blog/        #    文章 *.md
│   │   ├── progress/    #    学习进度时间线 *.md
│   │   └── resources/   #    软件资源 *.md
│   ├── components/      # 点赞、评论等组件
│   ├── layouts/         # 页面骨架
│   ├── lib/             # 工具函数
│   ├── pages/           # 路由页面
│   ├── styles/          # 全局样式
│   ├── site.config.ts   # ⭐ 全站配置
│   └── content.config.ts# 内容字段校验
├── astro.config.mjs     # 站点域名等
└── package.json
```

## 🛠 技术栈

Astro 5 · TypeScript · Content Collections · @astrojs/rss · @astrojs/sitemap
