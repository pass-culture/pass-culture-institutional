import { UploadFileFragment } from '@/generated/graphql'

// Fonction utilitaire pour vérifier si une valeur est "rédable"
export const isRenderable = (
  value: string | number | boolean | undefined | null | UploadFileFragment
): boolean => {
  return (
    value !== undefined &&
    value !== null &&
    value !== false &&
    !Number.isNaN(value) &&
    value !== ''
  )
}
