export default [
  {
    method: "GET",
    path: "/config",
    handler: "config.getPluginConfig",
    config: { auth: false, policies: [] },
  },
  {
    method: "GET",
    path: "/github-actions-history",
    handler: "githubActions.history",
    config: { auth: false, policies: [] },
  },
  {
    method: "POST",
    path: "/github-actions-trigger",
    handler: "githubActions.trigger",
    config: { auth: false, policies: [] },
  },
  {
    method: "GET",
    path: "/github-actions-jobs-log",
    handler: "githubActions.log",
    config: { auth: false, policies: [] },
  },
];
