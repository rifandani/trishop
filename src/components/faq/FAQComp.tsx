import { Disclosure, Transition } from '@headlessui/react'
import { FaChevronUp } from 'react-icons/fa'

const faq = [
  {
    id: 1,
    question: 'What is your refund policy?',
    answer:
      "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
  },
  {
    id: 2,
    question: 'Do you offer technical support?',
    answer: 'No. But, there is a chance we will offer it in the future.',
  },
  {
    id: 3,
    question: 'How does it work?',
    answer:
      'Our platform works with your content to provides insights and metrics on how you can grow your business and scale your infastructure.',
  },
  {
    id: 4,
    question: 'Do you offer team pricing?',
    answer:
      'Yes, we do! Team pricing is available for any plan. You can take advantage of 30% off for signing up for team pricing of 10 users or more.',
  },
  {
    id: 5,
    question: 'What is your refund policy?',
    answer:
      "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
  },
  {
    id: 6,
    question: 'Do you offer technical support?',
    answer: 'No. But, there is a chance we will offer it in the future.',
  },
  {
    id: 7,
    question: 'How does it work?',
    answer:
      'Our platform works with your content to provides insights and metrics on how you can grow your business and scale your infastructure.',
  },
  {
    id: 8,
    question: 'Do you offer team pricing?',
    answer:
      'Yes, we do! Team pricing is available for any plan. You can take advantage of 30% off for signing up for team pricing of 10 users or more.',
  },
]

export default function FAQComp() {
  return (
    <main className="w-full bg-white">
      {/* real content */}
      <div className="grid w-full grid-cols-1 gap-6 p-2 mx-auto mt-6 rounded-2xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {faq.map((el) => (
          <Disclosure as="div" className="mt-0" key={el.id}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-orange-800 bg-orange-100 rounded-lg hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75">
                  <span>{el.question}</span>

                  <FaChevronUp
                    className={`${
                      open ? 'transform rotate-180' : ''
                    } w-5 h-5 text-orange-500`}
                  />
                </Disclosure.Button>

                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-90 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-65 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-90 opacity-0"
                >
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {el.answer}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </main>
  )
}
