import { buildPluginConfig } from "../utils/buildPluginConfig";

export default {
  validatePluginConfig: (_ctx, _cfg, { strapi }) => {
    const pluginConfig = buildPluginConfig(strapi);

    for (const key in pluginConfig) {
      let value = pluginConfig[key];
      if (!key || !value) {
        throw new Error("MISSING_CONFIG");
      }
    }

    return true;
  },
};
