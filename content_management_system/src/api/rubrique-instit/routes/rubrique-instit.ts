/**
 * rubrique-instit router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::rubrique-instit.rubrique-instit",
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
