import { API_BASE_URL_ADMIN_REPORT } from 'config/constants.config'
import { httpDelete, httpGet } from 'services/http'
import {
  APIResponseDeleteReport,
  APIResponseReport,
  APIResponseReports,
  IReport,
} from 'types/Report'

export async function getAdminReports(): Promise<IReport[]> {
  const res = await httpGet<APIResponseReports>(API_BASE_URL_ADMIN_REPORT)
  return res.data.reports
}

export async function getAdminReport(reportId: string): Promise<IReport> {
  const res = await httpGet<APIResponseReport>(
    `${API_BASE_URL_ADMIN_REPORT}/${reportId}`
  )
  return res.data.report
}

export async function deleteAdminReport(reportId: string): Promise<void> {
  await httpDelete<APIResponseDeleteReport>(
    `${API_BASE_URL_ADMIN_REPORT}/${reportId}`
  )
}
