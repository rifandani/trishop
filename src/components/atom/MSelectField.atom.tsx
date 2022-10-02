import { SelectOption } from '@mui/base'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material'
import { FieldProps } from 'formik'

interface MSelectProps<V, IV> extends FieldProps<V, IV>, SelectProps {
  options: SelectOption<string | number>[]
  shouldRevalidate?: boolean
}
//#endregion

const MSelectField = <V extends string, IV extends object>({
  options,
  shouldRevalidate = true,
  field,
  form,
  id,
  label,
  size = 'small',
  fullWidth,
}: MSelectProps<V, IV>): JSX.Element => {
  const currentError = form.errors[field.name]
  const showError = Boolean(currentError && form.touched[field.name])

  return (
    <FormControl error={showError}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>

      <Select
        labelId={`${id}-label`}
        id={id}
        label={label}
        fullWidth={fullWidth}
        size={size}
        name={field.name}
        value={form.values[field.name]}
        onChange={form.handleChange}
        onBlur={
          () => form.setFieldTouched(field.name, true, shouldRevalidate) // if 3rd param is `true` will re-run validation schema
        }
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            disabled={option.disabled}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {showError && <FormHelperText>{currentError}</FormHelperText>}
    </FormControl>
  )
}

export default MSelectField
