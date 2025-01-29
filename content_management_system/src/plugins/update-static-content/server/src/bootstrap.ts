import type { Core } from "@strapi/strapi";
import { pluginId } from "../../admin/src/pluginId";

const bootstrap = async ({ strapi }: { strapi: Core.Strapi }) => {
  const actions = [
    {
      section: "plugins",
      subCategory: "general",
      displayName: "Trigger builds",
      uid: "trigger",
      pluginName: pluginId,
    },
    {
      section: "settings",
      category: "static site build",
      displayName: "Access settings",
      uid: "settings",
      pluginName: pluginId,
    },
  ];
  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};

export default bootstrap;
