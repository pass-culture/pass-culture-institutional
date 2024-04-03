/**
 * liste-offre router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::liste-offre.liste-offre", {
  config: {
    find: {
      auth: false,
    },
  },
});
