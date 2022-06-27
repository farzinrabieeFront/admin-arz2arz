import React, { useEffect, useState } from 'react'
import { useTitle } from '../../../../context';
import { fiatOrderLimitServices } from '../../../../services';
import DateConvert from '../../../../utils/date';
import { RiHistoryLine } from 'react-icons/all'

import { Form, Formik, Field } from "formik";
import CustomizedTable from '../../../../components/table/Table';
import CustomizedInput, { amountFilter } from '../../../../components/form/input/Input';
import CustomizedBadge from '../../../../components/badge/Badge';
import CustomizedButton from '../../../../components/form/button/Button';
import NoData from "../../../../components/no-data/NoData";
import { Col, Row } from 'react-bootstrap';
import { fiatVolumeLimitValidator } from '../../../../utils/validators';
import { Toastify } from '../../../../utils';

const FiatOrderlimit = () => {
    document.title = "ارز تو ارز | حد معاملات خرید و فروش ارز";
    const { title, setTitle } = useTitle();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [volumesList, setVolumesList] = useState([]);
    const [volumesCount, setVolumesCount] = useState(0);
    const [currentVolume, setCurrentVolume] = useState({});
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        setTitle(" تنظیمات معاملات / خرید و فروش ارز/ حد معاملات خرید و فروش ارز");
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
            const { data, status } = await fiatOrderLimitServices.get(params);
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
            const { data, status } = await fiatOrderLimitServices.current();
            if (status === 200 && data.success) {
                const { fiatBuy, fiatSell, ...others } = data.data;
                setCurrentVolume(others)
                setInitialValues({
                    fiatBuyLow: fiatBuy.lowest,
                    fiatBuyHigh: fiatBuy.highest,
                    fiatSellLow: fiatSell.lowest,
                    fiatSellHigh: fiatSell.highest,
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
                fiatBuyLow,
                fiatBuyHigh,
                fiatSellLow,
                fiatSellHigh,

            } = vals;
            body = {
                fiatBuy: {
                    lowest: fiatBuyLow,
                    highest: fiatBuyHigh,
                },
                fiatSell: {
                    lowest: fiatSellLow,
                    highest: fiatSellHigh,
                },

            }
            const { data, status } = await fiatOrderLimitServices.post(body);
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
                <h1 className="is-size-5 mb-2">مدیریت حد معاملات خرید و فروش ارز</h1>
                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید حجم دارایی صرافی ارز تو ارز را مدیریت کنید.</p>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                enableReinitialize={true}
                validationSchema={fiatVolumeLimitValidator.create}
            >
                {({ isValid, dirty }) => (
                    <Form className="row justify-content-end align-items-end">
                        <Col lg={6} className="mb-3">
                            <Row>
                                <Col lg={12} className="mb-3"><span className="yekan-Bold text-lightBlue">خرید</span></Col>
                                <Col xs={6}>
                                    <Field
                                        type="tel"
                                        name="fiatBuyLow"
                                        label="کمترین حد خرید ارز به USDT"
                                        className="en"
                                        onKeyPress={amountFilter}
                                        // readonly
                                        as={CustomizedInput}
                                    />
                                </Col>
                                <Col xs={6}>
                                    <Field
                                        type="tel"
                                        name="fiatBuyHigh"
                                        label="بیشترین حد خرید ارز به USDT"
                                        className="en"
                                        onKeyPress={amountFilter}
                                        // readonly
                                        as={CustomizedInput}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={6} className="mb-3">
                            <Row>
                                <Col lg={12} className="mb-3"><span className="yekan-Bold text-lightBlue"> فروش</span></Col>
                                <Col xs={6}>
                                    <Field
                                        type="tel"
                                        name="fiatSellLow"
                                        label="کمترین حد فروش ارز به USDT"
                                        className="en"
                                        onKeyPress={amountFilter}
                                        // readonly
                                        as={CustomizedInput}
                                    />
                                </Col>
                                <Col xs={6}>
                                    <Field
                                        type="tel"
                                        name="fiatSellHigh"
                                        label="بیشترین حد فروش ارز به USDT"
                                        className="en"
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
                                <th className="text-center"> خرید </th>
                                <th className="text-center">فروش  </th>
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
                                                    <span className="text-success en is-size-8 ml-1">USDT</span>
                                                    <span className="text-success en">{new Number(item.fiatBuy.highest || 0).toLocaleString()}</span>
                                                    <span className="mx-2">/</span>
                                                    <span className="text-danger en is-size-8 ml-1">USDT</span>
                                                    <span className="text-danger en">{new Number(item.fiatBuy.lowest || 0).toLocaleString()}</span>
                                                </div>
                                            </td>
                                            <td className="text-center ltr">
                                                <div className="d-flex flex-row-reverse center-content">
                                                    <span className="text-success en is-size-8 ml-1">USDT</span>
                                                    <span className="text-success en">{new Number(item.fiatSell.highest || 0).toLocaleString()}</span>
                                                    <span className="mx-2">/</span>
                                                    <span className="text-danger en is-size-8 ml-1">USDT</span>
                                                    <span className="text-danger en">{new Number(item.fiatSell.lowest || 0).toLocaleString()}</span>
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

export default FiatOrderlimit


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