/**
 * master router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::master.master", {
  config: {
    find: {
      auth: false,
    },
    create: {
      auth: false,
    },
  },
});
