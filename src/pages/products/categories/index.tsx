import Categories from 'components/Categories'
import Nav from 'components/common/Nav'
import dbConnect from 'mongo/config/dbConnect'
import ProductModel from 'mongo/models/Product'
import { GetServerSideProps, NextPage } from 'next'
import useSWR from 'swr'

interface Props {
  queryProducts: string
}

const CategoriesPage: NextPage<Props> = ({ queryProducts }) => {
  //#region SERVICES
  const { data, error } = useSWR<string[]>('/public/categories')
  //#endregion

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

export default CategoriesPage
