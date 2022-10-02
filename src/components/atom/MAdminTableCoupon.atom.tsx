import { Delete, Edit } from '@mui/icons-material'
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridSelectionModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { deleteAdminCoupon } from 'services/admin/coupons'
import { useSWRConfig } from 'swr'
import { ICoupon, ICouponsProps } from 'types/Coupon'
import generateRupiah from 'utils/generateRupiah'

const MAdminTableCoupon: FC<ICouponsProps> = ({ coupons }) => {
  //#region GENERAL
  const { push } = useRouter()
  const { mutate } = useSWRConfig()

  const editCoupon = (_id: string): Promise<boolean> =>
    push(`/admin/coupons/${_id}`, `/admin/coupons/${_id}`)

  const deleteCoupon = async (_id: string): Promise<void> => {
    try {
      // ask for certainty
      const agree = confirm('Are you sure you want to delete this?')
      if (!agree) {
        return
      }

      // call admin coupons service
      await deleteAdminCoupon(_id)

      // trigger a revalidation (refetch) to make sure our local data is correct
      await mutate('/admin/coupons')
      toast.info('Coupon deleted')
    } catch (err) {
      console.error(err)
      toast.error(err.data.message)
    }
  }
  //#endregion

  // #region TABLE
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = useState<number>(5)

  const columns: GridColumns<ICoupon> = [
    { headerName: 'Code', field: 'code', width: 200 },
    {
      headerName: 'Valid Until',
      field: 'validUntil',
      width: 200,
      valueFormatter: (params: GridValueFormatterParams<number>) =>
        dayjs(params.value).format('DD MMM YYYY, HH:mm'),
    },
    {
      headerName: 'Discount',
      field: 'discount',
      type: 'number',
      width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) =>
        params.value < 1 ? `${params.value}%` : generateRupiah(params.value),
    },
    {
      headerName: 'Min Transaction',
      field: 'minTransaction',
      type: 'number',
      width: 200,
      valueFormatter: (params: GridValueFormatterParams<number>) =>
        generateRupiah(params.value),
    },

    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<Edit />}
          label="Edit"
          onClick={() => editCoupon(params.id as string)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteCoupon(params.id as string)}
        />,
      ],
    },
  ]
  // #endregion

  return (
    <DataGrid
      sx={{
        background: 'white',
        borderRadius: '0.375rem',
      }}
      autoHeight
      rows={coupons}
      columns={columns}
      getRowId={(row) => row._id}
      checkboxSelection
      selectionModel={selectionModel}
      onSelectionModelChange={(newSelectionModel) =>
        setSelectionModel(newSelectionModel)
      }
      pagination
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 15, 25, 50]}
    />
  )
}

export default MAdminTableCoupon
