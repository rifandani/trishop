import { object, string, array, number, TypeOf } from 'yup'
import 'yup-phone'

export const checkoutContactSchema = object({
  firstName: string()
    .trim()
    .min(2, 'First name must be 2 characters or more')
    .max(30, 'First name must be 30 characters or less')
    .required('First name required'),
  lastName: string()
    .trim()
    .min(2, 'Last name must be 2 characters or more')
    .max(30, 'Last name must be 30 characters or less')
    .required('Last name required'),
  email: string().required('Email required').email('Invalid email'),
  phone: string()
    .phone('ID', true, 'Please enter a valid Indonesia phone number')
    .required('Phone number required'),
}) // .camelCase()

export const checkoutShippingSchema = object({
  address: string()
    .trim()
    .min(5, 'Address must be 5 characters or more')
    .max(50, 'argument must be  characters or less')
    .required('Address required'),
  city: string()
    .trim()
    .min(2, 'City must be 2 characters or more')
    .max(30, 'argument must be 30 characters or less')
    .required('City required'),
  postalCode: string()
    .trim()
    .min(3, 'Address must be 3 characters or more')
    .max(30, 'argument must be 30 characters or less')
    .required('Postal code required'),
}) // .camelCase()

export const addProductSchema = object({
  title: string()
    .trim()
    .min(3, 'title must be 3 characters or more')
    .max(30, 'title must be 30 characters or less')
    .required('title required'),
  price: number()
    .positive('price must be positive number')
    .required('price required'),
  stock: number()
    .positive('stock must be positive number')
    .required('stock required'),
  desc: string()
    .trim()
    .min(10, 'desc must be 10 characters or more')
    .required('desc required'),
  labels: array()
    .of(
      string()
        .min(3, 'label must be 3 characters or more')
        .required('label required')
    )
    .min(1, 'labels must consists of 1 label string or more')
    .max(3, 'labels must consists of 3 label string or less')
    .required('labels required'),
})

export const addReportSchema = object({
  argument: string()
    .trim()
    .min(5, 'argument must be 5 characters or more')
    .max(50, 'argument must be 50 characters or less')
    .required('argument required'),
  typeId: number()
    .min(1, 'typeId must be 1 or more')
    .required('typeId required'),
})

export type TCheckoutContactSchema = TypeOf<typeof checkoutContactSchema>
export type TCheckoutShippingSchema = TypeOf<typeof checkoutShippingSchema>
export type TAddProductSchema = TypeOf<typeof addProductSchema>
export type TAddReportSchema = TypeOf<typeof addReportSchema>
