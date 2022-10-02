import { AdminPanelSettings, Delete, Edit, Person } from '@mui/icons-material'
import { Box, Chip } from '@mui/material'
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridSelectionModel,
} from '@mui/x-data-grid'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { deleteAdminUser } from 'services/admin/users'
import { useSWRConfig } from 'swr'
import { IUser, IUsersProps, UserRole } from 'types/User'

const MAdminTableUser: FC<IUsersProps> = ({ users }) => {
  //#region GENERAL
  const { push } = useRouter()
  const { mutate } = useSWRConfig()

  const editUser = (_id: string): Promise<boolean> =>
    push(`/admin/users/${_id}`, `/admin/users/${_id}`)

  const deleteUser = async (_id: string): Promise<void> => {
    try {
      // ask for certainty
      const agree = confirm('Are you sure you want to delete this?')
      if (!agree) {
        return
      }

      // call admin users service
      await deleteAdminUser(_id)

      // trigger a revalidation (refetch) to make sure our local data is correct
      await mutate('/admin/users')
      toast.info('User deleted')
    } catch (err) {
      console.error(err)
      toast.error(err.data.message)
    }
  }
  //#endregion

  // #region TABLE
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [pageSize, setPageSize] = useState<number>(5)

  const columns: GridColumns<IUser> = [
    { headerName: 'Name', field: 'name', width: 200 },
    { headerName: 'Email', field: 'email', width: 200 },
    {
      headerName: 'Role',
      field: 'role',
      width: 150,
      renderCell: (params: GridRenderCellParams<UserRole>) => (
        <Box display="flex" alignItems="center">
          {params.value === UserRole.ADMIN ? (
            <Chip icon={<AdminPanelSettings />} label="Admin" />
          ) : (
            <Chip icon={<Person />} label="User" />
          )}
        </Box>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) =>
        params.row.role === UserRole.ADMIN
          ? []
          : [
              <GridActionsCellItem
                key={params.id}
                icon={<Edit />}
                label="Edit"
                onClick={() => editUser(params.id as string)}
              />,
              <GridActionsCellItem
                key={params.id}
                icon={<Delete />}
                label="Delete"
                onClick={() => deleteUser(params.id as string)}
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
      rows={users}
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

export default MAdminTableUser
