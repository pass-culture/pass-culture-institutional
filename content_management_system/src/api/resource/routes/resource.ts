/**
 * resource router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::resource.resource', {
  config: {
    find: {
      auth: false,
    },
    create: {
      auth: false,
    },
  },
});
