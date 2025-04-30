/**
 * reglement router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::rubrique-instit-pass-culture.rubrique-instit-pass-culture",
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
