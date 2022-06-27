import React, { useEffect, useState } from 'react'
import { FastField } from "formik";
import { useTitle } from '../../../context';
import { volumeRefCurrencyServices } from '../../../services';
import DateConvert from '../../../utils/date';
import { RiHistoryLine, BsCoin, AiOutlineDollarCircle } from 'react-icons/all'

import Styles from '../RefCurrency.module.scss'
import CustomizedTable from '../../../components/table/Table';
import CustomizedInput, { amountFilter } from '../../../components/form/input/Input';
import CustomizedButton from '../../../components/form/button/Button';
import NoData from "../../../components/no-data/NoData";
import FormikConfirmationModal from '../../../components/formik-modal/FormikConfirmationModal';
import { refCurrencyValidator } from "../../../utils/validators";
import { Toastify } from '../../../utils';

export default function VolumeRefCurrency() {
    document.title = "ارز تو ارز | حجم دارایی صرافی";
    const { setTitle } = useTitle();
    const [currentPage, setCurrentPage] = useState(1);
    const [volumesList, setVolumesList] = useState([]);
    const [volumesCount, setVolumesCount] = useState();
    const [currentVolume, setCurrentVolume] = useState({});
    const [positiveForm, setPositiveForm] = useState(false);
    const [negativeForm, setNegativeForm] = useState(false);

    useEffect(() => {
        setTitle("مدیریت ارز مرجع / حجم دارایی صرافی");
        getCurrentVolume()
    }, [])

    useEffect(() => {
        getVolumes();
    }, [currentPage])


    const getVolumes = async () => {
        try {
            let params = {
                pageNumber: currentPage, perPage: 10,
            }
            const { data, status } = await volumeRefCurrencyServices.get(params);
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
            const { data, status } = await volumeRefCurrencyServices.current();
            if (status === 200 && data.success) {
                setCurrentVolume(data.data);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // post new volume
    const createVolume = async (vals) => {
        try {
            const { data, status } = await volumeRefCurrencyServices.post(vals);
            if (status === 200 & data.success) {
                Toastify.success(data.message)
                getVolumes()
                getCurrentVolume()
                setPositiveForm()
                setNegativeForm()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }


    return (
        <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
            <FormikConfirmationModal show={positiveForm}
                title="افزایش حجم دارایی صرافی"
                backdrop="static"
                Icon={<BsCoin size={25} className="ml-1 text-orange" />}
                onHide={() => setPositiveForm()}
                initialValues={{ price: "", volume: "", AO: "positive" }}
                onSubmit={createVolume}
                validationSchema={refCurrencyValidator.volume}
            >
                <FastField
                    name="volume"
                    icon={<AiOutlineDollarCircle className="text-gainsboro" size={20} />}
                    light
                    className="mb-3 en"
                    onKeyPress={amountFilter}
                    label="حجم ورودی "
                    as={CustomizedInput}
                />
                <FastField
                    name="price"
                    icon={<AiOutlineDollarCircle className="text-gainsboro" size={20} />}
                    light
                    className="en"
                    onKeyPress={amountFilter}
                    label="قیمت ارز مرجع"
                    as={CustomizedInput}
                />
            </FormikConfirmationModal>
            <FormikConfirmationModal show={negativeForm}
                title="کاهش حجم دارایی صرافی"
                backdrop="static"
                Icon={<BsCoin size={25} className="ml-1 text-orange" />}
                onHide={() => setNegativeForm()}
                initialValues={{ price: "", volume: "", AO: "negative" }}
                onSubmit={createVolume}
                validationSchema={refCurrencyValidator.volume}
            >
                <FastField
                    name="volume"
                    light
                    icon={<AiOutlineDollarCircle className="text-gainsboro" size={20} />}
                    className="en mb-3"
                    onKeyPress={amountFilter}
                    label="حجم خروجی"
                    as={CustomizedInput}
                />
                <FastField
                    name="price"
                    light
                    className="en"
                    onKeyPress={amountFilter}
                    icon={<AiOutlineDollarCircle className="text-gainsboro" size={20} />}
                    label="قیمت ارز مرجع"
                    as={CustomizedInput}
                />
            </FormikConfirmationModal>

            <div className="row justify-content-between align-items-center">
            <div className='col-md-6'>
                    <h1 className="is-size-5 mb-2">مدیریت حجم دارایی صرافی</h1>
                    <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید حجم دارایی صرافی ارز تو ارز را مدیریت کنید.</p>
                </div>
                <div className='text-left col-md-6 mt-3 mt-md-0'>
                    <CustomizedButton
                        className="rpx-3 py-2 yekan-Bold ml-3"
                        size="sm"
                        variant="lightRed"
                        onClick={() => setNegativeForm(true)}
                    >
                        کاهش حجم دارایی
                    </CustomizedButton>
                    <CustomizedButton
                        className="px-3 py-2 yekan-Bold"
                        size="sm"
                        variant="success"
                        onClick={() => setPositiveForm(true)}
                    >
                        افزایش حجم دارایی
                    </CustomizedButton>
                </div>
            </div>
            {/* <div className="mt-5 d-flex justify-content-center">
                <div className="col-4">
                    <div className={`${Styles.priceBox} ${Styles.buy} justify-content-between border-radius-lg p-4 shadow d-flex align-items-center`}>
                        <span className="is-size-4 yekan-ExtraBold text-white ml-3 z-index-99">حجم موجود در صرافی</span>
                        <span className="en h2 m-0 text-light">
                            ${new Number(currentVolume.buy).toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="col-4">
                    <div className={`${Styles.priceBox} ${Styles.sell} justify-content-between border-radius-lg p-4 shadow d-flex align-items-center`}>
                        <span className="is-size-4 yekan-ExtraBold text-white ml-3 z-index-99">حد فروش</span>
                        <span className="en h2 m-0 text-light">
                            ${new Number(currentVolume.sell).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div> */}


            <div className="mt-4 col-12 py-3 border-radius-lg card-shadow border">
                <p className="border-bottom text-lightBlue d-flex align-items-center pb-3">
                    <span><RiHistoryLine size="20" className="ml-2" /></span>
                    تاریخچه </p>
                <div>
                    <CustomizedTable
                        header={
                            <>
                                <th className="text-center">حجم </th>
                                <th className="text-center">قیمت ارز مرجع </th>
                                <th className="text-center"> تاریخ </th>
                                <th className="text-center"> ادمین</th>
                                {/* <th className="text-center">وضعیت</th> */}
                            </>
                        }
                        totalRecords={volumesCount}
                        pageVolume={10}
                        handleChangePage={(page) => setCurrentPage(page)}
                    >
                        {
                            volumesList.length ?
                                volumesList.map((item, index) => {
                                    return (
                                        <tr key={index} className={currentVolume?._id === item._id ? "active" : null}>
                                            <td className="text-center ltr">
                                                {new Number(item.volume) > 0 ?
                                                    <span className="text-success">{new Number(item.volume).toLocaleString()}</span>
                                                    :
                                                    <span className="text-danger">{new Number(item.volume).toLocaleString()}</span>

                                                }
                                            </td>
                                            <td className="text-center ltr">
                                                {new Number(item.price).toLocaleString()}
                                            </td>
                                            <td className="text-center">
                                                {DateConvert.getTime(item.createdAt)}
                                                <span className="mx-1 text-gainsboro">|</span>
                                                {DateConvert.toShamsiDate(item.createdAt)}
                                            </td>
                                            <td className="text-center">{item.admin?.email}</td>
                                            {/* <td className="text-center">

                                        {currentVolume?._id === item._id ?
                                            <CustomizedBadge pill variant="primary" className="shadow fill">
                                                فعال
                                            </CustomizedBadge>
                                            :
                                            <CustomizedBadge pill variant="secondary" className="shadow">
                                                منسوخ شده
                                            </CustomizedBadge>
                                        }
                                    </td> */}
                                        </tr>
                                    );
                                })
                                :
                                <tr>
                                    <td colSpan="4">
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