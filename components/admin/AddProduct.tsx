import Axios from 'axios';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
// files
import Dropzone from './Dropzone';
import { options } from '../../utils/config';
import { storage } from '../../firebase/config';

export default function AddProduct() {
  const { push } = useRouter();

  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('0'); // parse to INT later
  const [stock, setStock] = useState<string>('1'); // parse to INT later
  const [desc, setDesc] = useState<string>(''); // textarea
  const [label1, setLabel1] = useState<string>('');
  const [label2, setLabel2] = useState<string>('');
  const [label3, setLabel3] = useState<string>('');
  const [images, setImages] = useState<any>([]); // images FIRESTORAGE

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const labels = [label1, label2, label3].filter((label) => !!label); // labels cleaning

    let imagesMongo: any = []; // images MONGODB

    for (let i = 0; i < images.length; i++) {
      // storage ref
      const storageRef = storage.ref(`images/products/${images[i].name}`);

      // save to STORAGE
      await storageRef.put(images[i]);

      // get imageUrl and save it to imagesMongo variable
      const url = await storageRef.getDownloadURL();
      url &&
        imagesMongo.push({
          imageName: images[i].name,
          imageUrl: url,
        });

      // save ke MONGODB, hanya ketika sudah upload semua image
      if (i === images.length - 1 && url) {
        Axios.post('/admin/products', {
          title,
          price,
          stock,
          desc,
          labels,
          images: imagesMongo,
        })
          .then(() => {
            toast.success('Product created 👍', {
              ...options,
              position: 'bottom-left',
            });

            push('/admin/dashboard');
          })
          .catch((err) =>
            toast.error(err.message, {
              ...options,
              position: 'bottom-left',
            }),
          );
      }
    }
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      {/* Add New User */}
      <section className="p-6 mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add New Product
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Choose min 1 and max 3 for labels and images.
                <br />
                Use a unique name for each image.
              </p>
            </div>
          </div>

          {/* form */}
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={onSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {/* title */}
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
                    Add New
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
