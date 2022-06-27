import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Form, Formik, Field } from "formik";
import { IoCloseSharp } from 'react-icons/all'
import CustomizedBadge from '../../../../components/badge/Badge'
import ConfirmModal from '../../../../components/confirm-modal/ConfirmModal'
import CustomizedInput from '../../../../components/form/input/Input'
import CustomizedSelect from '../../../../components/form/select/Select'
import CustomizedSwitch from '../../../../components/form/switch/CustomizedSwitch'
import CustomizedTextarea from '../../../../components/form/text-area/Textarea'
import CustomizedModal from '../../../../components/modal/Modal'
import { customerServices, notificationServices } from '../../../../services'
import { Toastify } from '../../../../utils'
import Styles from './Modal.module.scss'
import { notificationValidator } from '../../../../utils/validators';
import CustomizedButton from '../../../../components/form/button/Button';

const NotificationModal = ({ handleClose, show, id, refresh }) => {

    const [isLoading, setIsLoading] = useState(false);

    const status = [
        { _id: "info", title: "info" },
        { _id: "success", title: "success" },
        { _id: "warning", title: "warning" },
        { _id: "error", title: "error" },
    ]
    useEffect(() => {

    }, [])

    const onSubmit = async (vals) => {
        console.log(vals);
        console.log(id);
        try {
            const { data, status } = await notificationServices.private(vals)
            if (status === 200 && data.success) {
                Toastify.success(data.message)
                handleClose()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    return (
        <>
            <CustomizedModal
                show={show}
                size="md"
            >
                <div className={`${Styles.border} d-flex justify-content-between align-items-center text-gainsboro mb-3 pb-3`}>
                    <div className="d-flex flex-column align-items-start justify-content-center">
                        <span className="d-flex ">
                            <span className="is-size-5 en yekan-Bold text-gray-blue">ارسال نوتیفیکیشن </span>
                        </span>

                    </div>
                    <span onClick={handleClose} className="pointer"><IoCloseSharp size="20" /></span>
                </div>
                <div className={`${Styles.border} pb-3 mb-3`}>
                    <Formik
                        initialValues={{ title: "", description: "", type: "privateNotification", status: "", customer: id }}
                        onSubmit={(values, actions) => {
                            onSubmit(values)
                            actions.resetForm();
                        }}
                        validationSchema={notificationValidator.create}
                    >
                        {({ isValid, dirty }) => (
                            <Form className="row justify-content-start align-items-end">

                                <Col md={7} xs={9} className="mb-3">
                                    <Field
                                        name="status"
                                        label="نوع پیغام"
                                        options={status}
                                        as={CustomizedSelect}
                                    />
                                </Col>
                                <Col xs={12} className="mb-3">
                                    <Field
                                        name="title"
                                        label="عنوان"
                                        type="text"
                                        as={CustomizedInput}
                                    />
                                </Col>

                                <Col lg={12} className="mb-3">

                                    <Field
                                        maxRows="12"
                                        minRows="2"
                                        label="توضیحات"
                                        placeholder="توضیحات"
                                        rows="1"
                                        className="p-3"
                                        name="description"
                                        as={CustomizedTextarea}
                                    />
                                </Col>
                                <Col lg={12} className="text-left">
                                    <CustomizedButton
                                        type="submit"
                                        className="  is-size-5 yekan-ExtraBold"
                                        variant="lightBlue"
                                        size="lg"
                                        disabled={isLoading || !(isValid && dirty)}
                                    >
                                        ارسال
                                    </CustomizedButton>
                                </Col>

                            </Form>
                        )}
                    </Formik>
                </div>



            </CustomizedModal>
        </>
    )
}

export default NotificationModal
