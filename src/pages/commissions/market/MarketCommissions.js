import { useEffect, useState } from "react";
import { Form, Formik, Field } from "formik";
import { Col } from "react-bootstrap";
import { TiChevronLeft } from "react-icons/all";
//components
import commissionServices from "../../../services/httpServices/commissionServices";
import CustomizedTable from "../../../components/table/Table";
import CustomizedInput, { amountFilter } from "../../../components/form/input/Input";
import CustomizedButton from "../../../components/form/button/Button";
import DateConvert from '../../../utils/date';
import { useTitle } from "../../../context";
import CustomizedBadge from "../../../components/badge/Badge";
import NoData from "../../../components/no-data/NoData";
import { commissionValidator } from "../../../utils/validators";
import { Toastify } from "../../../utils";


export default function MarketCommissions() {
    document.title = "ارز تو ارز | کمیسیون معاملات تبدیل ارز";
    const { title, setTitle } = useTitle();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [marketList, setMarketList] = useState([]);
    const [marketCount, setMarketCount] = useState(0);
    const [currentMarket, setCurrentMarket] = useState({});

    useEffect(() => {
        getMarketList()
        getCurrentMarket()
    }, [currentPage])

    useEffect(() => {
        setTitle("ایجاد کمیسیون معاملات تبدیل ارز (Market)");
    }, [])
    // get Market list
    const getMarketList = async () => {
        try {
            let params = {
                type: "MARKET",
                pageNumber: currentPage,
                perPage: 10
            }
            const { data, status } = await commissionServices.list(params)
            if (status === 200 && data.success) {
                setMarketList(data.data.result);
                setMarketCount(data.data.count);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // get current Market
    const getCurrentMarket = async () => {
        try {
            let params = {
                type: "MARKET",
            }
            const { data, status } = await commissionServices.current(params)
            if (status === 200 && data.success) {
                setCurrentMarket(data.data);
            }
        } catch (error) {
            Toastify.error(error.message)

        }
    }

    // create Market item
    const createMarketItem = async (vals) => {
        try {
            setIsLoading(true)
            const { data, status } = await commissionServices.post(vals)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getMarketList()
                getCurrentMarket()
            }
        } catch (error) {
            Toastify.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <div className="mt-4 d-flex flex-wrap justify-content-center">
            <div className=" col-12 p-4 border-radius-lg card-shadow bg-white transition-height">
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="is-size-5 mb-2">ایجاد کمیسیون معاملات تبدیل ارز</h1>
                        <p className="is-size-7 gainsboro mb-0">
                            در این بخش شما می‌توانید کمیسیون فعلی معاملات تبدیل ارز را مشاهده کنید، کمیسیون جدید ایجاد کنید و لیست کمیسیون‌های قبلی را ببینید.
                        </p>
                    </div>
                </div>

                <div className="mt-4">

                    <Formik
                        initialValues={{ type: "MARKET", percent: "", tax: "" }}
                        onSubmit={(values, actions) => {
                            createMarketItem(values)
                            actions.resetForm()
                        }}
                        validationSchema={commissionValidator.create}
                    >
                        {({ isValid, dirty }) => (
                            <Form className="row justify-content-start align-items-end">

                                <Col lg={3} md={4} xs={6} className="mb-3 mb-md-0">
                                    <Field
                                        name="percent"
                                        className="FaNum"
                                        type="tel"
                                        onKeyPress={amountFilter}
                                        label="درصد کمیسیون"
                                        placeholder="0.1"
                                        as={CustomizedInput}
                                    />
                                </Col>
                                <Col lg={3} md={4} xs={6} className="mb-3 mb-md-0">
                                    <Field
                                        name="tax"
                                        type="tel"
                                        placeholder="0.6"
                                        className="FaNum"
                                        onKeyPress={amountFilter}
                                        label="مالیات"
                                        as={CustomizedInput}
                                    />
                                </Col>
                                <Col lg={3} md={4} xs={12}>
                                    <CustomizedButton
                                        isFullWidth
                                        type="submit"
                                        variant="success"
                                        size="lg"
                                        isLoading={isLoading}
                                        style={{ minWidth: "197px" }}
                                        disabled={isLoading || !(isValid && dirty)}
                                    >
                                        <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                                            ثبت کمیسیون جدید
                                            <TiChevronLeft className="mr-2" />
                                        </span>
                                    </CustomizedButton>
                                </Col>

                            </Form>
                        )}
                    </Formik>
                </div>


            </div>
            <div className="mt-4 col-12 p-4 border-radius-lg card-shadow bg-white transition-height">

                {" "}
                <CustomizedTable
                    header={
                        <>
                            <th className="text-center">درصد کمیسیون</th>
                            <th className="text-center">درصد مالیات</th>
                            <th className="text-center">تاریخ ایجاد</th>
                            <th className="text-center">وضعیت</th>
                        </>
                    }
                    totalRecords={marketCount}
                    pageLimit={10}
                    handleChangePage={(page) => setCurrentPage(page)}
                >
                    {
                        marketList.length ?
                            marketList.map((item, index) => {
                                return (
                                    <tr key={index} className={currentMarket[0]?._id === item._id ? "active" : null}>
                                        <td className="FaNum ltr text-center" >{item.percent} %</td>
                                        <td className="FaNum ltr text-center" >{item.tax} %</td>
                                        <td className="FaNum text-center">
                                            {DateConvert.getTime(item.createdAt)}
                                            <span className="mx-1 text-gainsboro">|</span>
                                            {DateConvert.toShamsiDate(item.createdAt)}
                                        </td>
                                        <td className="text-center">
                                            {currentMarket[0]?._id === item._id ?
                                                <CustomizedBadge pill variant="primary" >
                                                    فعال
                                                </CustomizedBadge>

                                                :
                                                <CustomizedBadge pill variant="secondary" >
                                                    منسوخ شده
                                                </CustomizedBadge>
                                            }
                                        </td>
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
                </CustomizedTable>{" "}
            </div>

        </div>
    );
}
