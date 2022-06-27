import { forwardRef } from "react";
import Styles from "./Select.module.scss";
import { Form } from "react-bootstrap";
import { ErrorMessage, useField } from "formik";
import { useTheme } from "../../../context";

//sample={id='',title:'',disabled:false}

const CustomizedSelect = forwardRef(
  (
    {
      label /** string */,
      className,
      labelClassName,
      options /** array */,
      showField = "title" /** string */,
      fieldValue = "_id" /** string */,
      isValid /** boolean */,
      isInvalid /** boolean */,
      data /** string */,
      light,
      ...props
    },
    ref
  ) => {
    const [{ name, ...field }, { error, touched }] = useField(props);
    const { theme } = useTheme();

    // console.log(options);
    return (
      <Form.Group className={`position-relative mb-0`}>
        {label ? (
          <Form.Label
            className={`${Styles.selectLabel} ${labelClassName} px-1 is-size-7 text-black`}
            htmlFor={name}
          >
            {label}
          </Form.Label>
        ) : null}

        <Form.Control
          as="select"
           
          name={name}
          {...field}
          isValid={isValid}
          isInvalid={isInvalid || (error && touched)}
          className={` ${light ? Styles.lightInput : ""} ${Styles.select} ${Styles[theme]} ${className} form-select is-size-6`}

          {...props}
        >
          <option value={-1} hidden>  انتخاب کنید  </option>
          {options[0] instanceof Object
            ? options.map((item) => (
              <option
                value={item[fieldValue]}
                key={item[showField]}
                disabled={item.disabled}
              >
                {item[showField]}
              </option>
            ))
            : options.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
        </Form.Control>
        <ErrorMessage
          name={name}
          component={Form.Text}
          className={`${Styles.inputErrorText} text-danger is-size-7 text-left`}
        />
      </Form.Group>
    );
  }
);
export default CustomizedSelect;