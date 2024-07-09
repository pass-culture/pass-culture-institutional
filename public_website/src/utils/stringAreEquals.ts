export const isStringAreEquals = (str1: string, str2: string): boolean => {
  if (str1 === undefined || str2 === undefined) return false
  return str1.trim().toLocaleLowerCase() === str2.trim().toLocaleLowerCase()
}
