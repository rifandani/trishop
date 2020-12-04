import Link from 'next/link';
import Image from 'next/image';
import { BsArrowRight } from 'react-icons/bs';

const Stores = () => {
  return (
    <article className="relative py-16 bg-white min-w-screen">
      <div className="container px-10 mx-auto sm:px-5">
        <div className="w-full flex-wrap-reverse lg:flex">
          {/* images */}
          <div className="w-full lg:w-1/2 xl:w-2/3">
            <section className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              <Image
                className="shadow-md object-cover"
                src="/images/store1.jpg"
                alt="store1"
                width={300}
                height={300}
              />
              <Image
                className="shadow-md object-cover"
                src="/images/store2.jpg"
                alt="store2"
                width={300}
                height={300}
              />
              <Image
                className="shadow-md object-cover"
                src="/images/store3.jpg"
                alt="store3"
                width={300}
                height={300}
              />
              <Image
                className="shadow-md object-cover"
                src="/images/store4.jpg"
                alt="store4"
                width={300}
                height={300}
              />
              <Image
                className="shadow-md object-cover"
                src="/images/store5.jpg"
                alt="store5"
                width={300}
                height={300}
              />
              <Image
                className="shadow-md object-cover"
                src="/images/store6.jpg"
                alt="store6"
                width={300}
                height={300}
              />
            </section>
          </div>

          {/* content */}
          <div className="w-full mt-10 ml-0 lg:mt-0 lg:flex-1 lg:w-1/2 xl:w-1/3 lg:ml-10">
            <div className="px-20 py-5 text-white bg-orange-800 lg:h-full">
              <div className="mt-2 text-sm uppercase italic">Stores</div>
              <div className="mt-10 mb-5 text-2xl font-bold">
                Find us in many places
              </div>
              <p className="leading-7 text-justify">
                We strive to always bring convenience to you. Our
                continuously-growing outlets are located at all over Indonesia,
                where you can indulge yourself or with loved ones within a
                luxurious environment and warm, inviting ambiance that will make
                you feel right at home.
              </p>
              <div className="mt-8">
                <Link href="/stores">
                  <a className="flex items-center text-orange-300 hover:text-orange-500">
                    <div className="flex-initial">See more details</div>
                    <BsArrowRight className="flex-shrink w-4 ml-3" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Stores;
