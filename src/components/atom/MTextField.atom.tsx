import {
  InputAdornment,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material'
import { FieldProps } from 'formik'

//#region INTERFACE
interface Props<V, IV> extends FieldProps<V, IV>, OutlinedTextFieldProps {
  shouldRevalidate?: boolean
  isCurrency?: boolean
}
//#endregion

const MTextField = <V extends string, IV extends object>({
  shouldRevalidate = true,
  isCurrency = false,
  field,
  form,
  label,
  fullWidth,
  sx,
  type = 'text',
  size = 'small',
  multiline = false,
  maxRows,
  minRows,
}: Props<V, IV>): JSX.Element => {
  const currentError = form.errors[field.name]
  const showError = Boolean(currentError && form.touched[field.name])

  return (
    <TextField
      sx={sx}
      fullWidth={fullWidth}
      size={size}
      type={type}
      multiline={multiline}
      minRows={minRows}
      maxRows={maxRows}
      label={label}
      name={field.name}
      error={showError}
      helperText={showError ? currentError : undefined}
      onBlur={
        () => form.setFieldTouched(field.name, true, shouldRevalidate) // if 3rd param is `true` will re-run validation schema
      }
      value={form.values[field.name]}
      onChange={form.handleChange}
      InputProps={{
        startAdornment: isCurrency ? (
          <InputAdornment position="start">Rp</InputAdornment>
        ) : undefined,
      }}
    />
  )
}

export default MTextField
