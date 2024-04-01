import { AideJeunesParentsPageFixtures } from './aide-jeunes-parents'

export const AideEnseignantsPageFixtures = {
  data: {
    id: 1,
    attributes: {
      ...AideJeunesParentsPageFixtures.data.attributes,
      latestStudies: {
        id: 6,
        title: 'Les dernières <mark>ressources</mark> réalisées',
        cta: {
          id: 424,
          Label: 'Voir toutes les études',
          URL: '/some-page',
        },
      },
    },
  },
}
