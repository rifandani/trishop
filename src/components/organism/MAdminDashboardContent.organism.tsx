import {
  Add,
  ConfirmationNumber,
  Group,
  Inventory,
  Paid,
  ReportProblem,
  ShoppingBag,
} from '@mui/icons-material'
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import MAdminInsightItem, {
  InsightItem,
} from 'components/atom/MAdminInsightItem.atom'
import MAdminTableCoupon from 'components/atom/MAdminTableCoupon.atom'
import MAdminTableProduct from 'components/atom/MAdminTableProduct.atom'
import MAdminTableUser from 'components/atom/MAdminTableUser.atom'
import { useRouter } from 'next/router'
import { FC } from 'react'
import useSWR from 'swr'
import { HttpResponse } from 'types'
import { APIResponseCoupons } from 'types/Coupon'
import { APIResponseProducts } from 'types/Product'
import { APIResponseReports } from 'types/Report'
import { APIResponseUsers } from 'types/User'
import generateRupiah from 'utils/generateRupiah'
import MAdminSwiperReports from '../molecule/MAdminSwiperReports.molecule'

const MAdminDashboardContent: FC = () => {
  //#region GENERAL
  const { push } = useRouter()

  const onClickAddUser = () => push('/admin/add/user', '/admin/add/user')
  const onClickAddProduct = () =>
    push('/admin/add/product', '/admin/add/product')
  const onClickAddCoupon = () => push('/admin/add/coupon', '/admin/add/coupon')
  //#endregion

  //#region ADMIN-USERS SERVICES
  const { data: usersRes, error: usersIsError } = useSWR<
    APIResponseUsers,
    HttpResponse
  >('/admin/users')
  const usersIsLoading = !usersRes && !usersIsError
  //#endregion

  //#region ADMIN-PRODUCTS SERVICE
  const { data: productsRes, error: productsIsError } = useSWR<
    APIResponseProducts,
    HttpResponse
  >('/admin/products')
  const productsIsLoading = !productsRes && !productsIsError
  //#endregion

  //#region ADMIN-COUPONS SERVICE
  const { data: couponsRes, error: couponsIsError } = useSWR<
    APIResponseCoupons,
    HttpResponse
  >('/admin/coupons')
  const couponsIsLoading = !couponsRes && !couponsIsError
  //#endregion

  //#region ADMIN-REPORTS SERVICE
  const { data: reportsRes, error: reportsIsError } = useSWR<
    APIResponseReports,
    HttpResponse
  >('/admin/reports')
  const reportsIsLoading = !reportsRes && !reportsIsError
  //#endregion

  // #region INSIGHTS
  const getInsightUserTitle = (): string | number => {
    if (usersIsError) return 'Error'
    if (usersIsLoading) return 'Loading...'
    if (usersRes) return usersRes.count
  }
  const getInsightProductTitle = (): string | number => {
    if (productsIsError) return 'Error'
    if (productsIsLoading) return 'Loading...'
    if (productsRes) return productsRes.count
  }
  const getInsightCouponTitle = (): string | number => {
    if (couponsIsError) return 'Error'
    if (couponsIsLoading) return 'Loading...'
    if (couponsRes) return couponsRes.count
  }
  const getInsightReportTitle = (): string | number => {
    if (reportsIsError) return 'Error'
    if (reportsIsLoading) return 'Loading...'
    if (reportsRes) return reportsRes.count
  }
  const getInsightOrderTitle = (): string | number => {
    return 9999
  }
  const getInsightIncomeTitle = (): string | number => {
    return generateRupiah(99_000_000)
  }

  const insightItems: InsightItem[] = [
    {
      icon: <Group color="primary" fontSize="large" />,
      iconBgColor: 'whitesmoke',
      title: getInsightUserTitle(),
      label: 'Total Users',
    },
    {
      icon: <Inventory color="secondary" fontSize="large" />,
      iconBgColor: 'whitesmoke',
      title: getInsightProductTitle(),
      label: 'Total Products',
    },
    {
      icon: <ConfirmationNumber color="info" fontSize="large" />,
      iconBgColor: 'whitesmoke',
      title: getInsightCouponTitle(),
      label: 'Total Coupons',
    },
    {
      icon: <ReportProblem color="error" fontSize="large" />,
      iconBgColor: 'whitesmoke',
      title: getInsightReportTitle(),
      label: 'Total Reports',
    },
    {
      icon: <ShoppingBag color="warning" fontSize="large" />,
      iconBgColor: 'whitesmoke',
      title: getInsightOrderTitle(),
      label: 'Weekly Orders',
    },
    {
      icon: <Paid color="success" fontSize="large" />,
      iconBgColor: 'whitesmoke',
      title: getInsightIncomeTitle(),
      label: 'Weekly Income',
    },
  ]
  // #endregion

  return (
    <Box maxWidth="93vw">
      <Box>
        {/* INSIGHTS HEADER */}
        <Typography variant="h5" marginBottom={3}>
          Insights
        </Typography>

        {/* INSIGHTS GRID */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {insightItems.map(({ icon, iconBgColor, title, label }) => (
            <MAdminInsightItem
              key={label}
              icon={icon}
              iconBgColor={iconBgColor}
              title={title}
              label={label}
            />
          ))}
        </Grid>
      </Box>

      {/* USERS HEADER */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginY={3}
      >
        <Typography variant="h5">Users</Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<Add />}
          onClick={onClickAddUser}
        >
          Add User
        </Button>
      </Box>

      {/* USERS TABLE */}
      {usersIsLoading && (
        <CircularProgress color="primary" sx={{ marginTop: 2 }} />
      )}
      {usersRes && <MAdminTableUser users={usersRes.users} />}

      {/* PRODUCTS HEADER */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginY={3}
      >
        <Typography variant="h5">Products</Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<Add />}
          onClick={onClickAddProduct}
        >
          Add Product
        </Button>
      </Box>

      {/* PRODUCTS TABLE */}
      {productsIsLoading && (
        <CircularProgress color="primary" sx={{ marginTop: 2 }} />
      )}
      {productsRes && <MAdminTableProduct products={productsRes.products} />}

      {/* COUPONS HEADER */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginY={3}
      >
        <Typography variant="h5">Coupons</Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<Add />}
          onClick={onClickAddCoupon}
        >
          Add Coupon
        </Button>
      </Box>

      {/* COUPONS TABLE */}
      {couponsIsLoading && (
        <CircularProgress color="primary" sx={{ marginTop: 2 }} />
      )}
      {couponsRes && <MAdminTableCoupon coupons={couponsRes.coupons} />}

      {/* REPORTS HEADER */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginY={3}
      >
        <Typography variant="h5">Reports</Typography>
      </Box>

      {/* REPORTS SLIDER */}
      {reportsIsLoading && (
        <CircularProgress color="primary" sx={{ marginTop: 2 }} />
      )}
      {reportsRes && <MAdminSwiperReports reports={reportsRes.reports} />}
    </Box>
  )
}

export default MAdminDashboardContent
