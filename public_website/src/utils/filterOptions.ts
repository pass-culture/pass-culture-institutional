import { Dispatch, SetStateAction } from 'react'

export const setFilter = (
  setter: Dispatch<SetStateAction<string[]>>,
  originalValue: string[],
  value: string[]
) => {
  setter(value[0] === '' ? originalValue : value)
}
