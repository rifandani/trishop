import Nav from 'components/common/Nav'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import HeaderWave from './HeaderWave'

const Header: FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-800 via-orange-400 to-orange-200 leading-normal tracking-normal text-white">
      {/* nav */}
      <Nav />

      {/* <!--Hero--> */}
      <section className="pt-24">
        <div className="container mx-auto flex flex-col flex-wrap items-center px-3 md:flex-row">
          {/* <!--Left Col--> */}
          <div className="flex w-full flex-col items-start justify-center text-center md:w-2/5 md:text-left">
            <p className="tracking-loose w-full uppercase italic">
              Created with 🔥 and 💖
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Tell us your custom cake design
            </h1>
            <p className="mx-auto mb-8 text-2xl leading-normal md:mx-0">
              We make your dream 🎂 becomes reality
            </p>

            <Link href="/products">
              <a className="header__order-now-btn">Order Now</a>
            </Link>
          </div>

          {/* <!--Right Col--> */}
          <div className="w-full py-6 text-center md:w-3/5">
            <Image
              className="z-50 mx-auto w-full md:w-4/5"
              src="/images/cake.png"
              alt="cake illustration"
              width={550}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* wave svg */}
      <section className="relative -mt-12 lg:-mt-24">
        <HeaderWave />
      </section>
    </header>
  )
}

export default Header
