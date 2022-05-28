import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai'

interface Props {
  team: {
    id: number
    name: string
    job: string
    desc: string
    imageUrl: string
  }
}

const AboutTeamCard: FC<Props> = ({ team }) => {
  const { name, job, desc, imageUrl } = team

  return (
    <section className="p-4">
      <div className="flex h-full flex-col items-center text-center">
        <span className="relative mb-4 h-56 w-full flex-shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            className="rounded-lg"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </span>
        <div className="w-full">
          <h2 className="title-font text-lg font-medium text-gray-900">
            {name}
          </h2>

          <h3 className="mb-3 text-gray-500">{job}</h3>

          <p className="mb-4">{desc}</p>

          <span className="inline-flex">
            <Link href="https://example.com/">
              <a className="" target="_blank" rel="noopener noreferrer">
                <AiFillInstagram className="h-5 w-5 text-red-500 hover:text-red-700" />
              </a>
            </Link>

            <Link href="https://example.com/">
              <a className="ml-2 " target="_blank" rel="noopener noreferrer">
                <AiFillFacebook className="h-5 w-5 text-blue-500 hover:text-blue-700" />
              </a>
            </Link>
          </span>
        </div>
      </div>
    </section>
  )
}

export default AboutTeamCard
