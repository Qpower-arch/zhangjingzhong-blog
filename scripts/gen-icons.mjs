/**
 * ============================================================
 *  生成图标资源
 * ============================================================
 *  用法（在项目根目录执行一次即可）：
 *      node scripts/gen-icons.mjs
 *      （或 npm run icons）
 *
 *  产出两类文件：
 *   1) public/    —— PWA 用（网页"添加到主屏幕"时的图标）
 *      · icon-192.png / icon-512.png / icon-maskable-512.png
 *   2) resources/ —— 打包成 Android App 用（@capacitor/assets 读取）
 *      · icon.png            应用图标（1024×1024）
 *      · icon-foreground.png 自适应图标前景（安卓要求的透明底）
 *      · icon-background.png 自适应图标背景
 *      · splash.png          启动图（2732×2732）
 *      · splash-dark.png     深色启动图
 * ============================================================
 */

import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const resourcesDir = join(rootDir, 'resources');

// 动态导入 sharp，缺失时给出友好提示
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (err) {
  console.error('\n❌ 没有找到 sharp 依赖。');
  console.error('   请先执行：npm i -D sharp\n');
  process.exit(1);
}

// 确保输出目录存在
mkdirSync(publicDir, { recursive: true });
mkdirSync(resourcesDir, { recursive: true });

/* ------------------------------------------------------------
 * 一、品牌参数（改这里即可换主题色 / 字母）
 * ---------------------------------------------------------- */
const BRAND_LIGHT = '#8b5cf6';
const BRAND_MAIN = '#7c3aed';
const BRAND_DARK = '#3b82f6';

/** 字母 Z 的路径（用几何路径绘制，不依赖任何字体） */
const Z_PATH =
  'M 126 146 L 386 146 L 386 204 L 244 306 L 386 306 L 386 364 L 126 364 L 126 306 L 268 204 L 126 204 Z';

/** 渐变定义（供各 SVG 复用） */
const GRAD_DEF = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND_LIGHT}" />
      <stop offset="55%" stop-color="${BRAND_MAIN}" />
      <stop offset="100%" stop-color="${BRAND_DARK}" />
    </linearGradient>
  </defs>`;

/** 组装一个 SVG 字符串 */
function svg(inner, size = 512) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${GRAD_DEF}${inner}</svg>`;
}

/* ------------------------------------------------------------
 * 二、栅格化工具
 * ---------------------------------------------------------- */

/**
 * 把 SVG（字符串或文件内容）转成 PNG 并写入磁盘
 * @param {string|Buffer} svgInput
 * @param {string} outPath 绝对输出路径
 * @param {number} size 边长
 */
async function renderPng(svgInput, outPath, size) {
  const buf = Buffer.isBuffer(svgInput) ? svgInput : Buffer.from(svgInput);
  await sharp(buf, { density: 384 })
    .resize(size, size, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
}

/* ------------------------------------------------------------
 * 三、读取主图标 SVG（public/icon.svg）
 * ---------------------------------------------------------- */
const iconSvgFile = readFileSync(join(publicDir, 'icon.svg'));

/* ------------------------------------------------------------
 * 四、生成 PWA 图标
 * ---------------------------------------------------------- */
console.log('\n【1/2】生成 PWA 图标（网页"添加到主屏幕"用）…\n');

await renderPng(iconSvgFile, join(publicDir, 'icon-192.png'), 192);
console.log('✓ public/icon-192.png  (192×192)');

await renderPng(iconSvgFile, join(publicDir, 'icon-512.png'), 512);
console.log('✓ public/icon-512.png  (512×512)');

await renderPng(
  readFileSync(join(publicDir, 'icon-maskable.svg')),
  join(publicDir, 'icon-maskable-512.png'),
  512
);
console.log('✓ public/icon-maskable-512.png  (512×512)');

/* ------------------------------------------------------------
 * 五、生成 Android App 资源（resources/）
 * ---------------------------------------------------------- */
console.log('\n【2/2】生成 Android App 资源（打包 APK 用）…\n');

// 5.1 应用图标（圆角方形，1024×1024）
await renderPng(iconSvgFile, join(resourcesDir, 'icon.png'), 1024);
console.log('✓ resources/icon.png  (1024×1024)');

// 5.2 自适应图标 —— 前景：只有白色 Z，透明背景
//     安卓会把前景放在中间 66% 的安全区内，所以 Z 要缩小
const foregroundSvg = svg(`
  <g transform="translate(256,256) scale(0.86) translate(-256,-256)">
    <path d="${Z_PATH}" fill="#ffffff" />
  </g>
`);
await renderPng(foregroundSvg, join(resourcesDir, 'icon-foreground.png'), 1024);
console.log('✓ resources/icon-foreground.png  (1024×1024，透明底)');

// 5.3 自适应图标 —— 背景：渐变铺满
const backgroundSvg = svg(`<rect width="512" height="512" fill="url(#bg)" />`);
await renderPng(backgroundSvg, join(resourcesDir, 'icon-background.png'), 1024);
console.log('✓ resources/icon-background.png  (1024×1024)');

// 5.4 启动图（浅色）：渐变底 + 居中白 Z
function splashSvg(bgFill) {
  const bgRect = bgFill
    ? `<rect width="512" height="512" fill="${bgFill}" />`
    : `<rect width="512" height="512" fill="url(#bg)" />`;
  return svg(`
    ${bgRect}
    <g transform="translate(256,256) scale(0.42) translate(-256,-256)">
      <path d="${Z_PATH}" fill="#ffffff" />
    </g>
  `);
}
await renderPng(splashSvg(null), join(resourcesDir, 'splash.png'), 2732);
console.log('✓ resources/splash.png  (2732×2732)');

// 5.5 启动图（深色）
await renderPng(splashSvg('#14121f'), join(resourcesDir, 'splash-dark.png'), 2732);
console.log('✓ resources/splash-dark.png  (2732×2732)');

console.log('\n✅ 全部完成！\n');
console.log('· public/      → PWA 用（已可直接部署）');
console.log('· resources/   → 打包 Android App 用\n');
