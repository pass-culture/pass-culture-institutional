/**
 * observatory-category router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::observatory-category.observatory-category", {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
