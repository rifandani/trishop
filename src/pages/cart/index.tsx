import { NextSeo } from 'next-seo'
// files
import CartComp from 'components/cart/CartComp'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

export default function CartPage(): JSX.Element {
  return (
    <>
      <NextSeo
        title="Cart"
        description="Acting as an online store's catalog, our shopping cart enables consumers to select products, review what they selected, make modifications, and apply some coupons so that they can see the subtotal of their wanted list."
      />

      <Nav />

      <CartComp />

      <Footer />
    </>
  )
}
