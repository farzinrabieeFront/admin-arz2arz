import React, { useEffect, useState } from 'react'
import { Toastify } from '../../../utils';
import { FastField } from "formik";
import { useTitle } from '../../../context';
import { limitRefCurrencyServices } from '../../../services';
import DateConvert from '../../../utils/date';
import { RiHistoryLine, BsCoin, AiOutlineDollarCircle } from 'react-icons/all'

import Styles from '../RefCurrency.module.scss'
import CustomizedTable from '../../../components/table/Table';
import CustomizedInput, { amountFilter } from '../../../components/form/input/Input';
import CustomizedButton from '../../../components/form/button/Button';
import CustomizedBadge from '../../../components/badge/Badge';
import FormikConfirmationModal from '../../../components/formik-modal/FormikConfirmationModal';
import NoData from '../../../components/no-data/NoData';
import { refCurrencyValidator } from "../../../utils/validators";

export default function LimitationRefCurrency() {
    document.title = "ارز تو ارز | حد فروش صرافی";
    const { setTitle } = useTitle();
    const [currentPage, setCurrentPage] = useState(1);
    const [limitationList, setLimitationList] = useState([]);
    const [limitationCount, setLimitationCount] = useState();
    const [currentLimit, setCurrentLimit] = useState({});
    const [limitForm, setLimitForm] = useState(false);

    useEffect(() => {
        setTitle("مدیریت ارز مرجع / حد خرید و فروش صرافی");
        getCurrentLimit()
    }, [])

    useEffect(() => {
        getLimitation();
    }, [currentPage])

    // get limit list 
    const getLimitation = async () => {
        try {
            let params = {
                pageNumber: currentPage, perPage: 10,
            }
            const { data, status } = await limitRefCurrencyServices.get(params);
            if (status === 201 && data.success) {
                setLimitationList(data.data.result);
                setLimitationCount(data.data.count)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // get current limit
    const getCurrentLimit = async () => {
        try {
            const { data, status } = await limitRefCurrencyServices.current();
            if (status === 201 && data.success) {
                setCurrentLimit(data.data);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // post new limit
    const createLimit = async (vals) => {
        try {
            const { data, status } = await limitRefCurrencyServices.post(vals);
            if (status === 201 & data.success) {
                Toastify.success(data.message)
                getLimitation()
                getCurrentLimit()
                setLimitForm()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    return (
        <div className="">
            <FormikConfirmationModal show={limitForm}
                title="حد خرید و فروش صرافی"
                backdrop="static"
                Icon={<BsCoin size={25} className="ml-1 text-orange" />}
                onHide={() => setLimitForm()}
                initialValues={{ sell: "", buy: "", symbol: "USDT" }}
                onSubmit={createLimit}
                validationSchema={refCurrencyValidator.limitation}
            >
                <FastField
                    name="buy"
                    icon={<AiOutlineDollarCircle className="text-gainsboro" size={20} />}
                    light
                    className="mb-3 en"
                    onKeyPress={amountFilter}
                    label="حد خرید "
                    as={CustomizedInput}
                />
                <FastField
                    name="sell"
                    icon={<AiOutlineDollarCircle className="text-gainsboro" size={20} />}
                    light
                    className="en"
                    onKeyPress={amountFilter}
                    label="حد فروش"
                    as={CustomizedInput}
                />
            </FormikConfirmationModal>

            <div className="row justify-content-between align-items-center">
                <div className='col-md-9'>
                    <h1 className="is-size-5 mb-2">مدیریت حد خرید و فروش صرافی</h1>
                    <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید حد خرید و فروش صرافی ارز تو ارز را مدیریت کنید.</p>
                </div>
                <div className='text-left col-md-3 mt-3 mt-md-0'>
                    <CustomizedButton
                        className="px-3 py-2 yekan-Bold"
                        size="sm"
                        variant="lightBlue"
                        onClick={() => setLimitForm(true)}
                    >
                        تعیین محدودیت
                    </CustomizedButton>
                </div>
            </div>
            <div className="mt-5 row justify-content-center">
            <div className="col-lg-4 col-md-6 col-12 mb-3 mb-md-0">
                    <div className={`${Styles.priceBox} ${Styles.buy} justify-content-between border-radius-lg p-4 shadow d-flex align-items-center`}>
                        <span className="is-size-4 yekan-ExtraBold text-white ml-3 z-index-9">حد خرید</span>
                        <span className="en h2 m-0 text-light z-index-9">
                            ${new Number(currentLimit.buy ? currentLimit.buy : 0).toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className={`${Styles.priceBox} ${Styles.sell} justify-content-between border-radius-lg p-4 shadow d-flex align-items-center`}>
                        <span className="is-size-4 yekan-ExtraBold text-white ml-3 z-index-9">حد فروش</span>
                        <span className="en h2 m-0 text-light z-index-9">
                            ${new Number(currentLimit.sell ? currentLimit.sell : 0).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>


            <div className="mt-5 col-12 py-3 border-radius-lg shadow border">
                <p className="border-bottom text-lightBlue d-flex align-items-center pb-3">
                    <span><RiHistoryLine size="20" className="ml-2" /></span>
                    تاریخچه حد خرید و فروش </p>
                <div>
                    <CustomizedTable
                        header={
                            <>
                                <th className="text-center">حد خرید </th>
                                <th className="text-center">حد فروش </th>
                                <th className="text-center"> تاریخ </th>
                                <th className="text-center"> ادمین</th>
                                <th className="text-center">وضعیت</th>
                            </>
                        }
                        totalRecords={limitationCount}
                        pageLimit={10}
                        handleChangePage={(page) => setCurrentPage(page)}
                    >
                        {
                            limitationList.length ?
                                limitationList.map((item, index) => {
                                    return (
                                        <tr key={index} className={currentLimit?._id === item._id ? "active" : null}>
                                            <td className="text-center">
                                                {new Number(item.buy).toLocaleString()}
                                            </td>
                                            <td className="text-center">
                                                {new Number(item.sell).toLocaleString()}
                                            </td>
                                            <td className="text-center">
                                                {DateConvert.getTime(item.createdAt)}
                                                <span className="mx-1 text-gainsboro">|</span>
                                                {DateConvert.toShamsiDate(item.createdAt)}
                                            </td>
                                            <td className="text-center">{item.admin?.email}</td>
                                            <td className="text-center">

                                                {currentLimit?._id === item._id ?
                                                    <CustomizedBadge pill variant="primary">
                                                        فعال
                                                    </CustomizedBadge>
                                                    :
                                                    <CustomizedBadge pill variant="secondary">
                                                        منسوخ شده
                                                    </CustomizedBadge>
                                                }
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
        </div>
    )
}