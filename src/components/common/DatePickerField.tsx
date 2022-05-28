import { TextField } from '@mui/material'
import { SxProps } from '@mui/system'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import idLocale from 'dayjs/locale/id'
import { FieldProps } from 'formik'

//#region INTERFACE
interface DatePickerFieldProps<V, IV>
  extends FieldProps<V, IV>,
    DatePickerProps<Dayjs, Dayjs> {
  sx?: SxProps
  shouldRevalidate?: boolean
  getShouldDisableDateError?(date: Date): string
}
//#endregion

export const DatePickerField = <V extends number | Date, IV extends object>({
  sx,
  shouldRevalidate = true,
  getShouldDisableDateError,
  field,
  form,
  label,
  value,
  minDate = dayjs('1000-01-01'),
  maxDate = dayjs('2999-12-31'),
  onChange,
}: DatePickerFieldProps<V, IV>): JSX.Element => {
  const currentError = form.errors[field.name]
  const showError = Boolean(currentError && form.touched[field.name])

  return (
    // NOTE: every value coming to DatePicker will be the type of dayjs Date
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={idLocale}>
      <DatePicker
        // mask="" // empty mask to disable warning in console when using a custom inputFormat
        // inputFormat="dddd MMM yyyy"
        label={label}
        value={value ? value : field.value}
        onError={(reason, errorValue) => {
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
                `${'Date less than the minimum limit'} ${minDate.format(
                  'dd MMM yyyy'
                )}`
              )
              break

            case 'maxDate':
              form.setFieldError(
                field.name,
                `${'Date exceed the maximum limit'} ${maxDate.format(
                  'dd MMM yyyy'
                )}`
              )
              break

            case 'shouldDisableDate':
              // shouldDisableDate returned true, render custom message according to the `shouldDisableDate` logic
              form.setFieldError(
                field.name,
                getShouldDisableDateError(errorValue as Date)
              )
              break

            default:
              form.setErrors({
                ...form.errors,
                [field.name]: undefined,
              })
          }
        }}
        onChange={(newValue: Dayjs) => {
          console.info('🚀 ~ file: AddCoupon.tsx ~ line 198 ~ onChange', {
            newValue,
            newValueMilli: newValue.valueOf(),
            newValueDate: newValue.toDate(),
          })

          if (typeof field.value === 'number')
            form.setFieldValue(field.name, newValue.valueOf(), shouldRevalidate)
          else
            form.setFieldValue(field.name, newValue.toDate(), shouldRevalidate)

          onChange?.(newValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className="MDatePickerField"
            sx={{ ...sx, mb: 2 }}
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
