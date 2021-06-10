import Axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
import useScript from 'hooks/useScript'
import { productApiSchema, TProductApiSchema } from 'yup/apiSchema'

export default function AddProductWithCloudinaryWidget() {
  // hooks
  const { push } = useRouter()
  const status = useScript('https://upload-widget.cloudinary.com/global/all.js') // call cloudinary widget
  const [widget, setWidget] = useState<any>(null)

  const initialValues: TProductApiSchema = {
    title: '',
    price: 1,
    stock: 1,
    desc: '',
    labels: [],
    images: [],
  }

  // useEffect(() => {
  //   if (status === 'ready') {
  //     // @ts-ignore
  //     const myWidget = cloudinary.createUploadWidget()
  //     setWidget(myWidget)
  //   }

  //   return () => {
  //     // widget.destroy({ removeThumbnails: true })
  //   }
  // }, [status])

  const onSubmit = async (
    values: TProductApiSchema,
    actions: FormikHelpers<TProductApiSchema>
  ): Promise<void> => {
    try {
      const data = {
        title: values.title,
        stock: values.stock,
        price: values.price,
        desc: values.desc,
        labels: values.labels,
        images: values.images,
      }
      console.log(
        '🚀 ~ file: AddProduct.tsx ~ line 104 ~ AddProduct ~ data',
        data
      )

      // delete preview in image
      // const imagesWithNoPreview = images.map((image) => {
      //   delete image.preview
      //   return image
      // })

      // const labels = [label1, label2, label3].filter((label) => !!label) // labels cleaning

      // let imagesMongo: any = [] // images MONGODB

      // for (let i = 0; i < images.length; i++) {
      //   // storage ref
      //   const storageRef = storage.ref(`images/products/${images[i].name}`)

      //   // save to STORAGE
      //   await storageRef.put(images[i])

      //   // get imageUrl and save it to imagesMongo variable
      //   const url = await storageRef.getDownloadURL()
      //   url &&
      //     imagesMongo.push({
      //       imageName: images[i].name,
      //       imageUrl: url,
      //     })

      //   // save ke MONGODB, hanya ketika sudah upload semua image
      //   if (i === images.length - 1 && url) {
      //     Axios.post('/admin/products', {
      //       title,
      //       price,
      //       stock,
      //       desc,
      //       labels,
      //       images: imagesMongo,
      //     })
      //       .then(() => {
      //         toast.success('Product created 👍')

      //         push('/admin/dashboard')
      //       })
      //       .catch((err) => toast.error(err.message))
      //   }
      // }
      actions.setSubmitting(false) // finish formik cycle
    } catch (err) {
      console.error(err)
      toast.error(err.data.message)
      actions.setSubmitting(false) // finish formik cycle
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

          <div className="mt-5 md:mt-0 md:col-span-2">
            {/* START FORM */}
            <Formik
              initialValues={initialValues}
              validationSchema={productApiSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, values, setValues }) => (
                <Form className="">
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

                          <Field
                            className="block w-full px-3 py-2 mt-1 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm form-input focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                            placeholder="Product title..."
                            name="title"
                            type="text"
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

                          <button
                            className="px-6 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:border-white active:bg-orange-600"
                            type="button"
                            onClick={() =>
                              // @ts-ignore
                              cloudinary.openUploadWidget(
                                {
                                  cloudName: 'ipandani2505',
                                  uploadPreset: 'unsigned_preset',
                                  folder: 'trishop/images/products',
                                  sources: ['local', 'url', 'camera'],
                                  defaultSource: 'local',
                                  resourceType: 'image',
                                  showAdvancedOptions: true,
                                  showCompletedButton: true,
                                  cropping: false,
                                  multiple: true,
                                  maxFiles: 3,
                                  maxImageFileSize: 2000000, // 2 MB
                                  styles: {
                                    palette: {
                                      window: '#F5F5F5',
                                      sourceBg: '#FFFFFF',
                                      windowBorder: '#90a0b3',
                                      tabIcon: '#0094c7',
                                      inactiveTabIcon: '#69778A',
                                      menuIcons: '#0094C7',
                                      link: '#53ad9d',
                                      action: '#8F5DA5',
                                      inProgress: '#0194c7',
                                      complete: '#53ad9d',
                                      error: '#c43737',
                                      textDark: '#000000',
                                      textLight: '#FFFFFF',
                                    },
                                    fonts: {
                                      default: null,
                                      "'Poppins', sans-serif": {
                                        url: 'https://fonts.googleapis.com/css?family=Poppins',
                                        active: true,
                                      },
                                    },
                                  },
                                },
                                (error: any, result: any) => {
                                  if (error) {
                                    console.error(error)
                                  }
                                  if (
                                    !error &&
                                    result &&
                                    result.event === 'success'
                                  ) {
                                    console.log(
                                      'Done! Here is the image info: ',
                                      result.info
                                    ) // .bytes, existing, original_filename, path, secure_url, tags

                                    const pathArray = (
                                      result.info.path as string
                                    ).split('/')

                                    const imageName =
                                      pathArray[pathArray.length - 1]
                                    setValues({
                                      ...values,
                                      images: [
                                        ...values.images,
                                        {
                                          imageName,
                                          imageUrl: result.info.secure_url,
                                        },
                                      ],
                                    })
                                  }
                                  // if (!error && result && result.event === 'show-completed') {
                                  //   result.info.items.forEach((item: any) => {
                                  //     console.log('item => ', item) // .name , size
                                  //     console.log('item => ', item) // .name , size
                                  //     console.log(
                                  //       `show completed for item with id: ${item.uploadInfo.public_id}`
                                  //     )
                                  //   })
                                  // }
                                  // if (!error && result && result.event === 'close') {
                                  //   console.log('Closed! result =>: ', result)
                                  // }
                                }
                              )
                            }
                          >
                            Choose Images
                          </button>

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