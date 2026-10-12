/**
 * observatory-category controller
 */

import { factories } from "@strapi/strapi";

import { withPublicReadRelations } from "../../../utils/public-read-relations";

export default factories.createCoreController("api::observatory-category.observatory-category", () =>
  withPublicReadRelations()
);
