const getQueryAsStringArray = (value: string | string[]): string[] => {
  if (Array.isArray(value)) {
    // return first element from array
    return value
  }

  return [value]
}

export default getQueryAsStringArray
