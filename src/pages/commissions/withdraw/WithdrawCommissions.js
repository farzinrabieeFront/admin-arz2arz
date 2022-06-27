import { useEffect, useState } from "react";
import { Form, Formik, Field } from "formik";
import { Col } from "react-bootstrap";
import { TiChevronLeft } from "react-icons/all";
//components
import commissionServices from "../../../services/httpServices/commissionServices";
import CustomizedTable from "../../../components/table/Table";
import CustomizedInput, { amountFilter } from "../../../components/form/input/Input";
import CustomizedButton from "../../../components/form/button/Button";
import CustomizedBadge from "../../../components/badge/Badge";
import NoData from "../../../components/no-data/NoData";
import DateConvert from '../../../utils/date';
import { useTitle } from "../../../context";
import { commissionValidator } from "../../../utils/validators";
import { Toastify } from "../../../utils";

export default function WithdrawCommissions() {
    document.title = "ارز تو ارز | کمیسیون برداشت ارزی";
    const { title, setTitle } = useTitle();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [withdrawList, setWithdrawList] = useState([]);
    const [withdrawCount, setWithdrawCount] = useState(0);
    const [currentWithdraw, setCurrentWithdraw] = useState({});

    useEffect(() => {
        getWithdrawList()
        getCurrentWithdraw()
    }, [currentPage])

    useEffect(() => {
        setTitle("ایجاد کمیسیون برداشت ارزی (Withdraw)");
    }, [])
    // get Withdraw list
    const getWithdrawList = async () => {
        try {
            let params = {
                type: "WITHDRAW",
                pageNumber: currentPage,
                perPage: 10
            }
            const { data, status } = await commissionServices.list(params)
            if (status === 200 && data.success) {
                setWithdrawList(data.data.result);
                setWithdrawCount(data.data.count);
            }
        } catch (error) {
            Toastify.error(error.message)

        }
    }
    // get current Withdraw
    const getCurrentWithdraw = async () => {
        try {
            let params = {
                type: "WITHDRAW",
            }
            const { data, status } = await commissionServices.current(params)
            if (status === 200 && data.success) {
                setCurrentWithdraw(data.data);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    // create Withdraw item
    const createWithdrawItem = async (vals) => {
        try {
            setIsLoading(true)
            const { data, status } = await commissionServices.post(vals)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getWithdrawList()
                getCurrentWithdraw()
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
                        <h1 className="is-size-5 mb-2">ایجاد کمیسیون برداشت ارزی</h1>
                        <p className="is-size-7 gainsboro mb-0">
                            در این بخش شما می‌توانید کمیسیون فعلی برداشت ارزی را مشاهده کنید، کمیسیون جدید ایجاد کنید و لیست کمیسیون‌های قبلی را ببینید.
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <Formik
                        initialValues={{ type: "WITHDRAW", percent: "", tax: "" }}
                        onSubmit={(values, actions) => {
                            createWithdrawItem(values)
                            actions.resetForm();
                        }}
                        validationSchema={commissionValidator.create}
                    >
                        {({ isValid, dirty }) => (
                            <Form className="row justify-content-start align-items-end">
                                <Col lg={3} md={4} xs={6} className="mb-3 mb-md-0">
                                    <Field
                                        name="percent"
                                        type="tel"
                                        className="FaNum"
                                        label="درصد کمیسیون"
                                        placeholder="0.1"
                                        onKeyPress={amountFilter}
                                        as={CustomizedInput}
                                    />
                                </Col>
                                <Col lg={3} md={4} xs={6} className="mb-3 mb-md-0">
                                    <Field
                                        name="tax"
                                        type="tel"
                                        placeholder="0.6"
                                        className="FaNum"
                                        label="مالیات"
                                        onKeyPress={amountFilter}
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
                    totalRecords={withdrawCount}
                    pageLimit={10}
                    handleChangePage={(page) => setCurrentPage(page)}
                >
                    {
                        withdrawList.length ?
                            withdrawList.map((item, index) => {
                                return (
                                    <tr key={index} className={currentWithdraw[0]?._id === item._id ? "active " : null}>
                                        <td className="FaNum ltr text-center">{item.percent} %</td>
                                        <td className="FaNum ltr text-center">{item.tax} %</td>
                                        <td className="FaNum text-center">
                                            {DateConvert.getTime(item.createdAt)}
                                            <span className="mx-1 text-gainsboro">|</span>
                                            {DateConvert.toShamsiDate(item.createdAt)}
                                        </td>
                                        <td className="text-center">
                                            {currentWithdraw[0]?._id === item._id ?
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
