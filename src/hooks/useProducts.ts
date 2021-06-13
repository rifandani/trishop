import useSWR from 'swr'
// files
import { APIResponseProducts } from 'components/products/ProductsComp'
import { Image } from 'contexts/CartReducer'
import { IReview } from 'types/Review'

interface ReturnType {
  products: {
    createdAt: string
    updatedAt: string
    desc: string
    images: Image[]
    labels: string[]
    price: number
    stock: number
    title: string
    sold: number
    reviews: IReview[]
    __v: number
    _id: string
  }[]
  productsIsLoading: boolean
  productsIsError: any
}

export default function useProducts(): ReturnType {
  const { data, error } = useSWR<APIResponseProducts>('/admin/products')

  const products = data?.products?.map((product) => ({
    ...product,
    createdAt: new Date(product.createdAt).toDateString(),
    updatedAt: new Date(product.updatedAt).toDateString(),
  }))

  return {
    products,
    productsIsLoading: !error && !data,
    productsIsError: error,
  }
}
