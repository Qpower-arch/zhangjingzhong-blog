/**
 * ============================================================
 *  生成 PWA 需要的 PNG 图标
 * ============================================================
 *  用法（在项目根目录执行一次即可）：
 *      node scripts/gen-icons.mjs
 *
 *  生成结果：
 *      public/icon-192.png            （安卓/桌面安装用）
 *      public/icon-512.png            （高清屏用）
 *      public/icon-maskable-512.png   （安卓自适应图标）
 * ============================================================
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// 动态导入 sharp，缺失时给出友好提示
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (err) {
  console.error('\n❌ 没有找到 sharp 依赖。');
  console.error('   请先执行：npm i -D sharp\n');
  process.exit(1);
}

/**
 * 把 SVG 转成指定尺寸的 PNG
 * @param {string} srcSvg   public 目录下的 SVG 文件名
 * @param {string} outName  输出的 PNG 文件名
 * @param {number} size     边长（正方形）
 */
async function make(srcSvg, outName, size) {
  const svgBuffer = readFileSync(join(publicDir, srcSvg));
  await sharp(svgBuffer, { density: 384 }) // density 提高 SVG 栅格化清晰度
    .resize(size, size, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, outName));
  console.log(`✓ 已生成 ${outName}  (${size}×${size})`);
}

console.log('\n开始生成 PWA 图标…\n');
await make('icon.svg', 'icon-192.png', 192);
await make('icon.svg', 'icon-512.png', 512);
await make('icon-maskable.svg', 'icon-maskable-512.png', 512);
console.log('\n✅ 全部完成！图标已输出到 public/ 目录\n');
