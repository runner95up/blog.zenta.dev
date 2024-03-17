import { PUBLIC_DOMAIN } from "$env/static/public";
import { prisma } from "@/lib/server/prisma";

const determineChangeFrequency = (date: Date) => {
  const diff = Date.now() - date.getTime();
  if (diff < 1000 * 60 * 60 * 24) {
    return "hourly";
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    return "daily";
  } else if (diff < 1000 * 60 * 60 * 24 * 30) {
    return "weekly";
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    return "monthly";
  } else {
    return "yearly";
  }
};

const generateUrls = (
  type: string,
  data: { id: string; updatedAt: Date | null }[],
) => {
  return data
    .map(
      (item) => `
        <url>
            <loc>${PUBLIC_DOMAIN}/${type}/${item.id}</loc>
            <lastmod>${item.updatedAt?.toISOString()}</lastmod>
            <changefreq>${determineChangeFrequency(item?.updatedAt as Date)}</changefreq>
            <priority>0.8</priority>
        </url>
    `,
    )
    .join("\n");
};

export async function GET() {
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const techs = await prisma.tech.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const allLastChanges = [
    ...posts.map((post) => post.updatedAt),
    ...tags.map((tag) => tag.updatedAt),
    ...techs.map((tech) => tech.updatedAt),
  ].sort((a, b) => b!.getTime() - a!.getTime())[0];

  const postLastChanges = posts.map((post) => post.updatedAt);
  const tagLastChanges = tags.map((tag) => tag.updatedAt);
  const techLastChanges = techs.map((tech) => tech.updatedAt);

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      <url>
          <loc>${PUBLIC_DOMAIN}/</loc>
          <lastmod>${allLastChanges!.toISOString()}</lastmod>
          <changefreq>${determineChangeFrequency(allLastChanges!)}</changefreq> 
          <priority>1.0</priority>
      </url>
      <url>
          <loc>${PUBLIC_DOMAIN}/post</loc>
          <lastmod>${postLastChanges.sort((a, b) => b!.getTime() - a!.getTime())[0]!.toISOString()}</lastmod>
          <changefreq>${determineChangeFrequency(postLastChanges.sort((a, b) => b!.getTime() - a!.getTime())[0]!)}</changefreq>
          <priority>0.8</priority>
      </url>
      ${generateUrls(
        "post",
        posts.map((post) => ({ id: post.slug, updatedAt: post.updatedAt })),
      )}
      <url>
          <loc>${PUBLIC_DOMAIN}/tag</loc>
          <lastmod>${tagLastChanges.sort((a, b) => b!.getTime() - a!.getTime())[0]!.toISOString()}</lastmod>
          <changefreq>${determineChangeFrequency(tagLastChanges.sort((a, b) => b!.getTime() - a!.getTime())[0]!)}</changefreq>
          <priority>0.8</priority>
      </url> 
      ${generateUrls("tag", tags)}
      <url>
          <loc>${PUBLIC_DOMAIN}/tech</loc>
          <lastmod>${techLastChanges.sort((a, b) => b!.getTime() - a!.getTime())[0]!.toISOString()}</lastmod>
          <changefreq>${determineChangeFrequency(techLastChanges.sort((a, b) => b!.getTime() - a!.getTime())[0]!)}</changefreq>
          <priority>0.8</priority>
      </url>
      ${generateUrls("tech", techs)}
    </urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml",
      },
    },
  );
}
