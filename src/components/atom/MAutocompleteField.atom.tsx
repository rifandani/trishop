import {
  Autocomplete,
  AutocompleteProps,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material'
import { FieldProps } from 'formik'

// #region INTERFACES
interface Props<V, IV>
  extends FieldProps<V, IV>,
    AutocompleteProps<V, boolean, boolean, boolean, 'div'> {
  label: string
  shouldRevalidate?: boolean
}
// #endregion

const MAutocompleteField = <V extends string[], IV extends object>({
  label,
  shouldRevalidate = true,

  field,
  form,

  sx,
  options,
  id,
  freeSolo,
  multiple,
  filterSelectedOptions = true,
  handleHomeEndKeys = true,
}: Props<V, IV>): JSX.Element => {
  const currentError = form.errors[field.name]
  const showError = Boolean(currentError && form.touched[field.name])

  return (
    <FormControl error={showError} sx={sx}>
      <Autocomplete
        options={options}
        renderInput={(params) => (
          <TextField {...params} name={field.name} label={label} />
        )}
        value={field.value}
        onChange={(ev, newValue, reason, details) => {
          // on create/select option
          if (reason === 'createOption' || reason === 'selectOption') {
            form.setFieldValue(field.name, newValue, shouldRevalidate)
          }

          // on click delete chip icon
          if (reason === 'removeOption') {
            form.setFieldValue(
              field.name,
              field.value.filter(
                (val) => val !== (details.option as unknown as string)
              ),
              shouldRevalidate
            )
          }
        }}
        defaultValue={field.value}
        id={id}
        freeSolo={freeSolo}
        multiple={multiple}
        filterSelectedOptions={filterSelectedOptions}
        handleHomeEndKeys={handleHomeEndKeys}
        onBlur={
          () => form.setFieldTouched(field.name, true, shouldRevalidate) // if 3rd param is `true` will re-run validation schema
        }
      />

      {showError && <FormHelperText>{currentError}</FormHelperText>}
    </FormControl>
  )
}

export default MAutocompleteField
