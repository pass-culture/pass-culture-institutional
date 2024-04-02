/**
 * ressources-enseignant router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::ressources-enseignant.ressources-enseignant",
  {
    config: {
      find: {
        auth: false,
      },
    },
  }
);
