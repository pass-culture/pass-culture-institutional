export const separatorIsActive = (
  separator:
    | ({ id: number } & Omit<object & { isActive: boolean }, never>)
    | undefined
) => separator?.isActive || false
