import { APIResponseData } from '@/types/strapi'

export enum Options {
  Secteur = "Secteur d'activités",
  Category = 'Catégorie',
  Localisation = 'Localisation',
  Partenariat = 'Partenariat',
}

type Filtre = { filtre: string }[] | undefined

type Data =
  | APIResponseData<'api::event.event'>[]
  | APIResponseData<'api::news.news'>[]
  | APIResponseData<'api::resource.resource'>[]
type AttributeGetter = (
  item:
    | APIResponseData<'api::event.event'>
    | APIResponseData<'api::news.news'>
    | APIResponseData<'api::resource.resource'>
) => string
const filterMappings: { [key: string]: AttributeGetter } = {
  [Options.Secteur]: (item) => item.attributes.secteur,
  [Options.Category]: (item) => item.attributes.category,
  [Options.Localisation]: (item) => item.attributes.localisation,
  [Options.Partenariat]: (item) => item.attributes.category,
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
