import React, { useEffect, useState } from 'react';
import { FastField } from "formik";
import { useTitle } from '../../../context';
import { fiatExchangeWalletServices } from '../../../services';
import DateConvert from '../../../utils/date';
import { RiHistoryLine, BsCoin, AiOutlineDollarCircle } from 'react-icons/all'

import CustomizedTable from '../../../components/table/Table';
import CustomizedInput, { amountFilter } from '../../../components/form/input/Input';
import CustomizedButton from '../../../components/form/button/Button';
import NoData from "../../../components/no-data/NoData";
import FormikConfirmationModal from '../../../components/formik-modal/FormikConfirmationModal';
import { fiatExchangeWalletValidator } from "../../../utils/validators";
import { Toastify } from '../../../utils';

export default function FiatExchangeWallet() {
    document.title = "ارز تو ارز | دارایی تومانی صرافی";
    const { title, setTitle } = useTitle();
    const [currentPage, setCurrentPage] = useState(1);
    const [volumesList, setVolumesList] = useState([]);
    const [volumesCount, setVolumesCount] = useState();
    const [currentVolume, setCurrentVolume] = useState({});
    const [positiveForm, setPositiveForm] = useState(false);
    const [negativeForm, setNegativeForm] = useState(false);

    useEffect(() => {
        setTitle("مدیریت ارز مرجع / دارایی تومانی صرافی");
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
            const { data, status } = await fiatExchangeWalletServices.get(params);
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
            const { data, status } = await fiatExchangeWalletServices.current();
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
            const { data, status } = await fiatExchangeWalletServices.post(vals);
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
                title="افزایش دارایی تومانی صرافی"
                backdrop="static"
                Icon={<BsCoin size={25} className="ml-1 text-orange" />}
                onHide={() => setPositiveForm()}
                initialValues={{ volume: "", AO: "positive" }}
                onSubmit={createVolume}
                validationSchema={fiatExchangeWalletValidator.volume}
            >
                <FastField
                    name="volume"
                    icon={<AiOutlineDollarCircle className="text-gainsboro" size={20} />}
                    light
                    className="mb-3 FaNum"
                    // separatorFilter
                    onKeyPress={amountFilter}
                    label="حجم ورودی "
                    as={CustomizedInput}
                />

            </FormikConfirmationModal>
            <FormikConfirmationModal show={negativeForm}
                title="کاهش دارایی تومانی صرافی"
                backdrop="static"
                Icon={<BsCoin size={25} className="ml-1 text-orange" />}
                onHide={() => setNegativeForm()}
                initialValues={{ volume: "", AO: "negative" }}
                onSubmit={createVolume}
                validationSchema={fiatExchangeWalletValidator.volume}
            >
                <FastField
                    name="volume"
                    light
                    icon={<AiOutlineDollarCircle className="text-gainsboro" size={20} />}
                    className="FaNum mb-3"
                    onKeyPress={amountFilter}
                    label="حجم خروجی"
                    as={CustomizedInput}
                />
            </FormikConfirmationModal>

            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="is-size-5 mb-2">مدیریت دارایی تومانی صرافی</h1>
                    <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید دارایی تومانی صرافی ارز تو ارز را مدیریت کنید.</p>
                </div>
                <div>
                    <CustomizedButton
                        className="rounded-pill px-3 py-2 yekan-Bold ml-3"
                        size="sm"
                        variant="lightRed"
                        onClick={() => setNegativeForm(true)}
                    >
                        کاهش حجم دارایی
                    </CustomizedButton>
                    <CustomizedButton
                        className="rounded-pill px-3 py-2 yekan-Bold"
                        size="sm"
                        variant="success"
                        onClick={() => setPositiveForm(true)}
                    >
                        افزایش حجم دارایی
                    </CustomizedButton>
                </div>
            </div>
            <div className="mt-4 col-12 py-3 border-radius-lg card-shadow border">
                <p className="border-bottom text-lightBlue d-flex align-items-center pb-3">
                    <span><RiHistoryLine size="20" className="ml-2" /></span>
                    تاریخچه </p>
                <div>
                    <CustomizedTable
                        header={
                            <>
                                <th className="text-center">حجم </th>
                                <th className="text-center"> تاریخ </th>
                                <th className="text-center"> ادمین</th>
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
                                                    <span className="text-success d-flex flex-row-reverse center-content">
                                                        <span className='is-size-7 FaNum'>{new Number(item.volume).toLocaleString()} </span>
                                                        <span className='yekan-Light mr-1 is-size-8'>تومان</span>
                                                    </span>
                                                    :
                                                    <span className="text-danger d-flex flex-row-reverse center-content">
                                                        <span className='is-size-7 FaNum'>{new Number(item.volume).toLocaleString()} </span>
                                                        <span className='yekan-Light mr-1 is-size-8'>تومان</span>
                                                    </span>
                                                }
                                            </td>

                                            <td className="text-center">
                                                {DateConvert.getTime(item.createdAt)}
                                                <span className="mx-1 text-gainsboro">|</span>
                                                {DateConvert.toShamsiDate(item.createdAt)}
                                            </td>
                                            <td className="text-center">{item.admin?.email}</td>
                                        </tr>
                                    );
                                })
                                :
                                <tr>
                                    <td colSpan="3">
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