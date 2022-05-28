import CheckoutComp from 'components/cart/checkout/CheckoutComp'
import Footer from 'components/common/Footer'
import Nav from 'components/common/Nav'
import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'

const CheckoutPage: NextPage = () => {
  return (
    <div className="">
      <NextSeo
        title="Checkout"
        description="Acting as an online store's process series of steps a customer must follow to purchase items in their online shopping cart."
      />

      <Nav />

      <CheckoutComp />

      <Footer />
    </div>
  )
}

// You should not use fetch() to call an API route in getServerSideProps. Instead, directly import the logic used inside your API route
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parse(ctx.req.headers?.cookie ?? '')
  const authCookie = cookies.auth

  // kalau auth cookie kosong
  if (!authCookie) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  try {
    // verify the authCookie
    verify(authCookie, process.env.MY_SECRET_KEY)

    return {
      props: {},
    }
  } catch (err) {
    // kalau auth cookie ada tapi tidak valid / verify error
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
}

export default CheckoutPage
