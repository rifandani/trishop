import { Box, Grid, Paper, Typography } from '@mui/material'
import { CSSProperties, FC, ReactNode } from 'react'

// #region INTERFACES
export interface InsightItem {
  icon: ReactNode
  iconBgColor: CSSProperties['backgroundColor']
  title: string | number
  label: string | number
}
// #endregion

const MAdminInsightItem: FC<InsightItem> = ({
  icon,
  iconBgColor,
  title,
  label,
}) => {
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          padding: 2,
        }}
      >
        <Box
          sx={{
            borderRadius: 100,
            padding: 1,
            backgroundColor: iconBgColor,
          }}
        >
          {icon}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1" color="GrayText">
            {label}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  )
}

export default MAdminInsightItem
