import React from "react";
import { Alert } from "react-bootstrap";
import Styles from "./Alert.module.scss";
import {
  BsInfoCircle,
  AiOutlineCheckCircle,
  FiAlertTriangle,
  VscWarning,
  IoClose,
} from "react-icons/all";

const switchIcons = {
  info: <BsInfoCircle size={24} />,
  danger: <FiAlertTriangle size={24} />,
  success: <AiOutlineCheckCircle size={24} />,
  warning: <VscWarning size={24} />,
};
const CustomizedAlert = ({ variant, children, className, close }) => {
  return (
    <Alert
      variant={variant}
      data-type="alert"
      data-variant={variant}
      className={`${Styles.customizeAlert} d-flex justify-content-between align-items-center py-2 px-2 rounded-10 ${className}`}
    >
      <span className="d-flex align-items-center">
        <div
          className={`${Styles.icon} yekan-ExtraBold d-flex center-content`}
        >
          {switchIcons[variant]}
        </div>
        <span className="is-size-7 px-2">{children}</span>
      </span>
      {close ? <span>
        <IoClose size={20} />
      </span> : null}
      {/* <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you */}
    </Alert>
  );
};

export default CustomizedAlert;
