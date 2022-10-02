import { Add, ArrowBack, Edit } from '@mui/icons-material'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import MDatePickerField from 'components/atom/MDatePickerField.atom'
import MTextField from 'components/atom/MTextField.atom'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { postAdminCoupon, putAdminCoupon } from 'services/admin/coupons'
import { IAddAndEditCoupon, ICouponProps } from 'types/Coupon'
import { addCouponSchema, TAddCouponSchema } from 'yup/schema'

const MAdminCouponForm: FC<ICouponProps | undefined> = ({ coupon }) => {
  //#region GENERAL
  const { push } = useRouter()
  const couponId = coupon ? coupon._id : ''
  //#endregion

  //#region FORM
  const initialValues: TAddCouponSchema = {
    code: coupon ? coupon.code : '',
    discount: coupon ? coupon.discount : 0,
    minTransaction: coupon ? coupon.minTransaction : 0,
    desc: coupon ? coupon.desc : '',
    validUntil: coupon ? new Date(coupon.validUntil) : new Date(),
  }

  const onSubmit = async (
    values: TAddCouponSchema,
    actions: FormikHelpers<TAddCouponSchema>
  ): Promise<void> => {
    try {
      const newCoupon: IAddAndEditCoupon = {
        ...values,
        validUntil: values.validUntil.valueOf(),
      }

      if (couponId) {
        // PUT /admin/coupons/:_id
        const { status, data } = await putAdminCoupon(couponId, newCoupon) // bisa pake query._id
        if (status !== 201) {
          toast.error(data.message)
          return
        }
        await push('/admin/dashboard')
        toast.info('Coupon updated')
        return
      }

      // POST /admin/coupons
      const { status, data } = await postAdminCoupon(newCoupon)
      if (status !== 201) {
        toast.error(data.message)
        return
      }
      await push('/admin/dashboard')
      toast.success('Coupon created')
    } catch (err) {
      console.error(err)
      toast.error(err?.data?.message || err.message)
    } finally {
      actions.setSubmitting(false) // finish formik cycle
    }
  }
  //#endregion

  return (
    <Box maxWidth="93vw">
      <Container>
        {/* back button */}
        <Button
          sx={{ marginBottom: 3 }}
          startIcon={<ArrowBack />}
          onClick={() => push('/admin/dashboard')}
        >
          Go Back
        </Button>

        {/* START FORM */}
        <Formik
          initialValues={initialValues}
          validationSchema={addCouponSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Paper sx={{ padding: 3 }}>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5">
                    {couponId ? 'Edit Coupon' : 'Add Coupon'}
                  </Typography>

                  {/* code */}
                  <Field
                    component={MTextField}
                    name="code"
                    label="Code"
                    fullWidth
                    sx={{ marginTop: 3 }}
                  />

                  {/* discount */}
                  <Field
                    component={MTextField}
                    name="discount"
                    label="Discount"
                    fullWidth
                    type="number"
                    sx={{ marginY: 3 }}
                  />

                  {/* minTransaction */}
                  <Field
                    component={MTextField}
                    name="minTransaction"
                    label="Minimal Transaction"
                    fullWidth
                    type="number"
                    sx={{ marginBottom: 3 }}
                  />

                  {/* desc */}
                  <Field
                    component={MTextField}
                    name="desc"
                    label="Description"
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={5}
                  />

                  {/* validUntil */}
                  <Field
                    component={MDatePickerField}
                    name="validUntil"
                    label={'Valid Until'}
                    textFieldSx={{ marginY: 3 }}
                  />

                  {/* submit button */}
                  <Button
                    type="submit"
                    variant="outlined"
                    startIcon={
                      couponId ? (
                        <Edit fontSize="small" />
                      ) : (
                        <Add fontSize="small" />
                      )
                    }
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Loading' : 'Submit'}
                  </Button>
                </Box>
              </Paper>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  )
}

export default MAdminCouponForm
