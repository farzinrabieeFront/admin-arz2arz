import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, FastField } from "formik";
import { Col, Row } from "react-bootstrap";
import { HiOutlineNewspaper, TiChevronLeft, BiEdit, RiDeleteBin5Line, FiEdit } from "react-icons/all";
import DateConvert from '../../utils/date';
//components
import articleServices from "../../services/httpServices/articleServices";
import CustomizedTable from "../../components/table/Table";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedBadge from "../../components/badge/Badge";
import NoData from "../../components/no-data/NoData";
import CustomizedSwitch from "../../components/form/switch/CustomizedSwitch";
import DeleteConfirmationModal from "../../components/delete-modal/DeleteConfirmation";
import CustomizedSelect from "../../components/form/select/Select";
import { useTitle } from "../../context";
import { Toastify } from "../../utils";

export default function ArticlesPage() {
  document.title = "ارز تو ارز | مقالات";
  const { setTitle } = useTitle();
  const [currentPage, setCurrentPage] = useState(1);
  const [articleCount, setArticleCount] = useState(0);
  const [articleList, setArticleList] = useState([]);
  const [activeConfirmDelete, setActiveConfirmDelete] = useState(0);
  const pubStatus = [
    { _id: true, title: "منتشر شده" },
    { _id: false, title: "منتشر نشده" },
  ]
  useEffect(() => {
    setTitle("مقالات");
  }, [])

  useEffect(() => {
    getArticleList()
  }, [currentPage])

  // get article list
  const getArticleList = async () => {
    try {
      let params = {
        pageNumber: currentPage,
        perPage: 10
      }
      const { data, status } = await articleServices.list(params)
      if (status === 200 && data.success) {
        setArticleList(data.data.result);
        setArticleCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  // delete article item
  const deleteArticleItem = async (id) => {
    setActiveConfirmDelete(0)
    try {
      const { data, status } = await articleServices.delete(id)
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        getArticleList()
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  // update article status published
  const handleChangePublishStatus = async (id, newStatus) => {
    let formData = new FormData();
    formData.append("ispublished", newStatus)
    try {
      const { data, status } = await articleServices.update(id, formData)
      if (status === 201 && data.success) {
        getArticleList()
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  // search article item
  const searchArticleList = async (vals) => {
    try {
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
        ...body
      }
      const { data, status } = await articleServices.search(params)
      if (status === 200 && data.success) {
        setArticleList(data.data.result);
        setArticleCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  const removeFilters = () => {
    getArticleList()
  }
  return (
    <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
      <DeleteConfirmationModal show={Boolean(activeConfirmDelete)}
        title="مقاله"
        onHide={() => setActiveConfirmDelete(0)}
        onConfirm={() => deleteArticleItem(activeConfirmDelete)}
      />
      <div className="mb-4 row justify-content-between align-items-center">
        <div className="col-md-9">
          <h1 className="is-size-5 mb-2">لیست مقالات</h1>
          <p className="is-size-7 gainsboro mb-0">
            در این بخش شما می‌توانید لیست مقالات را مشاهده کنید، مقاله مورد نظر خود را ویرایش کنید و مقاله جدید ایجاد کنید.
          </p>
        </div>
        <div className="col-md-3 text-left mt-md-0 mt-3">
          <Link
            className="btn btn-purple is-size-6 px-3 yekan-Bold"
            size="sm"
            to="/articles/create-article/"
          >
            ایجاد مقاله جدید
          </Link>
        </div>
      </div>


      <div className="mt-4">
        <Formik initialValues={{ search_keys: "", ispublished: "" }} onSubmit={searchArticleList}>
          {({ isValid, dirty, resetForm }) => (
            <Form className="row justify-content-between align-items-end">
              <Col lg={8} className="mb-3">
                <Row>
                  <Col lg={8} className="mb-2 mb-lg-0">
                    <FastField
                      name="search_keys"
                      label=" عنوان مقاله"
                      placeholder="عنوان مقاله"
                      type="text"
                      as={CustomizedInput}
                    />
                  </Col>
                  <Col lg={4}>
                    <FastField
                      label=" وضعیت"
                      name="ispublished"
                      options={pubStatus}
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
      <div >
        {" "}
        <CustomizedTable
          header={
            <>
              <th>عنوان</th>
              <th>نویسنده</th>
              <th className="text-center">دسته بندی</th>
              <th className="text-center">وضعیت</th>
              <th className="text-center">تاریخ انتشار</th>
              <th className="text-center">عملیات</th>
            </>
          }
          totalRecords={articleCount}
          pageLimit={10}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {
            articleList.length ?
              articleList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.author?.firstName}{" "}{item.author?.lastName}</td>
                    <td className="text-center">
                      <CustomizedBadge pill variant="info">
                        {item.categories?.title}
                      </CustomizedBadge>
                    </td>
                    <td className="text-center">
                      <CustomizedSwitch
                        // handleChange={() => setIsPublished(prev => !prev)}
                        handleChange={() => handleChangePublishStatus(item._id, !item.ispublished)}
                        checked={item.ispublished}

                      />
                    </td>
                    <td className="FaNum text-center">

                      {/* {new Date(item.publish_time)} */}
                      {DateConvert.toShamsiDate(new Date(new Number(item.publish_time)))}
                    </td>
                    <td className="text-center">
                      <Link to={`/articles/edit-article/${item._id}`}><span className="d-inline-block p-1 ml-2 rounded-pill badge-success icon-hover" title="ویرایش"> <BiEdit size="20" /></span></Link>
                      <span className="d-inline-block p-1 mr-2 rounded-pill badge-danger icon-hover " title="حذف"
                        onClick={() => setActiveConfirmDelete(item._id)}
                      > <RiDeleteBin5Line size="20" /></span>
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
        </CustomizedTable>{" "}
      </div>

    </div >
  );
}
