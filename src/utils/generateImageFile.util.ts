import { TImage } from 'types/Product'

const generateImageFile = async (imageFromCloudinary: TImage) => {
  const res = await fetch(imageFromCloudinary.imageUrl)
  const resFileType = res.headers.get('content-type')
  const readableStream = res.body

  const streamReader = readableStream.getReader()
  const loop = true
  const stream = new ReadableStream({
    async start(controller) {
      while (loop) {
        const { done, value } = await streamReader.read()

        // When no more data needs to be consumed, break the reading
        if (done) {
          break
        }

        // Enqueue the next data chunk into our target stream
        controller.enqueue(value)
      }

      // Close the stream
      controller.close()
      streamReader.releaseLock()
    },
  })

  const response = new Response(stream)
  const blob = await response.blob()

  // should wait onloadend to read full file contents
  const imageFile = await new Promise<File>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(blob)

    fileReader.onloadend = function () {
      resolve(
        new File([fileReader.result], imageFromCloudinary.imageName, {
          type: resFileType || 'image/jpeg',
        })
      )
    }

    fileReader.onerror = function () {
      reject('fileReader error')
    }
  })

  return imageFile
}

export type TGenerateImageFile = ReturnType<typeof generateImageFile>
export default generateImageFile
