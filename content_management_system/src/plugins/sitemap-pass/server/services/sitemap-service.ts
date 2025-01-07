import { Strapi } from "@strapi/strapi";
import { SitemapConfig, SitemapUrl } from "../content-types/types";
import {
  getContentTypes,
  getStaticPages,
  getDefaultPriority,
  buildLoc,
  getLastMod
} from "../utils/content-type-utils";

const fetchEntities = async (
  strapi: Strapi,
  entityUid: string
): Promise<SitemapUrl[]> => {
  if (!strapi.entityService) {
    throw new Error("Entity service is not available");
  }

  try {
    const contentType = strapi.contentTypes[entityUid];
    const attributes = contentType.attributes || {};

    const fields = [
      "id",
      "updatedAt",
      "Path",
      "slug",
      "priority",
    ].filter((field) => attributes[field]);

    const results = await strapi.entityService.findMany(entityUid as any, {
      fields,
      publicationState: "live",
    });

    const apiName = entityUid.replace("api::", "").split(".")[0];
    const defaultPriority = getDefaultPriority(contentType);
    return Array.isArray(results)
      ? results.map((item) => ({
          loc: buildLoc(item, apiName),
          priority: item.priority ?? defaultPriority,
          lastmod: item.updatedAt,
        }))
      : [];
  } catch (error) {
    console.error(`Error fetching entities for ${entityUid}:`, error);
    return [];
  }
};

const generateUrls = async (strapi: Strapi): Promise<SitemapUrl[]> => {
  const config = strapi.config.get("plugin.sitemap-pass") as SitemapConfig;
  const { baseUrl, excludedTypes = [] } = config;

  const staticPages = await getStaticPages(strapi);

  const initialUrls = [
    {
      loc: baseUrl,
      priority: 1.0,
    },
    ...staticPages.map((page) => ({
      ...page,
      loc: `${baseUrl}${page.loc}`,
    })),
  ];

  const contentTypes = getContentTypes(strapi).filter(
    ({ uid }) => !excludedTypes.includes(uid)
  );
  const entityUrlsPromises = contentTypes.map(({ uid }) =>
    fetchEntities(strapi, uid)
  );
  const entityUrlsArrays = await Promise.all(entityUrlsPromises);
  const entityUrls = entityUrlsArrays.flat().map((url) => ({
    ...url,
    loc: `${baseUrl}${url.loc}`,
  }));
  const allUrls = [...initialUrls, ...entityUrls];

  return Array.from(
    new Map(
      allUrls
        .filter((url) => url.loc && !url.loc.includes("undefined"))
        .map((url) => [url.loc, url])
    ).values()
  );
};

const generateSitemapXml = async (strapi: Strapi): Promise<string> => {
  const urls = await generateUrls(strapi);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${urls
    .map(
      ({ loc, priority, lastmod }) => `
  <url>
    <loc>${loc}</loc>${priority ? `\n    <priority>${priority.toFixed(1)}</priority>` : ""}${lastmod ? `\n    <lastmod>${getLastMod({ updatedAt: lastmod })}</lastmod>` : ""}
  </url>`
    )
    .join("")}
</urlset>`;
};

export default {
  generateUrls,
  generateSitemapXml,
  getContentTypes,
  getStaticPages,
  fetchEntities
};
