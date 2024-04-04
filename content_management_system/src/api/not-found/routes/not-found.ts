/**
 * not-found router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::not-found.not-found", {
  config: {
    find: {
      auth: false,
    },
  },
});
