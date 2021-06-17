interface ToString {
  control: { type: string }
}

export function toStr(): ToString {
  return {
    control: {
      type: 'text',
    },
  }
}
