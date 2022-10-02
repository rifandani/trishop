import { Delete, Edit } from '@mui/icons-material'
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridSelectionModel,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { deleteAdminProduct } from 'services/admin/products'
import { useSWRConfig } from 'swr'
import { IProduct, IProductsProps } from 'types/Product'
import generateRupiah from 'utils/generateRupiah'

const MAdminTableProduct: FC<IProductsProps> = ({ products }) => {
  //#region GENERAL
  const { push } = useRouter()
  const { mutate } = useSWRConfig()

  const editProduct = (_id: string): Promise<boolean> =>
    push(`/admin/products/${_id}`, `/admin/products/${_id}`)

  const deleteProduct = async (_id: string): Promise<void> => {
    try {
      // ask for certainty
      const agree = confirm('Are you sure you want to delete this?')
      if (!agree) {
        return
      }

      // call admin products service
      await deleteAdminProduct(_id)

      // trigger a revalidation (refetch) to make sure our local data is correct
      await mutate('/admin/products')
      toast.info('Product deleted')
    } catch (err) {
      console.error(err)
      toast.error(err.data.message)
    }
  }
  //#endregion

  // #region TABLE
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = useState<number>(5)

  const columns: GridColumns<IProduct> = [
    { headerName: 'Title', field: 'title', width: 250 },
    {
      headerName: 'Sold',
      field: 'sold',
      type: 'number',
      width: 100,
    },
    {
      headerName: 'Stock',
      field: 'stock',
      type: 'number',
      width: 100,
    },
    {
      headerName: 'Price',
      field: 'price',
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
          onClick={() => editProduct(params.id as string)}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteProduct(params.id as string)}
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
      rows={products}
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

export default MAdminTableProduct
