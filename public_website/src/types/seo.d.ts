type SocialMediaData = {
    socialNetwork: string;
    title: 'Facebook' | 'Twitter';
    description: string;
    image: APIResponse<'plugin::upload.file'> | null | undefined
  }

type MetaData = {
    metaTitle: string | undefined;
    metaDescription: string;
    keywords: string | undefined | null;
    metaRobots: string | undefined;
    structuredData: any;
    metaViewport: string | undefined;
    canonicalURL: string | undefined;
    metaSocial: SocialMediaData[];
}
  