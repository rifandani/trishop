import Link from 'next/link';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';

const Portfolio = () => {
  return (
    <article className="container py-16 mx-auto">
      <div className="flex flex-wrap">
        <section className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
          <div className="flex flex-col h-full px-20 py-5 bg-orange-800 text-white">
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
                <BsArrowRight className="flex-shrink ml-3 w-4" />
              </a>
            </Link>
          </div>
        </section>

        <section className="lg:w-1/2 px-4">
          <div className="flex flex-wrap -m-2">
            <div className="w-1/2 p-2">
              <Image
                className="shadow-md object-cover"
                src="/images/show1.jpg"
                alt="show1"
                width={300}
                height={185}
              />
            </div>

            <div className="w-1/2 p-2">
              <Image
                className="shadow-md object-cover"
                src="/images/show2.jpg"
                alt="show2"
                width={300}
                height={185}
              />
            </div>

            <div className="w-1/2 p-2">
              <Image
                className="shadow-md object-cover"
                src="/images/show3.jpg"
                alt="show3"
                width={300}
                height={185}
              />
            </div>

            <div className="w-1/2 p-2">
              <Image
                className="shadow-md object-cover"
                src="/images/show4.jpg"
                alt="show4"
                width={300}
                height={185}
              />
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Portfolio;
