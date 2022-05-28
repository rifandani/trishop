/* eslint-disable no-useless-escape */
export const IS_CLIENT_SIDE = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const URL_REGEX =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/

/* ---------------------------------------- URL --------------------------------------- */

export const API_URL_DEV = 'http://localhost:3000/api/v1'
export const API_URL_PROD = 'https://trishop.vercel.app/api/v1'
export const API_BASE_URL =
  process.env.NODE_ENV === 'development' ? API_URL_DEV : API_URL_PROD

export const CLOUDINARY_URL =
  'https://api.cloudinary.com/v1_1/ipandani2505/image/upload'

export const API_BASE_URL_ADMIN_COUPON = API_BASE_URL + '/admin/coupons'
export const API_BASE_URL_ADMIN_PRODUCT = API_BASE_URL + '/admin/products'
export const API_BASE_URL_ADMIN_REPORT = API_BASE_URL + '/admin/reports'
export const API_BASE_URL_ADMIN_REVIEW = API_BASE_URL + '/admin/reviews'
export const API_BASE_URL_ADMIN_USER = API_BASE_URL + '/admin/users'
export const API_BASE_URL_ADMIN_CLOUDINARY_RESOURCE =
  API_BASE_URL + '/admin/cloudinary/resources'

export const API_BASE_URL_USER_REPORT = API_BASE_URL + '/user/reports'

export const API_BASE_URL_AUTH = API_BASE_URL + '/auth'

/* ---------------------------------------- in ReportCard --------------------------------------- */

// typeId = 1 // 'Bug or problem with the website'
// typeId = 2 // 'Spam or commercial unrelated to trishop'
// typeId = 3 // 'Contains offensive or inappropriate content'
export const TYPE_IDS = [
  'Bug or problem with the website',
  'Spam or commercial unrelated to trishop',
  'Contains offensive or inappropriate content',
]
