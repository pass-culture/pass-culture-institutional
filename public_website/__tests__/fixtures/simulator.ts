export const simulatorPageFixtures = {
  data: {
    id: 1,
    attributes: {
      title: '<mark>Simulateur</mark> d&apos;éligibilité',
      description:
        "Tu veux savoir si tu peux bénéficier du pass Culture, à combien tu as droit<br />\net comment débloquer ton crédit ? C'est par ici !",
      createdAt: '2024-02-26T14:20:21.352Z',
      updatedAt: '2024-03-04T16:20:25.096Z',
      publishedAt: '2024-02-26T14:20:25.234Z',
      topEmoji: '✌️',
      bottomEmoji: '📱',
      ageQuestion: {
        id: 1,
        title: 'Quel âge as-tu ?',
        answers: [
          {
            id: 7,
            answer: '-15 ans',
            emoji: null,
          },
          {
            id: 8,
            answer: '15 ans',
            emoji: null,
          },
          {
            id: 9,
            answer: '16 ans',
            emoji: null,
          },
          {
            id: 10,
            answer: '17 ans',
            emoji: null,
          },
          {
            id: 11,
            answer: '18 ans',
            emoji: null,
          },
          {
            id: 12,
            answer: '+18 ans',
            emoji: null,
          },
        ],
      },
      nationnalityQuestion: {
        id: 1,
        title: 'Quelle est ta nationalité ?',
        answers: [
          {
            id: 13,
            answer: 'Française',
            emoji: '🇫🇷',
          },
          {
            id: 14,
            answer: 'Autre nationalité',
            emoji: '🌍',
          },
        ],
      },
      residencyQuestion: {
        id: 2,
        title: 'Depuis combien de temps résides-tu en France ?',
        answers: [
          {
            id: 16,
            answer: 'Depuis plus d’une année',
            emoji: '🌍',
          },
          {
            id: 15,
            answer: 'Depuis moins d’une année',
            emoji: '🌍',
          },
        ],
      },
      successScreen: {
        id: 1,
        title: 'C’est noté ! Voici maintenant les étapes à suivre',
        needSupport: "BESOIN D'AIDE&nbsp;?",
        supportLink: {
          id: 135,
          Label: 'Contacter le support',
          URL: 'https://example.com',
        },
        cta: {
          id: 134,
          Label: 'Explore le catalogue',
          URL: 'https://example.com',
        },
        steps: [
          {
            id: 6,
            step: 'Créer ton profil',
          },
          {
            id: 5,
            step: 'Valider ton identité via tes codes Educonnect ou ta Carte Nationale d’Identité valide',
          },
          {
            id: 4,
            step: 'Confirme ton e-mail et ton profil.',
          },
        ],
      },
      failureScreen: {
        id: 1,
        title:
          'Malheureusement, tu n’es pour le moment<br />pas éligible au pass...',
        text: "Nous t’invitons à reprendre ton inscription quand tu seras sur le territoire français depuis au moins un an. Mais tu peux te rendre dès aujourd'hui sur l’application pour découvrir les événements proposés ainsi que les bons plans auxquels tu peux accéder gratuitement autour de chez toi.<br/>\nÀ bientôt !",
        cta: {
          id: 136,
          Label: 'Explore le catalogue',
          URL: 'http://example.com',
        },
      },
      tooYoungScreen: {
        id: 2,
        title: 'Un peu de patience...',
        text: 'Tu pourras débloquer ton crédit le jour de tes 15 ans ;)<br/>\nEn attendant, tu peux explorer le catalogue des offres et découvrir des lieux culturels autour de toi.\n',
        cta: {
          id: 137,
          Label: 'Explore le catalogue',
          URL: 'https://example.com',
        },
      },
      tooOldScreen: {
        id: 3,
        title: 'Trop tard, tu n’es plus éligible',
        text: 'Tu peux tout de même te rendre sur l’application pour découvrir les événements proposés ainsi que les bons plans dont tu peux profiter gratuitement autour de chez toi !',
        cta: {
          id: 138,
          Label: 'Explore le catalogue',
          URL: 'https://example.com',
        },
      },
      steps: [
        {
          id: 3,
          step: 'Ton âge',
        },
        {
          id: 2,
          step: 'Ta nationalité',
        },
        {
          id: 1,
          step: 'Plus d’informations',
        },
      ],
      amountScreen_15: {
        id: 1,
        title: 'Bravo, tu as droit à 20 €  !',
        text: 'Tu peux débloquer ton crédit tout au long de l’année de tes 15 ans.\n\nAprès activation, tu peux dépenser ton crédit jusqu’à la veille de tes 18 ans. Il sera cumulé avec les crédits accordés à tes 16 et 17 ans s’il n’est pas dépensé avant.',
      },
      amountScreen_16: {
        id: 2,
        title: 'Bravo, tu as droit à <mark>30 €</mark>&nbsp; !',
        text: 'Tu peux débloquer ton crédit tout au long de l’année de tes 16 ans.\n\nAprès activation, tu peux dépenser ton crédit jusqu’à la veille de tes 18 ans. Il sera cumulé avec les crédits accordés à tes 16 et 17 ans s’il n’est pas dépensé avant.',
      },
      amountScreen_17: {
        id: 3,
        title: 'Bravo, tu as droit à <mark>30 €</mark>&nbsp; !',
        text: 'Tu peux débloquer ton crédit tout au long de l’année de tes 16 ans.\n\nAprès activation, tu peux dépenser ton crédit jusqu’à la veille de tes 18 ans. Il sera cumulé avec les crédits accordés à tes 16 et 17 ans s’il n’est pas dépensé avant.',
      },
      amountScreen_18: {
        id: 4,
        title: 'Bravo, tu as droit à <mark>300 €</mark>&nbsp; !',
        text: 'dont 100 € en offres numériques (streaming, presse en ligne, …)\n\nTu as 1 an pour confirmer ton identité et débloquer ce crédit.\nAprès l’avoir débloqué, tu as 2 ans pour dépenser ton crédit.\nLa limite de 100 € est là pour t’encourager à tester des offres culturelles variées.\n',
      },
      socialMedias: {
        id: 1,
        title: 'On reste connectés',
        socialMediaLink: [
          {
            id: 3,
            name: 'instagram',
            url: 'https://example.com/instagram',
          },
          {
            id: 1,
            name: 'tiktok',
            url: 'https://example.com/tiktok',
          },
          {
            id: 2,
            name: 'youtube',
            url: 'https://example.com/youtube',
          },
        ],
      },
      bread: {
        id: 1,
        breadCrumbs: [
          {
            id: 1,
            parent: { id: 133, Label: 'dfsdf', URL: '#dsfds' },
            fils: [],
          },
          {
            id: 2,
            parent: { id: 134, Label: 'dsfsf', URL: '#sdfds' },
            fils: [{ id: 136, Label: 'dsfds', URL: '#dsfsd' }],
          },
        ],
      },
    },
  },
  meta: {},
}
