import { FC } from 'react'

const Customers: FC = () => {
  return (
    <article className="border-b bg-gradient-to-r from-orange-200 via-orange-500 to-orange-800 py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* title */}
        <h2 className="my-2 w-full text-center text-3xl font-black leading-tight text-white lg:mt-8">
          Our Customers
        </h2>

        {/* straight line */}
        <div className="mb-4 w-full">
          <div className="mx-auto my-0 h-1 w-64 rounded-t bg-orange-200 py-0 opacity-50"></div>
        </div>

        {/* list of customers */}
        <section className="mx-auto flex max-w-4xl flex-1 flex-wrap items-center justify-center text-xl font-bold text-white opacity-75 lg:justify-between">
          <span className="flex w-1/2 items-center p-4 md:w-auto">
            <svg
              className="mr-4 h-10 w-10 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 0H6L0 3v6l4-1v12h12V8l4 1V3l-6-3h-1a3 3 0 0 1-6 0z" />
            </svg>
            TeeShirtz
          </span>

          <span className="flex w-1/2 items-center p-4 md:w-auto">
            <svg
              className="mr-4 h-10 w-10 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zM1.85 15.3l9.2-9.19 2.83 2.83-9.2 9.2-2.82-2.84zm-1.4 2.83l2.11-2.12 1.42 1.42-2.12 2.12-1.42-1.42zM10 15l2-2v7h-2v-5z" />
            </svg>
            Mic.Check
          </span>

          <span className="flex w-1/2 items-center p-4 md:w-auto">
            <svg
              className="mr-4 h-10 w-10 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-3a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm4 2.75V20l-4-4-4 4v-8.25a6.97 6.97 0 0 0 8 0z" />
            </svg>
            BadgeLife.io
          </span>

          <span className="flex w-1/2 items-center p-4 md:w-auto">
            <svg
              className="mr-4 h-10 w-10 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M15.3 14.89l2.77 2.77a1 1 0 0 1 0 1.41 1 1 0 0 1-1.41 0l-2.59-2.58A5.99 5.99 0 0 1 11 18V9.04a1 1 0 0 0-2 0V18a5.98 5.98 0 0 1-3.07-1.51l-2.59 2.58a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41l2.77-2.77A5.95 5.95 0 0 1 4.07 13H1a1 1 0 1 1 0-2h3V8.41L.93 5.34a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0l2.1 2.1h11.12l2.1-2.1a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41L16 8.41V11h3a1 1 0 1 1 0 2h-3.07c-.1.67-.32 1.31-.63 1.89zM15 5H5a5 5 0 1 1 10 0z" />
            </svg>
            Bugz 4 Life
          </span>
        </section>
      </div>
    </article>
  )
}

export default Customers
