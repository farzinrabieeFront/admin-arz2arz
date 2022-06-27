import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, FastField, Field } from "formik";
import { Col } from "react-bootstrap";
import { RiDoubleQuotesL, BiEdit, RiDeleteBin5Line, IoMdSettings, TiChevronLeft } from "react-icons/all";
//components
import { faqCategoryServices } from "../../services";
import CustomizedTable from "../../components/table/Table";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedButton from "../../components/form/button/Button";
import DeleteConfirmationModal from "../../components/delete-modal/DeleteConfirmation";
import FormikConfirmationModal from "../../components/formik-modal/FormikConfirmationModal";
import DateConvert from '../../utils/date'
import { toast } from "react-toastify";
import { useTitle } from "../../context";
import NoData from "../../components/no-data/NoData";
import { faqValidator } from "../../utils/validators";
import { Toastify } from "../../utils";

export default function FaqCategoryPage() {
  document.title = "ارز تو ارز | دسته بندی سوالات متداول";
  const { title, setTitle } = useTitle();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [faqCategoryList, setFaqCategoryList] = useState([]);
  const [faqCategoryCount, setFaqCategoryCount] = useState(0);
  const [activeConfirmDelete, setActiveConfirmDelete] = useState(0);
  const [activeUpdate, setActiveUpdate] = useState();

  useEffect(() => {
    setTitle("دسته بندی سوالات متداول");
  }, [])

  useEffect(() => {
    getFaqCategoryList()
  }, [currentPage])

  // get faqCategory list
  const getFaqCategoryList = async () => {
    try {
      let params = {
        pageNumber: currentPage,
        perPage: 10
      }
      const { data, status } = await faqCategoryServices.list(params)
      if (status === 200 && data.success) {
        setFaqCategoryList(data.data.result);
        setFaqCategoryCount(data.data.count);
      }

    } catch (error) {
      Toastify.error(error.message)
    }
  }
  // delete faqCategory item
  const deleteFaqCategoryItem = async (id) => {
    setActiveConfirmDelete(0)
    try {
      const { data, status } = await faqCategoryServices.delete(id)
      if (status === 201 && data.success) {
        Toastify.success(data.message)
        getFaqCategoryList()
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  // create faqCategory item
  const createFaqCategoryItem = async (vals) => {
    try {
      setIsLoading(true)
      const { data, status } = await faqCategoryServices.create(vals)
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        getFaqCategoryList();
      }
    } catch (error) {
      Toastify.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  // update faqCategory item
  const updateFaqCategoryItem = async (vals) => {
    try {
      setIsLoading(true)
      const { data, status } = await faqCategoryServices.update(activeUpdate._id, vals)
      if (status === 201 && data.success) {
        Toastify.success(data.message)
        getFaqCategoryList()
        setActiveUpdate()
      }
    } catch (error) {
      Toastify.error(error.message)
    } finally {
      setIsLoading(true)
    }
  }


  return (
    <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
      <DeleteConfirmationModal show={Boolean(activeConfirmDelete)}
        title="دسته بندی"
        onHide={() => setActiveConfirmDelete(0)}
        onConfirm={() => deleteFaqCategoryItem(activeConfirmDelete)}
      />
      <FormikConfirmationModal show={activeUpdate}
        title="ویرایش دسته بندی"
        Icon={<BiEdit size={25} className="ml-2 text-danger" />}
        onHide={() => setActiveUpdate()}
        initialValues={{ title: activeUpdate ? activeUpdate.title : "" }}
        onSubmit={updateFaqCategoryItem}
        validationSchema={faqValidator.category}
      >
        <FastField
          name="title"
          light
          label=" دسته بندی جدید"
          as={CustomizedInput}
        />
      </FormikConfirmationModal>

      <div>
        <p className="yekan-Bold">
          <RiDoubleQuotesL size="20" className="ml-2" />
          تنظیمات دسته بندی سوالات متداول </p>
        <Formik
          initialValues={{ title: "" }}
          onSubmit={(values, actions) => {
            createFaqCategoryItem(values)
            actions.resetForm();
          }}
          validationSchema={faqValidator.category}
        >
          {({ isValid, dirty }) => (
            <Form className="row justify-content-start align-items-end">
              <Col lg={3} xs={7}>
                <Field
                  name="title"
                  placeholder="مثال : احراز هویت"
                  label="افزودن دسته بندی جدید"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={3} xs={5}>
                <CustomizedButton
                  type="submit"
                  variant="success"
                  size="lg"
                  style={{ minWidth: "120px" }}
                  disabled={isLoading || !(isValid && dirty)}
                  isLoading={isLoading}
                >
                  <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                    ذخیره
                    <TiChevronLeft className="mr-2" />
                  </span>
                </CustomizedButton>
              </Col>

            </Form>
          )}
        </Formik>
      </div>
      <div className="mt-4">

        {" "}
        <CustomizedTable
          header={
            <>
              <th className="text-center">عنوان</th>
              <th className="text-center">تاریخ ایجاد</th>
              <th className="text-center">ادمین</th>
              <th className="text-center">عملیات</th>
            </>
          }
          totalRecords={faqCategoryCount}
          pageLimit={faqCategoryList.length}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {
            faqCategoryList.length ?
              faqCategoryList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{item.title}</td>
                    <td className="FaNum text-center"> {DateConvert.toShamsiDate(item.createdAt)}</td>
                    <td className="text-center">{item.author?.email}</td>

                    <td className="text-center">
                      <span className="d-inline-block p-1 ml-2 rounded-pill badge-success icon-hover" title="ویرایش"
                        onClick={() => setActiveUpdate(item)}
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
