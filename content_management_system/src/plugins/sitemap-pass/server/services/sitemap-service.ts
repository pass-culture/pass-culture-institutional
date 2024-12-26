import { Strapi } from "@strapi/strapi";

interface SitemapConfig {
  baseUrl: string;
  excludedTypes?: string[];
}

interface SitemapUrl {
  loc: string;
  priority: number;
  lastmod?: string;
}

const isPageContent = (contentType: any): boolean => {
  const attributes = contentType.attributes || {};

  const hasPageAttributes = !!(
    (attributes.Path ||
      attributes.slug ||
      attributes.seo ||
      attributes.blocks) &&
    attributes.priority
  );

  return hasPageAttributes;
};

const getContentTypes = (
  strapi: Strapi
): {
  uid: string;
  apiName: string;
}[] => {
  return Object.keys(strapi.contentTypes)
    .filter((key) => key.startsWith("api::"))
    .map((key) => ({
      uid: key,
      apiName: key.replace("api::", "").split(".")[1],
    }));
};

const processContentType = (
  uid: string,
  contentType: any
): SitemapUrl | null => {
  if (!uid.startsWith("api::") || !isPageContent(contentType)) return null;

  const isDisplayable =
    contentType.options?.draftAndPublish ||
    contentType.options?.displayable !== false;
  if (!isDisplayable) return null;

  const apiName = uid.replace("api::", "").split(".")[0];

  if (contentType.kind === "singleType") {
    return { loc: `/${apiName}`, priority: 0.3 };
  }

  if (
    contentType.kind === "collectionType" &&
    contentType.options?.hasListingPage !== false
  ) {
    return { loc: `/${apiName}`, priority: 0.5 };
  }

  return null;
};

const getStaticPages = async (strapi: Strapi): Promise<SitemapUrl[]> => {
  const contentTypes = strapi.contentTypes;
  const staticPages: SitemapUrl[] = [];

  for (const [uid, contentType] of Object.entries(contentTypes)) {
    try {
      const page = processContentType(uid, contentType);
      if (page) staticPages.push(page);
    } catch (error) {
      console.error(`Error processing static page for ${uid}:`, error);
    }
  }

  return staticPages;
};

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

    const hasDetailPages = contentType.options?.hasDetailPages !== false;
    if (!hasDetailPages) return [];
    const hasPriorityAttribute = !!attributes.priority;
    if (!hasPriorityAttribute) return [];

    const fields = ["id", "updatedAt"];
    if (attributes.Path) fields.push("Path");
    if (attributes.slug) fields.push("slug");
    if (attributes.path) fields.push("path");
    if (attributes.priority) fields.push("priority");

    const results = await strapi.entityService.findMany(entityUid as any, {
      fields,
      publicationState: "live",
    });

    const apiName = entityUid.replace("api::", "").split(".")[0];

    const defaultPriority = attributes.priority.default ?? 0.5;
    return Array.isArray(results)
      ? results.map((item) => {
          const priority = item.priority ?? defaultPriority;

          if (item.Path) {
            return {
              loc: item.Path.startsWith("/") ? item.Path : `/${item.Path}`,
              priority,
              lastmod: item.updatedAt,
            };
          }

     
          if (item.slug) {
            return {
              loc: `/${apiName}/${item.slug}`,
              priority,
              lastmod: item.updatedAt,
            };
          }

          return {
            loc: `/${apiName}/${item.id}`,
            priority,
            lastmod: item.updatedAt,
          };
        })
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
  const entityUrlsPromises = contentTypes.map(({ uid }) => fetchEntities(strapi, uid));
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
const getLastMod = (item: any): string | undefined => {
  if (item.updatedAt) {
    return new Date(item.updatedAt).toISOString();
  }

  if (item.publishedAt) {
    return new Date(item.publishedAt).toISOString();
  }

  return undefined;
};

const generateSitemapXml = async (strapi: Strapi): Promise<string> => {
  const urls = await generateUrls(strapi);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${urls
    .map(
      ({ loc, priority, lastmod }) => `
  <url>
    <loc>${loc}</loc>${
        priority
          ? `
    <priority>${priority.toFixed(1)}</priority>`
          : ""
      }${
        lastmod
          ? `
    <lastmod>${getLastMod({ updatedAt: lastmod })}</lastmod>`
          : ""
      }
  </url>`
    )
    .join("")}
</urlset>`;
};

export default {
  generateUrls,
  generateSitemapXml,
  isPageContent,
  getContentTypes,
  processContentType,
  getStaticPages,
  fetchEntities,
  getLastMod,
};
