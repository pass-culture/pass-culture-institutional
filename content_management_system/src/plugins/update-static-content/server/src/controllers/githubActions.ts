import { pluginId } from "./../../../admin/src/pluginId";
import type { Core } from "@strapi/strapi";

const githubActionsController = ({ strapi }: { strapi: Core.Strapi }) => ({
  async history(ctx) {
    const response = await strapi
      .plugin(pluginId)
      .service("githubActions")
      .history();
    ctx.body = response.data;
  },

  async trigger(ctx) {
    const response = await strapi
      .plugin(pluginId)
      .service("githubActions")
      .trigger();
    if (
      response.status === 422 &&
      response.statusText == "Unprocessable Entity"
    ) {
      return ctx.unprocessableEntity("Unprocessable Entity");
    }
    ctx.body = response.data;
  },

  async log(ctx) {
    const { jobId } = ctx.request.query;
    const logURL = await strapi
      .plugin(pluginId)
      .service("githubActions")
      .getLogs(jobId);
    ctx.body = logURL;
  },
});

export default githubActionsController;
