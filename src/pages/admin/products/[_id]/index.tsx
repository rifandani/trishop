import Navbar from 'components/admin/AdminNavbar'
import EditProduct from 'components/admin/products/EditProduct'
import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
import dbConnect from 'mongo/config/dbConnect'
import ProductModel from 'mongo/models/Product'
import UserModel from 'mongo/models/User'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { AuthCookiePayload } from 'types'
import { IProductProps } from 'types/Product'
import getQueryAsString from 'utils/getQueryAsString'

const EditProductPage: NextPage<IProductProps> = ({ product }) => {
  return (
    <>
      <NextSeo title="Edit Product" />

      <Navbar>
        <EditProduct product={product} />
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
        redirect: { destination: '/user/dashboard', permanent: false },
      }
    }

    /* ------------------- after user is proved authenticated ------------------- */

    // if product._id does not exists
    const productIdParams = getQueryAsString(ctx.params._id)
    const productIsExists = await ProductModel.exists({ _id: productIdParams })
    if (!productIsExists) {
      return {
        notFound: true,
      }
    }

    // find product by id
    const product = await ProductModel.findById(productIdParams)

    const data = {
      ...JSON.parse(JSON.stringify(product)),
      _id: product._id.toString(),
      createdAt: product.createdAt.toLocaleString(),
      updatedAt: product.updatedAt.toLocaleString(),
    }

    return {
      props: {
        product: data,
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

export default EditProductPage
