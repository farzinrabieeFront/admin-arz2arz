import React from 'react'
import { Badge } from "react-bootstrap";

const CustomizedBadge = ({ variant, children, className, pill }) => {
    return (
        <Badge pill={pill ? pill : null} variant={variant} className={className}>{children}</Badge>
    )
}

export default CustomizedBadge
