import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
// files
import Navbar from 'components/admin/Navbar'
import EditUser from 'components/admin/users/EditUser'
import UserModel from 'mongo/models/User'
import MongoConfig from 'mongo/config/MongoConfig'
import getQueryAsString from 'utils/getQueryAsString'
import { JWTPayload } from 'pages/admin/dashboard'
import { IUser } from 'types/User'

export interface UserProps {
  user: IUser
}

export default function AdminUsersEditPage({ user }: UserProps) {
  console.log(
    '🚀 ~ file: index.tsx ~ line 18 ~ AdminUsersEditPage ~ user',
    user
  )

  return (
    <>
      <Head>
        <title>Trishop - Edit User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar>
        <EditUser user={user} />
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
    const authUserId = (decoded as JWTPayload).sub

    // connect to mongodb
    await MongoConfig.connectDB()

    // if authUser does not exists
    const authUserIsExists = await UserModel.exists({ _id: authUserId })
    if (!authUserIsExists) {
      return {
        redirect: { destination: '/login', permanent: false },
      }
    }

    // find authUser by id
    const authUser = await UserModel.findById(authUserId)

    // if authUser.role === 'USER'
    if (authUser.role === 'USER') {
      return {
        redirect: { destination: '/dashboard', permanent: false },
      }
    }

    /* ------------------- after user is proved authenticated ------------------- */

    // if User does not exists
    const userIdParams = getQueryAsString(ctx.params._id)
    const userIsExists = await UserModel.exists({ _id: userIdParams })
    if (!userIsExists) {
      return {
        notFound: true,
      }
    }

    // find User by id
    const user = (await UserModel.findById(userIdParams)).toJSON()

    const data = {
      ...user,
      _id: user._id.toString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }

    return {
      props: {
        user: data,
      },
    }
  } catch (err) {
    // kalau jwt malformed  || auth cookie tidak valid
    console.error(err)
    return {
      redirect: { destination: '/login', permanent: false },
    }
  }
}
