import { APIResponseData } from '@/types/strapi'

type Filtre =
  | ({ id: number } & Omit<object & { filtre: string }, never>[])
  | undefined

type Data =
  | APIResponseData<'api::event.event'>[]
  | APIResponseData<'api::news.news'>[]

export const filterByAttribute = (filtres: Filtre, data: Data) => {
  const _filtres = filtres
  const _data = data

  return _filtres?.map((filtre) => {
    let uniqueValue: string[] = []
    switch (filtre.filtre) {
      case "Secteur d'activités":
        uniqueValue = Array.from(
          new Set(_data.map((item) => item.attributes.secteur))
        )
        break
      case 'Catégorie':
        uniqueValue = Array.from(
          new Set(_data.map((item) => item.attributes.category))
        )
        break
      case 'Localisation':
        uniqueValue = Array.from(
          new Set(_data.map((item) => item.attributes.localisation))
        )
        break
      default:
        break
    }

    return {
      ...filtre,
      value: uniqueValue,
    }
  })
}
