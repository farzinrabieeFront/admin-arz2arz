



import React from 'react';
import { VscCloudUpload } from "react-icons/all";
import Styles from "./CustomizedUploadIcon.module.scss";

const CustomizedUploadIcon = () => {
    return (
        <div className={Styles.avatarWrapper}>
            <img className={Styles.profilePic} src="" />
            <div className={Styles.uploadButton}>
                <span className={`${Styles.icon} center-content`}><VscCloudUpload size="80"/></span>
                <input className={Styles.input} type="file" accept="image/*" />
            </div>
        </div>
    )
}

export default CustomizedUploadIcon
