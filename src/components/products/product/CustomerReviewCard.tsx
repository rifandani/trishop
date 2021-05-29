import { MdThumbUp, MdReportProblem } from 'react-icons/md'
import { FaStar } from 'react-icons/fa'
// files

export default function CustomerReviewCard() {
  return (
    <section className="flex-col w-full p-4 bg-orange-100 border-b-2 border-r-2 border-gray-200 rounded-lg shadow-lg">
      <div className="flex flex-row">
        <img
          className="w-12 h-12 border-2 border-gray-300 rounded-full"
          alt="Anonymous's avatar"
          src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"
        />
        <div className="flex-col w-full mt-1">
          <div className="flex items-center justify-between flex-1 ml-4 font-bold leading-tight">
            <span className="flex">
              <p className="mr-3">Anonymous</p>

              {Array(4)
                .fill('star')
                .map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 mr-1 text-orange-500" />
                ))}
            </span>

            <p className="ml-4 text-xs font-normal text-gray-500">3 days ago</p>
          </div>

          <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-700">
            Very cool! I'll have to learn more about Tailwind.
          </div>
        </div>
      </div>

      <hr className="px-4 my-2" />

      <div className="flex flex-row items-center justify-between">
        <p className="text-sm text-gray-500">Is this review helps?</p>

        <div className="flex items-center">
          <button className="flex items-center group">
            <MdThumbUp className="w-4 h-4 text-gray-500 group-hover:text-orange-500" />
            <span className="ml-2 text-sm">4</span>
          </button>

          <button className="flex items-center ml-2 group">
            <MdReportProblem className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
            <span className="ml-2 text-sm">Report</span>
          </button>
        </div>
      </div>
    </section>
  )
}
