import {
  EventFragment,
  NewsFragment,
  ResourceFragment,
  RessourcepassFragment,
} from '@/generated/graphql'

export enum Options {
  Secteur = "Secteur d'activités",
  Category = 'Catégorie',
  Localisation = 'Localisation',
  Partenariat = 'Partenariat',
}

type Filtre = { filtre: string }[] | undefined

type Data =
  | EventFragment[]
  | NewsFragment[]
  | ResourceFragment[]
  | RessourcepassFragment[]
type AttributeGetter = (
  item: EventFragment | NewsFragment | ResourceFragment | RessourcepassFragment
) => string
const filterMappings: { [key: string]: AttributeGetter } = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  [Options.Secteur]: (item) => item.secteur,
  [Options.Category]: (item) => item.category,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  [Options.Localisation]: (item) => item?.localisation,
  [Options.Partenariat]: (item) => item.category,
}
export const filterByAttribute = (
  filtres: Filtre,
  data: Data
):
  | {
      value: string[]
      filtre: string
    }[]
  | undefined => {
  if (!filtres) return undefined

  const _filtres = structuredClone(filtres)
  const _data = structuredClone(data)

  const getUniqueValues = (
    attribute: (item: (typeof _data)[0]) => string
  ): string[] => {
    return Array.from(new Set(_data.map(attribute)))
  }

  return _filtres.map((filtre) => {
    const attributeGetter = filterMappings[filtre.filtre]
    const uniqueValues = attributeGetter ? getUniqueValues(attributeGetter) : []

    return {
      ...filtre,
      value: uniqueValues,
    }
  })
}
