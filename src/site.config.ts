// =====================================================
// 站点全局配置 —— 改这里即可定制全站
// =====================================================

export const siteConfig = {
  // 站点名称（导航/页脚显示）
  name: '我的博客',
  shortName: 'MyBlog',
  // 一句话简介
  description: '记录学习进度，分享软件资源与折腾心得。',
  // 作者署名
  author: '博主',
  // 备案号/版权行（可留空）
  copyright: '© 2025 MyBlog',
  // GitHub 用户名（用于社交链接，可留空隐藏）
  github: '',
  // 语言
  lang: 'zh-CN',
};

// =====================================================
// 评论系统配置（Giscus，基于 GitHub Discussions）
// 接入步骤：
//  1. GitHub 上把博客仓库设为 public
//  2. 仓库 Settings → Features 打开 Discussions
//  3. 安装 giscus app：https://github.com/apps/giscus
//  4. 到 https://giscus.app 生成 data-repo / data-repo-id /
//     data-category / data-category-id，填到下面
//  5. 留空 = 评论框显示“未配置”提示，不影响其他功能
// =====================================================
export const commentConfig = {
  provider: 'giscus' as 'giscus' | 'none',
  repo: '', // 例：'your-name/my-blog'
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  mapping: 'pathname' as 'pathname' | 'title' | 'og:title',
  lang: 'zh-CN',
};

// =====================================================
// 点赞按钮配置
// mode: 'local'  —— 纯本地演示（localStorage，每个访客各记各的）
//        'remote' —— 接自己的后端 API（需提供 likeApiUrl）
// 远程 API 约定（自己实现，如 Cloudflare Worker + KV）：
//   GET  {likeApiUrl}?slug=xxx  -> {"likes": 12, "liked": false}
//   POST {likeApiUrl}           -> body {"slug":"xxx"}  -> {"likes":13}
// =====================================================
export const likeConfig = {
  mode: 'local' as 'local' | 'remote',
  likeApiUrl: '', // 例如 'https://your-worker.workers.dev/api/like'
};
