import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
// files
import Nav from 'components/Nav'
import CheckoutComp from 'components/cart/checkout/CheckoutComp'
import Footer from 'components/Footer'

function CheckoutPage(): JSX.Element {
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
    // decoded === payload { sub: user._id }
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
