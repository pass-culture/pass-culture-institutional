/**
 * help-cultural-actors router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::help-cultural-actors.help-cultural-actors",
  {
    config: {
      find: {
        auth: false,
      },
    },
  }
);
