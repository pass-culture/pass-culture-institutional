import { pluginId } from "./pluginId";

export const pluginPermissions = {
  settings: [
    {
      action: `plugin::${pluginId}.settings`,
      subject: null,
    },
  ],
  trigger: [
    {
      action: `plugin::${pluginId}.trigger`,
      subject: null,
    },
  ],
};
