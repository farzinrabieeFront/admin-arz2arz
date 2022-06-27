import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { useTheme } from '../../../context';
import Styles from './CustomizedOtp.module.scss'

const CustomizedOtp = ({ value, handleChange }) => {
    const { theme } = useTheme();
    return (
        <OtpInput
            containerStyle={`${Styles.container} flex-row-reverse`}
            className={`${Styles.otpInp} ${Styles[theme]}`}
            value={value}
            onChange={handleChange}
            isInputNum={true}
            numInputs={6}
            shouldAutoFocus={true}
        />
    )
}

export default CustomizedOtp
