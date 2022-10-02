import { array, date, number, object, string, TypeOf } from 'yup'
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
    .max(50, 'Address must be 50 characters or less')
    .required('Address required'),
  city: string()
    .trim()
    .min(2, 'City must be 2 characters or more')
    .max(30, 'City must be 30 characters or less')
    .required('City required'),
  postalCode: string()
    .trim()
    .min(3, 'Postal code must be 3 characters or more')
    .max(30, 'Postal code must be 30 characters or less')
    .required('Postal code required'),
}) // .camelCase()

export const addProductSchema = object({
  title: string()
    .trim()
    .min(3, 'Title must be 3 characters or more')
    .max(30, 'Title must be 30 characters or less')
    .required('Title required'),
  price: number()
    .positive('Price must be positive number')
    .required('Price required'),
  stock: number()
    .positive('Stock must be positive number')
    .required('Stock required'),
  desc: string()
    .trim()
    .min(10, 'Description must be 10 characters or more')
    .required('Description required'),
  labels: array()
    .of(
      string()
        .min(3, 'Label must be 3 characters or more')
        .required('Label required')
    )
    .min(1, 'Input minimal 1 label')
    .max(3, 'Input maximal 3 label')
    .required('Labels required'),
})

export const addReportSchema = object({
  argument: string()
    .trim()
    .min(5, 'Argument must be 5 characters or more')
    .max(50, 'Argument must be 50 characters or less')
    .required('Argument required'),
  typeId: number().min(1, 'Please input type').required('Type required'),
})

export const addCouponSchema = object({
  discount: number()
    .min(0, 'discount must be 0 or more')
    .required('discount required'),
  minTransaction: number()
    .min(0, 'minTransaction must be 0 or more')
    .required('minTransaction required'),
  code: string()
    .trim()
    .min(3, 'code must be 3 characters or more')
    .max(30, 'code must be 30 characters or less')
    .required('code required'),
  desc: string()
    .trim()
    .min(10, 'desc must be 10 characters or more')
    .required('desc required'),
  validUntil: date().required('validUntil required'),
})

export type TCheckoutContactSchema = TypeOf<typeof checkoutContactSchema>
export type TCheckoutShippingSchema = TypeOf<typeof checkoutShippingSchema>
export type TAddProductSchema = TypeOf<typeof addProductSchema>
export type TAddReportSchema = TypeOf<typeof addReportSchema>
export type TAddCouponSchema = TypeOf<typeof addCouponSchema>
