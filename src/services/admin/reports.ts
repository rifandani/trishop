import axios from 'axios'
// files
import { API_BASE_URL } from 'config/constants'
import {
  IReport,
  IGetReportsResponse,
  IGetReportResponse,
  IDeleteReportResponse,
} from 'types/Report'

// create axios instance
const adminReportsApi = axios.create({
  baseURL: `${API_BASE_URL}/admin/reports`,
})

export async function getAdminReports(): Promise<IReport[]> {
  const res = await adminReportsApi.get<IGetReportsResponse>(``)
  return res.data.reports
}

// POST ada di /user/reports

export async function getAdminReport(reportId: string): Promise<IReport> {
  const res = await adminReportsApi.get<IGetReportResponse>(`/${reportId}`)
  return res.data.report
}

export async function deleteAdminReport(reportId: string): Promise<void> {
  await adminReportsApi.delete<IDeleteReportResponse>(`/${reportId}`)
}
