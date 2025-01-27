const API_BASE = '/sitemap';

const api = {
  getSitemapPreview: async (): Promise<string> => {
    const res = await fetch(`${API_BASE}/preview`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch sitemap preview');
    }
    return await res.text();
  },
  exportSitemap: async (): Promise<{ message: string; path: string }> => {
    const res = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
    });
    if (!res.ok) {
      throw new Error('Failed to export sitemap');
    }
    return await res.json();
  },
  copyToClipboard: async (sitemap: string): Promise<void> => {
    await navigator.clipboard.writeText(sitemap);
  },
};

export default api;
