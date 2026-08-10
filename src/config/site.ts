/**
 * Site-wide SEO and brand defaults.
 * Used by SEO.astro, Layout JSON-LD, and sitemap helpers.
 */
export const siteConfig = {
  name: 'Reynolds Dryline',
  legalName: 'L. Reynolds (Building Systems) Limited',
  url: 'https://www.reynoldsdryline.co.uk',
  locale: 'en_GB',
  language: 'en-GB',
  title: 'Specialist Drylining Contractors | Reynolds Dryline',
  description:
    'Reynolds Dryline delivers specialist drylining and building finishes across Leicestershire and the wider UK. Programme-led packages since 1963.',
  /** Default Open Graph / Twitter share image (1200×630) */
  image: '/og-image.jpg',
  imageWidth: 1200,
  imageHeight: 630,
  imageAlt: 'Reynolds Dryline — specialist building finishes',
  type: 'website' as const,
  phone: '+441509816600',
  phoneDisplay: '01509 816 600',
  email: 'info@reynoldsltd.co.uk',
  logo: '/logo.png',
  sameAs: [
    'https://www.linkedin.com/company/l.-reynolds-building-systems-limited',
    'https://www.instagram.com/reynoldsdryline',
  ],
  address: {
    streetAddress: '9 Quorn Business Quarter, Loughborough Road',
    addressLocality: 'Mountsorrel',
    addressRegion: 'Leicestershire',
    postalCode: 'LE12 7XF',
    addressCountry: 'GB',
  },
} as const;

/** Build an absolute URL from a path or pass through if already absolute. */
export function absoluteUrl(pathOrUrl: string, base = siteConfig.url): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return new URL(path, base.endsWith('/') ? base : `${base}/`).toString();
}

/** Canonical URL with no trailing slash except for the homepage. */
export function canonicalUrl(pathname: string, base = siteConfig.url): string {
  if (!pathname || pathname === '/') return `${base.replace(/\/+$/, '')}/`;
  const clean = pathname.replace(/\/+$/, '');
  return `${base.replace(/\/+$/, '')}${clean.startsWith('/') ? clean : `/${clean}`}`;
}
