/**
 * blogtech router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::blogtech.blogtech", {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
