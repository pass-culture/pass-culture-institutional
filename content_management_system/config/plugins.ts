export default ({ env }) => ({
  // 'update-static-content': {
  //   enabled: true,
  //   config: {
  //     githubToken: env('GITHUB_TOKEN'),
  //     owner: 'pass-culture',
  //     repo: 'pass-culture-institutional',
  //     workflowId: env('DEPLOY_GHA_WORKFLOW_ID'),
  //     branch: 'main',
  //   },
  // },
  seo: {
    enabled: true,
  },
  upload: {
    config: {
      provider: "@strapi-community/strapi-provider-upload-google-cloud-storage",
      providerOptions: {
        bucketName: env("GCS_BUCKET_NAME"),
        publicFiles: true,
        uniform: true,
      },
    },
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      landingPage: env("NODE_ENV") !== "production",
      depthLimit: 10,
      amountLimit: 1000,
      defaultLimit: 1000,
      apolloServer: {
        tracing: false,
        introspection: true,
      },
    },
  },
  sitemap: {
    enabled: true,
    resolve: "./src/plugins/sitemap",
    config: {
      build: true,
    },
  },
});
