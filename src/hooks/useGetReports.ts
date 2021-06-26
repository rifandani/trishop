import useSWR from 'swr'
// files
import { IGetReportsResponse, IReport } from 'types/Report'

interface UseGetReportsReturn {
  reports: IReport[]
  reportsIsLoading: boolean
  reportsIsError: any
}

export default function useGetReports(): UseGetReportsReturn {
  const { data, error } = useSWR<IGetReportsResponse>('/admin/reports')

  return {
    reports: data?.reports,
    reportsIsLoading: !error && !data,
    reportsIsError: error,
  }
}
