// 构建期生成 /search-index.json，供前端搜索页使用
import { getCollection } from 'astro:content';

export async function GET() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const index = posts.map((p) => ({
    slug: p.id,
    title: p.data.title,
    description: p.data.description,
    category: p.data.category,
    tags: p.data.tags,
    pubDate: p.data.pubDate.toISOString().slice(0, 10),
    url: `/blog/${p.id}/`,
    // 加入正文文本（去掉 frontmatter 与 markdown 符号），用于全文搜索
    body: (p.body ?? '').replace(/^---[\s\S]*?---/, '').replace(/[#*`>_\[\]()!-]/g, ' ').slice(0, 3000),
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
