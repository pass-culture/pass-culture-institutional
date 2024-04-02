/**
 * actualites-pass-culture router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::actualites-pass-culture.actualites-pass-culture",
  {
    config: {
      find: {
        auth: false,
      },
    },
  }
);
