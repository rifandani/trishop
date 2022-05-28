import { FC } from 'react'
import { BiCool, BiRightArrowAlt } from 'react-icons/bi'

interface Props {
  feature: {
    id: number
    title: string
    subtitle: string
  }
}

const AboutFeature: FC<Props> = ({ feature }) => {
  const { title, subtitle } = feature

  return (
    <section className="flex p-4">
      <div className="mb-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-200 text-orange-800">
        <BiCool className="h-6 w-6" />
      </div>

      <div className="flex-grow pl-6">
        <h2 className="mb-2 text-lg font-medium text-gray-900">{title}</h2>

        <p className="text-justify text-base leading-relaxed text-gray-500">
          {subtitle}
        </p>

        <a className="mt-3 inline-flex items-center text-orange-800">
          Learn More
          <BiRightArrowAlt className="ml-2 h-4 w-4" />
        </a>
      </div>
    </section>
  )
}

export default AboutFeature
