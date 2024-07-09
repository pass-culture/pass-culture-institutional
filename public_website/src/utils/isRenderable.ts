import { APIResponse } from '@/types/strapi'

// Fonction utilitaire pour vérifier si une valeur est "rédable"
export const isRenderable = (
  value:
    | string
    | number
    | boolean
    | undefined
    | null
    | APIResponse<'plugin::upload.file'>
): boolean => {
  return (
    value !== undefined &&
    value !== null &&
    value !== false &&
    value !== 0 &&
    !Number.isNaN(value) &&
    value !== ''
  )
}
