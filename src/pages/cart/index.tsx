import CartComp from 'components/cart/CartComp'
import Footer from 'components/common/Footer'
import Nav from 'components/common/Nav'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'

const CartPage: NextPage = () => {
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

export default CartPage
