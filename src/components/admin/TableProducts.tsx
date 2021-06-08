import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Grid } from 'gridjs-react'
import { h } from 'gridjs'
import { mutate } from 'swr'
import Axios from 'axios'
// files
import useProducts from 'hooks/useProducts'

export default function TableProducts() {
  // hooks
  const { push } = useRouter()
  const { products } = useProducts()

  const editProduct = (_id: string): Promise<boolean> =>
    push(`/admin/products/${_id}`)

  const deleteProduct = async (_id: string): Promise<void> => {
    try {
      // ask for certainty
      const agree = confirm('Are you sure you want to delete this?')
      if (!agree) {
        return
      }

      const selectedProduct = products.find((product) => product._id === _id)
      const public_ids = selectedProduct.images.map((image) => image.publicId)

      // delete images resources in cloudinary
      await Axios.delete(
        `/admin/cloudinary/resources/image?public_ids=${public_ids.join(',')}`
      )

      // delete product in mongodb
      await Axios.delete(`/admin/products/${_id}`)

      // trigger a revalidation (refetch) to make sure our local data is correct
      await mutate('/admin/products')
      toast.info('Product deleted')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  return (
    <section className="flex flex-col mt-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="min-w-full overflow-hidden sm:rounded-lg ">
          <Grid
            data={products ? products : []}
            search={true}
            sort={true}
            pagination={{
              enabled: true,
              limit: 3,
            }}
            columns={[
              {
                id: 'title',
                name: 'Title',
              },
              {
                id: 'price',
                name: 'Price',
              },
              {
                id: 'stock',
                name: 'Stock',
              },
              {
                id: 'sold',
                name: 'Sold',
              },
              {
                id: '_id',
                name: 'Edit',
                sort: {
                  enabled: false,
                },
                formatter: (_cell, row) => {
                  return h(
                    'button',
                    {
                      className:
                        'py-2 px-4 border rounded-md text-white bg-orange-500 hover:bg-orange-600',
                      onClick: () => {
                        // console.log(row.cells)
                        editProduct(row.cells[4].data.toString())
                      },
                    },
                    'Edit'
                  )
                },
              },
              {
                id: '_id',
                name: 'Delete',
                sort: {
                  enabled: false,
                },
                formatter: (_cell, row) => {
                  return h(
                    'button',
                    {
                      className:
                        'py-2 px-4 border rounded-md text-white bg-red-600 hover:bg-red-700',
                      onClick: () => {
                        // console.log(row.cells)
                        deleteProduct(row.cells[5].data.toString())
                      },
                    },
                    'Delete'
                  )
                },
              },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
