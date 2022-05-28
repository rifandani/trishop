import { FC } from 'react'
import { FaStar } from 'react-icons/fa'
import { IReview } from 'types/Review'
import CustomerReviewCard from './CustomerReviewCard'

//#region INTERFACE
interface ProductReviewProps {
  reviews: IReview[]
  productRef: string
}
//#endregion

const ProductReview: FC<ProductReviewProps> = ({ reviews, productRef }) => {
  const reviewsCount = reviews.length
  const averageStars =
    reviewsCount > 0
      ? (
          reviews
            .map((review) => review.star)
            .reduce((acc, curr) => acc + curr) / reviewsCount
        ).toPrecision(2)
      : 0
  const roundedAverageStars =
    reviewsCount > 0 ? Math.round(Number(averageStars)) : 0

  const oneStarCount =
    reviewsCount > 0 ? reviews.filter((review) => review.star === 1).length : 0
  const twoStarCount =
    reviewsCount > 0 ? reviews.filter((review) => review.star === 2).length : 0
  const threeStarCount =
    reviewsCount > 0 ? reviews.filter((review) => review.star === 3).length : 0
  const fourStarCount =
    reviewsCount > 0 ? reviews.filter((review) => review.star === 4).length : 0
  const fiveStarCount =
    reviewsCount > 0 ? reviews.filter((review) => review.star === 5).length : 0
  const starCountArray = [
    oneStarCount,
    twoStarCount,
    threeStarCount,
    fourStarCount,
    fiveStarCount,
  ]

  return (
    <main className="relative mx-auto flex w-full max-w-7xl items-center justify-center bg-white pb-8">
      <article className="-mx-4 flex w-full flex-col md:flex-row">
        {/* stars */}
        <div className="flex w-full flex-col px-4 sm:px-6 md:w-1/2 md:flex-row lg:px-16">
          <section className="flex flex-col py-4 sm:rounded-lg sm:px-4 sm:py-4 md:w-2/3 md:px-4">
            <div className="flex flex-col items-center justify-center">
              <span className="flex items-end">
                {/* average stars */}
                <p className="mr-2 text-5xl font-bold">{averageStars}</p>
                <p className="text-lg text-gray-500"> / 5</p>
              </span>

              {/* overall stars */}
              <span className="my-2 flex items-center">
                {Array(roundedAverageStars)
                  .fill('whatever')
                  .map((_, i) => (
                    <FaStar key={i} className="h-6 w-6 text-orange-500" />
                  ))}
              </span>

              <p className="text-gray-500">{reviewsCount} reviews</p>
            </div>
          </section>

          <section className="flex flex-col space-y-2 py-4 sm:rounded-lg sm:px-4 sm:py-4 md:w-2/3 md:px-4">
            {Array(5)
              .fill('whatever')
              .map((_, i) => (
                <div className="flex flex-row items-center" key={i}>
                  <FaStar className="h-4 w-4 text-orange-500" />
                  <p className="mt-1 ml-2 text-gray-500">{i + 1}</p>
                  {/* progress bar */}
                  <div className="mx-2 w-full rounded-full bg-gray-200 shadow">
                    <div
                      className="rounded-full bg-orange-500 py-1 text-center text-xs leading-none text-white"
                      style={{
                        width: `${
                          starCountArray[i] > 0
                            ? (
                                (starCountArray[i] / reviewsCount) *
                                100
                              ).toPrecision(3)
                            : '0'
                        }%`,
                      }}
                    >
                      {starCountArray[i] > 0
                        ? `${(
                            (starCountArray[i] / reviewsCount) *
                            100
                          ).toPrecision(3)}%`
                        : ''}
                    </div>
                  </div>
                  <p className="text-gray-500">{starCountArray[i]}</p>
                </div>
              ))}
          </section>
        </div>

        {/* customer reviews */}
        <div className="mt-6 flex w-full flex-col space-y-3 px-4 sm:px-6 md:mt-0 md:w-1/2 lg:px-16">
          {reviewsCount > 0 ? (
            reviews.map((review, i) => (
              <CustomerReviewCard
                key={i}
                review={review}
                productRef={productRef}
              />
            ))
          ) : (
            <span className="px-4 py-2">There is no reviews</span>
          )}
        </div>
      </article>
    </main>
  )
}

export default ProductReview
