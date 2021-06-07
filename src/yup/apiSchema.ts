import { object, string, TypeOf, array, number } from 'yup'
// files
import { addProductSchema } from './schema'

export const loginApiSchema = object({
  email: string().email('email invalid').required('email required'),
  password: string()
    .min(6, 'password must be 6 characters or more')
    .required('password required'),
})

export const registerApiSchema = loginApiSchema.concat(
  object({
    name: string()
      .min(3, 'name must be 3 characters or more')
      .max(60, 'name must be 50 characters or less')
      .required('name required'),
  })
)

export const contactApiSchema = object({
  email: string().email('email invalid').required('email required'),
  subject: string()
    .min(3, 'subject must be 3 characters or more')
    .required('subject required'),
  message: string()
    .min(10, 'message must be 10 characters or more')
    .required('message required'),
})

export const userApiSchema = registerApiSchema.concat(
  object({
    role: string()
      .oneOf(['USER', 'ADMIN'], 'role must be either USER or ADMIN')
      .required('role required'),
  })
)

export const productApiSchema = addProductSchema.concat(
  object({
    images: array()
      .of(
        object({
          imageName: string()
            .trim()
            .min(3, 'imageName must be 3 characters or more')
            .required('images[i].imageName required'),
          imageUrl: string()
            .trim()
            .url('imageUrl invalid')
            .required('images[i].imageUrl required'),
        })
      )
      .min(1, 'images must consists of 1 image object or more')
      .required('images required'),
  })
)

export const couponApiSchema = object({
  discount: number()
    .min(0, 'discount must be 0 or more')
    .required('discount required'),
  minTransaction: number()
    .min(0, 'minTransaction must be 0 or more')
    .required('minTransaction required'),
  usedBy: array().of(string().required('usedBy[userId] required')).optional(),
  code: string()
    .trim()
    .min(3, 'code must be 3 characters or more')
    .required('code required'),
  desc: string()
    .trim()
    .min(10, 'desc must be 10 characters or more')
    .required('desc required'),
  imageUrl: string()
    .trim()
    .url('imageUrl invalid')
    .required('imageUrl required'),
  validUntil: number().positive().required('validUntil required'),
})

export const validateCouponApiSchema = object({
  userId: string().required('userId required'),
  code: string()
    .trim()
    .min(3, 'code must be 3 characters or more')
    .required('code required'),
})

// export interface IQrcode extends TypeOf<typeof createQrcodeSchema> {}
export type TLoginApiSchema = TypeOf<typeof loginApiSchema>
export type TRegisterApiSchema = TypeOf<typeof registerApiSchema>
export type TContactApiSchema = TypeOf<typeof contactApiSchema>
export type TUserApiSchema = TypeOf<typeof userApiSchema>
export type TProductApiSchema = TypeOf<typeof productApiSchema>
export type TCouponApiSchema = TypeOf<typeof couponApiSchema>
export type TValidateCouponApiSchema = TypeOf<typeof validateCouponApiSchema>
