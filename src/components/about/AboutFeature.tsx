// import { Disclosure, Transition } from '@headlessui/react'
import { BiRightArrowAlt, BiCool } from 'react-icons/bi'

interface Props {
  feature: {
    id: number
    title: string
    subtitle: string
  }
}

export default function AboutFeature({ feature }: Props) {
  const { title, subtitle } = feature

  return (
    <section className="flex p-4 md:w-1/3">
      <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-orange-800 bg-orange-200 rounded-full">
        <BiCool className="w-6 h-6" />
      </div>

      <div className="flex-grow pl-6">
        <h2 className="mb-2 text-lg font-medium text-gray-900">{title}</h2>

        <p className="text-base leading-relaxed text-justify text-gray-500">
          {subtitle}
        </p>

        <a className="inline-flex items-center mt-3 text-orange-800">
          Learn More
          <BiRightArrowAlt className="w-4 h-4 ml-2" />
        </a>
      </div>
    </section>
  )
}
