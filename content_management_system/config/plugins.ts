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
  'upload': {
    config: {
      provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
      providerOptions: {
          bucketName: env('GCS_BUCKET_NAME'),
          publicFiles: false,
          uniform: true,
      },
    },
  },
});
