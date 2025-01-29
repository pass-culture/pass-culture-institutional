import { protectedValue } from "./protectedValue";
import { getPluginConfig } from "./getPluginConfig";
import { Core } from "@strapi/strapi";

export function buildPluginConfig(
  strapi: Core.Strapi,
  isValueProtected = false,
) {
  const config = getPluginConfig(strapi);

  return {
    githubToken: isValueProtected
      ? protectedValue(config.githubToken)
      : config.githubToken,
    owner: config.owner,
    repo: config.repo,
    workflowId: config.workflowId,
    branch: config.branch,
  };
}

module.exports = buildPluginConfig;
