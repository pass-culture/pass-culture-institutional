import { Core } from "@strapi/strapi";
import { ContentType, SitemapUrl } from "../content-types/types";

export const isPageContent = (contentType: ContentType): boolean => {
  const attributes = contentType.attributes || {};
  return !!(
    (attributes.Path ||
      attributes.slug ||
      attributes.seo ||
      attributes.blocks) &&
    attributes.priority
  );
};

export const getContentTypes = (
  strapi: Core.Strapi
): { uid: string; apiName: string }[] => {
  return Object.keys(strapi.contentTypes)
    .filter((key) => key.startsWith("api::"))
    .map((key) => ({
      uid: key,
      apiName: key.replace("api::", "").split(".")[1],
    }));
};

export const processContentType = (
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

export const getStaticPages = async (
  strapi: Core.Strapi
): Promise<SitemapUrl[]> => {
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

export const getDefaultPriority = (contentType: {
  attributes?: { priority?: { default?: number } };
}): number => {
  return contentType.attributes?.priority?.default ?? 0.5;
};

export const buildLoc = (
  item: { Path?: string; slug?: string; id: number | string },
  apiName: string
): string => {
  if (item.Path) return item.Path.startsWith("/") ? item.Path : `/${item.Path}`;
  if (item.slug) return `/${apiName}/${item.slug}`;
  return `/${apiName}/${item.id}`;
};

export const getLastMod = (item: {
  updatedAt?: string;
  publishedAt?: string;
}): string | undefined => {
  if (item.updatedAt) {
    return new Date(item.updatedAt).toISOString();
  }

  if (item.publishedAt) {
    return new Date(item.publishedAt).toISOString();
  }

  return undefined;
};
