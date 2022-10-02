import { Add, ArrowBack, Edit } from '@mui/icons-material'
import InfoIcon from '@mui/icons-material/Info'
import LoadingButton from '@mui/lab/LoadingButton'
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import MAutocompleteField from 'components/atom/MAutocompleteField.atom'
import MDropzoneField from 'components/atom/MDropzoneField.atom'
import MInputField from 'components/atom/MTextField.atom'
import { Field, Form, Formik } from 'formik'
import { TUseAdminProductFormViewModel } from 'hooks/admin/product/useAdminProductForm.viewModel'
import { FC } from 'react'
import { addProductSchema } from 'yup/schema'

type MAdminProductFormProps = {
  adminProductForm: TUseAdminProductFormViewModel
}

const MAdminProductForm: FC<MAdminProductFormProps> = ({
  adminProductForm,
}) => {
  return (
    <Box maxWidth="93vw">
      <Container>
        {/* back button */}
        <Button
          sx={{ marginBottom: 3 }}
          startIcon={<ArrowBack />}
          onClick={adminProductForm.handleBackToDashboard}
        >
          Go Back
        </Button>

        {/* START FORM */}
        <Formik
          initialValues={adminProductForm.initialValues}
          validationSchema={addProductSchema}
          onSubmit={adminProductForm.handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Paper sx={{ padding: 3 }}>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5">
                    {adminProductForm.productId
                      ? 'Edit Product'
                      : 'Add Product'}
                  </Typography>

                  {/* title */}
                  <Field
                    component={MInputField}
                    name="title"
                    label="Title"
                    fullWidth
                    sx={{ marginTop: 3 }}
                  />

                  {/* price */}
                  <Field
                    component={MInputField}
                    name="price"
                    label="Price"
                    fullWidth
                    type="number"
                    isCurrency
                    sx={{ marginY: 3 }}
                  />

                  {/* stock */}
                  <Field
                    component={MInputField}
                    name="stock"
                    label="Stock"
                    fullWidth
                    type="number"
                    sx={{ marginBottom: 3 }}
                  />

                  {/* Description */}
                  <Field
                    component={MInputField}
                    name="desc"
                    label="Description"
                    fullWidth
                    multiline
                    minRows={2}
                    maxRows={5}
                    sx={{ marginBottom: 3 }}
                  />

                  {/* labels */}
                  <Field
                    component={MAutocompleteField}
                    options={['test', 'test2']}
                    id="product-labels"
                    name="labels"
                    label="Labels"
                    freeSolo
                    multiple
                    sx={{ marginBottom: 3 }}
                  />

                  {/* images */}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    marginBottom={1}
                  >
                    <Typography variant="body2" fontWeight={700}>
                      Add Some Images
                    </Typography>

                    <Tooltip
                      arrow
                      title="Maximum amount of images is 3"
                      placement="right"
                    >
                      <InfoIcon sx={{ fontSize: 15 }} color="secondary" />
                    </Tooltip>
                  </Stack>

                  <MDropzoneField
                    images={adminProductForm.images}
                    setImages={adminProductForm.setImages}
                  />

                  {/* submit button */}
                  <LoadingButton
                    type="submit"
                    variant="outlined"
                    loadingPosition="start"
                    sx={{ marginTop: 2 }}
                    loading={isSubmitting}
                    disabled={
                      !adminProductForm.images.length ||
                      adminProductForm.images.length > 3
                    }
                    startIcon={
                      adminProductForm.productId ? (
                        <Edit fontSize="small" />
                      ) : (
                        <Add fontSize="small" />
                      )
                    }
                  >
                    {isSubmitting ? 'Loading' : 'Submit'}
                  </LoadingButton>
                </Box>
              </Paper>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  )
}

export default MAdminProductForm
