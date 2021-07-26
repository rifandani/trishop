import axios from 'axios'
// files
import { API_BASE_URL } from 'config/constants'
import { IPostReportResponse } from 'types/Report'
import { TAddReportSchema } from 'yup/schema'

// create axios instance
const userReportsApi = axios.create({
  baseURL: `${API_BASE_URL}/user/reports`,
})

export async function postUserReport(
  reportInput: TAddReportSchema
): Promise<{ status: number; message: string }> {
  const res = await userReportsApi.post<IPostReportResponse>(``, reportInput)
  return {
    status: res.status,
    message: res.data.message,
  }
}
