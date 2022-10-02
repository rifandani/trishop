import { CLOUDINARY_URL } from 'config/constants.config'
import { FormikHelpers } from 'formik'
import useIsomorphicLayoutEffect from 'hooks/useIsomorphicLayoutEffect'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { deleteAdminCloudinaryImages } from 'services/admin/cloudinary/resources/image'
import { postAdminProduct, putAdminProduct } from 'services/admin/products'
import { httpPost } from 'services/http'
import { ImagePreview } from 'types'
import { IProduct, TImage } from 'types/Product'
import generateImageFile from 'utils/generateImageFile.util'
import { TAddProductSchema } from 'yup/schema'

// #region INTERFACES
type TOnAddOrEditProductParams = {
  _productId: string
  _formikValues: TAddProductSchema
}

type TUseAdminProductFormViewModelParams = {
  product: IProduct | undefined
}
// #endregion

const useAdminProductFormViewModel = ({
  product,
}: TUseAdminProductFormViewModelParams) => {
  const { push } = useRouter()

  //#region VALUES
  const productId = product ? product._id : ''

  const [images, setImages] = useState<ImagePreview[]>([])

  const initialValues: TAddProductSchema = {
    title: product ? product.title : '',
    price: product ? product.price : 1,
    stock: product ? product.stock : 1,
    desc: product ? product.desc : '',
    labels: product ? product.labels : [],
  }

  //#endregion

  //#region HANDLERS
  const handleBackToDashboard = () => push('/admin/dashboard')

  const onAddOrEditProduct = async ({
    _productId,
    _formikValues,
  }: TOnAddOrEditProductParams) => {
    if (_productId) {
      // delete all images in cloudinary first
      const public_ids = product.images.map((image) => image.publicId)
      await deleteAdminCloudinaryImages(public_ids)
    }

    const newImages: TImage[] = []

    // upload photos to cloudinary first
    for (let i = 0; i < images.length; i++) {
      // for unauthenticated requests
      const formData = new FormData()
      formData.append('file', images[i])
      formData.append('upload_preset', 'unsigned_preset')

      // POST image to cloudinary
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
        if (_productId) {
          await putAdminProduct(productId, {
            images: newImages, // data from cloudinary secure_url
            title: _formikValues.title,
            stock: _formikValues.stock,
            price: _formikValues.price,
            desc: _formikValues.desc,
            labels: _formikValues.labels,
          })
        } else {
          await postAdminProduct({
            images: newImages, // data from cloudinary secure_url
            title: _formikValues.title,
            stock: _formikValues.stock,
            price: _formikValues.price,
            desc: _formikValues.desc,
            labels: _formikValues.labels,
          })
        }

        // success
        await push('/admin/dashboard')
        toast.success(`Product ${_productId ? 'updated' : 'created'}`)
      }
    }
  }

  const handleSubmit = async (
    values: TAddProductSchema,
    actions: FormikHelpers<TAddProductSchema>
  ) => {
    // if there is no uploaded photos
    if (images.length < 1) {
      toast.warning('Please upload some images first')
      actions.setSubmitting(false) // finish formik cycle
      return
    }

    try {
      await onAddOrEditProduct({
        _productId: productId,
        _formikValues: values,
      })
    } catch (err) {
      console.error(err)
      toast.error(err?.data?.message || err.message)
    } finally {
      actions.setSubmitting(false) // finish formik cycle
    }
  }
  //#endregion

  useIsomorphicLayoutEffect(() => {
    if (!product) return

    // generate images that comes from cloudinary and convert it to `ImagePreview`
    const generateImages = async () => {
      const generatedImages: ImagePreview[] = []

      for (let i = 0; i < product.images.length; i++) {
        const _image = product.images[i]

        const imageFile = await generateImageFile(_image)

        generatedImages.push(
          // don't use destructure on `File` object
          Object.assign(imageFile, {
            preview: _image.imageUrl,
          })
        )
      }

      setImages(generatedImages)
    }

    generateImages()
  }, [])

  return {
    productId,
    initialValues,
    images,
    setImages,
    handleBackToDashboard,
    handleSubmit,
  }
}

export type TUseAdminProductFormViewModel = ReturnType<
  typeof useAdminProductFormViewModel
>
export default useAdminProductFormViewModel
