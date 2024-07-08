export const convertTime = (time: string | Date): string => {
  let timeString: string

  if (typeof time === 'string') {
    timeString = time
  } else {
    const splitTime = time?.toISOString().split('T')[1]
    timeString = ''
    if (splitTime) timeString = splitTime
  }

  const timeArray = timeString.split(':')
  return `${timeArray[0]}h${timeArray[1]}`
}
