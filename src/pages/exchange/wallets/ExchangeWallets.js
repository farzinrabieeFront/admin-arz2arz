import React, { useEffect, useState } from 'react'
import { FastField, Form, Formik } from 'formik';
import AddressModal from '../../../components/address-modal/AddressModal';
import { useTitle } from '../../../context';
import { exchangeWalletServices } from '../../../services';
import { Toastify } from '../../../utils';
import * as math from 'mathjs';
//components
import CustomizedTable from "../../../components/table/Table";
import CustomizedInput from "../../../components/form/input/Input";
import CustomizedButton from "../../../components/form/button/Button";
import FormikInitialValues from '../../../utils/constants/formikInitialValues';
import { Col } from 'react-bootstrap';
import NoData from '../../../components/no-data/NoData';
import CustomizedBadge from '../../../components/badge/Badge';

export default function ExchangeWalletsPage() {
    const { setTitle } = useTitle();
    const [currentPage, setCurrentPage] = useState(1);
    const [walletList, setWalletList] = useState([])
    const [walletCount, setWalletCount] = useState(0)
    const [address, setAddress] = useState([]);
    const [showAddress, setShowAddress] = useState(false);

    useEffect(() => {
        setTitle("کیف پول‌های صرافی");

    }, [])
    useEffect(() => {
        getData()
    }, [currentPage])

    const getData = async () => {
        let params = {
            pageNumber: currentPage,
            perPage: 10
        }
        try {
            const { data, status } = await exchangeWalletServices.list(params)
            if (data.success && status === 200) {
                setWalletList(data.data.result);
                setWalletCount(data.data.count)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    const searchWallets = async (vals) => {
        let params = {
            pageNumber: currentPage,
            perPage: 10
        }
        for (const key in vals) {
            if (vals[key])
                params = { [key]: vals[key], ...params }
        }
        try {
            const { data, status } = await exchangeWalletServices.list(params)
            if (status === 200 && data.success) {
                setWalletList(data.data.result);
                setWalletCount(data.data.count);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const removeFilters = () => {
        getData()
    }
    return (
        <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
            <AddressModal data={address}
                show={showAddress}
                onHide={() => setShowAddress(false)}
            />
            <Formik
                initialValues={{ currency: "" }}
                onSubmit={searchWallets}
            >
                {({ isValid, dirty, resetForm }) => (
                    <Form className="row justify-content-between align-items-end">
                        <Col lg={12} className="mb-4 d-flex justify-content-between align-items-center">
                            <div>
                                <h1 className="is-size-5 mb-2">لیست کیف پول‌‌ها</h1>
                                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید کیف پول‌های صرافی را مشاهده کنید.</p>
                            </div>
                        </Col>
                       
                        <Col md={5} className="mb-3">
                            <FastField
                                name="currency"
                                placeholder="مثال : BTC , bitcoin , بیت کوین"
                                label=" ارز"
                                as={CustomizedInput}
                            />
                        </Col>
                        <Col md={6} className="mb-3">
                            <div className="d-flex w-100 justify-content-end">
                                <CustomizedButton
                                    onClick={() => {
                                        resetForm(FormikInitialValues.spotWallets)
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
                            </div>
                        </Col>

                    </Form>
                )}
            </Formik>

            <div>
                <CustomizedTable
                    header={
                        <>
                            <th>ارز </th>
                            <th className="text-center">موجودی </th>
                            <th className="text-center">وضعیت</th>
                            <th className="text-center">عملیات</th>
                        </>
                    }
                    totalRecords={walletCount}
                    pageLimit={10}
                    handleChangePage={(page) => setCurrentPage(page)}
                >
                    {
                        walletList.length ?
                            walletList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.symbol}</td>
                                        <td className="text-center">
                                            {math.fix(item.balance || 0, 8)}
                                        </td>

                                        <td className="text-center">
                                            {item.isActive ?
                                                <CustomizedBadge variant="success">فعال</CustomizedBadge>
                                                :
                                                <CustomizedBadge variant="danger">غیر فعال</CustomizedBadge>
                                            }
                                        </td>

                                        <td className="text-center">
                                            {
                                                item.addresses?.length ?
                                                    <span
                                                        onClick={() => {
                                                            setAddress(item.addresses)
                                                            setShowAddress(true)
                                                        }
                                                        }
                                                        className="lightLink yekan-Bold pointer"
                                                    >
                                                        آدرس‌ها
                                                    </span>
                                                    :
                                                    "__"
                                            }
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
