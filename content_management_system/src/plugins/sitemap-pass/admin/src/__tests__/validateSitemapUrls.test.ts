import { describe, expect, it } from 'vitest'
import { validateSitemapUrls } from "../utils/validateSitemapUrls";

describe('validateSitemapUrls', () => {
  it('should detect consecutive slashes in URL path', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset>
        <url><loc>https://example.com//path</loc></url>
      </urlset>
    `;
    
    const issues = validateSitemapUrls(xml);
    expect(issues).toHaveLength(1);
    expect(issues[0].issue).toBe('URL contains consecutive slashes in path');
  });

  it('should detect spaces in URL', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset>
        <url><loc>https://example.com/path with space</loc></url>
      </urlset>
    `;
    
    const issues = validateSitemapUrls(xml);
    expect(issues).toHaveLength(1);
    expect(issues[0].issue).toBe('URL contains spaces');
  });

  it('should detect malformed URLs', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset>
        <url><loc>not-a-valid-url</loc></url>
      </urlset>
    `;
    
    const issues = validateSitemapUrls(xml);
    expect(issues).toHaveLength(1);
    expect(issues[0].issue).toBe('Invalid URL format');
  });

  it('should return no issues for valid URLs', () => {
    const xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset>
        <url><loc>https://example.com/valid-path</loc></url>
      </urlset>
    `;
    
    const issues = validateSitemapUrls(xml);
    expect(issues).toHaveLength(0);
  });
});