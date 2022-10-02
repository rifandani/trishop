import {
  Box,
  FormControl,
  FormHelperText,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ErrorCode, FileError, useDropzone } from 'react-dropzone'
import { ImagePreview } from 'types'

// #region INTERFACES
interface ImageItemProps {
  image: ImagePreview
  handleRemoveImage: () => void
}

interface MDropzoneFieldProps {
  images: ImagePreview[]
  setImages: Dispatch<SetStateAction<ImagePreview[]>>
}
// #endregion

// image thumbnail component
const ImageItem = ({ image, handleRemoveImage }: ImageItemProps) => {
  return (
    <Tooltip title="Click on the image to remove it" followCursor>
      <Box
        onClick={handleRemoveImage}
        sx={{
          padding: 2,
          marginRight: 2,
          height: '128px',
          width: '128px',
          cursor: 'pointer',
          display: 'inline-flex',
          boxSizing: 'border-box',
          borderRadius: 2,
          ':hover': {
            backgroundColor: (theme) => theme.palette.error.light,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Image
            src={image.preview}
            alt={image.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </Box>
      </Box>
    </Tooltip>
  )
}

const MDropzoneField = ({ images, setImages }: MDropzoneFieldProps) => {
  // #region VALUES
  const [errors, setErrors] = useState<FileError[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': ['.png', '.jpeg', '.jpg', '.webp', '.svg'] },
    maxFiles: 3,
    maxSize: 2_000_000, // 2 MB
    onDrop: (acceptedImages: File[], fileRejections) => {
      // if there are any rejections errors
      if (fileRejections.length > 0) {
        setErrors(fileRejections.map((rejects) => rejects.errors).flat())
        return
      }

      // if `images` + `acceptedImages` length is > 3
      if (images.length + acceptedImages.length > 3) {
        setErrors([
          {
            code: ErrorCode.TooManyFiles,
            message: 'Maximum amount of images is 3',
          },
        ])
        return
      }

      setErrors([])
      setImages((prev) => [
        ...prev,
        ...acceptedImages.map((image) =>
          // + preview di property image object
          Object.assign(image, {
            preview: URL.createObjectURL(image),
          })
        ),
      ])
    },
    onError: (err) => {
      console.error('Dropzone error', err)
    },
  })
  // #endregion

  // #region HANDLERS
  const removeImage = (preview: string) => {
    // find the index of the item
    // remove the item from array
    const validImageIndex = images.findIndex(
      (image) => image.preview === preview
    )
    images.splice(validImageIndex, 1)
    setImages([...images])
  }
  // #endregion

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach((image) => URL.revokeObjectURL(image.preview))
    },
    [images]
  )

  return (
    <FormControl error={!!errors}>
      <Paper square variant="outlined" sx={{ padding: 2, borderRadius: 2 }}>
        <Box
          paddingY={4}
          borderRadius={2}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.light,
            cursor: 'pointer',
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />

          <Typography
            variant="body2"
            textAlign="center"
            fontWeight={700}
            color="white"
          >
            Click or drag & drop some images here 📷
          </Typography>
        </Box>

        {!!images.length && (
          <Box marginTop={2} display="flex" flexWrap="wrap">
            {images.map((image) => (
              <ImageItem
                key={image.name + image.size}
                image={image}
                handleRemoveImage={() => removeImage(image.preview)}
              />
            ))}
          </Box>
        )}
      </Paper>

      {!!errors.length &&
        errors.map((err, i) => (
          <FormHelperText key={i}>{err.message}</FormHelperText>
        ))}
    </FormControl>
  )
}

export default MDropzoneField
