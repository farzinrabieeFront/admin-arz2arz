import React from 'react'
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import { RiEditLine } from "react-icons/all"
import FormikInitialValues from "../../../utils/constants/formikInitialValues";
import DateConvert from '../../../utils/date';
import CustomizedTable from "../../../components/table/Table";
import CustomizedButton from "../../../components/form/button/Button";
import CustomizedInput from "../../../components/form/input/Input";
import CustomizedSelect from "../../../components/form/select/Select";
import CustomizedBadge from "../../../components/badge/Badge";
import NoData from "../../../components/no-data/NoData";
import { useTitle } from "../../../context";
import { transactionsServices } from "../../../services";
import { Link } from 'react-router-dom';
import { Toastify } from '../../../utils';

const statusWithdraw = {
    PENDING: { title: "در حال بررسی", variant: "secondary" },
    ASSIGNED: { title: "در حال انجام", variant: "warning" },
    CONFIRMED: { title: "پرداخت شده", variant: "success" },
    CANCELED: { title: "رد شده", variant: "danger" },
}
export default function FiatWithdrawPage() {
    document.title = "ارز تو ارز | تاریخچه برداشت تومانی";
    const { setTitle } = useTitle();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [dataCount, setDataCount] = useState();

    const status = [
        { _id: "PENDING", title: "در حال بررسی" },
        { _id: "ASSIGNED", title: "در حال انجام" },
        { _id: "CONFIRMED", title: "پرداخت شده" },
        { _id: "CANCELED", title: "رد شده" },
    ]

    useEffect(() => {
        setTitle("درخواست های برداشت تومانی");
    }, [])

    useEffect(() => {
        getList()
    }, [currentPage])

    const getList = async () => {
        try {
            setIsLoading(true)
            let params = {
                pageNumber: currentPage,
                perPage: 10,
            }
            const { data, status } = await transactionsServices.fiat.withdraw.get(params)
            if (status === 200 && data.success) {
                setDataList(data.data.result);
                setDataCount(data.data.count);
            }
        } catch (error) {
            Toastify.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const search = async (vals) => {
        try {
            setIsLoading(true)
            let body = {}
            for (const key in vals) {
                if (vals[key])
                    body = {
                        ...body,
                        [key]: vals[key],
                    }
            }
            let params = {
                pageNumber: currentPage,
                perPage: 10,
                ...body,
            }
            const { data, status } = await transactionsServices.fiat.withdraw.get(params)
            if (status === 200 && data.success) {
                setDataList(data.data.result);
                setDataCount(data.data.count);
            }
        } catch (error) {
            Toastify.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    const removeFilters = () => {
        getList()
    }
    return (
        <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
            <Formik
                initialValues={FormikInitialValues.transactions}
                onSubmit={search}
            >
                {({ isValid, dirty, resetForm }) => (
                    <Form className="row justify-content-start align-items-end">
                        <Col lg={8} className="mb-4">
                            <div className="main-title">
                                <h1 className="is-size-5 mb-2"> برداشت تومانی</h1>
                                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید تمامی تراکنش‌های برداشت تومانی در صرافی ارز تو ارز را مشاهده نمایید</p>
                            </div>
                        </Col>
                        <Col lg={4} className="mb-4">
                            <div className="d-flex justify-content-end">
                                <CustomizedButton
                                    onClick={() => {
                                        resetForm(FormikInitialValues.transactions)
                                        removeFilters()
                                    }}
                                    className="ml-3 is-size-5 yekan-ExtraBold"
                                    variant="orange"
                                    size="lg"
                                >
                                    حذف فیلترها
                                </CustomizedButton>
                                <CustomizedButton
                                    type="submit"
                                    className="px-4 is-size-5 yekan-ExtraBold"
                                    variant="lightBlue"
                                    size="lg"
                                >
                                    جستجو
                                </CustomizedButton>
                            </div>
                        </Col>
                        <Col lg={3} sm={4} className="mb-3">
                            <Field
                                name="email"
                                placeholder="sample@gmail.com"
                                label="ایمیل"
                                as={CustomizedInput}
                            />
                        </Col>


                        <Col lg={3} sm={4} className="mb-3">
                            <Field
                                name="trackingCode"
                                placeholder="EivldhBJt-1637401203038"
                                label="کد پیگیری"
                                as={CustomizedInput}
                            />
                        </Col>
                        <Col lg={3} sm={4} className="mb-3">
                            <Field
                                name="status"
                                label="وضعیت"
                                options={status}
                                as={CustomizedSelect}
                            />
                        </Col>
                    </Form>
                )}
            </Formik>
            <div>
                <CustomizedTable
                    header={
                        <>
                            <th>ایمیل</th>
                            <th className="text-center">مقدار</th>
                            <th className="text-center">وضعیت</th>
                            <th className="text-center">کد پیگیری</th>
                            <th className="text-center">تاریخ</th>
                            <th className="text-center">assign شده به</th>
                            <th className="text-center">...</th>
                        </>
                    }
                    totalRecords={dataCount}
                    pageLimit={10}
                    handleChangePage={(page) => setCurrentPage(page)}
                >
                    {
                        dataList.length ?
                            dataList.map((item, index) => {
                                return (
                                    <tr key={index}>

                                        <td>{item.customer?.email}</td>
                                        <td className="text-center FaNum">{new Number(item.amount).toLocaleString()} <span className="mr-1 is-size-8 text-gainsboro">تومان</span></td>
                                        <td className="text-center">
                                            <CustomizedBadge pill variant={statusWithdraw[item.status].variant}>
                                                {statusWithdraw[item.status].title}
                                            </CustomizedBadge>
                                        </td>
                                        <td className="text-center en">{item.trackingCode}</td>
                                        <td className="text-center FaNum">
                                            {DateConvert.getTime(item.createdAt)}
                                            <span className="mx-1 text-gainsboro">|</span>
                                            {DateConvert.toShamsiDate(item.createdAt)}
                                        </td>
                                        <td className="text-center">
                                            {item.assignedAdmin ?
                                                <CustomizedBadge variant="purple">
                                                    {item.assignedAdmin?.firstName}{" "}{item.assignedAdmin?.lastName}
                                                </CustomizedBadge>
                                                :
                                                "__"
                                            }
                                        </td>

                                        <td className="text-center">
                                            <Link
                                                to={`/fiat/fiat-withdraw/${item._id}`}
                                                className="text-lightBlue yekan-Bold "
                                            >
                                                <RiEditLine size={20} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                            :
                            <tr>
                                <td colSpan="7">
                                    <NoData />
                                </td>
                            </tr>

                    }
                </CustomizedTable>
            </div>
        </div>
    )
}
