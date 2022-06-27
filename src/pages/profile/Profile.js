import React, { useEffect, useState } from 'react';
import { RiUserSettingsLine } from 'react-icons/all';
import { Row, Col } from 'react-bootstrap';
import { useTitle } from '../../context';
import { adminServices } from '../../services';
import Styles from './Profile.module.scss';
import adminAvatar from "../../assets/images/man-admin.png";
import { Toastify } from '../../utils';

export default function ProfilePage() {
    document.title = "ارز تو ارز | پروفایل";
    const { setTitle } = useTitle();
    const [currentAdmin, setCurrentAdmin] = useState({});

    useEffect(() => {
        getAdmin()
        setTitle("پروفایل")
    }, [])

    const getAdmin = async () => {
        try {
            const { status, data } = await adminServices.current()
            if (status === 200 && data.success) {
                setCurrentAdmin(data.data)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    return (
        <div className="mt-5 d-flex flex-wrap justify-content-center">


            <div className={`${Styles.bg} bg-blur shadow col-12`}>
                <div className={`${Styles.titleBlur} pt-4`}><h1 className="is-size-4 yekan-ExtraBold mb-0"><RiUserSettingsLine size={22} className="ml-1" /> پروفایل </h1></div>
                <div className={`${Styles.info} blur`}>
                    <div className="row justify-content-between align-items-center">
                        <div className="col-10 d-flex align-items-center">
                            <div className={`${Styles.avatar} ml-3 col p-0 shadow-sm`}><img src={adminAvatar} /></div>
                            <div className="col d-flex flex-column  ">
                                <h2 className="is-size-4">{currentAdmin.email}</h2>
                                
                                <div className="d-flex flex-wrap justify-content-start">
                                    <div className={`${Styles.adminRoles} ${Styles.editAdmin} d-flex align-items-center justify-content-start flex-wrap`}>
                                        {currentAdmin.role?.map((level, index) => {
                                            return <span className={`${level.role === "manager" ? Styles.manager : Styles.basic} is-size-8 py-1 px-2 m-1 shadow`} key={index}>
                                                {
                                                    level.role === "manager" ? "مدیر"
                                                        :
                                                        level.role === "basic" ? "کارمند"
                                                            :
                                                            null
                                                }{" "}
                                                {level.department?.faName}

                                            </span>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-4 col-12 col-lg-8  p-4 border-radius-lg card-shadow bg-white transition-height">
                <Row>
                    <Col lg={12} className="mb-4"><h2 className="is-size-4 mb-0">اطلاعات کاربری</h2></Col>
                    <Col sm={6} className="mb-4">
                        <div className="d-flex flex-column">
                            <h3 className="is-size-6 text-gainsboro mb-2 yekan-Light">نام</h3>
                            <div className={`${Styles.info} py-2 px-3 border border-radius-md`}><span>{currentAdmin.firstName}</span></div>
                        </div>
                    </Col>
                    <Col sm={6} className="mb-4">
                        <div className="d-flex flex-column">
                            <h3 className="is-size-6 text-gainsboro mb-2 yekan-Light">نام خانوادگی</h3>
                            <div className={`${Styles.info} py-2 px-3 border border-radius-md`}><span>{currentAdmin.lastName}</span></div>
                        </div>
                    </Col>
                    <Col sm={6} className="mb-4 mb-sm-0">
                        <div className="d-flex flex-column">
                            <h3 className="is-size-6 text-gainsboro mb-2 yekan-Light">ایمیل</h3>
                            <div className={`${Styles.info} py-2 px-3 border border-radius-md en`}><span>{currentAdmin.email}</span></div>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="d-flex flex-column">
                            <h3 className="is-size-6 text-gainsboro mb-2 yekan-Light">موبایل</h3>
                            <div className={`${Styles.info} py-2 px-3 border border-radius-md FaNum yekan-Medium`}><span>{currentAdmin.mobile}</span></div>
                        </div>
                    </Col>
                </Row>

            </div>

        </div>
    )
}
