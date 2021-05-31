import Head from 'next/head'
// files
import Nav from 'components/Nav'
import CheckoutComp from 'components/cart/checkout/CheckoutComp'
import Footer from 'components/Footer'

const CheckoutPage = () => {
  return (
    <div className="">
      <Head>
        <title>Trishop - Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <CheckoutComp />

      <Footer />
    </div>
  )
}

export default CheckoutPage
