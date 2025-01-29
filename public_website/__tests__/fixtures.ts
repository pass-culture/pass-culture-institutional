import {
  Enum_Componentheadermegamenu_Theme,
  HeaderFragment,
} from '@/generated/graphql'
import { Offer } from '@/types/playlist'

export const headerDataFixtures: HeaderFragment = {
  targetItems: [
    {
      label: 'Target item 1',
      megaMenu: {
        id: '1',
        title: 'Mega menu 1',
        cardTitle: 'CardTitle 1',
        bannerDefaultUrl: '',
        cardDescription: 'CardDescription 1',
        cardFirstEmoji: '🌴',
        cardSecondEmoji: '🦊',
        theme: Enum_Componentheadermegamenu_Theme.Aquamarine,
        primaryListItems: [
          {
            id: '1',
            Label: 'primaryListItems 1',
            URL: '#',
          },
        ],
        secondaryListItems: [
          {
            id: '2',
            Label: 'secondaryListItems 1',
            URL: '#',
          },
        ],
        cta: {
          id: '3',
          Label: 'Cta 1',
          URL: '#',
        },
        cardLink: {
          id: '4',
          Label: 'CardLink 1',
          URL: '#',
        },
      },
      id: '1',
    },
  ],
  aboutItems: [
    {
      label: 'Target item 2',
      megaMenu: {
        id: '2',
        title: 'Mega menu 2',
        theme: Enum_Componentheadermegamenu_Theme.Aquamarine,
        bannerDefaultUrl: '',
        cardTitle: 'CardTitle 2',
        cardDescription: 'CardDescription 2',
        cardFirstEmoji: '🎭',
        cardSecondEmoji: '☎️',
        primaryListItems: [
          {
            id: '5',
            Label: 'primaryListItems 2',
            URL: '#',
          },
        ],
        secondaryListItems: [
          {
            id: '6',
            Label: 'secondaryListItems 2',
            URL: '#',
          },
        ],
        cta: {
          id: '7',
          Label: 'Cta 2',
          URL: '#',
        },
        cardLink: {
          id: '8',
          Label: 'CardLink 2',
          URL: '#',
        },
      },
      id: '2',
    },
  ],
  login: {
    id: '9',
    buttonLabel: 'Login label',
    items: [
      {
        id: '9',
        label: 'LoginItem 1',
        color: '#ff0000',
        emoji: '😇',
        url: '#',
      },
    ],
  },
  signup: {
    id: '10',
    buttonLabel: 'Signup label',
    items: [
      {
        id: '10',
        label: 'LoginItem 1',
        color: '#ff0000',
        emoji: '😇',
        url: '#',
      },
    ],
  },
}

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
