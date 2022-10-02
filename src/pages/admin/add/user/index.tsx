import MAdminUserForm from 'components/organism/MAdminUserForm.organism'
import MAdminNavbar from 'components/template/MAdminNavbar.template'
import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import dbConnect from 'mongo/config/dbConnect'
import UserModel from 'mongo/models/User'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { AuthCookiePayload } from 'types'

const AddUserPage: NextPage = () => {
  return (
    <>
      <NextSeo title="Add User" />

      <MAdminNavbar content={<MAdminUserForm user={undefined} />} />
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

    // if user.role === 'USER'
    if (decoded.role === 'USER') {
      return {
        redirect: { destination: '/user/dashboard', permanent: false },
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

export default AddUserPage
