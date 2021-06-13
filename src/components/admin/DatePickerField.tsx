import { useField, useFormikContext } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerFieldProps {
  name: string
  className: string
}

const DatePickerField = ({
  name,
  className,
}: DatePickerFieldProps): JSX.Element => {
  const { setFieldValue } = useFormikContext()
  const [fieldInputProps] = useField({ name })

  return (
    <DatePicker
      {...fieldInputProps}
      name={name}
      className={className}
      selected={
        (fieldInputProps.value && new Date(fieldInputProps.value)) || new Date()
      }
      minDate={new Date()}
      onChange={(val) => {
        // val === Date
        setFieldValue(fieldInputProps.name, val.valueOf()) // convert to milliseconds
      }}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      timeCaption="Time"
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  )
}

export default DatePickerField
