import { describe, it, expect, vi, beforeEach } from 'vitest';
import sitemapService from '../services/sitemap-service';
import { getLastMod, isPageContent, processContentType } from '../utils/content-type-utils';
import { ContentType } from '../content-types/types';

const { getContentTypes, fetchEntities, generateSitemapXml } = sitemapService;

describe('Sitemap Service', () => {
  const mockStrapi = {
    contentTypes: {},
    entityService: {
      findMany: vi.fn(),
    },
    config: {
      get: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('isPageContent', () => {
    it('should return true when content type has Path and priority', () => {
      const contentType: ContentType = {
        uid: 'test',
        kind: 'collectionType',
        attributes: {
          Path: { type: 'string' },
          priority: { type: 'decimal' },
        },
      };
      expect(isPageContent(contentType)).toBe(true);
    });

    it('should return true when content type has slug and priority', () => {
      const contentType: ContentType = {
        uid: 'test',
        kind: 'collectionType',
        attributes: {
          slug: { type: 'string' },
          priority: { type: 'decimal' },
        },
      };
      expect(isPageContent(contentType)).toBe(true);
    });

    it('should return false when content type has no priority', () => {
      const contentType: ContentType = {
        uid: 'test',
        kind: 'collectionType',
        attributes: {
          Path: { type: 'string' },
        },
      };
      expect(isPageContent(contentType)).toBe(false);
    });
  });

  describe('getContentTypes', () => {
    it('should filter and format content types correctly', () => {
      const mockStrapi = {
        contentTypes: {
          'api::page.page': {},
          'api::news.news': {},
          'admin::user': {},
        },
      };

      const result = getContentTypes(mockStrapi as any);
      expect(result).toEqual([
        { uid: 'api::page.page', apiName: 'page' },
        { uid: 'api::news.news', apiName: 'news' },
      ]);
    });
  });

  describe('processContentType', () => {
    it('should process single type correctly', () => {
      const contentType = {
        kind: 'singleType',
        attributes: {
          Path: { type: 'string' },
          priority: { type: 'decimal' },
        },
        options: { draftAndPublish: true },
      };

      const result = processContentType('api::home.home', contentType);
      expect(result).toEqual({
        loc: '/home',
        priority: 0.3,
      });
    });

    it('should return null for non-displayable content', () => {
      const contentType = {
        attributes: {
          Path: { type: 'string' },
          priority: { type: 'decimal' },
        },
        options: { displayable: false },
      };

      const result = processContentType('api::test.test', contentType);
      expect(result).toBeNull();
    });
  });

  describe('fetchEntities', () => {
    it('should fetch and format entities correctly', async () => {
      const mockStrapi = {
        contentTypes: {
          'api::news.news': {
            attributes: {
              slug: { type: 'string' },
              priority: { type: 'decimal', default: 0.5 },
            },
            options: { hasDetailPages: true },
          },
        },
        entityService: {
          findMany: vi
            .fn()
            .mockResolvedValue([
              { id: 1, slug: 'test-news', priority: 0.7, updatedAt: '2024-01-01' },
            ]),
        },
      };

      const result = await fetchEntities(mockStrapi as any, 'api::news.news');
      expect(result).toEqual([
        {
          loc: '/news/test-news',
          priority: 0.7,
          lastmod: '2024-01-01',
        },
      ]);
    });
  });

  describe('generateSitemapXml', () => {
    it('should generate valid XML', async () => {
      mockStrapi.config.get.mockReturnValue({
        baseUrl: 'https://example.com',
        excludedTypes: [],
      });

      const urls = [
        { loc: 'https://example.com', priority: 1.0 },
        { loc: 'https://example.com/page', priority: 0.5, lastmod: '2024-01-01' },
      ];

      vi.spyOn(sitemapService, 'generateUrls').mockResolvedValue(urls);

      const xml = await generateSitemapXml(mockStrapi as any);
      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain('<url>');
      expect(xml).toContain('<loc>https://example.com</loc>');
      expect(xml).toContain('<priority>1.0</priority>');
    });
  });

  describe('getLastMod', () => {
    it('should return updatedAt when available', () => {
      const item = { updatedAt: '2024-01-01T12:00:00Z' };
      expect(getLastMod(item)).toBe('2024-01-01T12:00:00.000Z');
    });

    it('should return publishedAt when updatedAt is not available', () => {
      const item = { publishedAt: '2024-01-01T12:00:00Z' };
      expect(getLastMod(item)).toBe('2024-01-01T12:00:00.000Z');
    });

    it('should return undefined when no dates are available', () => {
      const item = {};
      expect(getLastMod(item)).toBeUndefined();
    });
  });
});
