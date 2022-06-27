import React from 'react'
import { Alert } from "react-bootstrap";
import { CgCloseO, TiInfoOutline } from "react-icons/all";

const CustomizedAlert = ({ variant, children, title, ...rest }) => {
    return (
        <Alert variant={variant} className="d-flex flex-wrap align-items-center" {...rest}>
            {title ?
                <p className="col-12 m-0 p-0 is-size-6">
                    {
                        variant === "danger" ?
                            <CgCloseO size="22" className="ml-2" />
                            :
                            variant === "primary" ?
                                <TiInfoOutline size="22" className="ml-2" />
                                :
                                null
                    }
                    {title}
                </p>
                :
                null}
            {
                children ?
                    <p className={`col-12 p-0 mb-0 darkBlue ${title ? "pr-4  mt-2" : ""} is-size-5  d-flex align-items-center`}>{children}</p>
                    :
                    null
            }
        </Alert>
    )
}

export default CustomizedAlert
