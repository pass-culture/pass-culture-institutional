import { Offer, Tag } from '@/pages'
import { RestaurantData } from '@/pages/about'

export const testDataFixtures = { message: 'Hello World!' }

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

type Playlist = {
  data: Offer[]
}

export const playlistOffersFixtures: Playlist = {
  data: [
    {
      id: 1904,
      name: 'Livre 1 avec EAN',
      venue: {
        id: 914,
        commonName: 'Librairie 1',
      },
      image: null,
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
      image: null,
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
      image: null,
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
      image: null,
      stocks: [
        {
          id: 5066,
          price: 800,
        },
      ],
    },
    {
      id: 1908,
      name: 'Livre 1 avec EAN',
      venue: {
        id: 915,
        commonName: 'Librairie 2',
      },
      image: null,
      stocks: [
        {
          id: 5067,
          price: 500,
        },
      ],
    },
    {
      id: 1909,
      name: 'Livre 2 avec EAN',
      venue: {
        id: 915,
        commonName: 'Librairie 2',
      },
      image: null,
      stocks: [
        {
          id: 5068,
          price: 600,
        },
      ],
    },
    {
      id: 1910,
      name: 'Livre 3 avec EAN',
      venue: {
        id: 915,
        commonName: 'Librairie 2',
      },
      image: null,
      stocks: [
        {
          id: 5069,
          price: 700,
        },
      ],
    },
    {
      id: 1911,
      name: 'Livre 4 avec EAN',
      venue: {
        id: 915,
        commonName: 'Librairie 2',
      },
      image: null,
      stocks: [
        {
          id: 5070,
          price: 800,
        },
      ],
    },
    {
      id: 1916,
      name: 'Livre 1 avec EAN',
      venue: {
        id: 917,
        commonName: 'Librairie 4',
      },
      image: null,
      stocks: [
        {
          id: 5075,
          price: 500,
        },
      ],
    },
    {
      id: 1917,
      name: 'Livre 2 avec EAN',
      venue: {
        id: 917,
        commonName: 'Librairie 4',
      },
      image: null,
      stocks: [
        {
          id: 5076,
          price: 600,
        },
      ],
    },
    {
      id: 1918,
      name: 'Livre 3 avec EAN',
      venue: {
        id: 917,
        commonName: 'Librairie 4',
      },
      image: null,
      stocks: [
        {
          id: 5077,
          price: 700,
        },
      ],
    },
    {
      id: 1919,
      name: 'Livre 4 avec EAN',
      venue: {
        id: 917,
        commonName: 'Librairie 4',
      },
      image: null,
      stocks: [
        {
          id: 5078,
          price: 800,
        },
      ],
    },
    {
      id: 1920,
      name: 'Livre 1 avec EAN',
      venue: {
        id: 918,
        commonName: 'Librairie 5',
      },
      image: null,
      stocks: [
        {
          id: 5079,
          price: 500,
        },
      ],
    },
    {
      id: 1921,
      name: 'Livre 2 avec EAN',
      venue: {
        id: 918,
        commonName: 'Librairie 5',
      },
      image: null,
      stocks: [
        {
          id: 5080,
          price: 600,
        },
      ],
    },
    {
      id: 1922,
      name: 'Livre 3 avec EAN',
      venue: {
        id: 918,
        commonName: 'Librairie 5',
      },
      image: null,
      stocks: [
        {
          id: 5081,
          price: 700,
        },
      ],
    },
    {
      id: 1923,
      name: 'Livre 4 avec EAN',
      venue: {
        id: 918,
        commonName: 'Librairie 5',
      },
      image: null,
      stocks: [
        {
          id: 5082,
          price: 800,
        },
      ],
    },
    {
      id: 1928,
      name: 'Livre 1 avec EAN',
      venue: {
        id: 920,
        commonName: 'Librairie 7',
      },
      image: null,
      stocks: [
        {
          id: 5087,
          price: 500,
        },
      ],
    },
    {
      id: 1929,
      name: 'Livre 2 avec EAN',
      venue: {
        id: 920,
        commonName: 'Librairie 7',
      },
      image: null,
      stocks: [
        {
          id: 5088,
          price: 600,
        },
      ],
    },
    {
      id: 1930,
      name: 'Livre 3 avec EAN',
      venue: {
        id: 920,
        commonName: 'Librairie 7',
      },
      image: null,
      stocks: [
        {
          id: 5089,
          price: 700,
        },
      ],
    },
    {
      id: 1931,
      name: 'Livre 4 avec EAN',
      venue: {
        id: 920,
        commonName: 'Librairie 7',
      },
      image: null,
      stocks: [
        {
          id: 5090,
          price: 800,
        },
      ],
    },
  ],
}
