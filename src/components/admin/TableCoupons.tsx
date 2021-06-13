import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import { Grid } from 'gridjs-react'
import { h } from 'gridjs'
import Axios from 'axios'
import dayjs from 'dayjs'
// files
import useGetCoupons from 'hooks/useGetCoupons'
import generateRupiah from 'utils/generateRupiah'

export default function TableCoupons(): JSX.Element {
  // hooks
  const { push } = useRouter()
  const { coupons } = useGetCoupons()

  const editCoupon = (_id: string): Promise<boolean> =>
    push(`/admin/coupons/${_id}`)

  const deleteCoupon = async (_id: string): Promise<void> => {
    try {
      // ask for certainty
      const agree = confirm('Are you sure you want to delete this?')
      if (!agree) {
        return
      }

      // DELETE /admin/coupons/:_id
      await Axios.delete(`/admin/coupons/${_id}`)

      // trigger a revalidation (refetch) to make sure our local data is correct
      await mutate('/admin/coupons')
      toast.info('Coupon deleted')
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
            data={coupons ? coupons : []}
            search={true}
            sort={true}
            pagination={{
              enabled: true,
              limit: 3,
            }}
            columns={[
              {
                id: 'code',
                name: 'Code',
              },
              {
                id: 'discount',
                name: 'Discount',
                formatter: (cell) =>
                  cell < 1 ? `${cell}%` : generateRupiah(+cell.toString()),
              },
              {
                id: 'minTransaction',
                name: 'Min Transaction',
                formatter: (cell) => generateRupiah(+cell.toString()),
              },
              {
                id: 'validUntil',
                name: 'Valid Until',
                formatter: (cell) =>
                  dayjs(+cell.toString()).format('MMMM D, YYYY h:mm A'),
                sort: {
                  compare: (a, b) => {
                    const c = +a.toString()
                    const d = +b.toString()

                    if (c > d) {
                      return 1
                    } else if (d > c) {
                      return -1
                    } else {
                      return 0
                    }
                  },
                },
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
                        // console.log('row.cells => ', row.cells)
                        editCoupon(row?.cells[4]?.data.toString()) // cells[4] === coupon._id
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
                        // console.log('row.cells => ', row.cells)
                        deleteCoupon(row?.cells[5]?.data.toString()) // cells[5] === coupon._id
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
