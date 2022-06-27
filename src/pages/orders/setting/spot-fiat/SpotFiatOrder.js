import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, FastField, Field } from "formik";
import { Col } from "react-bootstrap";
import { RiListSettingsLine, BiEdit, RiDeleteBin5Line, AiOutlinePercentage, TiChevronLeft } from "react-icons/all";
//components
import { oscillationServices } from "../../../../services";
import CustomizedTable from "../../../../components/table/Table";
import CustomizedInput, { amountFilter } from "../../../../components/form/input/Input";
import CustomizedButton from "../../../../components/form/button/Button";
import DateConvert from '../../../../utils/date';
import { useTitle } from "../../../../context";
import CustomizedBadge from "../../../../components/badge/Badge";
import NoData from "../../../../components/no-data/NoData";
import { Toastify } from "../../../../utils";
import { oscillationValidator } from "../../../../utils/validators";

export default function FiatCommission() {
    document.title = "ارز تو ارز | کمیسیون خرید و فروش ارز";
    const { title, setTitle } = useTitle();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [oscillationList, setOscillationList] = useState([]);
    const [oscillationCount, setOscillationCount] = useState(0);
    const [currentOscillation, setCurrentOscillation] = useState({});

    useEffect(() => {
        getOscillationList()
        getCurrentOscillation()
    }, [currentPage])

    useEffect(() => {
        setTitle(" تنظیمات معاملات / خرید و فروش ارز/ حد معاملات خرید و فروش ارز");
    }, [])
    // get Fiat list
    const getOscillationList = async () => {
        try {
            let params = {
                pageNumber: currentPage,
                perPage: 10
            }
            const { data, status } = await oscillationServices.list(params)
            if (status === 200 && data.success) {
                setOscillationList(data.data.result);
                setOscillationCount(data.data.count);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // get current Oscillation
    const getCurrentOscillation = async () => {
        try {

            const { data, status } = await oscillationServices.current()
            if (status === 200 && data.success) {
                setCurrentOscillation(data.data);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    // create Oscillation item
    const createOscillation = async (vals) => {
        try {
            const { data, status } = await oscillationServices.post(vals)
            if (status === 200 && data.success) {
                Toastify.success(data.message)
                getOscillationList()
                getCurrentOscillation()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    return (
        <div className="mt-4 d-flex flex-wrap justify-content-center">
            <div className=" col-12 p-4 border-radius-lg card-shadow bg-white transition-height">
                <div className="mb-4 d-flex justify-content-between align-items-center">
                    <div>
                        <h1 className="is-size-5 mb-2">تنظیمات درصد اختلاف معاملات</h1>
                        <p className="is-size-7 gainsboro mb-0">
                            در این بخش شما می‌توانید درصد اختلاف معاملات را مشاهده کنید، مقدار جدید ایجاد کنید و لیست تغییرات قبلی را ببینید.
                        </p>
                    </div>
                </div>
                <div className="mt-4">

                    <Formik
                        initialValues={{ percentage: "", name: "" }}
                        onSubmit={(values, actions) => {
                            createOscillation(values)
                            actions.resetForm();
                        }}
                        validationSchema={oscillationValidator.create}
                    >
                        {({ isValid, dirty }) => (
                            <Form className="row justify-content-start align-items-end">
                                <Col lg={3} md={4} xs={6} className="mb-3 mb-md-0">
                                    <Field
                                        name="percentage"
                                        type="tel"
                                        placeholder="0.6 "
                                        className="en"
                                        onKeyPress={amountFilter}
                                        label="درصد اختلاف"
                                        as={CustomizedInput}
                                    />
                                </Col>
                                <Col lg={3} md={4} xs={6} className="mb-3 mb-md-0">
                                    <Field
                                        name="name"
                                        placeholder="توضیحات "
                                        label="توضیحات"
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
                                        style={{ minWidth: "157px" }}
                                        disabled={isLoading || !(isValid && dirty)}
                                    >
                                        <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                                            ثبت
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
                            <th className="text-center">درصد اختلاف</th>
                            <th className="text-center">توضیحات</th>
                            <th className="text-center">تاریخ ایجاد</th>
                            <th className="text-center">وضعیت</th>
                        </>
                    }
                    totalRecords={oscillationCount}
                    pageLimit={10}
                    handleChangePage={(page) => setCurrentPage(page)}
                >
                    {
                        oscillationList.length ?
                            oscillationList.map((item, index) => {
                                return (
                                    <tr key={index} className={currentOscillation[0]?._id === item._id ? "active" : null}>
                                        <td className="FaNum ltr text-center">{item.percentage} %</td>
                                        <td className="text-center">{item.name}</td>
                                        <td className="FaNum text-center">
                                            {DateConvert.getTime(item.createdAt)}
                                            <span className="mx-1 text-gainsboro">|</span>
                                            {DateConvert.toShamsiDate(item.createdAt)}
                                        </td>
                                        <td className="text-center">
                                            {currentOscillation[0]?._id === item._id ?
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
