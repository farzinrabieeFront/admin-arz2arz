import React, { useState, forwardRef } from 'react';
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/layouts/mobile.css"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/colors/purple.css"
import { useField } from 'formik';
import Styles from './PersianDatePicker.module.scss';
import { useTheme } from '../../../context';
import { CgCalendarDates } from "react-icons/all";

const PersianDatePicker = forwardRef(
    ({
        label = "",
        className,
        timePicer,
        ...props
    }, ref) => {

        const [{ name, value, onChange, ...field }, { error, touched }, { setValue }] = useField(props);
        const { theme } = useTheme();

        return (
            <div style={{ textAlign: "center" }}>
                <label className={`${Styles.label} d-block text-right`}>{label}</label>
                <div className="position-relative w-100">
                    <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        containerClassName="w-100"
                        className="rmdp-mobile"
                        inputClass={`${Styles.datePicker} ${Styles[theme]}`}
                        plugins={
                            timePicer ?
                                [<TimePicker position="bottom" />]
                                : null
                        }
                        value={new Date(new Number(value))}
                        name={name}
                        {...field}
                        onChange={(date) => setValue(new Date(date).getTime())}
                        ref={ref}
                    />
                    <span className={`${Styles.icon} text-gainsboro `}>
                        <CgCalendarDates size="25" />
                    </span>
                </div>

            </div>
        )
    }
)
export default PersianDatePicker








{/* <DatePicker
    format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
    plugins={[
        <TimePicker position="bottom" />
    ]}
    value={value}
    onChange={setValue}
    calendar={persian}
    locale={persian_fa}
    className="rmdp-mobile purple"
    onChange={(date) => {
        console.log(date?.isValid ? date : "");
    }}
/> */}