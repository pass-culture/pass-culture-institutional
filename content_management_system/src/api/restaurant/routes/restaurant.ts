/**
 * restaurant router
 */

import { factories } from "@strapi/strapi";

// This makes the endpoint protected
// export default factories.createCoreRouter('api::restaurant.restaurant');

// This makes the endpoint public
export default factories.createCoreRouter("api::restaurant.restaurant", {
  config: {
    find: {
      auth: false,
    },
    create: {
      auth: false,
    },
  },
});
