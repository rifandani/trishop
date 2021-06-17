interface ToBoolean {
  control: { type: string }
}

export function toBoolean(): ToBoolean {
  return {
    control: {
      type: 'boolean',
    },
  }
}
