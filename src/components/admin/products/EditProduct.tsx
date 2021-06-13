import Axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FieldArray,
} from 'formik'
// files
import Dropzone, { ImagePreview } from '../Dropzone'
import { Product } from 'contexts/CartReducer'
import { addProductSchema, TAddProductSchema } from 'yup/schema'
import { TImage } from 'types/Product'

interface Props {
  product: Product
}

const CLOUDINARY_URL =
  'https://api.cloudinary.com/v1_1/ipandani2505/image/upload'

export default function EditProduct({ product }: Props): JSX.Element {
  const {
    _id,
    title,
    stock,
    price,
    desc,
    labels,
    createdAt,
    updatedAt,
    images,
  } = product
  // hooks
  const { push } = useRouter()
  const [photos, setPhotos] = useState<ImagePreview[]>([])

  const initialValues: TAddProductSchema = {
    title: title || '',
    price: price || 1,
    stock: stock || 1,
    desc: desc || '',
    labels: labels || [],
  }

  const onSubmit = async (
    values: TAddProductSchema,
    actions: FormikHelpers<TAddProductSchema>
  ): Promise<void> => {
    try {
      // if there is no uploaded photos
      if (photos.length < 1) {
        toast.warning('Please upload some images first')
        actions.setSubmitting(false) // finish formik cycle
        return
      }

      // delete all images in cloudinary first
      const public_ids = product.images.map((image) => image.publicId)
      await Axios.delete(
        `/admin/cloudinary/resources/image?public_ids=${public_ids.join(',')}`
      )

      const newPhotos: TImage[] = []

      // upload photos to cloudinary first
      for (let i = 0; i < photos.length; i++) {
        // for unauthenticated requests
        const formData = new FormData()
        formData.append('file', photos[i])
        formData.append('upload_preset', 'unsigned_preset')

        // POST image to cloudinary
        const res = await Axios.post(CLOUDINARY_URL, formData)

        // push to newPhotos array
        const publicId: string = res.data.public_id
        const tags: string[] = res.data.tags
        const secureUrl: string = res.data.secure_url
        const secureUrlArray = secureUrl.split('/')
        const imageName = secureUrlArray[secureUrlArray.length - 1]
        newPhotos.push({
          imageName,
          publicId,
          tags,
          imageUrl: secureUrl,
        })

        // save ke MONGODB, hanya ketika sudah upload semua image
        if (i === images.length - 1 && newPhotos.length === images.length) {
          const newProduct = {
            images: newPhotos, // data from cloudinary secure_url
            title: values.title,
            stock: values.stock,
            price: values.price,
            desc: values.desc,
            labels: values.labels,
          }

          // PUT /admin/products
          await Axios.put(`/admin/products/${_id}`, newProduct)

          // success
          toast.info('Product updated')
          await push('/admin/dashboard')
          actions.setSubmitting(false) // finish formik cycle
        }
      }
    } catch (err) {
      console.error(err)
      toast.error(err.data.message)
      actions.setSubmitting(false) // finish formik cycle
    }
  }

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

              <p className="mt-3 text-sm leading-5 text-orange-800">
                Created At: {createdAt}
                <br />
                Updated At: {updatedAt}
              </p>

              <div className="flex flex-wrap mt-3 space-x-3">
                {images.map((image) => (
                  <img
                    className="object-cover w-20 h-20"
                    key={image.imageUrl}
                    src={image.imageUrl}
                    alt={image.imageName}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            {/* START FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={addProductSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form className="">
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

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            placeholder="Product title..."
                            name="title"
                            type="text"
                            autoFocus
                          />

                          <ErrorMessage
                            className="error-message"
                            name="title"
                            component="span"
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

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            name="price"
                            type="number"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="price"
                            component="span"
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

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            name="stock"
                            type="number"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="stock"
                            component="span"
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

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            placeholder="Product description..."
                            name="desc"
                            type="text"
                            as="textarea"
                            rows="3"
                          />

                          <ErrorMessage
                            className="error-message"
                            name="desc"
                            component="span"
                          />
                        </div>

                        {/* labels */}
                        <FieldArray name="labels">
                          {({ remove, push }) => (
                            <div className="flex-col col-span-6 space-y-2 sm:col-span-4">
                              {values.labels.length > 0 &&
                                values.labels.map((_, i) => (
                                  <div key={i} className="flex-col space-y-2">
                                    <label
                                      htmlFor={`labels.${i}`}
                                      className="block text-sm font-medium leading-5 text-gray-700"
                                    >
                                      Label #{i + 1}
                                    </label>

                                    <div className="flex space-x-1">
                                      <Field
                                        className="block w-full px-3 py-2 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                                        placeholder="Product label..."
                                        type="text"
                                        name={`labels.${i}`}
                                      />

                                      <button
                                        className="px-3 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:border-white active:bg-red-600"
                                        type="button"
                                        onClick={() => {
                                          remove(i)
                                        }}
                                      >
                                        X
                                      </button>
                                    </div>

                                    {/* <ErrorMessage
                                      className="error-message"
                                      component="span"
                                      name={`labels.${i}`}
                                    /> */}
                                  </div>
                                ))}

                              {values.labels.length >= 3 ? null : (
                                <button
                                  className="px-3 py-2 mt-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:border-white active:bg-orange-600"
                                  type="button"
                                  onClick={() => push('')}
                                >
                                  Add more labels
                                </button>
                              )}

                              <ErrorMessage
                                className="error-message"
                                component="span"
                                name="labels"
                              />
                            </div>
                          )}
                        </FieldArray>

                        {/* images */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="images"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Images
                          </label>

                          <Dropzone images={photos} setImages={setPhotos} />

                          <ErrorMessage
                            className="error-message"
                            name="images"
                            component="span"
                          />
                        </div>
                      </div>
                    </div>

                    {/* submit button */}
                    <div className="px-4 py-3 text-right bg-green-100 sm:px-6">
                      <button
                        className="px-6 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-500 border border-transparent rounded-md shadow-sm disabled:opacity-50 hover:bg-green-600 focus:outline-none focus:border-white active:bg-green-600"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Loading...' : 'Update Product'}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            {/* END FORM */}
          </div>
        </div>
      </section>
    </main>
  )
}
