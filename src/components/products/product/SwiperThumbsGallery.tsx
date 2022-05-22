/* eslint-disable @next/next/no-img-element */
import { FC, useState } from 'react'
import { FreeMode, Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { TImage } from 'types/Product'

interface Props {
  images: TImage[]
}

const SwiperThumbsGallery: FC<Props> = ({ images }) => {
  const swiperStyle = {
    '--swiper-navigation-color': '#92400e',
    '--swiper-pagination-color': '#92400e',
    background: 'white',
  } as const
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <section className="px-4 md:flex-1">
      <Swiper
        className="swiper-big"
        style={swiperStyle}
        loop
        modules={[Navigation, Thumbs, FreeMode]}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.imageUrl}>
            <img
              className="cursor-pointer"
              src={image.imageUrl}
              alt={image.imageName}
              height={10}
              width={10}
            />
            {/* <span className="relative mb-4 h-56 w-full flex-shrink-0 cursor-pointer">
              <Image
                src={image.imageUrl}
                alt={image.imageName}
                // className="rounded-lg"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                priority
              />
            </span> */}
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className="swiper-small"
        loop
        spaceBetween={10}
        modules={[Navigation, Thumbs, FreeMode]}
        freeMode
        watchSlidesProgress
        onSwiper={setThumbsSwiper}
      >
        {images.map((image) => (
          <SwiperSlide key={image.imageUrl}>
            <img
              className="cursor-pointer"
              src={image.imageUrl}
              alt={image.imageName}
              height={10}
              width={10}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default SwiperThumbsGallery
