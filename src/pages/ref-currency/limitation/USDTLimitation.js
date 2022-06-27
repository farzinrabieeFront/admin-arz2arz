import React, { useEffect, useState } from 'react'
import { Field } from "formik";
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
import { refCurrencyValidator } from '../../../utils/validators';
import { Toastify } from '../../../utils';

export default function USDTLimitation() {
    document.title = "ارز تو ارز | حد فروش تتر";
    const { setTitle } = useTitle();
    const [currentPage, setCurrentPage] = useState(1);
    const [usdtLimitationList, setUsdtLimitationList] = useState([]);
    const [usdtLimitationCount, setUsdtLimitationCount] = useState();
    const [currentUsdtLimit, setCurrentUsdtLimit] = useState({});
    const [usdtLimitForm, setUsdtLimitForm] = useState(false);

    useEffect(() => {
        setTitle("مدیریت ارز مرجع / حد فروش تتر");
        getCurrentUsdtLimit()
    }, [])

    useEffect(() => {
        getUsdtLimitation();
    }, [currentPage])

    // get limit list 
    const getUsdtLimitation = async () => {
        try {
            let params = {
                pageNumber: currentPage, perPage: 10,
            }
            const { data, status } = await limitRefCurrencyServices.usdt.get(params);
            if (status === 200 && data.success) {
                setUsdtLimitationList(data.result); //todo data.data beshe
                setUsdtLimitationCount(data.count)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // get current limit
    const getCurrentUsdtLimit = async () => {
        try {
            const { data, status } = await limitRefCurrencyServices.usdt.current();
            if (status === 200 && data.success) {
                setCurrentUsdtLimit(data.data);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // post new limit
    const createUsdtLimit = async (vals) => {
        try {
            const { data, status } = await limitRefCurrencyServices.usdt.post(vals);
            if (status === 201 & data.success) {
                Toastify.success(data.message)
                getUsdtLimitation()
                getCurrentUsdtLimit()
                setUsdtLimitForm()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    return (
        <div>
            <FormikConfirmationModal show={usdtLimitForm}
                title="حد فروش تتر"
                backdrop="static"
                Icon={<BsCoin size={25} className="ml-1 text-orange" />}
                onHide={() => setUsdtLimitForm()}
                initialValues={{ salesLimit: "" }}
                onSubmit={createUsdtLimit}
                validationSchema={refCurrencyValidator.USDTlimitation}
            >
                <Field
                    name="salesLimit"
                    icon={<AiOutlineDollarCircle className="text-gainsboro" size={20} />}
                    light
                    label="حد فروش"
                    className="en"
                    onKeyPress={amountFilter}
                    as={CustomizedInput}
                    type="tel"
                />
            </FormikConfirmationModal>

            <div className="row justify-content-between align-items-center">
                <div className='col-md-9'>
                    <h1 className="is-size-5 mb-2">مدیریت حد فروش تتر</h1>
                    <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید حد فروش تتر  در صرافی ارز تو ارز را مدیریت کنید.</p>
                </div>
                <div className='text-left col-md-3 mt-3 mt-md-0'>
                    <CustomizedButton
                        className="px-3 py-2 yekan-Bold"
                        size="sm"
                        variant="lightBlue"
                        onClick={() => setUsdtLimitForm(true)}
                    >
                        تعیین محدودیت
                    </CustomizedButton>
                </div>
            </div>
            <div className="mt-5 row justify-content-center">

                <div className="col-lg-4 col-md-6 col-12">
                    <div className={`${Styles.priceBox} ${Styles.sell} justify-content-between border-radius-lg p-4 shadow d-flex align-items-center`}>
                        <span className="is-size-4 yekan-ExtraBold text-white ml-3 z-index-9">حد فروش</span>
                        <span className="en h2 m-0 text-light z-index-9">
                            ${new Number(currentUsdtLimit.salesLimit ? currentUsdtLimit.salesLimit : 0).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>


            <div className="mt-5 col-12 py-3 border-radius-lg shadow border">
                <p className="border-bottom text-lightBlue d-flex align-items-center pb-3">
                    <span><RiHistoryLine size="20" className="ml-2" /></span>
                    تاریخچه حد فروش تتر </p>
                <div>
                    <CustomizedTable
                        header={
                            <>

                                <th className="text-center">حد فروش </th>
                                <th className="text-center"> تاریخ </th>
                                <th className="text-center"> ادمین</th>
                                <th className="text-center">وضعیت</th>
                            </>
                        }
                        totalRecords={usdtLimitationCount}
                        pageLimit={10}
                        handleChangePage={(page) => setCurrentPage(page)}
                    >
                        {
                            usdtLimitationList.length ?
                                usdtLimitationList.map((item, index) => {
                                    return (
                                        <tr key={index} className={currentUsdtLimit?._id === item._id ? "active" : null}>

                                            <td className="text-center">
                                                {new Number(item.salesLimit).toLocaleString()}
                                            </td>
                                            <td className="text-center">
                                                {DateConvert.getTime(item.createdAt)}
                                                <span className="mx-1 text-gainsboro">|</span>
                                                {DateConvert.toShamsiDate(item.createdAt)}
                                            </td>
                                            <td className="text-center">{item.admin?.email}</td>
                                            <td className="text-center">

                                                {currentUsdtLimit?._id === item._id ?
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