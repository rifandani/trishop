export const API_URL_DEV = 'http://localhost:3000/api/v1'
export const API_URL_PROD = 'https://trishop.vercel.app/api/v1'
export const IS_CLIENT = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
