import { useState } from 'react'
import SwiperCore, { Navigation, Thumbs } from 'swiper/core'
import { Swiper, SwiperSlide } from 'swiper/react'
// files
import { TImage } from 'types/Product'

// install Swiper modules
SwiperCore.use([Navigation, Thumbs])

interface IImageSwiperProps {
  images: TImage[]
}

export default function ImageSwiper({ images }: IImageSwiperProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <section className="px-4 md:flex-1">
      <Swiper
        style={{
          // @ts-ignore
          '--swiper-navigation-color': '#92400e',
          '--swiper-pagination-color': '#92400e',
        }}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        className="my-image-swiper-big"
      >
        {images.map((image) => (
          <SwiperSlide>
            <img
              className="cursor-pointer"
              src={image.imageUrl}
              alt={image.imageName}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        freeMode
        watchSlidesVisibility
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        className="my-image-swiper-small"
      >
        {images.map((image) => (
          <SwiperSlide>
            <img
              className="cursor-pointer"
              src={image.imageUrl}
              alt={image.imageName}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
