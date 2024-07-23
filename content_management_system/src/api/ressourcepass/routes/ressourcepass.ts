/**
 * ressourcepass router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::ressourcepass.ressourcepass',{
    config: {
      find: {
        auth: false,
      },
      create: {
        auth: false,
      },
    },
  });
