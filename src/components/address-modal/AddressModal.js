import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Styles from "./AddressModal.module.scss";
import { BiCheck, BiCopy } from "react-icons/all"
import CustomizedButton from "../form/button/Button";

const AddressModal = ({
    data,
    handleClose,
    onHide,
    show = show,
    ...rest

}) => {
    const [address, setAddress] = useState(0)
    useEffect(() => {
        // console.log('address', address);
    }, [address])


    return (
        <Modal
            {...rest}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            show={show}
        >
            <Modal.Body className="p-3">
                <ul className="row mb-3">
                    <div className="col-12 mb-3"><span className="is-size-6 text-dark">شبکه‌ها (networks)</span></div>
                    <div className="col-12 border-bottom pb-3 d-flex">

                        {
                            data.map((item, index) => {
                                return (
                                    <li key={index}
                                        className="ml-3"
                                        onClick={() => setAddress(index)}
                                    >
                                        <span className={`${Styles.blockchain} ${index === address ? Styles.active : null}  text-dark shadow p-2 border-radius-md  center-content w-100 is-size-7`}>
                                            {item.blockchain?.network}
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </div>

                </ul>
 

                <div className={`${Styles.boxes} shadow py-2 px-3 border-radius-md`}>
                    {data[address]?.address ?
                        <div className="row mb-4">
                            <div className="col-12 mb-3"><span className="is-size-6 text-dark">آدرس‌ها (address)</span></div>
                            <div className="col-12">
                                <div className={`${Styles.address} text-dark border-light border-radius-md p-3 d-flex align-items-center justify-content-end`}>
                                    {/* <span className={`${Styles.icon} center-content text-lightBlue`}><BiCopy size={22} /></span> */}
                                    <span className="is-size-6 en">{data[address]?.address}</span>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                    {data[address]?.tag ?
                        <div className="row mb-4">
                            <div className="col-12 mb-3"><span className="is-size-6">تگ‌ها (tag)</span></div>
                            <div className="col-12">
                                <div className={`${Styles.address} border-light border-radius-md p-3 d-flex align-items-center justify-content-end`}>
                                    {/* <span className={`${Styles.icon} center-content text-lightBlue`}><BiCopy size={22} /></span> */}
                                    <span className="is-size-6 en">{data[address]?.tag}</span>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </div>

            </Modal.Body>

            <Modal.Footer>
                <CustomizedButton variant="yellow" className="px-4" onClick={onHide}>تایید</CustomizedButton>

            </Modal.Footer>

        </Modal>
    );
};
export default AddressModal;
