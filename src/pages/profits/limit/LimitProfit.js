import React, { useEffect, useState } from 'react';
import { Col } from "react-bootstrap";
import { Form, Formik, Field } from "formik";

import { useTitle } from "../../../context";
import { profitServices } from '../../../services';
import DateConvert from '../../../utils/date';
import PersianDatePicker from "../../../components/form/datepicker/PersianDatePicker";
import NoData from "../../../components/no-data/NoData";
import CustomizedTable from "../../../components/table/Table";
import CustomizedButton from "../../../components/form/button/Button";
import CustomizedBadge from '../../../components/badge/Badge';
import { Toastify } from '../../../utils';

export default function LimitProfit() {
    document.title = "ارز تو ارز | سود معاملات اتوماتیک";
    const { setTitle } = useTitle();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [limitList, setLimitList] = useState([]);
    const [limitCount, setLimitCount] = useState();


    useEffect(() => {
        setTitle("سود معاملات اتوماتیک");
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
                type : "LIMIT"
            }
            const { data, status } = await profitServices.get(params)
            if (status === 200 && data.success) {
                setLimitList(data.data.result);
                setLimitCount(data.data.count);
            }
        } catch (error) {
            Toastify.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    const searchProfit = async (vals) => {
        try {
            setIsLoading(true)
 
            let body = {}
            const { startAt, endAt, ...other } = vals
            body = {
                startAt: new Date(startAt).getTime(),
                endAt: new Date(endAt).getTime(),
            }
            let params = {
                pageNumber: currentPage,
                perPage: 10,
                type : "LIMIT",
                ...body,
            }
            const { data, status } = await profitServices.get(params)
            if (status === 200 && data.success) {
                setLimitList(data.data.result);
                setLimitCount(data.data.count);
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
                initialValues={{ startAt: new Date(), endAt: new Date() }}
                onSubmit={searchProfit}
            >
                {({ isValid, dirty, resetForm }) => (
                    <Form className="row justify-content-start align-items-end">
                        <Col lg={12} className="mb-4 d-flex justify-content-between align-items-center">
                            <div>
                                <h1 className="is-size-5 mb-2">سود معاملات اتوماتیک</h1>
                                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید سود معاملات اتوماتیک ارز تو ارز را مشاهده نمایید</p>
                            </div>

                        </Col>
                        <Col md={3} xs={6} className="mb-3">
                            <Field
                                name="startAt"
                                label="از تاریخ"
                                as={PersianDatePicker}
                            />
                        </Col>
                        <Col md={3} xs={6} className="mb-3">
                            <Field
                                name="endAt"
                                label="تا تاریخ"
                                as={PersianDatePicker}
                            />
                        </Col>
                        <Col md={6} xs={12} className="mb-3 d-flex justify-content-end">
                            <CustomizedButton
                                onClick={() => {
                                    resetForm({ symbol: "", startAt: new Date(), endAt: new Date() })
                                    removeFilters()
                                }}
                                className="ml-3"
                                variant="orange"
                                size="lg"
                            >
                                <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                                    حذف فیلترها
                                </span>
                            </CustomizedButton>

                            <CustomizedButton
                                type="submit"
                                className="px-4"
                                variant="lightBlue"
                                size="lg"
                            >
                                <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                                    جستجو
                                </span>
                            </CustomizedButton>
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
                            <th className="text-center">سود</th>
                            <th className="text-center">نوع</th>
                            <th className="text-center">تاریخ</th>
                        </>
                    }
                    totalRecords={limitCount}
                    pageLimit={10}
                    handleChangePage={(page) => setCurrentPage(page)}
                >
                    {
                        limitList.length ?
                            limitList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.symbol}</td>
                                        <td>{item.customer?.email}</td>
                                        <td className="text-center">{item.amount}</td>
                                        <td className="text-center">
                                            {item.side === "BUY" ? (
                                                <CustomizedBadge pill className="no-min-width" variant="success">
                                                    خرید
                                                </CustomizedBadge>
                                            )
                                                :
                                                item.side === "SELL" ?
                                                    (
                                                        <CustomizedBadge pill className="no-min-width" variant="danger">
                                                            فروش
                                                        </CustomizedBadge>
                                                    )
                                                    :
                                                    "__"
                                            }
                                        </td>
                                        <td className="text-center">
                                            {DateConvert.getTime(item.createdAt)}
                                            <span className="mx-1 text-gainsboro">|</span>
                                            {DateConvert.toShamsiDate(item.createdAt)}
                                        </td>
                                    </tr>
                                );
                            })
                            :
                            <tr>
                                <td colSpan="5">
                                    <NoData />
                                </td>
                            </tr>

                    }
                </CustomizedTable>
            </div>
        </div>
    )
}
