import { getAllByType } from '@/lib/posts';
import { getAllUniversityResults } from '@/lib/universityResults';

const BASE_URL = 'https://teluguprep.in';

export default async function sitemap() {
  const staticRoutes = [
    '',
    '/jobs',
    '/results',
    '/admit-card',
    '/answer-key',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/schemes',
    '/university-results',
    '/eligibility-check',
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
    { type: 'scheme', base: '/schemes' },
  ];

  const dynamicRoutes = [];

  for (const { type, base } of types) {
    const posts = await getAllByType(type);
    for (const post of posts) {
      dynamicRoutes.push({
        url: `${BASE_URL}${base}/${post.slug}`,
        lastModified: new Date(post.published_at || Date.now()),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  const universityResults = await getAllUniversityResults();
  for (const result of universityResults) {
    dynamicRoutes.push({
      url: `${BASE_URL}/university-results/${result.slug}`,
      lastModified: new Date(result.published_at || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return [...staticRoutes, ...dynamicRoutes];
}