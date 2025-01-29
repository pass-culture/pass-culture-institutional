import { describe, it, expect } from 'vitest';
import { getRouteCount } from '../utils/getRouteCount';

describe('getRouteCount', () => {
  it('should return 0 for empty content', () => {
    expect(getRouteCount('')).toBe(0);
  });

  it('should return correct count for single URL', () => {
    const singleUrlXml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://example.com/page1</loc>
          <priority>0.8</priority>
        </url>
      </urlset>
    `;
    expect(getRouteCount(singleUrlXml)).toBe(1);
  });

  it('should return correct count for multiple URLs', () => {
    const multipleUrlsXml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://example.com/page1</loc>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>https://example.com/page2</loc>
          <priority>0.6</priority>
        </url>
        <url>
          <loc>https://example.com/page3</loc>
          <priority>0.5</priority>
        </url>
      </urlset>
    `;
    expect(getRouteCount(multipleUrlsXml)).toBe(3);
  });

  it('should handle malformed XML gracefully', () => {
    const malformedXml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://example.com/page1</loc>
    `;
    expect(() => getRouteCount(malformedXml)).toThrow();
  });

  it('should return 1 for XML without urlset.url array', () => {
    const noUrlsetXml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <something>
        <other>content</other>
      </something>
    `;
    expect(getRouteCount(noUrlsetXml)).toBe(1);
  });
});