import { forwardRef, useState } from "react";
import Styles from "./Input.module.scss";
import { Form } from "react-bootstrap";
import { BsEyeSlash, BsEye } from "react-icons/all";
import Num2persian from "num2persian";
import { ErrorMessage, useField } from "formik";
import { useTheme } from "../../../context";
import { mobileFilter, amountFilter } from "./inputFilters";

const CustomizedInput = forwardRef(
  (
    {
      label /** string */,
      type /** string */,
      className,
      labelClassName,
      Prepend,
      rows,
      textIcon,
      guidText /** string */,
      autocomplete /** boolean */,
      currencyFormat /** boolean */,
      light, /** boolean */
      textArea /** boolean */,
      isValid /** boolean */,
      isInvalid /** boolean */,
      amountString /** boolean */,
      ticketTextarea /** boolean */,
      largeLabel /** boolean */,
      clearable /** boolean */,
      icon: Icon,
      separatorFilter,
      ...props
    },
    ref
  ) => {
    const [{ name, value, ...field }, { error, touched },{setValue}] = useField(props);
    const { theme } = useTheme();
    /** states */
    const [isShowPass, setIsShowPass] = useState(false);
//setValue('')
    const formatNumber = (num) => {
      if (num) {
        num = num.toString().replaceAll(",", "");
        let pattern = /(\d+)(\d{3})/;
        while (pattern.test(num)) num = num.replace(pattern, "$1,$2");
      }
      return num;
    };

    const localeString = (e) =>{
      console.log(e.target.value);
    }
    // onKeyUp={(e) => separatorFilter(e)},
    return (
      <Form.Group className={`position-relative ${ticketTextarea ? "h-100" : ""} mb-0`}>
        {label ? (
          <Form.Label
            className={`${Styles.inputLabel} ${labelClassName} ${largeLabel ? " is-size-5" : " is-size-7"}  `}
            htmlFor={name}
          >
            {label}
          </Form.Label>
        ) : null}

        <Form.Control

          {...field}
          className={`${className} ${Prepend ? Styles.prependPadding : ""} ${textIcon ? Styles.textInput : ""} ${light ? Styles.lightInput : ""} ${Styles.input} ${Styles[theme]} ${rows ? Styles.textArea : ""} `}
          type={type === "password" ? (isShowPass ? "text" : "password") : type}
          name={name}
          value={currencyFormat ? formatNumber(value) : value}
          ref={ref}
          isValid={isValid}
          isInvalid={isInvalid || (error && touched)}
          autoComplete={autocomplete ? "on" : "off"}
          rows={rows}
          onKeyUp={separatorFilter ? localeString : null}
          as={rows && "textarea"}
          {...props}
        />
        {Icon ?
          <span className={Styles.icon}>{Icon}</span>
          : null
        }
        {error && touched ? (
          <ErrorMessage
            name={name}
            component={Form.Text}
            className={`${Styles.inputErrorText} ${Styles[theme]} text-danger is-size-7 text-left`}
          />
        ) : amountString && value ? (
          <Form.Text className={` text-gainsboro is-size-7 text-left`}>
            {`${Num2persian(value.replaceAll(",", "") / 10)} تومان`}
          </Form.Text>
        ) : guidText ? (
          <Form.Text
            className={`${Styles.inputBelowText} mt-1 text-gainsboro is-size-8 mr-1`}
          >
            {guidText}
          </Form.Text>
        ) : null}

        {type === "password" ? (
          <span
            className={Styles.prepend}
            onClick={() => setIsShowPass(!isShowPass)}
          >
            {isShowPass ? <BsEye /> : <BsEyeSlash />}
          </span>
        ) : null}

        {textIcon ? <span className={Styles.textIcon}>{textIcon}</span> : null}
        {Prepend ? <span className={Styles.prepend}>{Prepend}</span> : null}
      </Form.Group>
    );
  }
);
export default CustomizedInput;
export { mobileFilter, amountFilter };