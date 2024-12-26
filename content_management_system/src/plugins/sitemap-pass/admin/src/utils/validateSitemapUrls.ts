import { XMLParser } from "fast-xml-parser";

export interface SitemapIssue {
    url: string;
    issue: string;
  }

export function validateSitemapUrls(xmlContent: string): SitemapIssue[] {
    const issues: SitemapIssue[] = [];
    const parser = new XMLParser();
    const result = parser.parse(xmlContent);
    
    const urlEntries = result.urlset.url;
    const urls = Array.isArray(urlEntries) ? urlEntries : [urlEntries];
    
  
    for (const urlEntry of urls) {
      const url = urlEntry.loc;
      if (url) {
        // Vérifier les doubles slashes consécutifs dans le chemin
        const path = url.replace(/https?:\/\/[^/]+/, "");
        if (path.includes("//")) {
          issues.push({
            url,
            issue: "URL contains consecutive slashes in path",
          });
        }
  
        // Vérifier les espaces
        if (url.includes(" ")) {
          issues.push({
            url,
            issue: "URL contains spaces",
          });
        }
  
        // Vérifier si l'URL est malformée
        try {
          new URL(url);
        } catch (e) {
          issues.push({
            url,
            issue: "Invalid URL format",
          });
        }
      }
    }
  
    return issues;
  }