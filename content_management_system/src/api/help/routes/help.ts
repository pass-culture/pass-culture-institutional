/**
 * help router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::help.help", {
  config: {
    find: {
      auth: false,
    },
  },
});
