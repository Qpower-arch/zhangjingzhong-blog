/* ============================================================
 *  Service Worker —— 让博客可以"添加到主屏幕"并离线访问
 *  部署在子路径 /zhangjingzhong-blog/ 下
 * ============================================================ */

const CACHE_NAME = 'zjz-blog-v1';
const BASE = '/zhangjingzhong-blog';

/* ---------- 安装：立即激活新版本 ---------- */
self.addEventListener('install', (event) => {
  // 不预缓存具体文件，避免因某个资源 404 导致安装失败；
  // 资源在首次访问时按需缓存
  self.skipWaiting();
});

/* ---------- 激活：清理旧版本缓存 ---------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

/* ---------- 请求拦截 ---------- */
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // 只处理 GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 只处理同源请求（评论接口 arttalk.qpower.icu 是跨域，交给浏览器正常处理）
  if (url.origin !== self.location.origin) return;

  // ===== 1. 页面导航：网络优先，保证内容永远是最新的 =====
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          return res;
        } catch (e) {
          // 断网时：先找这个页面的缓存，再兜底首页
          const cached = await caches.match(req);
          if (cached) return cached;
          const home = await caches.match(BASE + '/');
          if (home) return home;
          return new Response('离线中，且没有缓存副本', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          });
        }
      })()
    );
    return;
  }

  // ===== 2. 静态资源：缓存优先 + 后台更新（stale-while-revalidate） =====
  event.respondWith(
    (async () => {
      const cached = await caches.match(req);

      const networkFetch = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })()
  );
});
