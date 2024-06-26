import { APIResponseData } from '@/types/strapi'

type Filtre = { id: number; filtre: string }[] | undefined

type Data =
  | APIResponseData<'api::event.event'>[]
  | APIResponseData<'api::news.news'>[]
type AttributeGetter = (
  item: APIResponseData<'api::event.event'> | APIResponseData<'api::news.news'>
) => string
const filterMappings: { [key: string]: AttributeGetter } = {
  "Secteur d'activités": (item) => item.attributes.secteur,
  // eslint-disable-next-line prettier/prettier
  "Catégorie": (item) => item.attributes.category,
  // eslint-disable-next-line prettier/prettier
  "Localisation": (item) => item.attributes.localisation,
}
export const filterByAttribute = (filtres: Filtre, data: Data) => {
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
