import React from 'react'
import nodata from "../../assets/images/a2z-special-icon-2.png"
import Styles from './NoData.module.scss';

const NoData = ({ title }) => {
    return (
        <div className={`${Styles.noData} `}>
            <img src={nodata} style={{ width: "200px", height: "200px" }} />
            <span className="mt-2">
                {title ? title : "داده ای موجود نیست"}
            </span>
        </div>
    )
}

export default NoData
