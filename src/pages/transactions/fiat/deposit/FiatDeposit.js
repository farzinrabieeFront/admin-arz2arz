import React from 'react'
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Form, Formik, Field } from "formik";

import FormikInitialValues from "../../../../utils/constants/formikInitialValues";
import DateConvert from '../../../../utils/date';
import CustomizedTable from "../../../../components/table/Table";
import CustomizedButton from "../../../../components/form/button/Button";
import CustomizedInput from "../../../../components/form/input/Input";
import CustomizedSelect from "../../../../components/form/select/Select";
import CustomizedBadge from "../../../../components/badge/Badge";
import NoData from "../../../../components/no-data/NoData";
import { useTitle } from "../../../../context";
import { transactionsServices } from "../../../../services";
import { Toastify } from '../../../../utils';

export default function FiatDeposit() {
    document.title = "ارز تو ارز | تاریخچه واریز تومانی";
    const { setTitle } = useTitle();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [dataCount, setDataCount] = useState();

    const status = [
        { _id: "PENDING", title: "در حال بررسی" },
        { _id: "CONFIRMED", title: "موفق" },
        { _id: "CANCELED", title: "لغو شده" },
    ]

    useEffect(() => {
        setTitle("تاریخچه واریز تومانی");
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
            const { data, status } = await transactionsServices.fiat.deposit.get(params)
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
            const { data, status } = await transactionsServices.fiat.deposit.get(params)
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
        <div>
            <Formik
                initialValues={FormikInitialValues.transactions}
                onSubmit={search}
            >
                {({ isValid, dirty, resetForm }) => (
                    <Form className="row justify-content-start align-items-end">
                        <Col lg={8} className="mb-4">
                            <div className="main-title">
                                <h1 className="is-size-5 mb-2">تاریخچه واریز تومانی</h1>
                                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید تاریخچه تمامی تراکنش‌های واریز تومانی در صرافی ارز تو ارز را مشاهده نمایید</p>
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
                        <Col lg={3} xs={6} className="mb-3">
                            <Field
                                name="email"
                                placeholder="sample@gmail.com"
                                label="ایمیل"
                                as={CustomizedInput}
                            />
                        </Col>
                        <Col lg={3} xs={6} className="mb-3">
                            <Field
                                name="refId"
                                placeholder="12345678"
                                label="شناسه پرداخت "
                                as={CustomizedInput}
                            />
                        </Col>

                        <Col lg={3} sm={6} xs={12} className="mb-3">
                            <Field
                                name="trackingCode"
                                placeholder="EivldhBJt-1637401203038"
                                label="کد پیگیری"
                                as={CustomizedInput}
                            />
                        </Col>
                        <Col lg={3} sm={6} xs={12} className="mb-3">
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
                            <th className="text-center">شناسه پرداخت</th>
                            <th className="text-center">کد پیگیری</th>
                            <th className="text-center">تاریخ</th>
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
                                        <td className="text-center FaNum">{new Number(item.amount).toLocaleString()}<span className="mr-1 is-size-8 text-gainsboro">تومان</span></td>
                                        <td className="text-center">
                                            {item.status === "PENDING" ?
                                                <CustomizedBadge pill variant="secondary">
                                                    در حال بررسی
                                                </CustomizedBadge>
                                                :
                                                item.status === "CONFIRMED" ?
                                                    <CustomizedBadge pill variant="success">
                                                        موفق
                                                    </CustomizedBadge>
                                                    :
                                                    <CustomizedBadge pill variant="danger">
                                                        لغو شده
                                                    </CustomizedBadge>
                                            }
                                        </td>
                                        <td className="text-center FaNum">{item.refId}</td>
                                        <td className="text-center en">{item.trackingCode}</td>
                                        <td className="text-center FaNum">
                                            {DateConvert.getTime(item.createdAt)}
                                            <span className="mx-1 text-gainsboro">|</span>
                                            {DateConvert.toShamsiDate(item.createdAt)}
                                        </td>
                                    </tr>
                                );
                            })
                            :
                            <tr>
                                <td colSpan="6">
                                    <NoData />
                                </td>
                            </tr>


                    }
                </CustomizedTable>
            </div>
        </div>
    )
}
