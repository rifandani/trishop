import { GetServerSideProps } from 'next'
import useSWR from 'swr'
// files
import Categories from 'components/Categories'
import Nav from 'components/Nav'
import ProductModel from 'mongo/models/Product'
import dbConnect from 'mongo/config/dbConnect'
import { Image } from 'contexts/CartReducer'

export interface PRODUCT {
  createdAt: string
  desc: string
  images: Image[]
  labels: string[]
  price: number
  stock: number
  title: string
  updatedAt: string
  __v: number
  _id: string
}

interface CategoryIndexProps {
  queryProducts: string
}

function CategoriesIndex({ queryProducts }: CategoryIndexProps): JSX.Element {
  const { data, error } = useSWR<string[]>('/public/categories')

  return (
    <>
      <Nav />

      {error && 'Error'}

      {data && (
        <Categories labels={data} queryProducts={JSON.parse(queryProducts)} />
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // connect DB
  await dbConnect()

  const _label = query?._label

  // if there is no query
  if (!_label) {
    const noLabels = await ProductModel.find()

    return {
      props: {
        queryProducts: JSON.stringify(noLabels),
      },
    }
  }

  const queryProducts = await ProductModel.find({
    labels: { $in: [_label] },
  })
    .limit(10)
    .sort({ createdAt: -1 }) // desc

  return {
    props: { queryProducts: JSON.stringify(queryProducts) }, // harus di serialize ke JSON dlu
  }
}

export default CategoriesIndex
