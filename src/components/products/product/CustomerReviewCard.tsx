import { UserPayload } from 'contexts/UserReducer'
import dayjs from 'dayjs'
import useLocalStorage from 'hooks/useLocalStorage'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { MdReportProblem, MdThumbUp } from 'react-icons/md'
import { toast } from 'react-toastify'
import { httpDelete } from 'services/http'
import { mutate } from 'swr'
import { HttpResponse } from 'types'
import { IReviewProps } from 'types/Review'
import EditReviewModal from './EditReviewModal'
import ReportReviewModal from './ReportReviewModal'

//#region INTERFACE
interface Props extends IReviewProps {
  productRef: string
}
//#endregion

const CustomerReviewCard: FC<Props> = ({ review, productRef }) => {
  //#region GENERAL
  const { reviewerName, comment, star, updatedAt, reviewerId, _id } = review

  const { push } = useRouter()
  const [user] = useLocalStorage<UserPayload>('user', null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [reportIsOpen, setReportIsOpen] = useState<boolean>(false)
  //#endregion

  //#region ACTION HANDLER
  const onLike = () => {
    // TODO: add like functionality to review document
    toast('This feature coming soon')
  }

  const onReport = () => {
    if (!user) {
      toast.warn('Please login first')
      return
    }

    setReportIsOpen(true)
  }

  const onEditOpenModal = () => {
    setIsOpen(true)
  }

  const onDelete = async (): Promise<void> => {
    const isAgree = confirm('Are you sure?')
    if (!isAgree) return

    try {
      const res = await httpDelete<HttpResponse>(`/user/reviews/${_id}`) // delete review

      // client error
      if (res.status === 401) {
        await push('/login')
        toast.error(res.data.message)
        return
      } else if (res.status !== 201) {
        toast.error(res.data.message)
        return
      }

      // success
      toast.info('Review deleted')
      await mutate(`/public/products/${productRef}`)
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }
  //#endregion

  return (
    <section className="w-full flex-col rounded-lg p-4 shadow-lg">
      <div className="flex flex-row">
        <span className="relative h-12 w-12 rounded-full border-2 border-gray-300">
          <Image
            src="/images/trishop.png"
            alt="image name"
            // className="rounded-lg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </span>
        <div className="mt-1 w-full flex-col">
          <div className="ml-4 flex flex-1 items-center justify-between font-bold leading-tight">
            <span className="flex">
              <p className="mr-3">{reviewerName}</p>

              {Array(star)
                .fill('star')
                .map((_, i) => (
                  <FaStar key={i} className="mr-1 h-4 w-4 text-orange-500" />
                ))}
            </span>

            <p className="ml-4 text-xs font-normal text-gray-500">
              {dayjs(updatedAt).fromNow()}
            </p>
          </div>

          <div className="ml-2 flex-1 px-2 text-sm font-medium leading-loose text-gray-700">
            {comment}
          </div>
        </div>
      </div>

      <hr className="my-2 px-4" />

      <div className="flex flex-row items-center justify-between">
        <p className="text-sm text-gray-500">Is this review helps?</p>

        <div className="flex items-center space-x-2">
          {/* FIXME: styling did not works */}
          {!user || user._id !== reviewerId ? (
            <button
              className="group flex items-center focus:outline-none"
              onClick={onLike}
            >
              <MdThumbUp className="h-4 w-4 text-gray-500 group-hover:text-orange-500" />
              <span className="ml-2 text-sm">4</span>
            </button>
          ) : (
            <button
              className="flex items-center rounded-md border bg-orange-200 px-2 py-2 hover:border-orange-500 focus:outline-none"
              onClick={onEditOpenModal}
            >
              <span className="text-sm">Edit</span>
            </button>
          )}

          {/* FIXME: styling did not works */}
          {!user || user._id !== reviewerId ? (
            <button
              className="group ml-2 flex items-center focus:outline-none"
              onClick={onReport}
            >
              <MdReportProblem className="h-4 w-4 text-gray-500 group-hover:text-red-500" />
              <span className="ml-2 text-sm">Report</span>
            </button>
          ) : (
            <button
              className="flex items-center rounded-md border bg-red-200 px-2 py-2 hover:border-red-500 focus:outline-none"
              onClick={onDelete}
            >
              <span className="text-sm">Delete</span>
            </button>
          )}
        </div>
      </div>

      <EditReviewModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        review={review}
        productRef={productRef}
      />

      {user && (
        <ReportReviewModal
          reportIsOpen={reportIsOpen}
          setReportIsOpen={setReportIsOpen}
          review={review}
          userId={user._id}
        />
      )}
    </section>
  )
}

export default CustomerReviewCard
