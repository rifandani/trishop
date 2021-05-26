import { object, string, TypeOf, array, number } from 'yup'

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

// export interface IQrcode extends TypeOf<typeof createQrcodeSchema> {}
export type TLoginApiSchema = TypeOf<typeof loginApiSchema>
export type TRegisterApiSchema = TypeOf<typeof registerApiSchema>
export type TContactApiSchema = TypeOf<typeof contactApiSchema>
export type TUserApiSchema = TypeOf<typeof userApiSchema>
