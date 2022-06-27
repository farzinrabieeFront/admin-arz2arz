import React, { useEffect, useState } from 'react';
import DateConvert from '../../../../utils/date'
import { Link } from "react-router-dom";
import { RiUserLine, BsThreeDotsVertical, RiChatSmile2Line, TiWarningOutline, BiChevronLeft } from "react-icons/all";
import CustomizedBadge from "../../../../components/badge/Badge";
import { Form, Formik, Field } from "formik";
import { Modal, Button } from "react-bootstrap";
import CustomizedButton from '../../../../components/form/button/Button';
import CustomizedSelect from '../../../../components/form/select/Select';
import { departmentServices, ticketServices } from '../../../../services';
import { Toastify } from '../../../../utils';
import CustomizedModal from '../../../../components/modal/Modal';

const MobileHeader = ({ ticketData }) => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <div className="text-white d-flex p-3 justify-content-between align-items-center">
                <h3 className="mb-0 is-size-6 en"><RiUserLine size={16} /> {ticketData?.customer?.email}</h3>
                <span onClick={() => setOpenModal(true)}><BsThreeDotsVertical size={18} /></span>
            </div>


            <Modal
                show={openModal}
                size="lg"
                onHide={() => setOpenModal()}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="is-size-5">اطلاعات تیکت</Modal.Title>
                </Modal.Header>
                <div className="d-flex flex-column p-3">
                    <h3 className="is-size-6 text-lightBlue mb-3"><RiChatSmile2Line size={14} />  اطلاعات تیکت</h3>
                    <div className='mb-3 d-flex align-items-center flex-wrap'>
                        <span className='ml-2 is-size-7 yekan-Light'>عنوان تیکت:</span>
                        <span className='is-size-7'>{ticketData?.title}</span>
                    </div>
                    <div className='mb-3 d-flex align-items-center flex-wrap'>
                        <span className='ml-2 is-size-7 yekan-Light'>تاریخ ارسال:</span>
                        <span className='FaNum is-size-7'>
                            {DateConvert.getTime(ticketData?.createdAt)}
                            <span className="mx-1 text-gainsboro">|</span>
                            {DateConvert.toShamsiDate(ticketData?.createdAt)}
                        </span>
                    </div>

                    <div className='mb-3 d-flex align-items-center flex-wrap'>
                        <span className='ml-2 is-size-7 yekan-Light'>وضعیت:</span>
                        <CustomizedBadge className="is-size-8"
                            variant={
                                ticketData?.status === "بررسی نشده"
                                    ? "secondary"
                                    : ticketData?.status === "در حال بررسی"
                                        ? "warning"
                                        : ticketData?.status === "بررسی شده"
                                            ? "success"
                                            : "danger"
                            }
                        >
                            {ticketData?.status}
                        </CustomizedBadge>
                    </div>
                    <div className='mb-3 d-flex align-items-center flex-wrap'>
                        <span className='ml-2 is-size-7 yekan-Light'>دپارتمان:</span>
                        <span className='is-size-7 FaNum'>احراز هویت</span>
                    </div>
                    <div className='mb-3'>
                        <Link target="_blank" to={`#`} className="link is-size-7">تغییر دپارتمان  <BiChevronLeft size={14} /></Link>
                    </div>
                    <h3 className="is-size-6 text-lightBlue my-3"><RiUserLine size={14} /> اطلاعات مشتری</h3>
                    <div className='mb-3 d-flex align-items-center flex-wrap'>
                        <span className='ml-2 is-size-7 yekan-Light'>نام و نام خانوادگی:</span>
                        <span className='is-size-7'>فاطمه مجرد </span>
                    </div>
                    <div className='mb-3 d-flex align-items-center flex-wrap'>
                        <span className='ml-2 is-size-7 roboto-Light'>Email:</span>
                        <span className='is-size-7 en'>  {ticketData?.customer?.email}</span>
                    </div>
                    <div className='mb-3 d-flex align-items-center flex-wrap'>
                        <span className='ml-2 is-size-7 yekan-Light'>موبایل:</span>
                        <span className='is-size-7 FaNum'>{ticketData?.customer?.mobile}</span>
                    </div>
                    <div className='mb-3 d-flex align-items-center flex-wrap'>
                        <span className='ml-2 is-size-7 yekan-Light'>احراز هویت:</span>
                        <CustomizedBadge pill className=" is-size-8"
                            variant={ticketData?.customer?.isVerified ? "success" : "danger"}
                        >
                            {ticketData?.customer?.isVerified ?
                                "احراز شده"
                                :
                                "احراز نشده"
                            }
                        </CustomizedBadge>
                    </div>
                    {
                        !ticketData?.customer?.fiatWithdrawAccess ?
                            <div className='mb-3 d-flex align-items-center flex-wrap'>
                                <span className="is-size-7 lightRed"><TiWarningOutline size={16} /> این کاربر اجازه برداشت تومانی ندارد!</span>
                            </div>
                            :
                            null
                    }
                    {
                        !ticketData?.customer?.isActive ?
                            <div className='mb-3 d-flex align-items-center flex-wrap'>
                                <span className="is-size-7 lightRed"><TiWarningOutline size={16} /> این کاربر اجازه برداشت ارزی ندارد!</span>
                            </div>
                            :
                            null
                    }
                    <div className='mb-3'>
                        <Link target="_blank" to={`/users/${ticketData?.customer?._id}`} className="link is-size-7">اطلاعات بیشتر  <BiChevronLeft size={14} /></Link>
                    </div>



                </div>
            </Modal>
        </>
    )
}

export default MobileHeader
