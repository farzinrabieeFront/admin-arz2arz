import React from "react";
import { Button } from "react-bootstrap";
import Styles from './Button.module.scss';
import MiniLoading from "../../loading/miniLoading/MiniLoading";
import loadingSvg from "../../../assets/svgs/bars.svg";

const CustomizedButton = ({
  children,
  size = "md",
  gradient,
  variant = "success",
  type = "button",
  isFullWidth = false,
  isLoading = false,
  outlined = false,
  disable = false,

  ...rest
}) => {
  return (
    <Button
      type={type}
      variant={`${outlined ? "outline-" : ""}${variant}`}
      size={size}
      className={`${gradient ? Styles.gradient : null} position-relative ${Styles.btn}`}
      block={isFullWidth}
      disabled={isLoading || disable}
      {...rest}
      
    >
      {isLoading ?
        <img src={loadingSvg} style={{ height: '24px' }} />
        :
        children
      }
    </Button>
  );
};
export default CustomizedButton;
