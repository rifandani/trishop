import React from 'react'

export interface ButtonProps {
  primary: boolean
  label: string
  size: 'small' | 'medium' | 'large'
  fullWidth: boolean
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  primary = true,
  fullWidth = false,
  size = 'medium',
  label = 'Primary Medium Button',
  ...props
}) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary'

  const width = fullWidth ? 'w-full' : 'w-auto'

  const buttonSize =
    size === 'large'
      ? 'storybook-button--large'
      : size === 'medium'
      ? 'storybook-button--medium'
      : 'storybook-button--small'

  return (
    <button
      type="button"
      className={[buttonSize, mode, width].join(' ')}
      {...props}
    >
      {label}
    </button>
  )
}
