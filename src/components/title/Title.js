import React from "react";
import Styles from "./Title.module.scss";
const CustomizedTitle = ({
  icon: Icon,
  title,
  children,
  className,
  titleClassName,
  titleSize = '4'
}) => {
  return (
    <div className={`d-flex align-items-center pr-2 ${Styles.titleCard} ${className}`}>
      {/* <div className={`${Styles.line}`}></div> */}
      <div className="">
        <div className="d-flex align-items-center ">
          {Icon ? <span className="ml-2 text-gainsboro">  <Icon />  </span> : null}
          <span className={` is-size-${titleSize}  yekan-Bold text-blue ${titleClassName}`}>

            {title}
          </span>
        </div>
        {children ? <div className={`mt-2 text-gray-regular is-size-6 ${Styles.content}`}>
          {children}
        </div> : null}
      </div>
    </div>
  );
};
export default CustomizedTitle;
