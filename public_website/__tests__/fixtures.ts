import { RestaurantData } from '@/pages/about'
import { Offer, Tag } from '@/types/playlist'
import { HeaderProps } from '@/ui/components/header/Header'

export const testDataFixtures = { message: 'Hello World!' }

export const headerDataFixtures: HeaderProps = {
  TargetItems: [
    {
      Label: 'Target item 1',
      MegaMenu: {
        Title: 'Mega menu 1',
        CardTitle: 'CardTitle 1',
        CardDescription: 'CardDescription 1',
        PrimaryListItems: [
          {
            Label: 'PrimaryListItems 1',
            URL: '#',
          },
        ],
        SecondaryListItems: [
          {
            Label: 'SecondaryListItems 1',
            URL: '#',
          },
        ],
        Cta: {
          Label: 'Cta 1',
          URL: '#',
        },
        CardLink: {
          Label: 'CardLink 1',
          URL: '#',
        },
      },
    },
  ],
  AboutItems: [
    {
      Label: 'Target item 2',
      MegaMenu: {
        Title: 'Mega menu 2',
        CardTitle: 'CardTitle 2',
        CardDescription: 'CardDescription 2',
        PrimaryListItems: [
          {
            Label: 'PrimaryListItems 2',
            URL: '#',
          },
        ],
        SecondaryListItems: [
          {
            Label: 'SecondaryListItems 2',
            URL: '#',
          },
        ],
        Cta: {
          Label: 'Cta 2',
          URL: '#',
        },
        CardLink: {
          Label: 'CardLink 2',
          URL: '#',
        },
      },
    },
  ],
  Login: {
    ButtonLabel: 'Login label',
    LoginItems: [
      {
        Label: 'LoginItem 1',
        Color: '#ff0000',
        Emoji: '😇',
        URL: '#',
      },
    ],
  },
  SignUp: {
    Label: 'SignUp',
    URL: '#',
  },
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
