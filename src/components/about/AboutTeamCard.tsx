// import { Disclosure, Transition } from '@headlessui/react'
import { AiFillInstagram, AiFillFacebook } from 'react-icons/ai'

interface Props {
  team: {
    id: number
    name: string
    job: string
    desc: string
    imageUrl: string
  }
}

export default function AboutTeamCard({ team }: Props): JSX.Element {
  const { name, job, desc, imageUrl } = team

  return (
    <section className="p-4 lg:w-1/4 md:w-1/2">
      <div className="flex flex-col items-center h-full text-center">
        <img
          className="flex-shrink-0 object-cover object-center w-full h-56 mb-4 rounded-lg"
          src={imageUrl}
          alt={name}
        />

        <div className="w-full">
          <h2 className="text-lg font-medium text-gray-900 title-font">
            {name}
          </h2>

          <h3 className="mb-3 text-gray-500">{job}</h3>

          <p className="mb-4">{desc}</p>

          <span className="inline-flex">
            <a
              className=""
              href="https://example.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillInstagram className="w-5 h-5 text-red-500 hover:text-red-700" />
            </a>

            <a
              className="ml-2 "
              href="https://example.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillFacebook className="w-5 h-5 text-blue-500 hover:text-blue-700" />
            </a>
          </span>
        </div>
      </div>
    </section>
  )
}
