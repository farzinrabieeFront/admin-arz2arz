import React from 'react';
import Styles from "./Tip.module.scss";
import { TiPinOutline } from "react-icons/all"
import { useTheme } from "../../context/themeManager";

export default function Tip({ variant, children, title, className }) {
    const { theme } = useTheme()
    return (
        <div variant={variant} className={`${Styles.tip} ${className} ${Styles[theme]} p-3`}>
            {title ?
                <h2 className={`${Styles.title} is-size-5`}><TiPinOutline className={`${Styles.icon} ml-2`} size="22" />{title}</h2>
                : null}
            {children}
        </div>
    )
}
