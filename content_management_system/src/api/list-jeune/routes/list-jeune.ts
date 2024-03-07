/**
 * list-jeune router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::list-jeune.list-jeune", {
  config: {
    find: {
      auth: false,
    },
  },
});
