import { Disclosure } from '@headlessui/react'
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

export default function FAQComp(): JSX.Element {
  return (
    <main className="w-full bg-white">
      {/* real content */}
      <div className="mx-auto mt-6 grid w-full grid-cols-1 gap-6 rounded-2xl p-2 md:grid-cols-2">
        {faq.map((el) => (
          <Disclosure as="div" className="mt-0" key={el.id}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-orange-100 px-4 py-2 text-left text-sm font-medium text-orange-800 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75">
                  <span>{el.question}</span>

                  <FaChevronUp
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-orange-500`}
                  />
                </Disclosure.Button>

                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {el.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </main>
  )
}
