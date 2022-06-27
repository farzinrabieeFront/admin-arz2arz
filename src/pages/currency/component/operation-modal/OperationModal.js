import React, { useEffect, useState } from 'react';

import { VscCloudUpload, IoCloseSharp } from "react-icons/all";
import { Col } from 'react-bootstrap';
import Styles from './OperationModal.module.scss';

import CustomizedModal from '../../../../components/modal/Modal';
import CustomizedInput, { amountFilter } from '../../../../components/form/input/Input';
import CustomizedButton from '../../../../components/form/button/Button';
import CustomizedSwitch from '../../../../components/form/switch/CustomizedSwitch';
import { Field, Form, Formik } from 'formik';
import { currencyServices } from '../../../../services';
import CustomizedUploadIcon from '../../../../components/form/upload-icon/CustomizedUploadIcon';
import currencyValidatior from '../../../../utils/validators/currencyValidatior';
import { Toastify } from '../../../../utils';


const OperationModal = ({ handleClose, show, id, refresh }) => {
    const [currentData, setCurrentData] = useState({})
    const [initialValues, setInitialValues] = useState({})
    const [currencyImage, setCurrencyImageImage] = useState();


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const { data, status } = await currencyServices.single(id)
            const { blockchains, ...others } = data.data
            if (status === 200 && data.success) {
                setCurrentData(others);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    const activeHandler = async (val) => {
        try {
            let body = {
                isActive: val
            }
            const { data, status } = await currencyServices.edit(id, body)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getData()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const isMainHandler = async (val) => {
        try {
            let body = {
                isMain: val
            }
            const { data, status } = await currencyServices.edit(id, body)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getData()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const withdrawHandler = async (val) => {
        try {
            let body = {
                withdrawIsSupport: val
            }
            const { data, status } = await currencyServices.edit(id, body)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getData()

            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const depositHandler = async (val) => {
        try {
            let body = {
                depositIsSupport: val
            }
            const { data, status } = await currencyServices.edit(id, body)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getData()

            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const editHandler = async (vals) => {
        try {
            let formData = new FormData();
            for (let key in vals) {
                if (vals[key] !== currentData[key]) {
                    formData.append(key, vals[key])
                }
            }
            if (currencyImage) {
                formData.append("icon", currencyImage);
            }
            const { data, status } = await currencyServices.edit(id, formData)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getData()
                handleClose()
                refresh()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    return (
        <div>
            <CustomizedModal
                show={show}
                size="lg"
            >
                <div className={`${Styles.border} d-flex justify-content-between align-items-center text-gainsboro mb-3 pb-3`}>
                    <div className="d-flex align-items-center">
                        <span className="d-flex ">
                            <span className="is-size-5 en yekan-Bold text-gray-blue">{currentData?.symbol}</span>
                            <span className="is-size-6 text-gainsboro en mr-2 text-gainsboro">({currentData?.name})</span>
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
                                    {
                                        currentData?.isActive ? "غیرفعال سازی"
                                            :
                                            "فعال سازی"
                                    }
                                </span>
                                <CustomizedSwitch
                                    handleChange={() => activeHandler(!currentData?.isActive)}
                                    checked={currentData?.isActive}
                                />
                            </div>
                        </Col>
                        <Col lg={6} className="mb-3">
                            <div className={`${Styles.operation} d-flex align-items-center border-radius-md justify-content-between w-100 p-4`}>
                                <span className="pl-2 is-size-6 text-gray-blue">قابلیت واریز (deposit)</span>
                                <CustomizedSwitch
                                    handleChange={() => depositHandler(!currentData?.depositIsSupport)}
                                    checked={currentData?.depositIsSupport}
                                />
                            </div>
                        </Col>
                        <Col lg={6} className="mb-3">
                            <div className={`${Styles.operation} d-flex align-items-center border-radius-md justify-content-between w-100 p-4`}>
                                <span className="pl-2 is-size-6 text-gray-blue">ارز مهم</span>
                                <CustomizedSwitch
                                    handleChange={() => isMainHandler(!currentData?.isMain)}
                                    checked={currentData?.isMain}
                                />
                            </div>
                        </Col>
                        <Col lg={6} className="mb-3">
                            <div className={`${Styles.operation} d-flex align-items-center border-radius-md justify-content-between w-100 p-4`}>
                                <span className="pl-2 is-size-6 text-gray-blue">قابلیت برداشت (withdraw)</span>
                                <CustomizedSwitch
                                    handleChange={() => withdrawHandler(!currentData?.withdrawIsSupport)}
                                    checked={currentData?.withdrawIsSupport}
                                />
                            </div>
                        </Col>
                    </div>
                </div>
                <div className={`${Styles.border} pb-3 mb-3`}>
                    <Formik
                        initialValues={currentData}
                        onSubmit={editHandler}
                        enableReinitialize={true}
                        // validationSchema={currencyValidatior.edit}
                    >
                        {({ isValid, dirty }) => (
                            <Form className="row justify-content-start align-items-center">

                                <Col lg={12} className="mb-4">
                                    <span className="is-size-6 text-gray-blue">ویرایش</span>
                                </Col>
                                <Col lg={2} className="mb-3 d-flex justify-content-center justify-content-lg-start">
                                    <Field
                                        name="icon"
                                        icon={<VscCloudUpload size="70" />}
                                        // imageSrc={`http://194.5.192.82:4000/api/v1/spotCurrency/images/${currentData.icon}`}
                                        imageSrc={currentData.icon ? `http://194.5.192.82:4000/api/v1/spotCurrency/images/${currentData.icon}` : null}
                                        data={currencyImage}
                                        handleSetFiles={(e) => setCurrencyImageImage(e.target.files[0])}
                                        handleDeleteFiles={() => setCurrencyImageImage()}
                                        as={CustomizedUploadIcon}
                                    />
                                </Col>
                                <Col lg={4} className="mb-3">
                                    <Field
                                        name="faName"
                                        light
                                        placeholder="بیت کوین"
                                        label="تعیین نام فارسی"
                                        as={CustomizedInput}
                                    />
                                </Col>
                                <Col lg={3} className="mb-3">
                                    <Field
                                        name="minimumTransferAmount"
                                        placeholder="0.01"
                                        type="tel"
                                        light
                                        onKeyPress={amountFilter}
                                        label="تعیین حداقل مقدار واریزی"
                                        as={CustomizedInput}
                                    />
                                </Col>

                                <Col lg={3} className="mb-3">
                                    <Field
                                        name="rank"
                                        onKeyPress={amountFilter}
                                        light
                                        placeholder="1"
                                        label="رتبه (rank)"
                                        as={CustomizedInput}
                                    />
                                </Col>


                                <Col lg={12} className="mt-4 d-flex justify-content-end">
                                    <CustomizedButton
                                        // isFullWidth
                                        type="submit"
                                        className="px-4"
                                        variant="lightBlue"
                                        size="lg"
                                    >
                                        <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                                            ذخیره
                                        </span>
                                    </CustomizedButton>
                                </Col>
                            </Form>
                        )}
                    </Formik>
                </div>

            </CustomizedModal>
        </div>
    )
}

export default OperationModal
