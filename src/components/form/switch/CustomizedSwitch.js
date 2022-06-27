import { useState, useEffect, forwardRef } from "react";
import { useTheme } from "../../../context";
import Styles from "./CustomizedSwitch.module.scss";

const CustomizedSwitch = forwardRef(({ title, checked, handleChange, ...rest }, ref) => {
    const { theme } = useTheme();
    return (
        <div className={`${Styles.switchBox} ${Styles[theme]} ${checked ? Styles.on : null} `} onClick={handleChange} title={checked ? "فعال" : "غیر فعال"}>
            <input className={`${Styles.switchInput}`} type="checkbox" aria-label="secondary checkbox" ref={ref} {...rest}></input>
            <span className={`${Styles.switchTrack}`}></span>
        </div>
    );
})
export default CustomizedSwitch