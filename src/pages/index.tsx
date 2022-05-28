import Footer from 'components/common/Footer'
import CTA from 'components/home/CTA'
import Customers from 'components/home/Customers'
import Header from 'components/home/Header'
import Portfolio from 'components/home/Portfolio'
import Stores from 'components/home/Stores'
import { NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <div className="home bg-white">
      <Header />

      <Portfolio />

      <Customers />

      <Stores />

      <CTA />

      <Footer />
    </div>
  )
}

export default HomePage
