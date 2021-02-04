import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Axios from 'axios';
// files
import { options } from '../../utils/config';
import Dropzone from './Dropzone';
import { storage } from '../../firebase/config';

const URL = '/admin/product';

export default function EditProduct({ product }: any) {
  const router = useRouter();

  const [title, setTitle] = useState<string>(product?.title || '');
  const [price, setPrice] = useState<string>(product?.price + '' || '0'); // parse to INT later
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
                price,
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
              <div className="overflow-hidden shadow sm:rounded-md">
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
                        className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        id="title"
                        minLength={3}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>

                    {/* price */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Price
                      </label>
                      <input
                        className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                        id="price"
                        type="number"
                        min={0}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
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
                        className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
                        className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
                          className="w-1/3 px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                          id="label1"
                          minLength={3}
                          required
                          onChange={(e) => setLabel1(e.target.value)}
                          value={label1}
                        />
                        <input
                          className="w-1/3 px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                          id="label2"
                          minLength={3}
                          onChange={(e) => setLabel2(e.target.value)}
                          value={label2}
                        />
                        <input
                          className="w-1/3 px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
                <div className="px-4 py-3 text-right bg-green-100 sm:px-6">
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:border-white active:bg-green-600"
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
