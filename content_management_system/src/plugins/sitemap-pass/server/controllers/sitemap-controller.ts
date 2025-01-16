import { Core } from "@strapi/strapi";

import { Context } from "koa";

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async preview(ctx: Context) {
    const xml = await strapi
      .plugin("sitemap-pass")
      .service("sitemapService")
      .generateSitemapXml(strapi);
    ctx.set("Content-Type", "application/xml");
    ctx.body = xml;
  },

  async generate(ctx: Context) {
    try {
      const xml = await strapi
        .plugin("sitemap-pass")
        .service("sitemapService")
        .generateSitemapXml(strapi);
      const fs = require("fs");
      const path = require("path");
      const filePath = path.join(strapi.dirs.static.public, "sitemap.xml");

      await fs.promises.writeFile(filePath, xml);

      ctx.body = { message: "Sitemap généré avec succès!", path: filePath };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        error: true,
        message: `Echec de la génération du sitemap: ${error.message}`,
      };
      // Log l'erreur pour le debugging
      strapi.log.error("Erreur lors de la génération du sitemap:", error);
    }
  },
});
