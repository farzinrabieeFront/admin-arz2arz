import React, { useEffect, useState } from 'react';
import { FastField } from "formik";
import { useTitle } from '../../../context';
import { priceRefCurrencyServices } from '../../../services';
import DateConvert from '../../../utils/date';
import { RiHistoryLine, BsCoin, AiOutlineDollarCircle } from 'react-icons/all'

import Styles from '../RefCurrency.module.scss'
import CustomizedTable from '../../../components/table/Table';
import CustomizedInput, { amountFilter } from '../../../components/form/input/Input';
import CustomizedButton from '../../../components/form/button/Button';
import CustomizedBadge from '../../../components/badge/Badge';
import NoData from "../../../components/no-data/NoData";
import FormikConfirmationModal from '../../../components/formik-modal/FormikConfirmationModal';
import { refCurrencyValidator } from "../../../utils/validators";
import { Toastify } from '../../../utils';


export default function PriceRefCurrency() {
    document.title = "ارز تو ارز | قیمت خرید و فروش ارز مرجع";
    const { setTitle } = useTitle();
    const [currentPage, setCurrentPage] = useState(1);
    const [pricesList, setPricesList] = useState([]);
    const [pricesCount, setPricesCount] = useState();
    const [currentPrice, setCurrentPrice] = useState({});
    const [priceForm, setPriceForm] = useState(false);

    useEffect(() => {
        setTitle("مدیریت ارز مرجع / قیمت خرید و فروش ارز مرجع");
        getCurrentPrice()
    }, [])

    useEffect(() => {
        getPrices();
    }, [currentPage])

    // get price list 
    const getPrices = async () => {
        try {
            let params = {
                pageNumber: currentPage, perPage: 10,
            }
            const { data, status } = await priceRefCurrencyServices.get(params);
            if (status === 200 && data.success) {
                setPricesList(data.data.result);
                setPricesCount(data.data.count)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // get current price
    const getCurrentPrice = async () => {
        try {
            const { data, status } = await priceRefCurrencyServices.current();
            if (status === 200 && data.success) {
                setCurrentPrice(data.data);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // post new price
    const createPrice = async (vals) => {
        try {
            const { data, status } = await priceRefCurrencyServices.post(vals);
            if (status === 200 & data.success) {
                Toastify.success(data.message)
                getPrices()
                getCurrentPrice()
                setPriceForm()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    return (
        <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
            <FormikConfirmationModal show={priceForm}
                backdrop="static"
                title="تعیین قیمت ارز مرجع"
                Icon={<BsCoin size={25} className="ml-1 text-orange" />}
                onHide={() => setPriceForm()}
                initialValues={{ down: "", up: "" }}
                onSubmit={createPrice}
                validationSchema={refCurrencyValidator.price}
            >
                <FastField
                    name="down"
                    light
                    icon={<AiOutlineDollarCircle className="text-gainsboro" size={20} />}
                    className="mb-3 en"
                    onKeyPress={amountFilter}
                    label="قیمت خرید از مشتری"
                    as={CustomizedInput}
                />
                <FastField
                    name="up"
                    light
                    icon={<AiOutlineDollarCircle className="text-gainsboro" size={20} />}
                    className="en"
                    onKeyPress={amountFilter}
                    label="قیمت فروش به مشتری"
                    as={CustomizedInput}
                />
            </FormikConfirmationModal>

            <div className="row justify-content-between align-items-center">
                <div className='col-md-9'>
                    <h1 className="is-size-5 mb-2">مدیریت قیمت خرید و فروش ارز مرجع</h1>
                    <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید قیمت خرید و فروش ارز مرجع (USDT) در صرافی ارز تو ارز را مدیریت کنید.</p>
                </div>
                <div className='text-left col-md-3 mt-3 mt-md-0'>
                    <CustomizedButton
                        className="px-3 py-2 yekan-Bold"
                        size="sm"
                        variant="lightBlue"
                        onClick={() => setPriceForm(true)}
                    >
                        تعیین قیمت جدید
                    </CustomizedButton>
                </div>
            </div>
            <div className="mt-5 row justify-content-center">
                <div className="col-lg-4 col-md-6 col-12 mb-3 mb-md-0">
                    <div className={`${Styles.priceBox} ${Styles.buy} justify-content-between border-radius-lg p-4 shadow d-flex align-items-center`}>
                        <span className="is-size-4 yekan-ExtraBold text-white ml-3 z-index-9">قیمت خرید از مشتری</span>
                        <span className="en h2 m-0 text-light z-index-9">
                            ${new Number(currentPrice.down ? currentPrice.down : 0).toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                    <div className={`${Styles.priceBox} ${Styles.sell} justify-content-between border-radius-lg p-4 shadow d-flex align-items-center`}>
                        <span className="is-size-4 yekan-ExtraBold text-white ml-3 z-index-9">قیمت فروش به مشتری</span>
                        <span className="en h2 m-0 text-light z-index-9">
                            ${new Number(currentPrice.up ? currentPrice.up : 0).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>


            <div className="mt-5 col-12 py-3 border-radius-lg card-shadow border">
                <p className="border-bottom text-lightBlue d-flex align-items-center pb-3">
                    <span><RiHistoryLine size="20" className="ml-2" /></span>
                    تاریخچه قیمت‌های ثبت شده</p>
                <div>
                    <CustomizedTable
                        header={
                            <>
                                <th className="text-center">قیمت خرید از مشتری </th>
                                <th className="text-center">قیمت فروش به مشتری </th>
                                <th className="text-center"> تاریخ </th>
                                <th className="text-center"> ادمین</th>
                                <th className="text-center">وضعیت</th>
                            </>
                        }
                        totalRecords={pricesCount}
                        pageLimit={10}
                        handleChangePage={(page) => setCurrentPage(page)}
                    >
                        {
                            pricesList.length ?
                                pricesList.map((item, index) => {
                                    return (
                                        <tr key={index} className={currentPrice?._id === item._id ? "active" : null}>
                                            <td className="text-center">
                                                {new Number(item.down).toLocaleString()}
                                            </td>
                                            <td className="text-center">
                                                {new Number(item.up).toLocaleString()}
                                            </td>
                                            <td className="text-center">
                                                {DateConvert.getTime(item.createdAt)}
                                                <span className="mx-1 text-gainsboro">|</span>
                                                {DateConvert.toShamsiDate(item.createdAt)}
                                            </td>
                                            <td className="text-center">{item.admin?.email}</td>
                                            <td className="text-center">

                                                {currentPrice?._id === item._id ?
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