/**
 * reglement router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::reglement.reglement", {
  config: {
    find: {
      auth: false,
    },
  },
});
