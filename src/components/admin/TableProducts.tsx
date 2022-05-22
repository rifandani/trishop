import { h } from 'gridjs'
import { Grid } from 'gridjs-react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { deleteAdminCloudinaryImages } from 'services/admin/cloudinary/resources/image'
import { deleteAdminProduct } from 'services/admin/products'
import { mutate } from 'swr'
import { IProductsProps } from 'types/Product'
import generateRupiah from 'utils/generateRupiah'

const TableProducts: FC<IProductsProps> = ({ products }) => {
  //#region GENERAL
  const { push } = useRouter()
  //#endregion

  //#region HANDLER PRODUCT ACTIONS
  const editProduct = (_id: string): Promise<boolean> =>
    push(`/admin/products/${_id}`)

  const deleteProduct = async (_id: string): Promise<void> => {
    try {
      // ask for certainty
      const agree = confirm('Are you sure you want to delete this?')
      if (!agree) {
        return
      }

      // get image.publicId
      const selectedProduct = products.find((product) => product._id === _id)
      const public_ids = selectedProduct.images.map((image) => image.publicId)

      // call admin cloudinary service
      await deleteAdminCloudinaryImages(public_ids)

      // call admin products service
      await deleteAdminProduct(_id)

      // trigger a revalidation (refetch) to make sure our local data is correct
      await mutate('/admin/products')
      toast.info('Product deleted')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }
  //#endregion

  return (
    <section className="mt-8 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="min-w-full overflow-hidden sm:rounded-lg ">
          {
            <Grid
              data={products as any}
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
                  formatter: (cell) => generateRupiah(+cell.toString()),
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
          }
        </div>
      </div>
    </section>
  )
}

export default TableProducts
