import Head from 'next/head'
// files
import CartComp from 'components/cart/CartComp'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Trishop - Cart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <CartComp />

      <Footer />
    </>
  )
}
