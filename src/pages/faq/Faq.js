import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, FastField, Field } from "formik";
import { Col, Row } from "react-bootstrap";
import { RiListSettingsLine, BiEdit, RiDeleteBin5Line, IoMdSettings, TiChevronLeft } from "react-icons/all";
//components
import { faqCategoryServices, faqServices } from "../../services";
import CustomizedTable from "../../components/table/Table";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedButton from "../../components/form/button/Button";
import DeleteConfirmationModal from "../../components/delete-modal/DeleteConfirmation";
import CustomizedTextarea from "../../components/form/text-area/Textarea";
import FormikConfirmationModal from "../../components/formik-modal/FormikConfirmationModal";
import DateConvert from '../../utils/date'
import { useTitle } from "../../context";
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import CustomizedSelect from "../../components/form/select/Select";
import CustomizedBadge from "../../components/badge/Badge";
import NoData from "../../components/no-data/NoData";
import { faqValidator } from "../../utils/validators";
import { Toastify } from "../../utils";

export default function FaqPage() {
    document.title = "ارز تو ارز | سوالات متداول";
    const { setTitle } = useTitle();
    const [currentPage, setCurrentPage] = useState(1);
    const [faqList, setFaqList] = useState([]);
    const [faqCount, setFaqCount] = useState(0);
    const [activeConfirmDelete, setActiveConfirmDelete] = useState(0);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [createForm, setCreateForm] = useState();
    const [singleData, setSingleData] = useState({});
    const [faqCategory, setFaqCategory] = useState([]);

    useEffect(() => {
        setTitle("سوالات متداول");
        getFaqCategoryList()
    }, [])

    useEffect(() => {
        getFaqList()
    }, [currentPage])

    // get faq list
    const getFaqList = async () => {
        try {
            let params = {
                pageNumber: currentPage,
                perPage: 10
            }
            const { data, status } = await faqServices.list(params)
            if (status === 200 && data.success) {
                setFaqList(data.data.result);
                setFaqCount(data.data.count);
            }

        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const searchFaqList = async (vals) => {
        try {
            let body = {}
            for (const key in vals) {
                if (vals[key])
                    body = { ...body, [key]: vals[key] }
            }
            let params = {
                pageNumber: currentPage,
                perPage: 10,
                ...body
            }
            const { data, status } = await faqServices.search(params)
            if (status === 200 && data.success) {
                setFaqList(data.data.result);
                setFaqCount(data.data.count);
            }

        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // delete faq item
    const deleteFaqItem = async (id) => {
        setActiveConfirmDelete(0)
        try {
            const { data, status } = await faqServices.delete(id)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getFaqList()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // create faq item
    const createFaqItem = async (vals) => {
        try {
            const { data, status } = await faqServices.create(vals)
            if (status === 200 && data.success) {
                Toastify.success(data.message)
                getFaqList();
                setCreateForm();
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // update faq item
    const updateFaqItem = async (vals) => {
        const { _id, ...other } = vals
        let body = {}
        for (let key in other) {
            if (other[key] !== singleData[key]) {
                body = { ...body, [key]: other[key] }
            }
        }
        try {
            const { data, status } = await faqServices.update(_id, body)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                getFaqList()
                setShowUpdateModal()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    // get faqCategory list
    const getFaqCategoryList = async () => {
        try {
            let params = {
                pageNumber: currentPage,
                perPage: 10
            }
            const { data, status } = await faqCategoryServices.list(params)
            if (status === 200 && data.success) {
                setFaqCategory(data.data.result);
            }

        } catch (error) {
            Toastify.error(error.message)
        }
    }

    const getSingleFaq = async (id) => {
        try {
            const { data, status } = await faqServices.single(id)
            if (status === 200 && data.success) {
                setSingleData(data.data);
                setShowUpdateModal(true)
            }

        } catch (error) {
            Toastify.error(error.message)
        }
    }
    const removeFilters = () => {
        getFaqList()
    }
    return (
        <div className="mt-5 p-4 border-radius-lg card-shadow bg-white">
            <DeleteConfirmationModal show={Boolean(activeConfirmDelete)}
                title="سوال "
                onHide={() => setActiveConfirmDelete(0)}
                onConfirm={() => deleteFaqItem(activeConfirmDelete)}
            />

            <FormikConfirmationModal show={showUpdateModal}
                title="ویرایش "
                Icon={<BiEdit size={25} className="ml-2 text-danger" />}
                onHide={() => setShowUpdateModal(false)}
                initialValues={singleData}
                onSubmit={updateFaqItem}
                validationSchema={faqValidator.create}
            >
                <Field
                    name="category"
                    label="دسته بندی"
                    className="mb-3"
                    options={faqCategory}
                    as={CustomizedSelect}
                />
                <Field
                    maxRows="5"
                    rows="2"
                    light
                    className="mb-3"
                    label="سوال"
                    placeholder="سوال"
                    name="question"
                    as={CustomizedTextarea}
                />
                <Field
                    maxRows="5"
                    rows="3"
                    light
                    label="جواب"
                    placeholder="جواب"
                    name="answer"
                    as={CustomizedTextarea}
                />
            </FormikConfirmationModal>

            <FormikConfirmationModal show={createForm}
                title="ایجاد سوال جدید "
                Icon={<BiEdit size={25} className="ml-2 text-danger" />}
                onHide={() => setCreateForm()}
                initialValues={FormikInitialValues.faq}
                onSubmit={createFaqItem}
                validationSchema={faqValidator.create}
            >
                <Field
                    name="category"
                    label="دسته بندی"
                    className="mb-3"
                    options={faqCategory}
                    as={CustomizedSelect}
                />
                <Field
                    maxRows="5"
                    rows="2"
                    light

                    label="سوال"
                    placeholder="سوال"
                    name="question"
                    as={CustomizedTextarea}
                />
                <Field
                    maxRows="5"
                    rows="3"
                    light
                    label="جواب"
                    placeholder="جواب"
                    name="answer"
                    as={CustomizedTextarea}
                />
            </FormikConfirmationModal>
            <div className="mb-4 row justify-content-between align-items-center">
                <div className="col-md-9">
                    <h1 className="is-size-5 mb-2">لیست سوالات متداول</h1>
                    <p className="is-size-7 gainsboro mb-0">
                        در این بخش شما می‌توانید لیست سوالات متداول را مشاهده کنید، سوال مورد نظر خود را ویرایش کنید و سوال جدید ایجاد کنید.
                    </p>
                </div>
                <div className="col-md-3 text-left mt-md-0 mt-3">
                    <CustomizedButton
                        className="btn-purple is-size-6 px-3 yekan-Bold"
                        size="sm"
                        onClick={() => setCreateForm(true)}
                    >
                        ایجاد سوال جدید
                    </CustomizedButton>
                </div>
            </div>


            <div className="mt-4">
                <Formik initialValues={{ question: "", title: "" }}
                    onSubmit={searchFaqList}
                >
                    {({ isValid, dirty, resetForm }) => (
                        <Form className="row justify-content-between align-items-end">
                            <Col lg={8} className="mb-3">
                                <Row>
                                    <Col lg={8} className="mb-2 mb-lg-0">
                                        <FastField
                                            name="question"
                                            placeholder="عنوان سوال"
                                            label=" عنوان سوال"
                                            type="text"
                                            as={CustomizedInput}
                                        />
                                    </Col>
                                    <Col lg={4}>
                                        <Field
                                            name="title"
                                            label=" دسته بندی"
                                            options={faqCategory}
                                            as={CustomizedSelect}
                                        />
                                    </Col>

                                </Row>
                            </Col>

                            <Col lg={4} className="d-flex justify-content-end mb-3">
                                <CustomizedButton
                                    onClick={() => {
                                        resetForm({ search_keys: "", ispublished: "" })
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
                            </Col>

                        </Form>
                    )}
                </Formik>
            </div>
            <div className="">

                {" "}
                <CustomizedTable
                    header={
                        <>
                            <th className="text-center">عنوان سوال</th>
                            <th className="text-center">دسته بندی</th>
                            <th className="text-center">تاریخ ایجاد</th>
                            <th className="text-center">عملیات</th>
                        </>
                    }
                    totalRecords={faqCount}
                    pageLimit={faqList.length}
                    handleChangePage={(page) => setCurrentPage(page)}
                >
                    {
                        faqList.length ?
                            faqList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="text-center">{item.question}</td>
                                        <td className="text-center">
                                            {index % 2 === 0 ?
                                                <CustomizedBadge pill variant="info">
                                                    {item.category?.title}
                                                </CustomizedBadge>
                                                :
                                                <CustomizedBadge pill variant="warning">
                                                    {item.category?.title}
                                                </CustomizedBadge>
                                            }
                                        </td>
                                        <td className="FaNum text-center"> {DateConvert.toShamsiDate(item.createdAt)}</td>
                                        <td className="text-center">
                                            <span className="d-inline-block p-1 ml-2 rounded-pill badge-success icon-hover" title="ویرایش"
                                                onClick={() => getSingleFaq(item._id)}
                                            >
                                                <BiEdit size="20" />
                                            </span>
                                            <span className="d-inline-block p-1 mr-2 rounded-pill badge-danger icon-hover " title="حذف"
                                                onClick={() => setActiveConfirmDelete(item._id)}
                                            >
                                                <RiDeleteBin5Line size="20" />
                                            </span>
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
