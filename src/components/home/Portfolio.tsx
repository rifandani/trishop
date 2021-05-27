import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

const Portfolio = () => {
  return (
    <article className="container py-16 mx-auto">
      <div className="flex flex-wrap">
        <section className="w-full px-4 mb-8 lg:w-1/2 lg:mb-0">
          <div className="flex flex-col justify-center h-full px-20 py-5 text-white bg-orange-800">
            <p className="mt-2 text-sm italic uppercase">Showcase</p>
            <h2 className="mt-10 mb-5 text-2xl font-bold ">
              Witness the beauty of our works
            </h2>
            <p className="max-w-sm mb-6 leading-7 text-justify">
              We love cakes and chocolates - so do our customers. We constantly
              obsess over sourcing the highest quality ingredients. We always
              use local organic eggs, creamy local butter and highest quality
              local flour. Our motivation for using these ingredients are love
              for great food and respect for the environment.
            </p>
            <Link href="/">
              <a className="flex items-center text-orange-300 hover:text-orange-500">
                <div className="flex-initial">See all products</div>
                <BsArrowRight className="flex-shrink w-4 ml-3" />
              </a>
            </Link>
          </div>
        </section>

        <section className="px-4 lg:w-1/2">
          <div className="flex flex-wrap -m-2">
            <div className="w-1/2 p-2">
              <img
                className="object-cover shadow-md shadow-pop-bl"
                src="/images/show1.jpg"
                alt="show1"
              />
            </div>

            <div className="w-1/2 p-2">
              <img
                className="object-cover shadow-md shadow-pop-bl"
                src="/images/show2.jpg"
                alt="show2"
              />
            </div>

            <div className="w-1/2 p-2">
              <img
                className="object-cover shadow-md shadow-pop-bl"
                src="/images/show3.jpg"
                alt="show3"
              />
            </div>

            <div className="w-1/2 p-2">
              <img
                className="object-cover shadow-md shadow-pop-bl"
                src="/images/show4.jpg"
                alt="show4"
              />
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}

export default Portfolio
