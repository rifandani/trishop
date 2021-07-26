export const API_URL_DEV = 'http://localhost:3000/api/v1'
export const API_URL_PROD = 'https://trishop.vercel.app/api/v1'
export const API_BASE_URL =
  process.env.NODE_ENV === 'development' ? API_URL_DEV : API_URL_PROD

export const IS_CLIENT_SIDE = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

/* ---------------------------------------- in ReportCard --------------------------------------- */

// typeId = 1 // 'Bug or problem with the website'
// typeId = 2 // 'Spam or commercial unrelated to trishop'
// typeId = 3 // 'Contains offensive or inappropriate content'
export const TYPE_IDS = [
  'Bug or problem with the website',
  'Spam or commercial unrelated to trishop',
  'Contains offensive or inappropriate content',
]
