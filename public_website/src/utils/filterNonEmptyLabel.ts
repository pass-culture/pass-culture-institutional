export const filterNonEmptyLabel = (item: { Label?: string }): boolean => {
  if (!item.Label) {
    return false
  }
  return item.Label.trim() !== ''
}
