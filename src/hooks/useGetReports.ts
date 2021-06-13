import useSWR from 'swr'
// files
import { IGetReportsResponse } from 'types/Report'
import { IReview } from 'types/Review'

interface ReturnType {
  reports: {
    _id: string
    reviewRef: string | IReview
    reporter: string
    argument: string
    typeId: number
    createdAt: Date
  }[]
  reportsIsLoading: boolean
  reportsIsError: any
}

export default function useGetReports(): ReturnType {
  const { data, error } = useSWR<IGetReportsResponse>('/admin/reports')

  const reports = data?.reports?.map((report) => ({
    ...report,
    _id: report._id.toString(),
  }))

  return {
    reports,
    reportsIsLoading: !error && !data,
    reportsIsError: error,
  }
}
