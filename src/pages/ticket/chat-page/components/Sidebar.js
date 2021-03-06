import React, { useEffect, useState } from 'react';
import DateConvert from '../../../../utils/date'
import { Link } from "react-router-dom";
import { TiWarningOutline, RiUserLine, BiChevronLeft, RiChatSmile2Line } from "react-icons/all";
import CustomizedBadge from "../../../../components/badge/Badge";
import { Field } from "formik";
import CustomizedSelect from '../../../../components/form/select/Select';
import { departmentServices, ticketServices } from '../../../../services';
import { Toastify } from '../../../../utils';
import FormikConfirmationModal from '../../../../components/formik-modal/FormikConfirmationModal';
import CustomizedButton from '../../../../components/form/button/Button';

const TicketSidebar = ({ ticketData, refresh }) => {
    const [department, setDepartment] = useState([]);
    const [departmentModal, setDepartmentModal] = useState(false);
    const [formikData, setFormikData] = useState({});

    useEffect(() => {
        getDepartments()
    }, [])

    useEffect(() => {
        setFormikData({
            department: ticketData?.department?._id
        })
    }, [ticketData])


    const getDepartments = async () => {
        try {
            const { data, status } = await departmentServices.get()
            if (status === 200 && data.success) {
                let dataList = [];
                for (let i in data.data.result) {
                    dataList.push({
                        _id: data.data.result[i]._id,
                        title: data.data.result[i].faName
                    })
                }
                setDepartment(dataList)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    const changeDepartment = async (vals) => {
        console.log(vals);
        let body = {}
        const { department, ...other } = vals
        body = {
            department
        }
        let id = ticketData?._id
        try {
            const { data, status } = await ticketServices.changeDepartment(id, body);
            if (status === 200 && data.success) {
                Toastify.success(data.message)
                setDepartmentModal()
                refresh()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const closeTicket = async (id) => {
        try {
            let body = {
                status: "???????? ??????"
            }
            const { data, status } = await ticketServices.changeStatus(id, body);
            if (status === 200 && data.success) {
                Toastify.success(data.message)
                refresh()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const openTicket = async (id) => {
        try {
            let body = {
                status: "???? ?????? ??????????"
            }
            const { data, status } = await ticketServices.changeStatus(id, body);
            if (status === 200 && data.success) {
                Toastify.success(data.message) 
                refresh()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    return (
        <div className="d-flex flex-column p-3">
            <FormikConfirmationModal show={departmentModal}
                backdrop="static"
                title="?????????? ????????????????"
                onHide={() => setDepartmentModal()}
                initialValues={formikData}
                enableReinitialize={true}
                onSubmit={changeDepartment}
            >
                <Field
                    name="department"
                    light
                    className="mb-3"
                    options={department}
                    label="????????????????"
                    as={CustomizedSelect}
                />
            </FormikConfirmationModal>

            <h3 className="is-size-6 text-lightBlue mb-3"><RiChatSmile2Line size={14} />  ?????????????? ????????</h3>
            <div className='mb-3 d-flex align-items-center flex-wrap'>
                <span className='ml-2 is-size-7 yekan-Light'>?????????? ????????:</span>
                <span className='is-size-7'>{ticketData?.title}</span>
            </div>
            <div className='mb-3 d-flex align-items-center flex-wrap'>
                <span className='ml-2 is-size-7 yekan-Light'>?????????? ??????????:</span>
                <span className='FaNum is-size-7'>
                    {DateConvert.getTime(ticketData?.createdAt)}
                    <span className="mx-1 text-gainsboro">|</span>
                    {DateConvert.toShamsiDate(ticketData?.createdAt)}
                </span>
            </div>

            <div className='mb-3 d-flex align-items-center flex-wrap'>
                <span className='ml-2 is-size-7 yekan-Light'>??????????:</span>
                <CustomizedBadge className="is-size-8"
                    variant={
                        ticketData?.status === "?????????? ????????"
                            ? "secondary"
                            : ticketData?.status === "???? ?????? ??????????"
                                ? "warning"
                                : ticketData?.status === "?????????? ??????"
                                    ? "success"
                                    : "danger"
                    }
                >
                    {ticketData?.status}
                </CustomizedBadge>
            </div>
            <div className='mb-3 d-flex align-items-center flex-wrap'>
                <span className='ml-2 is-size-7 yekan-Light'>????????????????:</span>
                <span className='is-size-7 FaNum'>{ticketData?.department?.faName}</span>
            </div>
            <div className='mb-3'>
                <span onClick={() => setDepartmentModal(true)} target="_blank" className="link is-size-7 pointer">?????????? ????????????????  <BiChevronLeft size={14} /></span>
            </div>
            <h3 className="is-size-6 text-lightBlue my-3"><RiUserLine size={14} /> ?????????????? ??????????</h3>
            <div className='mb-3 d-flex align-items-center flex-wrap'>
                <span className='ml-2 is-size-7 yekan-Light'>?????? ?? ?????? ????????????????:</span>
                <span className='is-size-7'>{ticketData?.customer?.customerIdentity?.firstName}{" "}{ticketData?.customer?.customerIdentity?.lastName}</span>
            </div>
            <div className='mb-3 d-flex align-items-center flex-wrap'>
                <span className='ml-2 is-size-7 roboto-Light'>Email:</span>
                <span className='is-size-7 en'>  {ticketData?.customer?.email}</span>
            </div>
            <div className='mb-3 d-flex align-items-center flex-wrap'>
                <span className='ml-2 is-size-7 yekan-Light'>????????????:</span>
                <span className='is-size-7 FaNum'>{ticketData?.customer?.customerIdentity?.mobile}</span>
            </div>
            <div className='mb-3 d-flex align-items-center flex-wrap'>
                <span className='ml-2 is-size-7 yekan-Light'>?????????? ????????:</span>
                <CustomizedBadge pill className=" is-size-8"
                    variant={ticketData?.customer?.isVerified ? "success" : "danger"}
                >
                    {ticketData?.customer?.isVerified ?
                        "?????????? ??????"
                        :
                        "?????????? ????????"
                    }
                </CustomizedBadge>
            </div>
            {
                !ticketData?.customer?.fiatWithdrawAccess ?
                    <div className='mb-3 d-flex align-items-center flex-wrap'>
                        <span className="is-size-7 lightRed"><TiWarningOutline size={16} /> ?????? ?????????? ?????????? ???????????? ???????????? ??????????!</span>
                    </div>
                    :
                    null
            }
            {
                !ticketData?.customer?.isActive ?
                    <div className='mb-3 d-flex align-items-center flex-wrap'>
                        <span className="is-size-7 lightRed"><TiWarningOutline size={16} /> ?????? ?????????? ?????????? ???????????? ???????? ??????????!</span>
                    </div>
                    :
                    null
            }
            <div className='mb-3'>
                <Link target="_blank" to={`/users/${ticketData?.customer?._id}`} className="link is-size-7">?????????????? ??????????  <BiChevronLeft size={14} /></Link>
            </div>




            <div className='mt-3 center-content'>
 

                {ticketData.status === "???????? ??????" ?

                    <CustomizedButton variant='success' size='sm' onClick={() => openTicket(ticketData._id)}>?????? ???????? ????????</CustomizedButton>
                    :
                    <CustomizedButton variant='lightRed' size='sm' onClick={() => closeTicket(ticketData._id)}>???????? ????????</CustomizedButton>
                }

            </div>
        </div>
    )
}

export default TicketSidebar

{/* <Formik
initialValues={{ title: "" }}
onSubmit={(values, actions) => {
    createCategoryItem(values)
    actions.resetForm();
}}
>
{({ isValid, dirty }) => (
    <Form className="d-flex justify-content-start align-items-stretch">
        <div className="col-9 p-0" >
            <Field
                name="department"
                options={department}
                as={CustomizedSelect}
            />
        </div>
        <div className="col-3 pl-0 pr-1">
            <Button

                type="submit"
                className="p-0 w-100 h-100"
                variant="light"
                size="sm"
            >
                <HiCheck size={18} />
            </Button>
        </div>

    </Form>
)}
</Formik> */}