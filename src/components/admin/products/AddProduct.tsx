import { CLOUDINARY_URL } from 'config/constants'
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikHelpers,
} from 'formik'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { postAdminProduct } from 'services/admin/products'
import { httpPost } from 'services/http'
import { TImage } from 'types/Product'
import { addProductSchema, TAddProductSchema } from 'yup/schema'
import Dropzone, { ImagePreview } from '../Dropzone'

const AddProduct: FC = () => {
  //#region GENERAL
  const { push } = useRouter()
  //#endregion

  //#region FORM
  const [images, setImages] = useState<ImagePreview[]>([])

  const initialValues: TAddProductSchema = {
    title: '',
    price: 1,
    stock: 1,
    desc: '',
    labels: [],
  }

  const onSubmit = async (
    values: TAddProductSchema,
    actions: FormikHelpers<TAddProductSchema>
  ): Promise<void> => {
    try {
      // if there is no uploaded images
      if (images.length < 1) {
        toast.warning('Please upload some images first')
        actions.setSubmitting(false) // finish formik cycle
        return
      }

      const newImages: TImage[] = []

      // upload images to cloudinary first
      for (let i = 0; i < images.length; i++) {
        // for unauthenticated requests
        const formData = new FormData()
        formData.append('file', images[i])
        formData.append('upload_preset', 'unsigned_preset')

        // POST to cloudinary
        const res = await httpPost(CLOUDINARY_URL, formData)

        // push to newImages array
        const publicId: string = res.data.public_id
        const tags: string[] = res.data.tags
        const secureUrl: string = res.data.secure_url
        const secureUrlArray = secureUrl.split('/')
        const imageName = secureUrlArray[secureUrlArray.length - 1]
        newImages.push({
          imageName,
          publicId,
          tags,
          imageUrl: secureUrl,
        })

        // save ke MONGODB, hanya ketika sudah upload semua image
        if (i === images.length - 1 && newImages.length === images.length) {
          const newProduct = {
            images: newImages, // data from cloudinary secure_url
            title: values.title,
            stock: values.stock,
            price: values.price,
            desc: values.desc,
            labels: values.labels,
          }

          // call admin products services
          await postAdminProduct(newProduct)

          // success
          await push('/admin/dashboard')
          toast.success('Product created')
        }
      }
    } catch (err) {
      console.error(err)
      toast.error(err.data.message)
    } finally {
      actions.setSubmitting(false) // finish formik cycle
    }
  }
  //#endregion

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200">
      {/* Add New User */}
      <section className="mt-10 p-6 sm:mt-0">
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

          <div className="mt-5 md:col-span-2 md:mt-0">
            {/* START FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={addProductSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form className="">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        {/* title */}
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-5 text-gray-700"
                          >
                            Title
                          </label>

                          <Field
                            className="focus:shadow-outline-blue form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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
                            className="focus:shadow-outline-blue form-select mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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
                            className="focus:shadow-outline-blue form-select mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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
                            className="focus:shadow-outline-blue form-input mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
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
                            <div className="col-span-6 flex-col space-y-2 sm:col-span-4">
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
                                        className="focus:shadow-outline-blue form-input block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm sm:leading-5"
                                        placeholder="Product label..."
                                        type="text"
                                        name={`labels.${i}`}
                                      />

                                      <button
                                        className="rounded-md border border-transparent bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-red-600 focus:border-white focus:outline-none active:bg-red-600"
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
                                  className="mt-2 rounded-md border border-transparent bg-orange-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-orange-600 focus:border-white focus:outline-none active:bg-orange-600"
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

                          <Dropzone images={images} setImages={setImages} />

                          <ErrorMessage
                            className="error-message"
                            name="images"
                            component="span"
                          />
                        </div>
                      </div>
                    </div>

                    {/* submit button */}
                    <div className="bg-green-100 px-4 py-3 text-right sm:px-6">
                      <button
                        className="rounded-md border border-transparent bg-green-500 px-6 py-2 text-sm font-medium leading-5 text-white shadow-sm transition duration-150 ease-in-out hover:bg-green-600 focus:border-white focus:outline-none active:bg-green-600 disabled:opacity-50"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Loading' : 'Add New Product'}
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

export default AddProduct