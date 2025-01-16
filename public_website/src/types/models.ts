export interface EtudesPassCultureAttributes {
  buttonText: string
  filtres: any // à typer selon votre structure
  observatoire: {
    surtitle?: string
    title: string
    image?: any
    icon?: any
    cta?: any
  }
  seo: any
  showFilter: boolean
  socialMediaSection: any
  title: string
}

export interface ResourceAttributes {
  category: string
  secteur: string
  localisation: string
  partnership: string
  pageLocalisation: string
  date: string
  image?: any
}
