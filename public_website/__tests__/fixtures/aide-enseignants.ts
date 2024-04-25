import { AideJeunesParentsPageFixtures } from './aide-jeunes-parents'

export const AideEnseignantsPageFixtures = {
  data: {
    id: 1,
    attributes: {
      ...AideJeunesParentsPageFixtures.data.attributes,
      latestStudies: {
        id: 6,
        title: 'Les dernières **ressources** réalisées',
        cta: {
          id: 424,
          Label: 'Voir toutes les études',
          URL: '/some-page',
        },
      },
      seo: {
        metaTitle: 'Aide enseignants',
        id: 13938,
        metaRobots: 'index',
        structuredData: {
          name: 'Chocolate Chip Cookies',
          '@type': 'Recipe',
          author: { name: 'John Doe', '@type': 'Person' },
          '@context': 'https://schema.org/',
          prepTime: 'PT30M',
          description:
            'Delicious chocolate chip cookies perfect for any occasion.',
          datePublished: '2022-05-15',
        },
        metaSocial: [
          {
            id: 3,
            socialNetwork: 'Instagram',
            title: 'Instagram',
            description: 'Check out our latest posts on Instagram.',
            image: {
              data: {
                id: 726,
                attributes: {
                  name: 'chocolate-chip-cookies.jpg',
                  caption: null,
                  width: 1200,
                  height: 800,
                  formats: {
                    large: {
                      ext: '.jpg',
                      url: 'https://example.com/large_chocolate_chip_cookies.jpg',
                      hash: 'large_chocolate_chip_cookies_hash',
                      mime: 'image/jpeg',
                      size: 1200,
                      width: 1200,
                      height: 800,
                    },
                    medium: {
                      ext: '.jpg',
                      url: 'https://example.com/medium_chocolate_chip_cookies.jpg',
                      hash: 'medium_chocolate_chip_cookies_hash',
                      mime: 'image/jpeg',
                      size: 800,
                      width: 800,
                      height: 600,
                    },
                  },
                  hash: 'chocolate_chip_cookies_hash',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  size: 1200,
                  url: 'https://example.com/chocolate_chip_cookies.jpg',
                  previewUrl: null,
                  provider: 'example_provider',
                  provider_metadata: null,
                  createdAt: '2022-05-15T12:00:00Z',
                  updatedAt: '2022-05-15T12:00:00Z',
                },
              },
            },
          },
        ],
        metaViewport: 'width=device-width, initial-scale=1',
        canonicalURL: 'https://example.com/chocolate-chip-cookies',
      },
    },
  },
}
