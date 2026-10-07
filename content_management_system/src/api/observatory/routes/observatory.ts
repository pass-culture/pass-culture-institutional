/**
 * observatory router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::observatory.observatory", {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
