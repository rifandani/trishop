import { FC } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerFieldProps {
  name: string
  className: string
  minDate?: Date
  maxDate?: Date
}

const DatePickerField: FC<DatePickerFieldProps> = () => {
  // const { setFieldValue } = useFormikContext()
  // const [fieldInputProps] = useField({ name })

  return null
  // <DatePicker
  //   {...fieldInputProps}
  //   selected={
  //     (fieldInputProps.value && new Date(fieldInputProps.value)) || new Date()
  //   }
  //   onChange={(val) => {
  //     setFieldValue(fieldInputProps.name, val.valueOf()) // convert to milliseconds
  //   }}
  //   name={name}
  //   className={className}
  //   minDate={minDate}
  //   maxDate={maxDate}
  //   showTimeSelect
  //   timeFormat="HH:mm"
  //   timeIntervals={30}
  //   timeCaption="Time"
  //   dateFormat="MMMM d, yyyy h:mm aa"
  // />
}

export default DatePickerField
