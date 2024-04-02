/**
 * help-teachers router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::help-teachers.help-teachers", {
  config: {
    find: {
      auth: false,
    },
  },
});
