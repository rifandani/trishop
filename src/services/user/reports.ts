import { API_BASE_URL_USER_REPORT } from 'config/constants'
import { httpPost } from 'services/http'
import { IPostReportResponse } from 'types/Report'
import { TAddReportSchema } from 'yup/schema'

interface PostResponse {
  status: number
  data: IPostReportResponse
}

export async function postUserReport(
  reportInput: TAddReportSchema
): Promise<PostResponse> {
  const res = await httpPost<IPostReportResponse>(
    API_BASE_URL_USER_REPORT,
    reportInput
  )
  return {
    status: res.status,
    data: res.data,
  }
}
