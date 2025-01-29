import {
  Enum_Componentblocklink_Name,
  Enum_Componentsharedmetasocial_Socialnetwork,
} from '@/generated/graphql'

export const EtudesPassCulturePageFixtures = {
  etudesPassCulture: {
    buttonText: 'More',
    showFilter: false,
    observatoire: {
      requiredCta: {
        Label: 'Accéder à la page',
        URL: '#',
        id: '64',
      },
      id: '1',
      requiredImage: {
        alternativeText: null,
        name: 'micrososadft_edge_Px0_X7g1mc8k_unsplash_1489223492.jpg',
        url: '/uploads/micrososadft_edge_Px0_X7g1mc8k_unsplash_1489223492.jpg',
        hash: 'micrososadft_edge_Px0_X7g1mc8k_unsplash_1489223492.jpg',
        mime: 'image/jpeg',
        size: 123456,
        provider: 'example-preeovider',
        provider_metadata: null,
        updatedAt: '202224-04-01T00:00:00Z',
      },
      surtitle: 'Pour aller plus loin',
      requiredTitle: 'Les offres et expériences à vivre avec le pass',
    },

    filtres: [
      {
        filtre: 'Catégorie',
      },
      {
        filtre: 'Localisation',
      },
    ],
    title: 'Programme de sensibisation à lart dans votre région',
    seo: {
      id: '1',
      metaTitle: 'Titre de teste',
      metaDescription: 'Desecription de test',
      keywords: 'test, keerywords',
      metaRobots: 'test, roerbots',
      structuredData: {
        name: 'Test Structrrured Data',
        '@type': 'Teseet',
        author: {
          name: 'Test Aueeethor',
          '@typee': 'Persoern',
        },
        '@context': 'https://scherrrrrma.org/',
        prepTime: 'PT2rrrr0M',
        description: 'This is a test structeeeured data.',
        datePublished: '202423-04-01',
      },
      metaViewport: 'ere',
      canonicalURL: 'https://www.example.com/test',
      metaSocial: [
        {
          socialNetwork: Enum_Componentsharedmetasocial_Socialnetwork.Facebook,
          title: 'Titre Facebook',
          description: 'Description Facebook',
          image: {
            name: 'facebook-image.jpg',
            alternativeText: null,
            caption: null,
            width: 1200,
            height: 628,
            formats: {
              large: {
                ext: '.jpg',
                url: 'https://www.example.com/images/facebook/large.jpg',
                hash: 'large-facebook-hash',
                mime: 'image/jpeg',
                size: 123456,
                name: 'large-facebook.jpg',
                path: null,
              },
              thumbnail: {
                ext: '.jpg',
                url: 'https://www.example.com/images/facebook/thumbnail.jpg',
                hash: 'thumbnail-facebook-hash',
                mime: 'image/jpeg',
                size: 654321,
                name: 'thumbnail-facebook.jpg',
                path: null,
              },
            },
            hash: 'facebook-image-heeash',
            ext: '.jpg',
            mime: 'image/jpeg',
            size: 987654,
            url: 'https://www.example.com/images/facebook.jpg',
            previewUrl: null,
            createdAt: '2014-04-01T00:00:00Z',
            provider: 'example-preeovider',
            provider_metadata: null,
            updatedAt: '202224-04-01T00:00:00Z',
          },
        },
      ],
    },

    separator: {
      id: '1',
      isActive: true,
    },
    socialMediaSection: {
      id: '10',
      socialMediaLink: [
        {
          name: Enum_Componentblocklink_Name.Tiktok,
          url: '#',
        },
        {
          name: Enum_Componentblocklink_Name.Snapchat,
          url: '#',
        },
      ],
      requiredTitle: 'On reste connectés',
    },
  },
  resources: [],
}
