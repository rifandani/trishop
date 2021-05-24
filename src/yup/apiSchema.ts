import { object, string, TypeOf, array, number } from 'yup';

export const loginApiSchema = object({
  email: string().email('email invalid').required('email required'),
  password: string()
    .min(6, 'password must be 6 characters or more')
    .required('password required'),
});

export const registerApiSchema = loginApiSchema.concat(
  object({
    name: string()
      .min(3, 'name must be 3 characters or more')
      .max(60, 'name must be 50 characters or less')
      .required('name required'),
  }),
);

// export interface IQrcode extends TypeOf<typeof createQrcodeSchema> {}
export type TLoginApiSchema = TypeOf<typeof loginApiSchema>;
export type TRegisterApiSchema = TypeOf<typeof registerApiSchema>;
