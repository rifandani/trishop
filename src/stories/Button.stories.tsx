import React from 'react'
import { Story, Meta } from '@storybook/react'
// files
import { Button, ButtonProps } from './Button'

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { options: ['large', 'medium', 'small'], control: { type: 'radio' } },
    // onClick: { action: 'clicked' },
  },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default = Template.bind({})

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Primary Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  primary: false,
  label: 'Secondary Button',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Large Button',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Small Button',
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  label: 'Full Width Button',
  fullWidth: true,
}
