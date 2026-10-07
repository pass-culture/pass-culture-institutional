/**
 * page controller
 */

import { factories } from "@strapi/strapi";

import { withPublicReadRelations } from "../../../utils/public-read-relations";

export default factories.createCoreController("api::page.page", () =>
  withPublicReadRelations()
);
