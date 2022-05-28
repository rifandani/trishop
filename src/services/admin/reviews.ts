import { API_BASE_URL_ADMIN_REVIEW } from 'config/constants'
import { httpDelete, httpGet } from 'services/http'
import {
  IDeleteReviewResponse,
  IGetReviewResponse,
  IGetReviewsResponse,
  IReview,
} from 'types/Review'

export async function getAdminReviews(): Promise<IReview[]> {
  const res = await httpGet<IGetReviewsResponse>(API_BASE_URL_ADMIN_REVIEW)
  return res.data.reviews
}

export async function getAdminReview(reportId: string): Promise<IReview> {
  const res = await httpGet<IGetReviewResponse>(
    `${API_BASE_URL_ADMIN_REVIEW}/${reportId}`
  )
  return res.data.review
}

export async function deleteAdminReview(reportId: string): Promise<void> {
  await httpDelete<IDeleteReviewResponse>(
    `${API_BASE_URL_ADMIN_REVIEW}/${reportId}`
  )
}
