import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { IoCloseSharp } from 'react-icons/all'
import CustomizedBadge from '../../../../components/badge/Badge'
import ConfirmModal from '../../../../components/confirm-modal/ConfirmModal'
import CustomizedSwitch from '../../../../components/form/switch/CustomizedSwitch'
import CustomizedModal from '../../../../components/modal/Modal'
import { customerServices } from '../../../../services'
import { Toastify } from '../../../../utils'
import Styles from './Modal.module.scss'

const UserModal = ({ handleClose, show, id, refresh }) => {
    const [detail, setDetail] = useState([]);
    const [fiatWithdrawConfirmModal, setFiatWithdrawConfirmModal] = useState(false);
    const [spotWithdrawConfirmModal, setSpotWithdrawConfirmModal] = useState(false);
    const [bannUserConfirmModal, setBannUserConfirmModal] = useState(false);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const { data, status } = await customerServices.single(id);
            if (status === 200) { 
                const { twoFactorAuthentication, ...others } = data.data
                setDetail(others)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    const fiatWithdrawAccessHandler = async (canWithdraw) => {
        let body = {
            canWithdraw
        }
        try {
            const { data, status } = await customerServices.update(id, body)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getData();
                refresh();
                setFiatWithdrawConfirmModal()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const spotWithdrawAccessHandler = async (isDeleted) => {
        let body = {
            isDeleted
        }
        try {
            const { data, status } = await customerServices.update(id, body)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getData();
                refresh();
                setSpotWithdrawConfirmModal()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const bannUserHandler = async (isBanned) => {
        let body = {
            isBanned
        }
        try {
            const { data, status } = await customerServices.update(id, body)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getData();
                refresh();
                setBannUserConfirmModal()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    return (
        <>
            <ConfirmModal show={spotWithdrawConfirmModal}
                onHide={() => setSpotWithdrawConfirmModal()}
                onConfirm={() => spotWithdrawAccessHandler(!detail?.isDeleted)}
            >
                {detail?.isDeleted ?
                    <span className="is-size-6">آیا از محدودیت دسترسی کاربر {detail.email} به برداشت ارزی مطمئنید؟</span>
                    :
                    <span className="is-size-6">آیا از لغو محدودیت دسترسی کاربر {detail.email} به برداشت ارزی مطمئنید؟</span>
                }
            </ConfirmModal>
            <ConfirmModal show={fiatWithdrawConfirmModal}
                onHide={() => setFiatWithdrawConfirmModal()}
                onConfirm={() => fiatWithdrawAccessHandler(!detail?.canWithdraw)}
            >
                {detail?.canWithdraw ?
                    <span className="is-size-6">آیا از محدودیت دسترسی کاربر {detail.email} به برداشت تومانی مطمئنید؟</span>
                    :
                    <span className="is-size-6">آیا از لغو محدودیت دسترسی کاربر {detail.email} به برداشت تومانی مطمئنید؟</span>
                }
            </ConfirmModal>
            <ConfirmModal show={bannUserConfirmModal}
                onHide={() => setBannUserConfirmModal()}
                onConfirm={() => bannUserHandler(!detail?.isBanned)}
            >
                {!detail?.isBanned ?
                    <span className="is-size-6">آیا از محدودیت دسترسی کاربر {detail.email} به پنل کاربری مطمئنید؟</span>
                    :
                    <span className="is-size-6">آیا از لغو محدودیت دسترسی کاربر {detail.email} به پنل کاربری مطمئنید؟</span>
                }
            </ConfirmModal>


            <CustomizedModal
                show={show}
                size="lg"
            >
                <div className={`${Styles.border} d-flex justify-content-between align-items-center text-gainsboro mb-3 pb-3`}>
                    <div className="d-flex flex-column align-items-start justify-content-center">
                        <span className="d-flex ">
                            <span className="is-size-5 en yekan-Bold text-gray-blue"> {detail.email} </span>
                            <span className="is-size-6 text-gainsboro en mr-2 text-gainsboro">({detail.identity?.firstName}{" "}{detail.identity?.lastName})</span>
                        </span>
                        <span className="FaNum is-size-7 mt-2 text-gray-blue">

                            {detail.identity?.mobile ?
                                <span className="ml-2">{detail.identity?.mobile}</span>
                                :
                                null}
                            <span>
                                {detail?.isVerified ?
                                    <CustomizedBadge variant="success">
                                        احراز شده
                                    </CustomizedBadge>
                                    :
                                    <CustomizedBadge variant="danger">
                                        احراز نشده
                                    </CustomizedBadge>
                                }
                            </span>
                        </span>
                    </div>
                    <span onClick={handleClose} className="pointer"><IoCloseSharp size="20" /></span>
                </div>

                <div className={`${Styles.border} pb-3 mb-3`}>
                    <div className="row align-items-center">
                        <Col lg={12} className="mb-3">
                            <span className="is-size-6 text-gray-blue">عملیات</span>
                        </Col>
                        <Col lg={6} className="mb-3">
                            <div className={`${Styles.operation} d-flex align-items-center border-radius-md justify-content-between w-100 p-4`}>
                                <span className="pl-2 is-size-6 text-gray-blue">
                                    دسترسی برداشت تومانی
                                </span>
                                <CustomizedSwitch
                                    handleChange={() => setFiatWithdrawConfirmModal(true)}
                                    checked={detail?.canWithdraw}
                                />
                            </div>
                        </Col>
                        <Col lg={6} className="mb-3">
                            <div className={`${Styles.operation} d-flex align-items-center border-radius-md justify-content-between w-100 p-4`}>
                                <span className="pl-2 is-size-6 text-gray-blue">دسترسی برداشت ارزی</span>
                                <CustomizedSwitch
                                    handleChange={() => setSpotWithdrawConfirmModal(true)}
                                    checked={detail?.isDeleted}
                                />
                            </div>
                        </Col>
                        <Col lg={6} className="mb-3">
                            <div className={`${Styles.operation} d-flex align-items-center border-radius-md justify-content-between w-100 p-4`}>
                                <span className="pl-2 is-size-6 text-gray-blue">دسترسی ورود به پنل</span>

                                <CustomizedSwitch
                                    handleChange={() => setBannUserConfirmModal(true)}
                                    checked={!detail?.isBanned}
                                />
                            </div>
                        </Col>

                    </div>
                </div>


            </CustomizedModal>
        </>
    )
}

export default UserModal
