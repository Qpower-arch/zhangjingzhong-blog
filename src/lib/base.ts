// 统一给站内链接加 Astro base 前缀（GitHub Pages 子路径用）
// import.meta.env.BASE_URL 由 Astro 构建时注入，形如 '/zhangjingzhong-blog/'
export const BASE: string = (import.meta as any).env?.BASE_URL ?? '/';

// 给内部路径加 base 前缀，例如 withBase('/blog') -> '/zhangjingzhong-blog/blog'
export function withBase(path: string): string {
  if (path === '/') return BASE;
  const stripped = BASE.replace(/\/$/, '');
  return `${stripped}${path}`;
}
