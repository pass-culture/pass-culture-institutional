export const isStringAreEquals = (str1: string, str2: string): boolean => {
  if (str1.trim().toLocaleLowerCase() === str2.trim().toLocaleLowerCase())
    return true
  return false
}
