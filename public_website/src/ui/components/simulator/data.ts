export interface SimulatorQuestion {
  title: string
  type?: 'slider' | 'radio'
  answers: SimulatorAnswer[]
}

export interface SimulatorAnswer {
  title: string
  next: SimulatorQuestion | SimulatorResult
}

export interface SimulatorResult {
  title: string
  next: SimulatorQuestion | null
}

export const simulatorData: SimulatorQuestion = {
  title: 'Quel âge as-tu ?',
  type: 'slider',
  answers: [
    {
      title: 'Moins 15 ans',
      next: {
        title: 'Un peu de patience...',
        next: null,
      },
    },
    {
      title: '15 ans',
      next: {
        title: 'Bravo, tu as droit à 20€ !',
        next: {
          title: 'Quelle est ta nationalité ?',
          answers: [
            {
              title: 'Française',
              next: {
                title: 'C’est noté ! Voici maintenant les étapes à suivre',
                next: null,
              },
            },
            {
              title: 'Autre nationnalité',
              next: {
                title: 'Depuis combien de temps résides-tu en France ?',
                answers: [
                  {
                    title: 'Depuis plus d’une année',
                    next: {
                      title:
                        'C’est noté ! Voici maintenant les étapes à suivre',
                      next: null,
                    },
                  },
                  {
                    title: 'Depuis moins d’une année',
                    next: {
                      title:
                        'Malheureusement, tu n’es pour le momentpas éligible au pass...',
                      next: null,
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  ],
}
