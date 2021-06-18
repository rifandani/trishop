export function toEnum<T>(arr: T[]): {
  control: { type: string; options: T[] }
} {
  return {
    control: {
      type: 'inline-radio',
      options: arr,
    },
  }
}
