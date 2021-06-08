const getQueryStringAsArray = (value: string | string[]): string[] => {
  // kalau array
  if (Array.isArray(value)) {
    return value
  }

  // kalau string => 'abc,zzz'
  const splitted = value.split(',')
  return splitted
}

export default getQueryStringAsArray
