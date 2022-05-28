// files
import { HttpResponse } from 'types'
import { IReview } from './Review'

export interface IReport {
  reviewRef: IReview | string
  reporter: string
  argument: string
  typeId: number
  createdAt: Date
  _id?: string
  __v?: number
}

export interface IReportProps {
  report: IReport
}

export interface IReportsProps {
  reports: IReport[]
}

/* ------------------------------ API response ------------------------------ */

export interface APIResponseReport extends HttpResponse {
  readonly report: IReport
}

export interface APIResponseReports extends HttpResponse {
  readonly reports: IReport[]
  readonly count: number
}

export interface APIResponsePostReport extends HttpResponse {
  readonly reportId: string
}

export type APIResponseDeleteReport = HttpResponse
