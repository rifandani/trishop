import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
// files
import { IReportProps } from 'types/Report'
import { IReview } from 'types/Review'

export default function ReportCard({ report }: IReportProps): JSX.Element {
  const { argument, reviewRef, typeId, _id } = report

  // typeId = 1 // 'Bug or problem with the website'
  // typeId = 2 // 'Spam or commercial unrelated to trishop'
  // typeId = 3 // 'Contains offensive or inappropriate content'
  const typeIds = [
    'Bug or problem with the website',
    'Spam or commercial unrelated to trishop',
    'Contains offensive or inappropriate content',
  ]

  // hooks
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  async function onDeleteReport(): Promise<void> {
    try {
      setIsDeleting(true)

      await axios.delete(`/admin/reports/${_id}`) // delete report

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

      await axios.delete(`/admin/reports/${_id}`) // delete report
      await axios.delete(`/admin/reviews/${reviewRef}`) // delete review

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

  return (
    <section className="px-8 py-4 mx-auto bg-white rounded-lg shadow-md">
      <div className="mt-2">
        <Link
          href={`/products/${(reviewRef as IReview).productRef.toString()}`}
        >
          <a className="block text-2xl font-bold text-gray-900 hover:text-orange-800 hover:underline">
            {(reviewRef as IReview).reviewerName}
          </a>
        </Link>

        {Array((reviewRef as IReview).star)
          .fill('whatever')
          .map((_, i) => (
            <div
              className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 mx-auto mt-2 mb-5 bg-orange-200 rounded-full"
              key={i}
            >
              <FaStar className="w-6 h-6 text-orange-800" />
            </div>
          ))}

        <p className="text-gray-600">{(reviewRef as IReview).comment}</p>

        <hr className="my-4 text-gray-400" />
      </div>

      <div className="mt-2">
        <p className="text-sm text-center text-orange-800">{argument}</p>

        <p className="px-3 py-1 my-2 text-sm font-bold text-orange-800 bg-orange-200 rounded">
          {typeIds.find((_, i) => i + 1 === typeId)}
        </p>

        <hr className="my-4 text-gray-400" />
      </div>

      <div className="flex flex-col items-center justify-center space-y-3">
        <button
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-orange-800 border border-orange-800 rounded-md focus:ring-4 focus:ring-red-500 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-800"
          type="button"
          disabled={isDeleting}
          onClick={onDeleteReport}
        >
          {isDeleting ? 'Loading...' : 'Delete Report'}
        </button>

        <button
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md focus:ring-4 focus:ring-red-500 disabled:opacity-50 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
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
