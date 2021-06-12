import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core'
// files
import ReportCard from './ReportCard'
import { IReportsProps } from 'types/Report'

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation])

export default function SwiperReports({ reports }: IReportsProps) {
  return (
    <section className="w-full h-left-full">
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
          <SwiperSlide
            style={{ backgroundColor: 'rgba(229,231,235)' }} // bg-gray-200
            key={report._id}
          >
            <ReportCard report={report} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
