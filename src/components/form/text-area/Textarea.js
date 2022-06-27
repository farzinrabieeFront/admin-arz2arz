import { forwardRef, useState } from "react";
import Styles from "./Textarea.module.scss";
import { Form } from "react-bootstrap";
import { BsEyeSlash, BsEye } from "react-icons/all";
import Num2persian from "num2persian";
import { ErrorMessage, useField } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import { useTheme } from "../../../context";
const CustomizedTextarea = forwardRef(
  (
    {
      label /** string */,
      type /** string */,
      className,
      maxRows,
      defaultValue,
      labelClassName,
      Prepend,
      rows,
      textIcon,
      guidText /** string */,
      autocomplete /** boolean */,
      currencyFormat /** boolean */,
      light /** boolean */,
      textArea /** boolean */,
      isValid /** boolean */,
      isInvalid /** boolean */,
      amountString /** boolean */,
      ticketTextarea /** boolean */,
      ...props
    },
    ref
  ) => {
    const [{ name, value, ...field }, { error, touched }] = useField(props);
    const { theme } = useTheme();
    /** states */
    const [isShowPass, setIsShowPass] = useState(false);

    const formatNumber = (num) => {
      if (num) {
        num = num.toString().replaceAll(",", "");
        let pattern = /(\d+)(\d{3})/;
        while (pattern.test(num)) num = num.replace(pattern, "$1,$2");
      }
      return num;
    };

    return (
      <Form.Group
        className={`position-relative ${ticketTextarea ? "h-100" : null} mb-0`}
      >
        {label ? (
          <Form.Label
            className={`${Styles.inputLabel} ${labelClassName}  is-size-7  `}
            htmlFor={name}
          >
            {label}
          </Form.Label>
        ) : null}

        <TextareaAutosize
          defaultValue={defaultValue}
          maxRows={maxRows}
          {...field}
          className={`${Styles.textArea} ${Styles[theme]} ${className} ${
            Prepend ? Styles.prependPadding : null
          } 
          ${textIcon ? Styles.textInput : null}
          ${light ? Styles.lightInput : null}
          ${Styles.input} ${rows ? Styles.textArea : null} `}
          type={type === "password" ? (isShowPass ? "text" : "password") : type}
          name={name}
          value={currencyFormat ? formatNumber(value) : value}
          ref={ref}
          isValid={isValid}
          isInvalid={isInvalid || (error && touched)}
          autoComplete={autocomplete ? "on" : "off"}
          rows={rows}
          {...props}
        />

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
export default CustomizedTextarea;
