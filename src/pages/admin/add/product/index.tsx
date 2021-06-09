import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
import Head from 'next/head'
// files
import Navbar from 'components/admin/Navbar'
import AddProduct from 'components/admin/add/AddProduct'
import dbConnect from 'mongo/config/dbConnect'
import UserModel from 'mongo/models/User'
import { JWTPayload } from 'pages/admin/dashboard'

export default function AddProductPage() {
  return (
    <>
      <Head>
        <title>Trishop - Add New Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar>
        <AddProduct />
      </Navbar>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parse(ctx.req.headers?.cookie ?? '')
  const authCookie = cookies.auth

  // kalau auth cookie tidak ada
  if (!authCookie) {
    return {
      redirect: { destination: '/login', permanent: false },
    }
  }

  try {
    // verify auth cookie
    // decoded === payload { sub: user._id, iat: number, exp: number }
    const decoded = verify(authCookie!, process.env.MY_SECRET_KEY)
    const userId = (decoded as JWTPayload).sub

    // connect to mongodb
    await dbConnect()

    // // if user does not exists
    const userIsExists = await UserModel.exists({ _id: userId })
    if (!userIsExists) {
      return {
        redirect: { destination: '/login', permanent: false },
      }
    }

    // find user by id
    const user = await UserModel.findById(userId)

    // if user.role === 'USER'
    if (user.role === 'USER') {
      return {
        redirect: { destination: '/dashboard', permanent: false },
      }
    }

    return {
      props: {},
    }
  } catch (err) {
    // kalau jwt malformed  || auth cookie tidak valid
    console.error(err)
    return {
      redirect: { destination: '/login', permanent: false },
    }
  }
}
