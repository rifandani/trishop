import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
import { NextSeo } from 'next-seo'
// files
import Navbar from 'components/admin/Navbar'
import EditUser from 'components/admin/users/EditUser'
import UserModel from 'mongo/models/User'
import dbConnect from 'mongo/config/dbConnect'
import getQueryAsString from 'utils/getQueryAsString'
import { IUserProps } from 'types/User'
import { AuthCookiePayload } from 'types'

export default function AdminUsersEditPage({ user }: IUserProps): JSX.Element {
  return (
    <>
      <NextSeo title="Edit User" />

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
    const decoded = verify(
      authCookie,
      process.env.MY_SECRET_KEY
    ) as AuthCookiePayload
    const authUserId = decoded.sub

    // connect to mongodb
    await dbConnect()

    // if authUser does not exists
    const authUserIsExists = await UserModel.exists({ _id: authUserId })
    if (!authUserIsExists) {
      return {
        redirect: { destination: '/login', permanent: false },
      }
    }

    // find authUser by id
    // const authUser = await UserModel.findById(authUserId)

    // if authUser.role === 'USER'
    if (decoded.role === 'USER') {
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
      createdAt: user.createdAt.toLocaleString(),
      updatedAt: user.updatedAt.toLocaleString(),
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
