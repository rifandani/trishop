import axios from 'axios'
// files
import { API_BASE_URL } from 'config/constants'
import {
  IDeleteReviewResponse,
  IGetReviewResponse,
  IGetReviewsResponse,
  IReview,
} from 'types/Review'

// create axios instance
const adminReviewsApi = axios.create({
  baseURL: `${API_BASE_URL}/admin/reviews`,
})

export async function getAdminReviews(): Promise<IReview[]> {
  const res = await adminReviewsApi.get<IGetReviewsResponse>(``)
  return res.data.reviews
}

export async function getAdminReview(reportId: string): Promise<IReview> {
  const res = await adminReviewsApi.get<IGetReviewResponse>(`/${reportId}`)
  return res.data.review
}

export async function deleteAdminReview(reportId: string): Promise<void> {
  await adminReviewsApi.delete<IDeleteReviewResponse>(`/${reportId}`)
}
