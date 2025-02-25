import { SimpleTextV2Props } from '@/types/props'

export const accordionsListFixtures = {
  id: 1,
  accordions: [
    {
      id: 1,
      title: 'C’est quoi une “Charte des données personnelles” ? ',
      simpleText: {
        id: 481,
        text: [
          {
            type: 'paragraph' as const,
            image: null,
            children: [
              {
                text: 'Lors de ton utilisation des services de la société pass Culture depuis ton smartphone ou nos sites web https://passculture.app/ et https://pass.culture.fr/,  nous sommes amenés à collecter et utiliser tes données personnelles. ',
                type: 'text' as const,
              },
            ],
          },
          {
            type: 'paragraph' as const,
            children: [
              {
                text: 'Ainsi, cette charte t’explique de quelle manière nous faisons usage de ces données, notamment pour assurer le bon fonctionnement de l’ application pass Culture. Elle t’explique également quels sont tes droits sur tes données personnelles. Le terme « données personnelles » correspond à l’ensemble des informations qui permettent de t’identifier directement ou indirectement (exemple : tes noms, prénoms, pseudonymes, ta géolocalisation, ton adresse postale, etc.).',
                type: 'text' as const,
              },
            ],
          },
        ],
        columns: [],
      },
    },
    {
      id: 7,
      title: 'Pourquoi cette charte ?',
      simpleText: {
        id: 479,
        text: [
          {
            type: 'paragraph' as const,
            children: [
              {
                text: 'Lorsque nous collectons et utilisons tes données personnelles, nous devons respecter la réglementation en vigueur en matière de protection des données, particulièrement le “Règlement général sur la protection des données” (appelé aussi “RGPD”), qui nous impose de t’informer de manière transparente. ',
                type: 'text' as const,
              },
            ],
          },
        ],
        columns: [],
      },
    },
    {
      id: 6,
      title: 'Qui sommes-nous ?',
      simpleText: {
        id: 480,
        text: [
          {
            type: 'paragraph' as const,
            children: [
              {
                text: 'La société pass Culture, située au 87/89 rue la Boétie à Paris (75008), est le responsable de tes données personnelles (“responsable de traitement”) concernant l’utilisation de nos services, notamment liés à l’application pass Culture.',
                type: 'text' as const,
              },
            ],
          },
        ],
        columns: [],
      },
    },
  ],
  simpleText: null as unknown as SimpleTextV2Props,
}
