const getQueryAsString = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    // return first element from array
    return value[0]
  }

  return value
}

export default getQueryAsString
