import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Axios from 'axios';
// files
import { options } from '../../utils/config';
import Dropzone from './Dropzone';
import { storage } from '../../firebase/config';

const URL = 'http://localhost:3000/api/admin/product';

export default function EditProduct({ product }: any) {
  const router = useRouter();

  const [title, setTitle] = useState<string>(product?.title || '');
  const [stock, setStock] = useState<string>(product?.stock + '' || '1'); // parse to INT later
  const [desc, setDesc] = useState<string>(product?.desc || ''); // textarea
  const [label1, setLabel1] = useState<string>(product?.labels[0] || '');
  const [label2, setLabel2] = useState<string>(product?.labels[1] || '');
  const [label3, setLabel3] = useState<string>(product?.labels[2] || '');
  const [images, setImages] = useState<any>([]); // images FIRESTORAGE
  const [oldImages] = useState<any>(product?.images || []); // old images FIRESTORAGE
  const [createdAt] = useState<string>(product?.createdAt || '');
  const [updatedAt] = useState<string>(product?.updatedAt || '');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const labels = [label1, label2, label3].filter((label: any) => !!label); // labels cleansing

    let imagesMongo: any = []; // images MONGODB

    // delete images yg lama
    for (let i = 0; i < oldImages.length; i++) {
      storage
        .ref(`images/products/${oldImages[i].imageName}`) // .imageName karena object image dari MONGODB
        .delete()
        .then((success) => console.log(success))
        .catch((err) => console.error(err));
    }

    // simpan ke firebase
    for (let i = 0; i < images.length; i++) {
      // storage Ref
      const storageRef = storage.ref(`images/products/${images[i].name}`); // .name karena object image dari DropZone

      storageRef.put(images[i]).on(
        'state_changed',
        (snap: any) => {
          // track the upload progress
          const percentage = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100,
          );
          console.log(percentage + '% transfer');
        },
        (err: any) => {
          if (err) console.error('firebase storage upload error');
        },
        async () => {
          try {
            // get the public download img url
            const url = await storageRef.getDownloadURL();

            // push ke array imagesMongo
            url &&
              imagesMongo.push({
                imageName: images[i].name,
                imageUrl: url,
              });

            // save ke MONGODB, hanya ketika sudah upload semua image
            if (url && i === images.length - 1) {
              // PUT req
              Axios.put(`${URL}s`, {
                _id: product._id,
                title,
                stock,
                desc,
                labels,
                images: imagesMongo,
              })
                .then(() => {
                  toast.success('Product updated 👍', {
                    ...options,
                    position: 'bottom-left',
                  });

                  router.push('/admin/dashboard', '/admin/dashboard'); // push back to dashboard
                })
                .catch((err) =>
                  toast.error(err.message, {
                    ...options,
                    position: 'bottom-left',
                  }),
                );
            }
          } catch (err) {
            console.error(err);
          }
        },
      );
    }
  }

  if (!product) return <h1>Please, input valid product _id</h1>;

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      {/* Edit Product */}
      <section className="p-6 mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Edit Product
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Choose min 1 and max 3 for labels and images.
                <br />
                Use a unique name for each image.
              </p>
              <p className="mt-3 text-sm leading-5 text-indigo-600">
                Created At: {createdAt}
                <br />
                Updated At: {updatedAt}
              </p>
            </div>
          </div>

          {/* form */}
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={onSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {/* Title */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        id="title"
                        minLength={3}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>

                    {/* stock */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="stock"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Stock
                      </label>
                      <input
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        id="stock"
                        type="number"
                        min={1}
                        required
                        onChange={(e) => setStock(e.target.value)}
                        value={stock}
                      />
                    </div>

                    {/* description */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="desc"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        id="desc"
                        required
                        onChange={(e) => setDesc(e.target.value)}
                        value={desc}
                      />
                    </div>

                    {/* labels */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="labels"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Labels
                      </label>
                      <div className="flex space-x-1">
                        <input
                          className="mt-1 form-input w-1/3 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          id="label1"
                          minLength={3}
                          required
                          onChange={(e) => setLabel1(e.target.value)}
                          value={label1}
                        />
                        <input
                          className="mt-1 form-input w-1/3 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          id="label2"
                          minLength={3}
                          onChange={(e) => setLabel2(e.target.value)}
                          value={label2}
                        />
                        <input
                          className="mt-1 form-input w-1/3 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          id="label3"
                          minLength={3}
                          onChange={(e) => setLabel3(e.target.value)}
                          value={label3}
                        />
                      </div>
                    </div>

                    {/* images */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="images"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Upload Images
                      </label>

                      <Dropzone images={images} setImages={setImages} />
                    </div>
                  </div>
                </div>

                {/* button */}
                <div className="px-4 py-3 bg-green-100 text-right sm:px-6">
                  <button
                    type="submit"
                    className="py-2 px-6 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-500 shadow-sm hover:bg-green-600 focus:outline-none focus:border-white active:bg-green-600 transition duration-150 ease-in-out"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
