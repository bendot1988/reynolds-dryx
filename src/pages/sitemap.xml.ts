import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';

const SITE = siteConfig.url;

const staticPages = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services', changefreq: 'monthly', priority: '0.9' },
  { loc: '/projects', changefreq: 'weekly', priority: '0.9' },
  { loc: '/news', changefreq: 'weekly', priority: '0.8' },
  { loc: '/careers', changefreq: 'monthly', priority: '0.7' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
  { loc: '/who-we-work-with', changefreq: 'monthly', priority: '0.7' },
  { loc: '/sitemap', changefreq: 'monthly', priority: '0.3' },
  { loc: '/privacy', changefreq: 'yearly', priority: '0.2' },
  { loc: '/terms', changefreq: 'yearly', priority: '0.2' },
  { loc: '/cookies', changefreq: 'yearly', priority: '0.2' },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlEntry(loc: string, changefreq: string, priority: string, lastmod?: Date) {
  const lastmodTag = lastmod
    ? `\n    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>`
    : '';
  return `  <url>
    <loc>${escapeXml(`${SITE}${loc}`)}</loc>${lastmodTag}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = async () => {
  const news = await getCollection('news');
  const newsEntries = news.map((post) =>
    urlEntry(`/news/${post.id}`, 'monthly', '0.6', new Date(post.data.pubDate))
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map((page) => urlEntry(page.loc, page.changefreq, page.priority)).join('\n')}
${newsEntries.join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
