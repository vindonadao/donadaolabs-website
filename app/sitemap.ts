import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = {
    'pt-BR': `${SITE.url}/pt`,
    'en-US': `${SITE.url}/en`,
    'x-default': `${SITE.url}/pt`,
  };
  const privacyLanguages = {
    'pt-BR': `${SITE.url}/pt/privacidade`,
    'en-US': `${SITE.url}/en/privacidade`,
    'x-default': `${SITE.url}/pt/privacidade`,
  };
  const brandLanguages = {
    'pt-BR': `${SITE.url}/pt/brand`,
    'en-US': `${SITE.url}/en/brand`,
    'x-default': `${SITE.url}/pt/brand`,
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
    {
      url: `${SITE.url}/pt/brand`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: { languages: brandLanguages },
    },
    {
      url: `${SITE.url}/en/brand`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: { languages: brandLanguages },
    },
    {
      url: `${SITE.url}/pt/privacidade`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
      alternates: { languages: privacyLanguages },
    },
    {
      url: `${SITE.url}/en/privacidade`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
      alternates: { languages: privacyLanguages },
    },
  ];
}
