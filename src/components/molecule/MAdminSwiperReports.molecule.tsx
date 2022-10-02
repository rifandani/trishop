import { Box } from '@mui/material'
import { FC } from 'react'
import { A11y, Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IReportsProps } from 'types/Report'
import MAdminReportCard from '../atom/MAdminReportCard.atom'

const MAdminSwiperReports: FC<IReportsProps> = ({ reports }) => {
  const swiperStyle = {
    '--swiper-navigation-color': '#92400e',
    '--swiper-pagination-color': '#92400e',
    width: '100%',
    height: '30em',
  } as const

  return (
    <Box className="h-full w-full">
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
          <SwiperSlide key={report._id}>
            <MAdminReportCard report={report} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default MAdminSwiperReports
