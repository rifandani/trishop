import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ images, setImages }: any) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 3,
    onDrop: (acceptedImages: any) => {
      setImages(
        acceptedImages.map((image: any) =>
          // + preview di property image object
          // bisa jga pake spread operator
          Object.assign(image, {
            preview: URL.createObjectURL(image),
          }),
        ),
      );
    },
  });

  const removeImage = (name: any) => {
    // find the index of the item
    // remove the item from array
    const validImageIndex = images.findIndex((e: any) => e.name === name);
    images.splice(validImageIndex, 1);

    // update images array
    setImages([...images]);
  };

  // image thumbnail component
  const thumbs = images.map((image: any) => (
    <div
      className="inline-flex rounded-md border mb-2 mr-2 w-32 h-32 p-2 box-border hover:bg-red-500 cursor-pointer"
      key={image.name}
      onClick={() => removeImage(image.name)}
    >
      <div className="flex min-w-0 overflow-hidden">
        <img className="block w-auto h-full" src={image.preview} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach((image: any) => URL.revokeObjectURL(image.preview));
    },
    [images],
  ); // images ------------------------------------------------------------------------------ END

  return (
    <section className="mt-1 form-input py-2 px-3 border border-blue-300 border-dashed rounded-md shadow-sm container">
      <div
        {...getRootProps({
          className: 'dropzone bg-blue-300 py-4 rounded-md',
        })}
      >
        <input {...getInputProps()} />
        <p className="text-sm italic font-bold text-white text-center">
          Drag 'n' drop some files HERE, or click to select files
        </p>
        <p className="text-xs italic text-white text-center">
          Click on the image to remove it
        </p>
      </div>
      <aside className="flex flex-wrap mt-4">{thumbs}</aside>
    </section>
  );
}
