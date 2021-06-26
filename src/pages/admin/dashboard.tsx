import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
import { NextSeo } from 'next-seo'
// files
import Navbar from 'components/admin/Navbar'
import AdminDashboard from 'components/admin/AdminDashboard'
import dbConnect from 'mongo/config/dbConnect'
import ProductModel from 'mongo/models/Product'
import UserModel from 'mongo/models/User'
import CouponModel from 'mongo/models/Coupon'
import ReportModel from 'mongo/models/Report'
import ReviewModel from 'mongo/models/Review'
import { AuthCookiePayload } from 'types'
import { IProduct } from 'types/Product'
import { IUser } from 'types/User'
import { ICoupon } from 'types/Coupon'
import { IReport } from 'types/Report'

export interface AdminDashboardProps {
  products: IProduct[]
  users: IUser[]
  coupons: ICoupon[]
  reports: IReport[]
}

// NOTE: ngambil data nya pake SSR, karena bermasalah di caching ketika memakai SWR / react-query / RTK Query
export default function AdminDashboardPage({
  products,
  users,
  coupons,
  reports,
}: AdminDashboardProps): JSX.Element {
  return (
    <>
      <NextSeo title="Admin Dashboard" />

      <Navbar>
        <AdminDashboard
          products={products}
          users={users}
          coupons={coupons}
          reports={reports}
        />
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
    const userId = decoded.sub

    // connect to mongodb
    await dbConnect()

    // if user does not exists
    const userIsExists = await UserModel.exists({ _id: userId })
    if (!userIsExists) {
      return {
        redirect: { destination: '/login', permanent: false },
      }
    }

    // if user.role === 'USER'
    if (decoded.role === 'USER') {
      return {
        redirect: { destination: '/user/dashboard', permanent: false },
      }
    }

    /* -------------------------------- get all admin dashboard props ------------------------------- */

    // products
    const products = await ProductModel.find()
    // users
    const users = await UserModel.find()
    // coupons
    const coupons = await CouponModel.find()
    // reports
    const reports = await ReportModel.find()
      .populate({ path: 'reviewRef', model: ReviewModel })
      .sort({ createdAt: -1 }) // desc
      .exec()

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        users: JSON.parse(JSON.stringify(users)),
        coupons: JSON.parse(JSON.stringify(coupons)),
        reports: JSON.parse(JSON.stringify(reports)),
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
