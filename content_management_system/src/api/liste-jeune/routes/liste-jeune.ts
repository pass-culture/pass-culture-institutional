/**
 * liste-jeune router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::liste-jeune.liste-jeune", {
  config: {
    find: {
      auth: false,
    },
  },
});
