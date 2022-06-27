import React, { useEffect, useState } from 'react'
import { useTitle } from '../../../context';
import { fiatTransactionLimitServices } from '../../../services';
import DateConvert from '../../../utils/date';
import { RiHistoryLine } from 'react-icons/all'

import { Form, Formik, Field } from "formik";
import CustomizedTable from '../../../components/table/Table';
import CustomizedInput, { amountFilter } from '../../../components/form/input/Input';
import CustomizedBadge from '../../../components/badge/Badge';
import CustomizedButton from '../../../components/form/button/Button';
import NoData from "../../../components/no-data/NoData";
import { Col, Row } from 'react-bootstrap';
import { fiatTransactionVolumeLimitValidator } from '../../../utils/validators';
import { Toastify } from '../../../utils';

const FiatTransactionlimit = () => {
    document.title = "ارز تو ارز | حد واریز و برداشت تومانی";
    const { title, setTitle } = useTitle();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [volumesList, setVolumesList] = useState([]);
    const [volumesCount, setVolumesCount] = useState(0);
    const [currentVolume, setCurrentVolume] = useState({});
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        setTitle("مدیریت ارز مرجع / حد واریز و برداشت تومانی");
        getCurrentVolume()
    }, [])
    useEffect(() => {
        getVolumes();
    }, [currentPage])

    const getVolumes = async () => {
        try {
            let params = {
                pageNumber: currentPage,
                perPage: 10
            }
            const { data, status } = await fiatTransactionLimitServices.get(params);
            if (status === 200 && data.success) {
                setVolumesList(data.data.result);
                setVolumesCount(data.data.count)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // get current volume
    const getCurrentVolume = async () => {
        try {
            const { data, status } = await fiatTransactionLimitServices.current();
            if (status === 200 && data.success) {
                const { fiatDeposit, fiatWithdraw, ...others } = data.data;
                setCurrentVolume(others)
                setInitialValues({
                    fiatDepositLow: fiatDeposit.lowest,
                    fiatDepositHigh: fiatDeposit.highest,
                    fiatWithdrawLow: fiatWithdraw.lowest,
                    fiatWithdrawHigh: fiatWithdraw.highest,
                })
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const onSubmit = async (vals) => {
        try {
            let body = {}
            const {
                fiatDepositLow,
                fiatDepositHigh,
                fiatWithdrawLow,
                fiatWithdrawHigh,

            } = vals;
            body = {
                fiatDeposit: {
                    lowest: fiatDepositLow,
                    highest: fiatDepositHigh,
                },
                fiatWithdraw: {
                    lowest: fiatWithdrawLow,
                    highest: fiatWithdrawHigh,
                },

            }
            const { data, status } = await fiatTransactionLimitServices.post(body);
            if (status === 200 && data.success) {
                Toastify.success(data.message)
                getVolumes();
                getCurrentVolume()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    return (
        <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
            <div className="mb-4">
                <h1 className="is-size-5 mb-2">مدیریت حد واریز و برداشت تومانی</h1>
                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید حجم دارایی صرافی ارز تو ارز را مدیریت کنید.</p>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                enableReinitialize={true}
                validationSchema={fiatTransactionVolumeLimitValidator.create}
            >
                {({ isValid, dirty }) => (
                    <Form className="row justify-content-end align-items-end">
                        <Col lg={6} className="mb-3">
                            <Row>
                                <Col lg={12} className="mb-3"><span className="yekan-Bold text-lightBlue">واریز تومانی</span></Col>
                                <Col xs={6}>
                                    <Field
                                        type="tel"
                                        name="fiatDepositLow"
                                        placeholder="کمترین حد"
                                        label="کمترین حد واریز تومانی به تومان"
                                        className="FaNum"
                                        onKeyPress={amountFilter}
                                        // readonly
                                        as={CustomizedInput}
                                    />
                                </Col>
                                <Col xs={6}>
                                    <Field
                                        type="tel"
                                        name="fiatDepositHigh"
                                        placeholder="بیشترین حد"
                                        label="بیشترین حد واریز تومانی به تومان"
                                        className="FaNum"
                                        onKeyPress={amountFilter}
                                        // readonly
                                        as={CustomizedInput}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={6} className="mb-3">
                            <Row>
                                <Col lg={12} className="mb-3"><span className="yekan-Bold text-lightBlue">برداشت تومانی</span></Col>
                                <Col xs={6}>
                                    <Field
                                        type="tel"
                                        name="fiatWithdrawLow"
                                        placeholder="کمترین حد"
                                        label="کمترین حد برداشت تومانی به تومان"
                                        className="FaNum"
                                        onKeyPress={amountFilter}
                                        // readonly
                                        as={CustomizedInput}
                                    />
                                </Col>
                                <Col xs={6}>
                                    <Field
                                        type="tel"
                                        name="fiatWithdrawHigh"
                                        placeholder="بیشترین حد"
                                        label="بیشترین حد برداشت تومانی به تومان"
                                        className="FaNum"
                                        onKeyPress={amountFilter}
                                        // readonly
                                        as={CustomizedInput}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={12} className="mt-3 text-left">
                            <CustomizedButton
                                type="submit"
                                className="px-5"
                                variant="lightBlue"
                                size="lg"
                                disabled={isLoading || !(isValid && dirty)}
                            >
                                <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                                    ذخیره
                                </span>
                            </CustomizedButton>
                        </Col>
                    </Form>
                )}
            </Formik>


            <div className="mt-4">
                <p className="border-bottom text-lightBlue d-flex align-items-center pb-3">
                    <span><RiHistoryLine size="20" className="ml-2" /></span>
                    تاریخچه </p>
                <div>
                    <CustomizedTable
                        header={
                            <>
                                <th className="text-center">واریز تومانی </th>
                                <th className="text-center">برداشت تومانی </th>

                                <th className="text-center"> تاریخ </th>
                                <th className="text-center"> ادمین</th>
                                <th className="text-center">وضعیت</th>
                            </>
                        }
                        totalRecords={volumesCount}
                        pageLimit={10}
                        handleChangePage={(page) => setCurrentPage(page)}
                    >
                        {
                            volumesList.length ?
                                volumesList.map((item, index) => {
                                    return (
                                        <tr key={index} className={currentVolume?._id === item._id ? "active" : null}>
                                            <td className="text-center ltr">
                                                <div className="d-flex flex-row-reverse center-content">
                                                    <span className="text-success FaNum">{new Number(item.fiatDeposit.highest || 0).toLocaleString()}</span>
                                                    <span className="text-success is-size-8 mr-1">تومان</span>
                                                    <span className="mx-2">/</span>
                                                    <span className="text-danger FaNum">{new Number(item.fiatDeposit.lowest || 0).toLocaleString()}</span>
                                                    <span className="text-danger is-size-8 mr-1">تومان</span>
                                                </div>
                                            </td>
                                            <td className="text-center ltr">
                                                <div className="d-flex flex-row-reverse center-content">
                                                    <span className="text-success FaNum">{new Number(item.fiatWithdraw.highest || 0).toLocaleString()}</span>
                                                    <span className="text-success is-size-8 mr-1">تومان</span>
                                                    <span className="mx-2">/</span>
                                                    <span className="text-danger FaNum">{new Number(item.fiatWithdraw.lowest || 0).toLocaleString()}</span>
                                                    <span className="text-danger is-size-8 mr-1">تومان</span>
                                                </div>
                                            </td>


                                            <td className="text-center">
                                                {DateConvert.getTime(item.createdAt)}
                                                <span className="mx-1 text-gainsboro">|</span>
                                                {DateConvert.toShamsiDate(item.createdAt)}
                                            </td>
                                            <td className="text-center">{item.author?.email}</td>
                                            <td className="text-center">
                                                {currentVolume?._id === item._id ?
                                                    <CustomizedBadge pill variant="primary" className="shadow fill">
                                                        فعال
                                                    </CustomizedBadge>
                                                    :
                                                    <CustomizedBadge pill variant="secondary" className="shadow">
                                                        منسوخ شده
                                                    </CustomizedBadge>
                                                }
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
        </div>
    )
}

export default FiatTransactionlimit


// <Col lg={6} className="mb-3">
//                             <Row>
//                                 <Col lg={12} className="mb-3"><span className="yekan-Bold text-lightBlue">خرید</span></Col>
//                                 <Col xs={6}>
//                                     <Field
//                                         type="tel"
//                                         name="fiatBuyLow"
//                                         placeholder="کمترین حد"
//                                         label="کمترین حد"
//                                         className="en"
//                                         onKeyPress={amountFilter}
//                                         // readonly
//                                         as={CustomizedInput}
//                                     />
//                                 </Col>
//                                 <Col xs={6}>
//                                     <Field
//                                         type="tel"
//                                         name="fiatBuyHigh"
//                                         placeholder="بیشترین حد"
//                                         label="بیشترین حد"
//                                         className="en"
//                                         onKeyPress={amountFilter}
//                                         // readonly
//                                         as={CustomizedInput}
//                                     />
//                                 </Col>
//                             </Row>
//                         </Col>
//                         <Col lg={6} className="mb-3">
//                             <Row>
//                                 <Col lg={12} className="mb-3"><span className="yekan-Bold text-lightBlue">فروش</span></Col>
//                                 <Col xs={6}>
//                                     <Field
//                                         type="tel"
//                                         name="fiatSellLow"
//                                         placeholder="کمترین حد"
//                                         label="کمترین حد"
//                                         className="en"
//                                         onKeyPress={amountFilter}
//                                         // readonly
//                                         as={CustomizedInput}
//                                     />
//                                 </Col>
//                                 <Col xs={6}>
//                                     <Field
//                                         type="tel"
//                                         name="fiatSellHigh"
//                                         placeholder="بیشترین حد"
//                                         label="بیشترین حد"
//                                         className="en"
//                                         onKeyPress={amountFilter}
//                                         // readonly
//                                         as={CustomizedInput}
//                                     />
//                                 </Col>
//                             </Row>
//                         </Col>