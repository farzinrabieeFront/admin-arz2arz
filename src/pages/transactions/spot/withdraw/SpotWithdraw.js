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

export default function SpotWithdraw() {
    document.title = "ارز تو ارز | تاریخچه برداشت ارزی";
    const { setTitle } = useTitle();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [dataCount, setDataCount] = useState();

    const status = [
        { _id: "PENDING", title: "در حال بررسی" },
        { _id: "CONFIRMED", title: "موفق" },
        { _id: "FAILED", title: "ناموفق" },
        { _id: "CANCELED", title: "لغو شده" },
    ]

    useEffect(() => {
        setTitle("تاریخچه برداشت ارزی");
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
            const { data, status } = await transactionsServices.spot.withdraw.get(params)
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
            const { data, status } = await transactionsServices.spot.withdraw.get(params)
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
                                <h1 className="is-size-5 mb-2">تاریخچه برداشت ارزی</h1>
                                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید تاریخچه تمامی تراکنش‌های برداشت ارزی در صرافی ارز تو ارز را مشاهده نمایید</p>
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
                        <Col lg={3} xs={12} className="mb-3">
                            <Field
                                name="email"
                                placeholder="sample@gmail.com"
                                label="ایمیل"
                                as={CustomizedInput}
                            />
                        </Col>


                        <Col lg={3} xs={12} className="mb-3">
                            <Field
                                name="internalId"
                                placeholder="4YMIQMxkE"
                                label="کد سفارش"
                                as={CustomizedInput}
                            />
                        </Col>
                        <Col lg={3} xs={12} className="mb-3">
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
                            <th>ارز</th>
                            <th>ایمیل</th>
                            <th className="text-center">مقدار</th>
                            <th className="text-center">شبکه</th>
                            <th className="text-center">آدرس</th>
                            <th className="text-center">وضعیت</th>
                            <th className="text-center">کد سفارش</th>
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

                                        <td>{item.symbol}</td>
                                        <td>{item.customer?.email}</td>
                                        <td className="text-center ">   {new Number(item.amount || 0).toFixed(8)}<span className="is-size-8 ml-1 text-gainsboro">{item.symbol}</span></td>
                                        <td className="text-center">{item.network}</td>
                                        <td className="text-center">{item.address}</td>
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
                                                    item.status === "FAILED" ?
                                                        <CustomizedBadge pill variant="danger">
                                                            ناموفق
                                                        </CustomizedBadge>
                                                        :
                                                        <CustomizedBadge pill variant="warning">
                                                            لغو شده
                                                        </CustomizedBadge>
                                            }
                                        </td>
                                        <td className="text-center en">{item.internalId}</td>
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
                                <td colSpan="8">
                                    <NoData />
                                </td>
                            </tr>

                    }
                </CustomizedTable>
            </div>
        </div>
    )
}
