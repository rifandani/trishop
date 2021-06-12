import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
// files
import Navbar from 'components/admin/Navbar'
import AdminDashboard from 'components/admin/AdminDashboard'
import UserModel from 'mongo/models/User'
import dbConnect from 'mongo/config/dbConnect'
import { JWTPayload } from 'utils/setCookie'

export default function AdminDashboardPage() {
  return (
    <>
      <Head>
        <title>Trishop - Admin Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar>
        <AdminDashboard />
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
    // const user = await UserModel.findById(userId)

    // if user.role === 'USER'
    if ((decoded as JWTPayload).role === 'USER') {
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
