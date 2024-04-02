/**
 * etudes-pass-culture router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::etudes-pass-culture.etudes-pass-culture",
  {
    config: {
      find: {
        auth: false,
      },
    },
  }
);
