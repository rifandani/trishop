import { UserRole } from 'types/User'
import { array, mixed, number, object, string, TypeOf } from 'yup'
// files
import { addProductSchema, addReportSchema } from './schema'

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
      .max(50, 'name must be 50 characters or less')
      .required('name required'),
  })
)

export const contactApiSchema = object({
  email: string().email('email invalid').required('email required'),
  subject: string()
    .min(3, 'subject must be 3 characters or more')
    .max(50, 'subject must be 50 characters or less')
    .required('subject required'),
  message: string()
    .min(10, 'message must be 10 characters or more')
    .required('message required'),
})

export const userApiSchema = registerApiSchema.concat(
  object({
    role: mixed<UserRole>()
      .oneOf(Object.values(UserRole), 'role must be either USER or ADMIN')
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
          publicId: string().trim().required('images[i].publicId required'),
          tags: array().of(string().trim().required('images[i].tags required')),
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
  code: string()
    .trim()
    .min(3, 'code must be 3 characters or more')
    .max(30, 'code must be 30 characters or less')
    .required('code required'),
  desc: string()
    .trim()
    .min(10, 'desc must be 10 characters or more')
    .required('desc required'),
  validUntil: number().positive().required('validUntil required'),
  usedBy: array().of(string().required('usedBy[userId] required')).optional(),
})

export const validateCouponApiSchema = object({
  userId: string().required('userId required'),
  code: string()
    .trim()
    .min(3, 'code must be 3 characters or more')
    .max(30, 'code must be 30 characters or less')
    .required('code required'),
})

export const putReviewApiSchema = object({
  reviewerName: string()
    .trim()
    .min(3, 'reviewerName must be 3 characters or more')
    .max(30, 'reviewerName must be 30 characters or less')
    .required('reviewerName required'),
  comment: string()
    .trim()
    .min(5, 'comment must be 5 characters or more')
    .max(50, 'comment must be 50 characters or less')
    .required('comment required'),
  star: number()
    .min(1, 'star must be 1 or more')
    .max(5, 'star must be 5 or less')
    .required('star required'),
  // reviewerImage: object({}).optional(),
})

export const addReviewApiSchema = putReviewApiSchema.concat(
  object({
    productRef: string().trim().required('productRef required'),
    reviewerId: string().trim().required('reviewerId required'),
  })
)

export const addReportApiSchema = addReportSchema.concat(
  object({
    reviewRef: string().trim().required('reviewRef required'),
    reporter: string().trim().required('reporter required'),
  })
)

// export interface IQrcode extends TypeOf<typeof createQrcodeSchema> {}
export type TLoginApiSchema = TypeOf<typeof loginApiSchema>
export type TRegisterApiSchema = TypeOf<typeof registerApiSchema>
export type TContactApiSchema = TypeOf<typeof contactApiSchema>
export type TUserApiSchema = TypeOf<typeof userApiSchema>
export type TProductApiSchema = TypeOf<typeof productApiSchema>
export type TCouponApiSchema = TypeOf<typeof couponApiSchema>
export type TValidateCouponApiSchema = TypeOf<typeof validateCouponApiSchema>
export type TPutReviewApiSchema = TypeOf<typeof putReviewApiSchema>
export type TAddReviewApiSchema = TypeOf<typeof addReviewApiSchema>
export type TAddReportApiSchema = TypeOf<typeof addReportApiSchema>
