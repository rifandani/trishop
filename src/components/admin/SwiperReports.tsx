import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
// files
import ReportCard from './ReportCard'
import { IReportsProps } from 'types/Report'

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation])

export default function SwiperReports({ reports }: IReportsProps) {
  return (
    <section className="w-full h-full mt-8">
      <Swiper
        className="rounded-md"
        style={{
          // @ts-ignore
          '--swiper-navigation-color': '#92400e',
          '--swiper-pagination-color': '#92400e',
          width: '100%',
          height: '30em',
        }}
        spaceBetween={10}
        navigation
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {reports.map((report) => (
          <SwiperSlide key={report._id}>
            <ReportCard report={report} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
