// =====================================================
// 站点全局配置 —— 改这里即可定制全站
// =====================================================

export const siteConfig = {
  // 站点名称（浏览器标题/SEO 用完整站名）
  name: '张静中的博客',
  // 导航 logo 短名（首字高亮显示）
  shortName: '张静中的博客',
  // 一句话简介
  description: '记录学习进度，分享软件资源与折腾心得。',
  // 作者署名
  author: '张静中',
  // 备案号/版权行（可留空）
  copyright: '© 2025 张静中',
  // GitHub 用户名（用于社交链接，可留空隐藏）
  github: 'Qpower-arch',
  // 语言
  lang: 'zh-CN',
};

// =====================================================
// 评论系统配置
//
// 【当前方案】Waline —— 自托管评论系统（推荐）
//   支持：邮箱验证码登录、仅登录可评论、站长管理后台、邮件通知
//   后端已在服务器 arttalk.qpower.icu 部署完成
//
// export const commentConfig = {
//   provider: 'waline',
//   walineServer: 'https://arttalk.qpower.icu',
// };
//
// 【备选】Giscus（GitHub Discussions）：
//   1. GitHub 仓库 Settings → Features 开启 Discussions
//   2. 安装 giscus app：https://github.com/apps/giscus
//   3. 到 https://giscus.app 生成 repo/repoId/categoryId
// =====================================================
export const commentConfig = {
  provider: 'waline' as 'waline' | 'artalk' | 'giscus' | 'none',
  // --- Waline 配置（填好后评论即可用）---
  walineServer: 'https://arttalk.qpower.icu',
  // --- Artalk 配置（备选方案）---
  artalkServer: '', // 例：'https://arttalk-xxx.zeabur.app'
  artalkSite: '张静中的博客',
  // --- Giscus 配置（备选方案）---
  repo: '',
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
