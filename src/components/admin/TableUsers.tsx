import { Grid } from 'gridjs-react'
import { h } from 'gridjs'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
// files
import useUsers from '../../hooks/useUsers'

const API_URL = '/admin/users'

export default function TableUsers() {
  const { push } = useRouter()
  const { users } = useUsers()

  async function editUser(id: string) {
    // TODO: url should be /users/:id
    await push(`/admin/user/${id}`)
  }

  async function deleteUser(id: string) {
    try {
      await Axios.delete(`${API_URL}?userId=${id}`)

      toast.success('User deleted 👍')
      // trigger a revalidation (refetch) to make sure our local data is correct
      await mutate(`${API_URL}`)
    } catch (err) {
      toast.error(err.message)
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col mt-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="min-w-full overflow-hidden sm:rounded-lg ">
          <Grid
            data={users ? users : []}
            columns={[
              {
                name: 'ID',
                hidden: true,
              },
              'Name',
              'Email',
              'Role',
              'Updated At',
              {
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
                      onClick: () => editUser(row?.cells[0]?.data as string),
                    },
                    'Edit'
                  )
                },
              },
              {
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
                      onClick: () => deleteUser(row?.cells[0]?.data as string), // cells[2] === email
                    },
                    'Delete'
                  )
                },
              },
            ]}
            search={true}
            sort={true}
            pagination={{
              enabled: true,
              limit: 3,
            }}
          />
        </div>
      </div>
    </div>
  )
}
