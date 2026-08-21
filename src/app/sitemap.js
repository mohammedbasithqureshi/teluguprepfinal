import { getAllByType } from '@/lib/posts';

const BASE_URL = 'https://teluguprep.in';

export default async function sitemap() {
  const staticRoutes = [
    '', '/jobs', '/results', '/admit-card', '/answer-key', '/blog',
    '/about', '/contact', '/privacy-policy', '/terms', '/disclaimer',
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  const types = [
    { type: 'job', base: '/jobs' },
    { type: 'result', base: '/results' },
    { type: 'admit_card', base: '/admit-card' },
    { type: 'answer_key', base: '/answer-key' },
    { type: 'blog', base: '/blog' },
  ];

  const dynamicRoutes = [];
  for (const { type, base } of types) {
    const posts = await getAllByType(type);
    posts.forEach((post) => {
      dynamicRoutes.push({
        url: `${BASE_URL}${base}/${post.slug}`,
        lastModified: new Date(post.published_at),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  }

  return [...staticRoutes, ...dynamicRoutes];
}