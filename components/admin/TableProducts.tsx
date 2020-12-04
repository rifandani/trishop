import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
// files
import useProducts from '../../hooks/useProducts';
import { options } from '../../utils/config';
import { storage } from '../../firebase/config';

const url = 'http://localhost:3000/api/admin/product';

export default function TableProducts() {
  const { push } = useRouter();
  const { products } = useProducts();

  async function editProduct(id: string) {
    await push(`product/${id}`);
  }

  async function deleteProduct(id: string) {
    try {
      // get specific product
      const res = await Axios.get(`${url}?_id=${id}`);
      const images = res?.data?.images;

      // ketika PROMISE dari AXIOS selesai, delete images lama in FIREBASE STORAGE
      images &&
        images.forEach(async (image: any, i: number) => {
          await storage.ref(`images/products/${image.imageName}`).delete();

          // delete product using API hanya ketika mencapai images yg terakhir
          if (i === images.length - 1) {
            await Axios.delete(`${url}s`, { data: { id } });

            await mutate(`${url}s`); // trigger a revalidation (refetch) to make sure our local data is correct

            // toast success
            toast.success('Product deleted ❌', {
              ...options,
              position: 'bottom-left',
            });
          }
        });
    } catch (err) {
      console.error(err);
      toast.error(err.message, { ...options, position: 'bottom-left' });
    }
  }

  return (
    <div className="flex flex-col mt-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="min-w-full overflow-hidden sm:rounded-lg ">
          <Grid
            data={products ? products : []}
            columns={[
              {
                name: 'ID',
                hidden: true,
              },
              'Title',
              'Stock',
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
                      onClick: () => editProduct(row.cells[0].data as string),
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
                      onClick: () => deleteProduct(row.cells[0].data as string),
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
