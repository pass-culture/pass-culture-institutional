/**
 * presse router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::presse.presse", {
  config: {
    find: {
      auth: false,
    },
  },
});
