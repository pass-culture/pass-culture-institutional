import type { Core } from "@strapi/strapi";
import { buildPluginConfig } from "../utils/buildPluginConfig";

const config = ({ strapi }: { strapi: Core.Strapi }) => ({
  getPluginConfig(ctx) {
    ctx.body = buildPluginConfig(strapi, true);
  },
});

export default config;
