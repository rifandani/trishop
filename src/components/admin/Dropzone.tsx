import Image from 'next/image'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { FileError, FileRejection, useDropzone } from 'react-dropzone'
import { ImagePreview } from 'types'

interface Props {
  images: ImagePreview[]
  setImages: Dispatch<SetStateAction<ImagePreview[]>>
}

const Dropzone: FC<Props> = ({ images, setImages }) => {
  const [errors, setErrors] = useState<FileError[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.png', '.jpeg', '.jpg', '.webp', '.svg'] },
    maxFiles: 3,
    maxSize: 2000000, // 2 MB
    onDrop: (acceptedImages: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const newErrors = fileRejections.map((rejects) => rejects.errors).flat()

        setErrors(newErrors)
      } else {
        setErrors([])
        setImages(
          acceptedImages.map((image) =>
            // + preview di property image object
            // bisa jga pake spread operator
            Object.assign(image, {
              preview: URL.createObjectURL(image),
            })
          )
        )
      }
    },
    onError: (err) => {
      console.error('Dropzone error', err)
    },
  })

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach((image) => URL.revokeObjectURL(image.preview))
    },
    [images]
  )

  const removeImage = (name: string) => {
    // find the index of the item
    // remove the item from array
    const validImageIndex = images.findIndex((image) => image.name === name)
    images.splice(validImageIndex, 1)

    // update images array
    setImages([...images])
  }

  // image thumbnail component
  const thumbs = images.map((image) => (
    <div
      className="mb-2 mr-2 box-border inline-flex h-32 w-32 cursor-pointer rounded-md border p-2 hover:bg-red-500"
      key={image.name}
      onClick={() => removeImage(image.name)}
    >
      <div className="relative flex h-full w-full min-w-0 overflow-hidden">
        <Image
          src={image.preview}
          alt={image.name}
          className="rounded-lg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
      </div>
    </div>
  ))

  return (
    <section className="container form-input mt-1 rounded-md border border-dashed border-orange-200 px-3 py-2 shadow-sm">
      <div
        {...getRootProps({
          className:
            'dropzone bg-orange-200 py-4 rounded-md cursor-pointer hover:shadow-md',
        })}
      >
        <input {...getInputProps()} />
        <p className="text-center text-sm font-bold italic text-orange-800">
          Drag and drop some images here, or
        </p>
        <p className="text-center text-sm font-bold italic text-orange-800">
          Click to select images
        </p>
        <p className="text-center text-xs italic text-orange-800">
          Click on the image to remove it
        </p>
      </div>
      <aside className="mt-4 flex flex-wrap">{thumbs}</aside>

      {errors.length > 0
        ? errors.map((err, i) => (
            <span key={i} className="error-message">
              {err.message}
            </span>
          ))
        : null}
    </section>
  )
}

export default Dropzone
