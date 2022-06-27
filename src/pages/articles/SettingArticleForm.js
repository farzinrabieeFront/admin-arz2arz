import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, FastField, Field } from "formik";
import { Col } from "react-bootstrap";
import { RiListSettingsLine, BiEdit, RiDeleteBin5Line, IoMdSettings, TiChevronLeft } from "react-icons/all";
//components
import categoryServices from "../../services/httpServices/categoryServices";
import CustomizedTable from "../../components/table/Table";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedButton from "../../components/form/button/Button";
import DeleteConfirmationModal from "../../components/delete-modal/DeleteConfirmation";
import FormikConfirmationModal from "../../components/formik-modal/FormikConfirmationModal";
import DateConvert from '../../utils/date'
import { useTitle } from "../../context";
import NoData from "../../components/no-data/NoData";
import { Toastify } from "../../utils";
export default function SettingArticleForm() {
  document.title = "ارز تو ارز | تنظیمات مقالات";
  const { setTitle } = useTitle();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryCount, setCategoryCount] = useState(0);
  const [activeConfirmDelete, setActiveConfirmDelete] = useState(0);
  const [activeUpdate, setActiveUpdate] = useState();

  useEffect(() => {
    setTitle("تنظیمات مقالات");
  }, [])

  useEffect(() => {
    getCategoryList()
  }, [currentPage])

  // get category list
  const getCategoryList = async () => {
    try {
      let params = {
        pageNumber: currentPage,
        perPage: 10
      }
      const { data, status } = await categoryServices.list(params)
      if (status === 200 && data.success) {
        setCategoryList(data.data.result);
        setCategoryCount(data.data.count);
      }

    } catch (error) {
      Toastify.error(error.message)
    }
  }
  // delete category item
  const deleteCategoryItem = async (id) => {
    setActiveConfirmDelete(0)
    try {
      const { data, status } = await categoryServices.delete(id)
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        getCategoryList()
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  // create category item
  const createCategoryItem = async (vals) => {
    try {
      const { data, status } = await categoryServices.create(vals)
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        getCategoryList();
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  // update category item
  const updateCategoryItem = async (vals) => {

    try {
      const { data, status } = await categoryServices.update(activeUpdate._id, vals)
      if (status === 201 && data.success) {
        Toastify.success(data.message)
        getCategoryList()
        setActiveUpdate()
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }


  return (
    <div className="mt-5 p-4 border-radius-lg card-shadow bg-white">
      <DeleteConfirmationModal show={Boolean(activeConfirmDelete)}
        title="دسته بندی"
        onHide={() => setActiveConfirmDelete(0)}
        onConfirm={() => deleteCategoryItem(activeConfirmDelete)}
      />
      <FormikConfirmationModal show={activeUpdate}
        title="ویرایش دسته بندی"
        Icon={<BiEdit size={25} className="ml-2 text-danger" />}
        onHide={() => setActiveUpdate()}
        initialValues={{ title: activeUpdate ? activeUpdate.title : "" }}
        onSubmit={updateCategoryItem}>
        <FastField
          name="title"
          light
          label=" دسته بندی جدید"
          as={CustomizedInput}
        />
      </FormikConfirmationModal>

      <div>
        <p className="yekan-Bold">
          <RiListSettingsLine size="20" className="ml-2" />
          دسته بندی مقالات </p>
        <Formik
          initialValues={{ title: "" }}
          onSubmit={(values, actions) => {
            createCategoryItem(values)
            actions.resetForm();
          }}
        >
          {({ isValid, dirty }) => (
            <Form className="row justify-content-start align-items-end">
              <Col lg={3} xs={7}>
                <Field
                  name="title"
                  label="افزودن دسته بندی جدید"
                  placeholder="مثال : اخبار"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={3} xs={5}>
                <CustomizedButton
                  type="submit"
                  variant="success"
                  size="lg"
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
              <th className="text-center">عملیات</th>
            </>
          }
          totalRecords={categoryCount}
          pageLimit={categoryList.length}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {
            categoryList.length ?
              categoryList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">{item.title}</td>
                    <td className="FaNum text-center"> {DateConvert.toShamsiDate(item.createdAt)}</td>

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
                <td colSpan="3">
                  <NoData />
                </td>
              </tr>
          }
        </CustomizedTable>{" "}
      </div>

    </div>
  );
}
