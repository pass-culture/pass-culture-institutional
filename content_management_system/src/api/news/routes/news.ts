/**
 * news router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::news.news", {
  config: {
    find: {
      auth: false,
    },
    create: {
      auth: false,
    },
  },
});
