/**
 * reglement router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::blogtech-pass-culture.blogtech-pass-culture",
  {
    config: {
      find: {
        auth: false,
      },
      findOne: {
        auth: false,
      },
    },
  }
);
