/**
 * active-playlist-tag router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter(
  "api::active-playlist-tag.active-playlist-tag",
  {
    config: {
      find: {
        auth: false,
      },
      create: {
        auth: false,
      },
    },
  }
);
