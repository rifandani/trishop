import { object, string, TypeOf } from 'yup'
import 'yup-phone'

export const checkoutContactSchema = object({
  firstName: string()
    .required('First name required')
    .min(2, 'First name must be 2 characters or more')
    .max(30, 'First name must be 30 characters or less'),
  lastName: string()
    .required('Last name required')
    .min(3, 'Last name must be 3 characters or more')
    .max(30, 'Last name must be 30 characters or less'),
  email: string().required('Email required').email('Invalid email'),
  phone: string()
    .phone('ID', true, 'Please enter a valid Indonesia phone number')
    .required('Phone number required'),
}) // .camelCase()

export const checkoutShippingSchema = object({
  address: string()
    .required('Address required')
    .min(5, 'Address must be 5 characters or more'),
  city: string().required('City required'),
  postalCode: string().required('Postal code required'),
}) // .camelCase()

export type TCheckoutContactSchema = TypeOf<typeof checkoutContactSchema>
export type TCheckoutShippingSchema = TypeOf<typeof checkoutShippingSchema>
