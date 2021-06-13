import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FileRejection, useDropzone, FileError } from 'react-dropzone'

export interface ImagePreview extends File {
  preview?: string
}

interface Props {
  images: ImagePreview[]
  setImages: Dispatch<SetStateAction<ImagePreview[]>>
}

export default function Dropzone({ images, setImages }: Props): JSX.Element {
  const [errors, setErrors] = useState<FileError[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
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
      className="box-border inline-flex w-32 h-32 p-2 mb-2 mr-2 border rounded-md cursor-pointer hover:bg-red-500"
      key={image.name}
      onClick={() => removeImage(image.name)}
    >
      <div className="flex min-w-0 overflow-hidden">
        <img
          className="block w-auto h-full"
          src={image.preview}
          alt={image.name}
        />
      </div>
    </div>
  ))

  return (
    <section className="container px-3 py-2 mt-1 border border-orange-200 border-dashed rounded-md shadow-sm form-input">
      <div
        {...getRootProps({
          className:
            'dropzone bg-orange-200 py-4 rounded-md cursor-pointer hover:shadow-md',
        })}
      >
        <input {...getInputProps()} />
        <p className="text-sm italic font-bold text-center text-orange-800">
          Drag and drop some images here, or
        </p>
        <p className="text-sm italic font-bold text-center text-orange-800">
          Click to select images
        </p>
        <p className="text-xs italic text-center text-orange-800">
          Click on the image to remove it
        </p>
      </div>
      <aside className="flex flex-wrap mt-4">{thumbs}</aside>

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
