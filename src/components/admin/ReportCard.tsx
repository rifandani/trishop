import { TYPE_IDS } from 'config/constants'
import Link from 'next/link'
import { FC, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { deleteAdminReport } from 'services/admin/reports'
import { deleteAdminReview } from 'services/admin/reviews'
import { useSWRConfig } from 'swr'
import { IReportProps } from 'types/Report'
import { IReview } from 'types/Review'

const ReportCard: FC<IReportProps> = ({ report }) => {
  //#region GENERAL
  const { argument, typeId, _id } = report
  const reviewRef = report.reviewRef as IReview

  const { mutate } = useSWRConfig()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  //#endregion

  //#region HANDLER REPORT ACTIONS
  async function onDeleteReport(): Promise<void> {
    try {
      setIsDeleting(true)

      // delete report as admin
      await deleteAdminReport(_id)

      // success
      toast.info('Report deleted')
      await mutate('/admin/reports')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      setIsDeleting(false)
    }
  }

  async function onDeleteReportAndReview(): Promise<void> {
    try {
      setIsDeleting(true)

      // delete report & review as admin
      await deleteAdminReport(_id)
      await deleteAdminReview(reviewRef._id)

      // success
      toast.info('Report and review deleted')
      await mutate('/admin/reports')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      setIsDeleting(false)
    }
  }
  //#endregion

  return (
    <section className="mx-auto rounded-lg bg-white px-8 py-4 shadow-md">
      <div className="mt-2">
        <Link href={`/products/${reviewRef.productRef.toString()}`}>
          <a className="block text-2xl font-bold text-gray-900 hover:text-orange-800 hover:underline">
            {reviewRef.reviewerName}
          </a>
        </Link>

        {Array(reviewRef.star)
          .fill('whatever')
          .map((_, i) => (
            <div
              className="mx-auto mt-2 mb-5 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-200"
              key={i}
            >
              <FaStar className="h-6 w-6 text-orange-800" />
            </div>
          ))}

        <p className="text-gray-600">{reviewRef.comment}</p>

        <hr className="my-4 text-gray-400" />
      </div>

      <div className="mt-2">
        <p className="text-center text-sm text-orange-800">{argument}</p>

        <p className="my-2 rounded bg-orange-200 px-3 py-1 text-sm font-bold text-orange-800">
          {TYPE_IDS.find((_, i) => i + 1 === typeId)}
        </p>

        <hr className="my-4 text-gray-400" />
      </div>

      <div className="flex flex-col items-center justify-center space-y-3">
        <button
          className="inline-flex w-full justify-center rounded-md border border-orange-800 px-4 py-2 text-sm font-medium text-orange-800 hover:bg-red-200 focus:outline-none focus:ring-4 focus:ring-red-500 focus-visible:ring-2 focus-visible:ring-red-800 focus-visible:ring-offset-2"
          type="button"
          disabled={isDeleting}
          onClick={onDeleteReport}
        >
          {isDeleting ? 'Loading...' : 'Delete Report'}
        </button>

        <button
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-500 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50"
          type="button"
          disabled={isDeleting}
          onClick={onDeleteReportAndReview}
        >
          {isDeleting ? 'Loading...' : 'Delete Report and Review'}
        </button>
      </div>
    </section>
  )
}

export default ReportCard
