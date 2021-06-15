import { NextSeo } from 'next-seo'
// files
import WishlistComp from 'components/wishlist/WishlistComp'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

export default function WishlistPage(): JSX.Element {
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
