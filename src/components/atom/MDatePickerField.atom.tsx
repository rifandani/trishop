import { TextField, TextFieldProps } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { endOfDay, format, startOfDay } from 'date-fns'
import idLocale from 'date-fns/locale/id'
import { FieldProps } from 'formik'

//#region INTERFACE
interface MDatePickerFieldProps<V>
  extends FieldProps<V>,
    DatePickerProps<Date, Date> {
  textFieldSx: TextFieldProps['sx']
  shouldRevalidate?: boolean
  getShouldDisableDateError?(date: Date): string
  onChangeDatePicker?(date: Date): void
}
//#endregion

const MDatePickerField = <V extends Date>({
  textFieldSx,
  shouldRevalidate = true,
  getShouldDisableDateError,
  onChangeDatePicker,

  field,
  form,

  label,
  value,
  minDate = startOfDay(new Date('1000-01-01')),
  maxDate = endOfDay(new Date('2999-12-31')),
}: MDatePickerFieldProps<V>): JSX.Element => {
  const currentError = form.errors[field.name]
  const showError = Boolean(currentError && form.touched[field.name])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={idLocale}>
      <DatePicker
        disableMaskedInput
        label={label}
        value={value ? value : field.value}
        onError={(reason, errorDate) => {
          switch (reason) {
            case 'invalidDate':
              form.setFieldError(field.name, 'Invalid date format')
              break

            case 'disablePast':
              form.setFieldError(field.name, 'Past date are not allowed')
              break

            case 'minDate':
              form.setFieldError(
                field.name,
                `${'Date less than the minimum limit'} ${format(
                  minDate,
                  'dd MMM yyyy'
                )}`
              )
              break

            case 'maxDate':
              form.setFieldError(
                field.name,
                `${'Date exceed the maximum limit'} ${format(
                  maxDate,
                  'dd MMM yyyy'
                )}`
              )
              break

            case 'shouldDisableDate':
              // shouldDisableDate returned true, render custom message according to the `shouldDisableDate` logic
              form.setFieldError(
                field.name,
                getShouldDisableDateError(errorDate)
              )
              break

            default:
              form.setErrors({
                ...form.errors,
                [field.name]: undefined,
              })
          }
        }}
        onChange={(newDate) => {
          form.setFieldValue(field.name, newDate, shouldRevalidate)

          onChangeDatePicker?.(newDate)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className="MDatePickerField"
            sx={{ ...textFieldSx, mb: 2 }}
            name={field.name}
            error={showError}
            helperText={
              showError ? currentError && params.helperText : undefined
            }
            onBlur={
              () => form.setFieldTouched(field.name, true, shouldRevalidate) // if 3rd param is `true` will re-run validation schema
            }
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default MDatePickerField
