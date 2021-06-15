// files
import Header from 'components/home/Header'
import Portfolio from 'components/home/Portfolio'
import Customers from 'components/home/Customers'
import Stores from 'components/home/Stores'
import CTA from 'components/home/CTA'
import Footer from 'components/Footer'

export default function HomePage(): JSX.Element {
  return (
    <div className="bg-white">
      <Header />

      <Portfolio />

      <Customers />

      <Stores />

      <CTA />

      <Footer />
    </div>
  )
}
