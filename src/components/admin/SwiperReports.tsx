import { FC } from 'react'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IReportsProps } from 'types/Report'
import ReportCard from './ReportCard'

const SwiperReports: FC<IReportsProps> = ({ reports }) => {
  const swiperStyle = {
    '--swiper-navigation-color': '#92400e',
    '--swiper-pagination-color': '#92400e',
    width: '100%',
    height: '30em',
  } as const

  return (
    <section className="h-left-full w-full">
      <Swiper
        className="rounded-md"
        style={swiperStyle}
        spaceBetween={10}
        centeredSlides={true}
        modules={[A11y, Autoplay, Navigation, Pagination]}
        navigation
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

export default SwiperReports
