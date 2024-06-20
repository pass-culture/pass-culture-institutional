import { Offer, Tag } from '@/types/playlist'
import { HeaderProps } from '@/ui/components/header/Header'

export const testDataFixtures = { message: 'Hello World!' }

export const headerDataFixtures: HeaderProps = {
  targetItems: [
    {
      label: 'Target item 1',
      megaMenu: {
        title: 'Mega menu 1',
        cardTitle: 'CardTitle 1',
        cardDescription: 'CardDescription 1',
        cardFirstEmoji: '🌴',
        cardSecondEmoji: '🦊',
        primaryListItems: [
          {
            Label: 'primaryListItems 1',
            URL: '#',
          },
        ],
        secondaryListItems: [
          {
            Label: 'secondaryListItems 1',
            URL: '#',
          },
        ],
        cta: {
          Label: 'Cta 1',
          URL: '#',
        },
        cardLink: {
          Label: 'CardLink 1',
          URL: '#',
        },
      },
      id: 0,
    },
  ],
  aboutItems: [
    {
      label: 'Target item 2',
      megaMenu: {
        title: 'Mega menu 2',
        cardTitle: 'CardTitle 2',
        cardDescription: 'CardDescription 2',
        cardFirstEmoji: '🎭',
        cardSecondEmoji: '☎️',
        primaryListItems: [
          {
            Label: 'primaryListItems 2',
            URL: '#',
          },
        ],
        secondaryListItems: [
          {
            Label: 'secondaryListItems 2',
            URL: '#',
          },
        ],
        cta: {
          Label: 'Cta 2',
          URL: '#',
        },
        cardLink: {
          Label: 'CardLink 2',
          URL: '#',
        },
      },
      id: 0,
    },
  ],
  login: {
    buttonLabel: 'Login label',
    items: [
      {
        label: 'LoginItem 1',
        color: '#ff0000',
        emoji: '😇',
        url: '#',
      },
    ],
  },
  signup: {
    buttonLabel: 'Signup label',
    items: [
      {
        label: 'LoginItem 1',
        color: '#ff0000',
        emoji: '😇',
        url: '#',
      },
    ],
  },
}

type RestaurantData = {
  attributes: {
    description: string
    name: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
  id: number
}

export const restaurantDataFixtures: RestaurantData[] = [
  {
    attributes: {
      description:
        'Tacos de Lyon, c’est l’histoire de deux amis d’enfance, passionnés de cuisine, qui ont décidé de se lancer dans l’aventure de la restauration. Leur objectif : faire découvrir la gastronomie lyonnaise à travers un plat emblématique de la ville : le tacos. Pour cela, ils ont imaginé une carte de tacos à base de produits frais et de qualité, avec des recettes originales et savoureuses. Le tout, dans une ambiance conviviale et chaleureuse.',
      name: 'Tacos de Lyon',
      publishedAt: '2023-08-15T18:00:00.000Z',
      createdAt: '2023-08-15T18:00:00.000Z',
      updatedAt: '2023-08-15T18:00:00.000Z',
    },
    id: 107,
  },
]

export const activePlaylistTagsFixtures: Tag[] = [
  {
    attributes: {
      tag: 'Bons_plans_du_moment',
      displayName: 'Bons plans du moment',
      publishedAt: '2023-08-15T18:00:00.000Z',
      createdAt: '2023-08-15T18:00:00.000Z',
      updatedAt: '2023-08-15T18:00:00.000Z',
    },
    id: 45,
  },
]

export const playlistOffersFixtures: Offer[] = [
  {
    id: 1904,
    name: 'Livre 1 avec EAN',
    venue: {
      id: 914,
      commonName: 'Librairie 1',
    },
    image: {
      url: 'https://storage.googleapis.com/passculture-metier-ehp-testing-assets-fine-grained/thumbs/mediations/L9',
      credit: '',
    },
    stocks: [
      {
        id: 5063,
        price: 500,
      },
    ],
  },
  {
    id: 1905,
    name: 'Livre 2 avec EAN',
    venue: {
      id: 914,
      commonName: 'Librairie 1',
    },
    image: {
      url: 'https://storage.googleapis.com/passculture-metier-ehp-testing-assets-fine-grained/thumbs/mediations/L9',
      credit: '',
    },
    stocks: [
      {
        id: 5064,
        price: 600,
      },
    ],
  },
  {
    id: 1906,
    name: 'Livre 3 avec EAN',
    venue: {
      id: 914,
      commonName: 'Librairie 1',
    },
    image: {
      url: 'https://storage.googleapis.com/passculture-metier-ehp-testing-assets-fine-grained/thumbs/mediations/L9',
      credit: '',
    },
    stocks: [
      {
        id: 5065,
        price: 700,
      },
    ],
  },
  {
    id: 1907,
    name: 'Livre 4 avec EAN',
    venue: {
      id: 914,
      commonName: 'Librairie 1',
    },
    image: {
      url: 'https://storage.googleapis.com/passculture-metier-ehp-testing-assets-fine-grained/thumbs/mediations/L9',
      credit: '',
    },
    stocks: [
      {
        id: 5066,
        price: 800,
      },
    ],
  },
  {
    id: 1931,
    name: 'Livre 5 avec EAN',
    venue: {
      id: 920,
      commonName: 'Librairie 7',
    },
    image: {
      url: 'https://storage.googleapis.com/passculture-metier-ehp-testing-assets-fine-grained/thumbs/mediations/L9',
      credit: '',
    },
    stocks: [
      {
        id: 5090,
        price: 800,
      },
    ],
  },
  {
    id: 1908,
    name: 'Livre 6 avec EAN',
    venue: {
      id: 915,
      commonName: 'Librairie 2',
    },
    image: {
      url: 'https://storage.googleapis.com/passculture-metier-ehp-testing-assets-fine-grained/thumbs/mediations/L9',
      credit: '',
    },
    stocks: [
      {
        id: 5067,
        price: 500,
      },
    ],
  },
  {
    id: 1909,
    name: 'Livre 7 avec EAN',
    venue: {
      id: 915,
      commonName: 'Librairie 2',
    },
    image: {
      url: 'https://storage.googleapis.com/passculture-metier-ehp-testing-assets-fine-grained/thumbs/mediations/L9',
      credit: '',
    },
    stocks: [
      {
        id: 5068,
        price: 600,
      },
    ],
  },
  {
    id: 1910,
    name: 'Livre 8 avec EAN',
    venue: {
      id: 915,
      commonName: 'Librairie 2',
    },
    image: {
      url: 'https://storage.googleapis.com/passculture-metier-ehp-testing-assets-fine-grained/thumbs/mediations/L9',
      credit: '',
    },
    stocks: [
      {
        id: 5069,
        price: 700,
      },
    ],
  },
  {
    id: 1911,
    name: 'Livre 9 avec EAN',
    venue: {
      id: 915,
      commonName: 'Librairie 2',
    },
    image: {
      url: 'https://storage.googleapis.com/passculture-metier-ehp-testing-assets-fine-grained/thumbs/mediations/L9',
      credit: '',
    },
    stocks: [
      {
        id: 5070,
        price: 800,
      },
    ],
  },
  {
    id: 1916,
    name: 'Livre 10 avec EAN',
    venue: {
      id: 917,
      commonName: 'Librairie 4',
    },
    image: {
      url: 'https://storage.googleapis.com/passculture-metier-ehp-testing-assets-fine-grained/thumbs/mediations/L9',
      credit: '',
    },
    stocks: [
      {
        id: 5075,
        price: 500,
      },
    ],
  },
]
