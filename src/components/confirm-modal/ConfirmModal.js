import React from "react";
import Styles from "./ConfirmModal.module.scss";
import { Modal } from "react-bootstrap";
import { TiWarning, IoClose } from "react-icons/all";
import CustomizedButton from "../form/button/Button";
export default function ConfirmModal({
    onHide,
    show="",
    children,
    onConfirm,
    title
}) {
    return (
        <Modal
            //   {...props}
            backdrop="static"
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={`${Styles.modal} `}
            contentClassName={`${Styles.modalContent} rounded-10`}
        >
            {/* <Modal.Header className="d-flex justify-content-between align-items-center">
                <Modal.Title id="contained-modal-title-vcenter">تایید حذف</Modal.Title>
                <IoClose size={30} onClick={onHide} className="pointer"/>
            </Modal.Header> */}
            <Modal.Body className={`${Styles.modalBody}`}>
                <div className="d-flex align-items-center ">
                    <TiWarning size={50} className="mx-3 text-danger" />
                    <span className="is-size-4 yekan-Bold ">
                       
                         {children} 
                        
                    </span>
                </div>
            </Modal.Body>
            <Modal.Footer className={`${Styles.modalFooter}`}>
                <CustomizedButton
                    onClick={onConfirm}
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
        </Modal>
    );
}
