import Head from 'next/head'
// files
import WishlistComp from 'components/wishlist/WishlistComp'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

export default function WishlistPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Trishop - Wishlist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <WishlistComp />

      <Footer />
    </>
  )
}
