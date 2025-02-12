/**
 * reglement router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::reglements-pass-culture.reglements-pass-culture",
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
