import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
import { NextSeo } from 'next-seo'
// files
import UserNavbar from 'components/user/UserNavbar'
import UserDashboard from 'components/user/UserDashboard'
import UserModel from 'mongo/models/User'
import dbConnect from 'mongo/config/dbConnect'
import { AuthCookiePayload } from 'types'

export default function UserDashboardPage(): JSX.Element {
  return (
    <>
      <NextSeo title="User Dashboard" />

      <UserNavbar>
        <UserDashboard />
      </UserNavbar>
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
    const decoded = verify(
      authCookie,
      process.env.MY_SECRET_KEY
    ) as AuthCookiePayload
    const userId = decoded.sub

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

    // if user.role === 'ADMIN'
    if (decoded.role === 'ADMIN') {
      return {
        redirect: { destination: '/admin/dashboard', permanent: false },
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
