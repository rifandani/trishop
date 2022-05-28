import Footer from 'components/common/Footer'
import Nav from 'components/common/Nav'
import WishlistComp from 'components/wishlist/WishlistComp'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const WishlistPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Wishlist"
        description="We remember your wish and store it, so that you can always see it."
      />

      <Nav />

      <WishlistComp />

      <Footer />
    </>
  )
}

export default WishlistPage
