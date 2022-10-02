import { Star } from '@mui/icons-material'
import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import { TYPE_IDS } from 'config/constants.config'
import Link from 'next/link'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { deleteAdminReport } from 'services/admin/reports'
import { deleteAdminReview } from 'services/admin/reviews'
import { useSWRConfig } from 'swr'
import { IReportProps } from 'types/Report'
import { IReview } from 'types/Review'

const MAdminReportCard: FC<IReportProps> = ({ report }) => {
  //#region GENERAL
  const { argument, typeId, _id } = report
  const reviewRef = report.reviewRef as IReview

  const { mutate } = useSWRConfig()
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  //#endregion

  //#region HANDLER REPORT ACTIONS
  async function onDeleteReport(): Promise<void> {
    try {
      setIsDeleting(true)

      // delete report as admin
      await deleteAdminReport(_id)

      // success
      toast.info('Report deleted')
      await mutate('/admin/reports')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      setIsDeleting(false)
    }
  }

  async function onDeleteReportAndReview(): Promise<void> {
    try {
      setIsDeleting(true)

      // delete report & review as admin
      await deleteAdminReport(_id)
      await deleteAdminReview(reviewRef._id)

      // success
      toast.info('Report and review deleted')
      await mutate('/admin/reports')
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      setIsDeleting(false)
    }
  }
  //#endregion

  return (
    <Paper
      sx={{
        minWidth: '30%',
        maxWidth: '80%',
        backgroundColor: 'white',
        padding: 3,
      }}
    >
      <Box>
        <Link href={`/products/${reviewRef.productRef.toString()}`}>
          <a className="block text-2xl font-bold text-gray-900 hover:text-orange-800 hover:underline">
            {reviewRef.reviewerName}
          </a>
        </Link>

        <Box
          sx={{
            marginTop: 1,
            marginBottom: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {Array(reviewRef.star)
            .fill('whatever')
            .map((_, i) => (
              <Star key={i} color="primary" fontSize="large" />
            ))}
        </Box>

        <Typography variant="body1">{reviewRef.comment}</Typography>
      </Box>

      <Divider sx={{ marginY: 3 }} />

      <Box>
        <Typography variant="body2" textAlign="center">
          {argument}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={800}
          marginY={1}
          paddingY={1}
          borderRadius={5}
          color="primary"
          sx={{ backgroundColor: 'antiquewhite' }}
        >
          {TYPE_IDS.find((_, i) => i + 1 === typeId)}
        </Typography>
      </Box>

      <Divider sx={{ marginY: 3 }} />

      <Box display="flex" flexDirection="column" gap={1}>
        <Button
          color="error"
          fullWidth
          disabled={isDeleting}
          onClick={onDeleteReport}
        >
          {isDeleting ? 'Loading...' : 'Delete Report'}
        </Button>

        <Button
          variant="outlined"
          color="error"
          fullWidth
          disabled={isDeleting}
          onClick={onDeleteReportAndReview}
        >
          {isDeleting ? 'Loading...' : 'Delete Report and Review'}
        </Button>
      </Box>
    </Paper>
  )
}

export default MAdminReportCard
