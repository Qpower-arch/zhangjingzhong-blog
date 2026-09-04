---
title: '用 Astro 搭建个人博客的完整记录'
description: '从零搭建本博客的技术笔记：为什么选 Astro、目录结构、内容管理、部署。'
pubDate: 2026-08-28
tags: ['教程', 'Astro', '博客']
category: '教程'
---

这个博客本身就是一篇「活教程」。记录一下从零到上线经历了什么。

## 为什么选 Astro

对比了几个主流方案：

| 方案 | 优点 | 缺点 |
| ---- | ---- | ---- |
| **Astro** | 快、组件化、内容集合强 | 生态较新 |
| Hexo | 中文资料多 | 主题定制麻烦 |
| Hugo | 极快 | 模板语法上手慢 |
| 纯手写 | 完全可控 | 维护成本高 |

选 Astro 因为它「默认快 + 用组件写页面 + 内容用 Markdown」，恰好适合博客。

## 项目结构

```
src/
├── content/          # 内容（文章/进度/资源 = 三种集合）
│   ├── blog/         # 文章 *.md
│   ├── progress/     # 学习进度时间线
│   └── resources/    # 软件资源
├── components/       # 点赞按钮、评论区等组件
├── layouts/          # 页面骨架
├── pages/            # 路由页面
├── site.config.ts    # ⭐ 全站配置都在这里
└── content.config.ts # 内容集合的字段校验
```

## 内容是怎么组织的

Astro 的 Content Collections 会对每篇 Markdown 做**字段校验**：

- 忘写 `title`？构建报错
- 日期格式不对？报错
- 多写了不认识的字段？报错

这让内容管理非常省心。

## 三个亮点功能

1. **点赞按钮**：GitHub 风格，本地演示用 localStorage；上线可切换远程 API
2. **全文搜索**：构建时生成 `search-index.json`，前端实时过滤，零后端
3. **学习时间线**：进度用集合管理，按状态（完成/进行中/计划中）着色展示

## 部署

```bash
npm run build   # 生成 dist/ 静态文件
```

把 `dist/` 扔到 GitHub Pages / Cloudflare Pages / 任意静态托管即可。

---

想搭一个同款？配置都在 `src/site.config.ts`，改改名字就能用。
