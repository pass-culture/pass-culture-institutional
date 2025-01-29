import { Core } from "@strapi/strapi";

export function getPluginConfig(strapi: Core.Strapi) {  
  return strapi.config.get("plugin::update-static-content") as unknown as {
    githubToken: string;
    owner: string;
    repo: string;
    workflowId: string;
    branch: string;
  };
}
