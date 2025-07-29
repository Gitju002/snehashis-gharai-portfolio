import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /private/
Disallow: /admin/

Sitemap: https://snehashisgharai.me/sitemap.xml`;

  res.setHeader("Content-Type", "text/plain");
  res.write(robotsTxt);
  res.end();
}
