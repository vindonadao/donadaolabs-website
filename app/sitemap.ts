import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = {
    'pt-BR': `${SITE.url}/pt`,
    'en-US': `${SITE.url}/en`,
    'x-default': `${SITE.url}/pt`,
  };

  return [
    {
      url: `${SITE.url}/pt`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE.url}/en`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
