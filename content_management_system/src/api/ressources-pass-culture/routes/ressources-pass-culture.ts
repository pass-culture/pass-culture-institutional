/**
 * ressources-pass-culture router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::ressources-pass-culture.ressources-pass-culture",
  {
    config: {
      find: {
        auth: false,
      },
    },
  }
);
