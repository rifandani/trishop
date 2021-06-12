import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { parse } from 'cookie'
import { verify } from 'jsonwebtoken'
// files
import Navbar from 'components/admin/Navbar'
import EditProduct from 'components/admin/products/EditProduct'
import ProductModel from 'mongo/models/Product'
import UserModel from 'mongo/models/User'
import dbConnect from 'mongo/config/dbConnect'
import getQueryAsString from 'utils/getQueryAsString'
import { Product } from 'contexts/CartReducer'
import { JWTPayload } from 'utils/setCookie'

interface Props {
  product: Product
}

export default function AdminProductEdit({ product }: Props) {
  return (
    <>
      <Head>
        <title>Trishop - Edit Product</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
    // decoded === payload { sub: user._id, iat: number, exp: number }
    const decoded = verify(authCookie!, process.env.MY_SECRET_KEY)
    const authUserId = (decoded as JWTPayload).sub

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
    if ((decoded as JWTPayload).role === 'USER') {
      return {
        redirect: { destination: '/dashboard', permanent: false },
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
    const product = (await ProductModel.findById(productIdParams)).toJSON()

    const data = {
      ...product,
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
