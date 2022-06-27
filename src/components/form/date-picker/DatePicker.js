import { useState, useEffect, forwardRef } from "react";
import Styles from "./DatePicker.module.scss";
import { Form, InputGroup } from "react-bootstrap";
import { DatePicker, RangeDatePicker } from "jalali-react-datepicker";
import { convertIntoTimeStamp } from "../../../utils/dateFuncs";
import { CgCalendarDates, FaRegCalendarAlt } from "react-icons/all";
// import { dateTheme } from "./theme";
import { ErrorMessage, useField } from "formik";
import { date } from "yup";
import { useTheme } from "../../../context";

const CustomizedDatePicker = forwardRef(
  (
    {
      label = "",
      icon: Icon,
      classLabel = "",
      className,
      ...props
    },
    ref
  ) => {
    const [{ name, value, onChange, ...field }, { error, touched }, { setValue }] = useField(props);
    const { theme } = useTheme();

    return (
      <>
        <Form.Group className={`${className} mb-0 DatePicker position-relative`}>
          {value ? <DatePicker
            className={`${Styles.CustomizedDatePicker} ${Styles[theme]} text-black yekan-Bold is-size-6 w-100 FaNum`}
            timePicker={false}
            value={new Date(value)}
            name={name}
            {...field}
            ref={ref}
            // theme={dateTheme}
            label={label}
            // onClickSubmitButton={(alo) => setValue(new Date(alo.value._d).toISOString())}
            // onClickSubmitButton={(alo) => console.log(alo.value._d)}
          /> : null}
          <span className={`${Styles.icon} text-gainsboro `}>
            <CgCalendarDates size="25" />
          </span>

          {
            error && touched ? (
              <ErrorMessage
                name={name}
                component={Form.Text}
                className={`${Styles.inputErrorText} text-danger is-size-7 text-left`}
              />

            ) : null}
        </Form.Group>
        {/* <Form.Group className={`${className} mb-0 DatePicker position-relative`}>
          <DatePicker
            value={value}
            theme={theme}
            className={`${Styles.CustomizedDatePicker} text-black yekan-Bold is-size-6 w-100 FaNum`}
            label={label}
            timePicker={false}
            ref={ref}
            onClickSubmitButton={onChange}
          />
          <span className={`${Styles.icon} text-gainsboro `}>
            <CgCalendarDates size="25" />
          </span>
          {errorMessage ? (
            <Form.Text className="text-danger">{errorMessage}</Form.Text>
          ) : null}
        </Form.Group> */}
      </>
    );
  }
);
export default CustomizedDatePicker;
