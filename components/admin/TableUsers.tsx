import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
// files
import useUsers from '../../hooks/useUsers';
import { options } from '../../utils/config';

const url = '/admin/user';

export default function TableUsers() {
  const { push } = useRouter();
  const { users } = useUsers();

  async function editUser(id: string) {
    await push(`/admin/user/${id}`);
  }

  async function deleteUser(email: string) {
    Axios.delete(`${url}s`, { data: { email } })
      .then(() =>
        toast.success('User deleted 👍', {
          ...options,
          position: 'bottom-left',
        }),
      )
      .catch((err) =>
        toast.error(err.message, { ...options, position: 'bottom-left' }),
      );

    // trigger a revalidation (refetch) to make sure our local data is correct
    await mutate(`${url}s`);
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
                    'Edit',
                  );
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
                      onClick: () => deleteUser(row?.cells[2]?.data as string),
                    },
                    'Delete',
                  );
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
  );
}
