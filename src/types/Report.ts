// files
import { IReview } from './Review'

export interface IReport {
  reviewRef: IReview | string
  reporter: string
  argument: string
  typeId: number
  createdAt: Date
  _id?: string
}

export interface IReportProps {
  report: IReport
}

export interface IReportsProps {
  reports: IReport[]
}

/* ------------------------------ API response ------------------------------ */

export interface IGetReportResponse {
  error: boolean
  report: IReport
  message?: string
}

export interface IGetReportsResponse {
  error: boolean
  reports: IReport[]
  count: number
  message?: string
}

export interface IPostReportResponse {
  error: boolean
  reportId: string
  message?: string
}

export interface IDeleteReportResponse {
  error: boolean
  message: string
}
