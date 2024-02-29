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
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('S3_ACCESS_ID'),
        secretAccessKey: env('S3_SECRET_ID'),
        endpoint: `https://${env('S3_ENDPOINT_URL')}`,
        region: "auto",
        signatureVersion: "v4",
        params: {
          Bucket: env('S3_BUCKET_NAME'),
        },
      },
    },
  },
});
