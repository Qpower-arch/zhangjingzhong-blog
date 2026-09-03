// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://qpower-arch.github.io/zhangjingzhong-blog',
  // GitHub Pages 项目站点运行的子路径，Astro 会自动给所有链接/资源加此前缀
  base: '/zhangjingzhong-blog',
  // 若将来部署到 Cloudflare Pages / Vercel 的根域名，把 base 改回 '/' 即可
  output: 'static',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
