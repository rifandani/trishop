import { API_BASE_URL_ADMIN_REPORT } from 'config/constants'
import { httpDelete, httpGet } from 'services/http'
import {
  IDeleteReportResponse,
  IGetReportResponse,
  IGetReportsResponse,
  IReport,
} from 'types/Report'

export async function getAdminReports(): Promise<IReport[]> {
  const res = await httpGet<IGetReportsResponse>(API_BASE_URL_ADMIN_REPORT)
  return res.data.reports
}

export async function getAdminReport(reportId: string): Promise<IReport> {
  const res = await httpGet<IGetReportResponse>(
    `${API_BASE_URL_ADMIN_REPORT}/${reportId}`
  )
  return res.data.report
}

export async function deleteAdminReport(reportId: string): Promise<void> {
  await httpDelete<IDeleteReportResponse>(
    `${API_BASE_URL_ADMIN_REPORT}/${reportId}`
  )
}
