import React from "react";
import Styles from "./ImageModal.module.scss";
import { Modal } from "react-bootstrap";
import { TiWarning, IoClose } from "react-icons/all";
import CustomizedButton from "../form/button/Button";

export default function ImageModal({
    onHide,
    show = "",
    children,
    onConfirm,
    imgSrc,
    videoSrc,
    title
}) {
    return (
        <Modal
            onHide={onHide}
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={`${Styles.modal} `}
            contentClassName={`${Styles.modalContent} rounded-10`}
            dialogClassName="image-modal"
            size="lg"
        >

            <Modal.Body className={`${Styles.modalBody}`}>
                <div className="d-flex align-items-center justify-content-center">
                    {
                        videoSrc ?
                            <video width="400" controls>
                                <source src={videoSrc} type="video/mp4" />
                            </video>
                            :
                            imgSrc ?
                                <img src={imgSrc} />
                                : null
                    }
                    {children}

                    <div
                        onClick={onHide}
                        className={`${Styles.close} pointer`}
                    >
                        {/* بستن */}
                        <IoClose size="25" />
                    </div>
                </div>
            </Modal.Body>

        </Modal>
    );
}
