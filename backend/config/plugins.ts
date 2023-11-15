export default ({ env }) => ({
  'update-static-content': {
    enabled: true,
    config: {
      githubToken: env('GITHUB_TOKEN'),
      owner: 'pass-culture',
      repo: 'pass-culture-institutional',
      workflowId: env('DEPLOY_GHA_WORKFLOW_ID'),
      branch: 'main',
    },
  },
});
