import { h } from 'gridjs'
import { Grid } from 'gridjs-react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { deleteAdminUser } from 'services/admin/users'
import { useSWRConfig } from 'swr'
import { IUsersProps } from 'types/User'

const TableUsers: FC<IUsersProps> = ({ users }) => {
  //#region GENERAL
  const { push } = useRouter()
  const { mutate } = useSWRConfig()
  //#endregion

  //#region HANDLE USER ACTIONS
  const editUser = (_id: string): Promise<boolean> =>
    push(`/admin/users/${_id}`)

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

  return (
    <section className="mt-8 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="min-w-full overflow-hidden sm:rounded-lg ">
          {
            <Grid
              data={users as any}
              search={true}
              sort={true}
              pagination={{
                enabled: true,
                limit: 3,
              }}
              columns={[
                {
                  id: 'name',
                  name: 'Name',
                },
                {
                  id: 'email',
                  name: 'Email',
                },
                {
                  id: 'role',
                  name: 'Role',
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
                          editUser(row?.cells[3]?.data.toString()) // cells[3] === user._id
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
                          deleteUser(row?.cells[4]?.data.toString()) // cells[4] === user._id
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

export default TableUsers
