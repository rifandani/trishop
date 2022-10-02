import { SelectOption } from '@mui/base'
import { Add, ArrowBack, Edit } from '@mui/icons-material'
import { Box, Button, Container, Paper, Typography } from '@mui/material'
import MSelectField from 'components/atom/MSelectField.atom'
import MTextField from 'components/atom/MTextField.atom'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-toastify'
import { postAdminUser, putAdminUser } from 'services/admin/users'
import { IUserProps, UserRole } from 'types/User'
import { TUserApiSchema, userApiSchema } from 'yup/apiSchema'

const MAdminUserForm: FC<IUserProps | undefined> = ({ user }) => {
  //#region GENERAL
  const { push, back } = useRouter()
  const userId = user ? user._id : ''
  //#endregion

  //#region FORM
  const initialValues: TUserApiSchema = {
    name: user ? user.name : '',
    email: user ? user.email : '',
    role: user ? user.role : UserRole.USER,
    password: '',
  }

  const roleOptions: SelectOption<string>[] = [
    {
      label: 'User',
      value: UserRole.USER,
    },
    {
      label: 'Admin',
      value: UserRole.ADMIN,
    },
  ]

  const onSubmit = async (
    values: TUserApiSchema,
    actions: FormikHelpers<TUserApiSchema>
  ): Promise<void> => {
    try {
      if (userId) {
        // PUT /admin/users/:_id
        await putAdminUser(userId, values) // bisa pake query._id
        await push('/admin/dashboard')
        toast.info('User updated')
        return
      }

      // POST /admin/users
      await postAdminUser(values)
      await push('/admin/dashboard')
      toast.success('User created')
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
          onClick={() => back()}
        >
          Go Back
        </Button>

        {/* START FORM */}
        <Formik
          initialValues={initialValues}
          validationSchema={userApiSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Paper sx={{ padding: 3 }}>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5">
                    {userId ? 'Edit User' : 'Add User'}
                  </Typography>

                  {/* name */}
                  <Field
                    component={MTextField}
                    name="name"
                    label="Name"
                    fullWidth
                    sx={{ marginY: 3 }}
                  />

                  {/* role */}
                  <Field
                    component={MSelectField}
                    name="role"
                    id="user-role"
                    label="Role"
                    fullWidth
                    options={roleOptions}
                  />

                  {/* email */}
                  <Field
                    component={MTextField}
                    name="email"
                    label="Email"
                    fullWidth
                    type="email"
                    sx={{ marginY: 3 }}
                  />

                  {/* password */}
                  <Field
                    component={MTextField}
                    name="password"
                    label="Password"
                    fullWidth
                    type="password"
                    sx={{ marginBottom: 3 }}
                  />

                  {/* submit button */}
                  <Button
                    type="submit"
                    variant="outlined"
                    startIcon={
                      userId ? (
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

export default MAdminUserForm
