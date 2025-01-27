export default {
  default: {
    baseUrl:
      process.env.SITEMAP_BASE_URL ||
      (process.env.NODE_ENV === 'production' ? 'https://pass.culture.fr' : 'http://localhost:3000'),
    entities: [],
  },
  validator(config) {
    if (!config.baseUrl) throw new Error('Base URL is required');
    if (!Array.isArray(config.entities)) throw new Error('Entities must be an array');

    if (process.env.NODE_ENV === 'production' && !config.baseUrl.startsWith('https://')) {
      throw new Error('Production baseUrl must use HTTPS');
    }
  },
};
