export default [
  "strapi::errors",
  {
    // https://github.com/strapi-community/strapi-provider-upload-google-cloud-storage?tab=readme-ov-file#setting-up-strapisecurity-middlewares-to-avoid-csp-blocked-url
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "http:", "https:", "ws:", "wss:"],
          "img-src": ["self", "data:", "blob:", "storage.googleapis.com"],
          "media-src": ["self", "data:", "blob:", "storage.googleapis.com"],
          "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
