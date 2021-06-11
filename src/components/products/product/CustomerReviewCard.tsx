import dayjs from 'dayjs'
import Axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import { MdThumbUp, MdReportProblem } from 'react-icons/md'
import { FaStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useState } from 'react'
// files
import EditReviewModal from './EditReviewModal'
import useLocalStorage from 'hooks/useLocalStorage'
import { IReview } from 'types/Review'

interface CustomerReviewCardProps {
  review: IReview
}

dayjs.extend(relativeTime) // so that we can user relative formatting

export default function CustomerReviewCard({
  review,
}: CustomerReviewCardProps) {
  const { reviewerName, comment, star, updatedAt, reviewerId, _id } = review

  // hooks
  const [user] = useLocalStorage('user', '')
  const [isOpen, setIsOpen] = useState(false)

  // add like functionality to review document
  const onLike = () => {
    toast('This feature coming soon')
  }

  // TODO: add report functionality with database
  const onReport = () => {
    toast('This feature coming soon')
  }

  const onEditOpenModal = () => {
    setIsOpen(true)
  }

  const onDelete = async (): Promise<void> => {
    const isAgree = confirm('Are you sure?')
    if (!isAgree) return

    try {
      const res = await Axios.delete(`/admin/reviews/${_id}`)

      // client error
      if (res.status === 400) {
        toast.error(res.data.message)
        return
      }

      // success
      toast.info('Review deleted. Wait for 3 seconds and refresh to revalidate')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  return (
    <section className="flex-col w-full p-4 rounded-lg shadow-lg">
      <div className="flex flex-row">
        <img
          className="w-12 h-12 border-2 border-gray-300 rounded-full"
          src="/images/trishop.png"
          alt="image name"
        />
        <div className="flex-col w-full mt-1">
          <div className="flex items-center justify-between flex-1 ml-4 font-bold leading-tight">
            <span className="flex">
              <p className="mr-3">{reviewerName}</p>

              {Array(star)
                .fill('star')
                .map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 mr-1 text-orange-500" />
                ))}
            </span>

            <p className="ml-4 text-xs font-normal text-gray-500">
              {dayjs(updatedAt).fromNow()}
            </p>
          </div>

          <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-700">
            {comment}
          </div>
        </div>
      </div>

      <hr className="px-4 my-2" />

      <div className="flex flex-row items-center justify-between">
        <p className="text-sm text-gray-500">Is this review helps?</p>

        <div className="flex items-center space-x-2">
          {/* FIXME: styling did not works */}
          {user !== reviewerId ? (
            <button
              className="flex items-center group focus:outline-none"
              onClick={onLike}
            >
              <MdThumbUp className="w-4 h-4 text-gray-500 group-hover:text-orange-500" />
              <span className="ml-2 text-sm">4</span>
            </button>
          ) : (
            <button
              className="flex items-center px-2 py-2 bg-orange-200 border rounded-md hover:border-orange-500 focus:outline-none"
              onClick={onEditOpenModal}
            >
              <span className="text-sm">Edit</span>
            </button>
          )}

          {/* FIXME: styling did not works */}
          {user !== reviewerId ? (
            <button
              className="flex items-center ml-2 group focus:outline-none"
              onClick={onReport}
            >
              <MdReportProblem className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
              <span className="ml-2 text-sm">Report</span>
            </button>
          ) : (
            <button
              className="flex items-center px-2 py-2 bg-red-200 border rounded-md hover:border-red-500 focus:outline-none"
              onClick={onDelete}
            >
              <span className="text-sm">Delete</span>
            </button>
          )}
        </div>
      </div>

      <EditReviewModal isOpen={isOpen} setIsOpen={setIsOpen} review={review} />
    </section>
  )
}
