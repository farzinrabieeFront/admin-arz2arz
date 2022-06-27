import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import { HiChevronLeft } from 'react-icons/all';
import * as math from 'mathjs';
//components
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import CustomizedTable from "../../components/table/Table";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedBadge from "../../components/badge/Badge";
import CustomizedSelect from "../../components/form/select/Select";
import NoData from "../../components/no-data/NoData";
import { useTitle } from "../../context";
import { orderServices } from "../../services";
import DateConvert from '../../utils/date';
import OrdersData from "./data/data";
import Styles from "./Orders.module.scss";
import OrdersModal from './component/OrdersModal';
import { Toastify } from "../../utils";

export default function FiatOrdersPage() {
    document.title = "ارز تو ارز | تاریخچه معاملات خرید و فروش";
    const { title, setTitle } = useTitle();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderList, setOrderList] = useState([]);
    const [orderCount, setOrderCount] = useState();
    const [openModal, setOpenModal] = useState();
    const [marketId, setMarketId] = useState();


    useEffect(() => {
        setTitle("تاریخچه معاملات خرید و فروش");
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
                // zone: 'FIAT',
            }
            const { data, status } = await orderServices.fiat.get(params)
            if (status === 200 && data.success) {
                setOrderList(data.data.result);
                setOrderCount(data.data.count);

            }
        } catch (error) {
            Toastify.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }
    const searchOrders = async (vals) => {
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
                // zone: 'FIAT',
                ...body,
            }
            const { data, status } = await orderServices.fiat.get(params)
            if (status === 200 && data.success) {
                setOrderList(data.data.result);
                setOrderCount(data.data.count);
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
        <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
            {
                openModal ?
                    <OrdersModal marketId={marketId} show={openModal} zone="FIAT" handleClose={() => setOpenModal()} />
                    : null
            }
            <Formik
                initialValues={FormikInitialValues.orders}
                onSubmit={searchOrders}
            >
                {({ isValid, dirty, resetForm }) => (
                    <Form className="row justify-content-start align-items-end">
                        <Col lg={8} className="mb-4">
                            <div className="main-title">
                                <h1 className="is-size-5 mb-2">تاریخچه معاملات خرید و فروش</h1>
                                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید تاریخچه تمامی معاملات خرید و فروش در صرافی ارز تو ارز را مشاهده نمایید</p>
                            </div>

                        </Col>
                        <Col lg={4} className="mb-4">
                            <div className="d-flex justify-content-end">
                                <CustomizedButton
                                    onClick={() => {
                                        resetForm(FormikInitialValues.orders)
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

                        <Col lg={2} md={4} sm={6} className="mb-3">
                            <Field
                                name="spotAsset"
                                placeholder="نماد ارز : BTC"
                                label="ارز" 
                                as={CustomizedInput}
                            />
                        </Col>
                        <Col lg={2} md={4} sm={6} className="mb-3">
                            <Field
                                name="side"
                                label="نوع سفارش"
                                options={OrdersData.side}
                                as={CustomizedSelect}
                            />
                        </Col>
                        <Col md={4} className="mb-3">
                            <Field
                                name="email"
                                placeholder="sample@gmail.com"
                                label="ایمیل"
                                as={CustomizedInput}
                            />
                        </Col>

                        <Col lg={2} sm={6} className="mb-3">
                            <Field
                                name="status"
                                label="وضعیت"
                                options={OrdersData.fiatStatus}
                                as={CustomizedSelect}
                            />
                        </Col>

                        <Col lg={2} sm={6} className="mb-3">
                            <Field
                                name="marketId"
                                placeholder="H0PYEpkko"
                                label="MarketID"
                                as={CustomizedInput}
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
                            <th className="text-center">تاریخ</th>
                            <th className="text-center">نوع سفارش</th>
                            <th className="text-center">مقدار پرداختی</th>
                            <th className="text-center">مقدار دریافتی</th>
                            <th className="text-center">قیمت نهایی</th>
                            <th className="text-center">قیمت دلار</th>
                            <th className="text-center">ایمیل</th>
                            <th className="text-center">وضعیت</th>
                            <th className="text-center">MarketID</th>
                        </>
                    }
                    totalRecords={orderCount}
                    pageLimit={10}
                    handleChangePage={(page) => setCurrentPage(page)}
                >
                    {
                        orderList.length ?
                            orderList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.spotAsset}</td>
                                        <td className="text-center">
                                            {DateConvert.getTime(item.createdAt)}
                                            <span className="mx-1 text-gainsboro">|</span>
                                            {DateConvert.toShamsiDate(item.createdAt)}
                                        </td>
                                        <td className="text-center">
                                            {item.side === "BUY" ? (
                                                <CustomizedBadge pill className="no-min-width" variant="success">
                                                    خرید
                                                </CustomizedBadge>
                                            )
                                                :
                                                (
                                                    <CustomizedBadge pill className="no-min-width" variant="danger">
                                                        فروش
                                                    </CustomizedBadge>
                                                )}
                                        </td>
                                        <td className="text-center ltr">

                                            {item.side === "BUY" ?
                                                new Number(item.baseAmount || 0).toLocaleString()
                                                :
                                                math.fix(item.baseAmount, 8)
                                            }
                                            {item.side === "BUY" ?
                                                <span className="is-size-8 ml-1 ltr text-gainsboro">تومان</span>
                                                :
                                                <span className="is-size-8 ml-1 ltr text-gainsboro">{item.spotAsset}</span>
                                            }
                                        </td>
                                        <td className="text-center ltr">
                                            {item.quoteAmount ?
                                                <>
                                                    {item.side === "SELL" ?
                                                        new Number(item.quoteAmount || 0).toLocaleString()
                                                        :
                                                        math.fix(item.quoteAmount, 8)
                                                    }
                                                    {item.side === "SELL" ?
                                                        <span className="is-size-8 ml-1 ltr text-gainsboro">تومان</span>
                                                        :
                                                        <span className="is-size-8 ml-1 ltr text-gainsboro">{item.spotAsset}</span>
                                                    }
                                                </>
                                                : "__"}
                                        </td>
                                        <td className="text-center">
                                            {item.price ?
                                                <>
                                                    {math.fix(item.price, 8)}
                                                    <span className="is-size-8 ml-1 ltr text-gainsboro">{item.spotAsset}/USDT</span>
                                                </>
                                                : "__"
                                            }
                                        </td>
                                        <td className="text-center">
                                            <span className=" mr-1 ">$</span>
                                            {new Number(item.usdPrice || 0).toLocaleString()}
                                        </td>
                                        <td className="ltr text-center">
                                            {item.customer?.email?.slice(0, 3)}**</td>
                                        <td className="text-center">
                                            <CustomizedBadge pill className="no-min-width"
                                                variant={
                                                    item.status === "WAITING" ? "warning"
                                                        :
                                                        item.status === "CONFIRMED" ? "success"
                                                            :
                                                            item.status === "FAILED" ? "danger"
                                                                :
                                                                "light"
                                                }
                                            >
                                                {item.status}
                                            </CustomizedBadge>
                                        </td>
                                        <td className="text-center">
                                            {item.marketId ?
                                                <span
                                                    className={`${Styles.marketId} ltr justify-content-center text-lightBlue d-flex align-items-start pointer`}
                                                    onClick={() => {
                                                        setMarketId(item.marketId)
                                                        setOpenModal(true)
                                                    }}
                                                >
                                                    <HiChevronLeft size="16" /> {item.marketId}
                                                </span>
                                                :
                                                null
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                            :
                            <tr>
                                <td colSpan="10">
                                    <NoData />
                                </td>
                            </tr>
                    }
                </CustomizedTable>
            </div>
        </div>
    );
}
