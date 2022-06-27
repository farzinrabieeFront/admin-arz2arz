import { useState, useEffect, forwardRef } from "react";
import Styles from "./RangeDatePicker.module.scss";
import { Form, InputGroup } from "react-bootstrap";
import { DatePicker, RangeDatePicker } from "jalali-react-datepicker";
import { convertIntoTimeStamp } from "../../../utils/dateFuncs";
import { CgCalendarDates } from "react-icons/all";
// import { dateTheme } from "./theme";
import { ErrorMessage, useField } from "formik";
import { date } from "yup";
import { useTheme } from "../../../context";

const CustomizeRangeDatePicker = forwardRef(
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
                    {value ?
                        <RangeDatePicker
                        /> : null}
                    {
                        error && touched ? (
                            <ErrorMessage
                                name={name}
                                component={Form.Text}
                                className={`${Styles.inputErrorText} ${Styles[theme]} text-danger is-size-7 text-left`}
                            />

                        ) : null}
                </Form.Group>

            </>
        );
    }
);
export default CustomizeRangeDatePicker;
