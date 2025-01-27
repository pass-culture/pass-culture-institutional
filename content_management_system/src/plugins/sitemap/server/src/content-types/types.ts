export interface SitemapConfig {
  baseUrl: string;
  excludedTypes?: string[];
}

export interface SitemapUrl {
  loc: string;
  priority: number;
  lastmod?: string;
}

export interface ContentType {
  uid: string;
  kind: "singleType" | "collectionType";
  options?: {
    draftAndPublish?: boolean;
    displayable?: boolean;
    hasDetailPages?: boolean;
    hasListingPage?: boolean;
  };
  attributes: Record<string, any>;
} 