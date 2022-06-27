import { forwardRef } from "react";
import { Form } from "react-bootstrap";
import Styles from './CheckBox.module.scss';
import { ErrorMessage, useField } from "formik";
import { useTheme } from "../../../context";

const CustomizedCheckBox = forwardRef(
    ({   className, ...props }, ref) => {
        const [{ name, checked, value,...field }, { error, touched }] = useField(props);
        const { theme } = useTheme();

        return (
            <Form.Group className={`${className} ${Styles.CheckBox} ${Styles[theme]} mb-0`} controlId="formBasicCheckbox">
                <Form.Check className={Styles.formCheck}
                    type="checkbox"
                    
                    checked={value}
                    name={name}
                    {...props}
                />
            </Form.Group>
        )
    }
);
export default CustomizedCheckBox
