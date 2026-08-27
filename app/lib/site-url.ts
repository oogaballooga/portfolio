const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

if (!configuredSiteUrl) {
  throw new Error(
    'Set NEXT_PUBLIC_SITE_URL locally, or enable Vercel System Environment Variables before deploying.',
  );
}

export const siteUrl = new URL(configuredSiteUrl).origin;
