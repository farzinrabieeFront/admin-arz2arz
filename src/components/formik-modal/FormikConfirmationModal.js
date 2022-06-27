import React from "react";
import Styles from "./FormikConfirmationModal.module.scss";
import { Modal } from "react-bootstrap";
import { TiWarning, BiEdit } from "react-icons/all";
import CustomizedButton from "../form/button/Button";
import { Form, Formik, FastField } from "formik";
export default function FormikConfirmationModal({
    onHide,
    show,
    onSubmit,
    initialValues,
    children,
    Icon,
    title, 
    ...rest
}) {
    return (
        <Modal
            show={show}
            centered
            className={`${Styles.modal} `}
           
            backdrop="static"
            contentClassName={`${Styles.modalContent} rounded-10`}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                {...rest}
            >
                {({ isValid, dirty }) => (
                    <Form className="d-flex flex-wrap justify-content-start align-items-end">
                        <Modal.Body className={`${Styles.modalBody} col-12`}>
                            <p>
                            {Icon}
                                {/* <BiEdit size={25} className="ml-2 text-danger" /> */}
                                <span className="is-size-4 yekan-Bold text-dark">
                                     
                                    {" "}{title}
                                </span>
                            </p>
                            {children}
                        </Modal.Body>
                        <Modal.Footer className={`${Styles.modalFooter} col-12`}>
                            <CustomizedButton
                                type="submit"
                                variant="success"
                                className="px-4 yekan-ExtraBold is-size-5"
                            >
                                تایید
                            </CustomizedButton>
                            <CustomizedButton
                                onClick={onHide}
                                variant="text"
                                className="px-4 text-secondary yekan-ExtraBold is-size-5"
                            >
                                لغو
                            </CustomizedButton>
                        </Modal.Footer>

                    </Form>
                )}
            </Formik>
        </Modal>
    );
}
