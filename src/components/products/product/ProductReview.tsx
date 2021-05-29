import { FaStar } from 'react-icons/fa'
// files
import CustomerReviewCard from './CustomerReviewCard'

export default function ProductReview() {
  return (
    <main className="relative flex items-center justify-center w-full mx-auto bg-white max-w-7xl">
      <article className="flex flex-col w-full -mx-4 md:flex-row">
        {/* stars */}
        <div className="flex flex-col w-full px-4 md:w-1/2 sm:px-6 lg:px-16 md:flex-row">
          <section className="flex flex-col py-4 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg md:w-2/3">
            <div className="flex flex-col items-center justify-center">
              <span className="flex items-end">
                <p className="mr-2 text-5xl font-bold">4.6</p>
                <p className="text-lg text-gray-500"> / 5</p>
              </span>

              <span className="flex items-center my-2">
                {Array(5)
                  .fill('whatever')
                  .map((_, i) => (
                    <FaStar key={i} className="w-6 h-6 text-orange-500" />
                  ))}
              </span>

              <p className="text-gray-500">124 reviews</p>
            </div>
          </section>

          <section className="flex flex-col py-4 space-y-2 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg md:w-2/3">
            {Array(5)
              .fill('whatever')
              .map((_, i) => (
                <div className="flex flex-row items-center" key={i}>
                  <FaStar className="w-4 h-4 text-orange-500" />
                  <p className="mt-1 ml-2 text-gray-500">{i + 1}</p>
                  {/* progress bar */}
                  <div className="w-full mx-2 bg-gray-200 rounded-full shadow">
                    <div
                      className="py-1 text-xs leading-none text-center text-white bg-orange-500 rounded-full"
                      style={{ width: '40%' }}
                    >
                      40%
                    </div>
                  </div>
                  <p className="text-gray-500">100</p>
                </div>
              ))}
          </section>
        </div>

        {/* customer reviews */}
        <div className="flex flex-col w-full px-4 mt-6 space-y-3 md:w-1/2 md:mt-0 sm:px-6 lg:px-16">
          <CustomerReviewCard />
          <CustomerReviewCard />
          <CustomerReviewCard />
        </div>
      </article>
    </main>
  )
}
