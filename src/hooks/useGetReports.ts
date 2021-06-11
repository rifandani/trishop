import useSWR from 'swr'
// files
import { IGetReportsResponse } from 'types/Report'

export default function useGetReports() {
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
