import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
import { NextSeo } from 'next-seo'
// files
import Navbar from 'components/admin/Navbar'
import EditCoupon from 'components/admin/coupons/EditCoupon'
import UserModel from 'mongo/models/User'
import CouponModel from 'mongo/models/Coupon'
import dbConnect from 'mongo/config/dbConnect'
import getQueryAsString from 'utils/getQueryAsString'
import { ICouponProps } from 'types/Coupon'
import { AuthCookiePayload } from 'types'

export default function AdminCouponsEditPage({
  coupon,
}: ICouponProps): JSX.Element {
  return (
    <>
      <NextSeo title="Edit Coupon" />

      <Navbar>
        <EditCoupon coupon={coupon} />
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

    // if coupon does not exists
    const couponIdParams = getQueryAsString(ctx.params._id)
    const couponIsExists = await CouponModel.exists({ _id: couponIdParams })
    if (!couponIsExists) {
      return {
        notFound: true,
      }
    }

    // find coupon by id
    const couponDoc = await CouponModel.findById(couponIdParams)

    return {
      props: {
        coupon: JSON.parse(JSON.stringify(couponDoc)),
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
