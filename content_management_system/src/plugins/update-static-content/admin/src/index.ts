import { getTranslation } from "./utils/getTranslation";
import { pluginId } from "./pluginId";
import { Initializer } from "./components/Initializer";
import { PluginIcon } from "./components/PluginIcon";
import { pluginPermissions } from "./permissions";

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: pluginId,
      },
      Component: async () => {
        const { App } = await import("./pages/App");

        return App;
      },
      // permissions: pluginPermissions.trigger,
    });

    const pluginPrefix = `${pluginId}.settings`;
    app.createSettingSection(
      {
        id: pluginPrefix,
        intlLabel: {
          id: `${pluginPrefix}.title`,
          defaultMessage: "Update Static Content",
        },
      },
      [
        {
          id: pluginPrefix,
          intlLabel: {
            id: `${pluginPrefix}.subtitle.link`,
            defaultMessage: "Configuration",
          },
          to: `/settings/${pluginId}`,
          Component: async () => {
            const component = await import(
              /* webpackChunkName: "update-static-content-setting-[request]" */ "./pages/SettingPage"
            );
            return component;
          },
          // permissions: pluginPermissions.settings,
        },
      ],
    );

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name: pluginId,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(
            `./translations/${locale}.json`
          );

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      }),
    );
  },
};
