/**
 * simulator router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::simulator.simulator", {
  config: {
    find: {
      auth: false,
    },
  },
});
