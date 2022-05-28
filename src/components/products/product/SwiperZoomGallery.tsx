import Image from 'next/image'
import { FC } from 'react'
import { Navigation, Pagination, Zoom } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/zoom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { TImage } from 'types/Product'

interface Props {
  images: TImage[]
}

const SwiperZoomGallery: FC<Props> = ({ images }) => {
  const swiperStyle = {
    '--swiper-navigation-color': '#92400e',
    '--swiper-pagination-color': '#92400e',
    background: 'white',
  } as const

  return (
    <section className="px-4 md:flex-1">
      <Swiper
        style={swiperStyle}
        loop={true}
        modules={[Navigation, Zoom, Pagination]}
        zoom={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
      >
        {images.map((image) => (
          <SwiperSlide
            key={image.imageUrl}
            className="relative h-[40rem] w-full flex-shrink-0"
          >
            <Image
              src={image.imageUrl}
              alt={image.imageName}
              width={500}
              height={500}
              className="cursor-pointer rounded-lg"
              objectFit="cover"
              objectPosition="center"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default SwiperZoomGallery
