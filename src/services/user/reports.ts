import { API_BASE_URL_USER_REPORT } from 'config/constants'
import { httpPost } from 'services/http'
import { APIResponsePostReport } from 'types/Report'
import { TAddReportSchema } from 'yup/schema'

interface PostResponse {
  status: number
  data: APIResponsePostReport
}

export async function postUserReport(
  reportInput: TAddReportSchema
): Promise<PostResponse> {
  const res = await httpPost<APIResponsePostReport>(
    API_BASE_URL_USER_REPORT,
    reportInput
  )
  return {
    status: res.status,
    data: res.data,
  }
}
