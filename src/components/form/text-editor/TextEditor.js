import { useState, useRef, useEffect, forwardRef } from "react";
import CKEditor from "ckeditor4-react";
import { Form, InputGroup } from "react-bootstrap";
import { config } from "./configEditor";
import Styles from './TextEditor.module.scss'

const TextEditor = ({ label, data, icon: Icon, errorMessage, onChange }) => {
  
    return (
        <>
            <Form.Group className={Styles.ckBox} controlId="formBasicEmail" >
                {label ? (
                    <Form.Label className="mb-2 is-size-7 text-gainsboro">
                        {Icon ? <Icon /> : null}
                        {label}
                    </Form.Label>
                ) : (
                    ""
                )}
                <CKEditor
                  
                    className="cke_rtl"
                    data={data ? data : "<p></p>"}
                    onChange={(event) => {
                        onChange(event.editor.getData());
                    }}
                    config={config}
                />
                {errorMessage ? (
                    <Form.Text className="text-danger">{errorMessage}</Form.Text>
                ) : null}
            </Form.Group>
        </>
    );
};
export default TextEditor;
