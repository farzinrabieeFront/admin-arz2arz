import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Formik, FastField, Field } from "formik";
import { Row, Col } from "react-bootstrap";
import { FiEdit, IoInformationCircleOutline, RiImageEditLine } from "react-icons/all";
//components
import articleServices from "../../services/httpServices/articleServices";
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import categoryServices from "../../services/httpServices/categoryServices";
import uploadPoster from "../../assets/images/uploadPoster.png";
import uploadList from "../../assets/images/uploadList.png";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedSelect from "../../components/form/select/Select";
import CustomizedFileButton from "../../components/form/file-button/FileButton";
import TextEditor from "../../components/form/text-editor/TextEditor";
import adminServices from "../../services/httpServices/adminServices";
import { useTitle } from "../../context";
import PersianDatePicker from "../../components/form/datepicker/PersianDatePicker";
import { Toastify } from "../../utils";
import articleValidator from "../../utils/validators/articeValidator";

export default function CreateArticleForm() {
  document.title = "ارز تو ارز | ویرایش مقاله";
  const { setTitle } = useTitle();
  const history = useHistory();
  const formikRef = useRef(null)
  const { articleId } = useParams();
  const [articleImage, setArticleImage] = useState();
  const [posterImage, setPosterImage] = useState();
  const [desc, setDesc] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [authorList, setAuthorList] = useState([])
  const [articleDetail, setArticleDetail] = useState([])

  useEffect(() => {
    if (articleId) {
      getArticleDetail(articleId);
      getCategoryList();
      getAuthors();
    }
  }, [articleId])

  useEffect(() => {
    setTitle("ویرایش مقاله");
  }, [])
  // get Article detail
  const getArticleDetail = async (articleId) => {

    try {
      const { data, status } = await articleServices.detail(articleId)
      if (status === 200 && data.success) {
        const { description, likes, _id, updatedAt, createdAt, ...others } = data.data;
        setArticleDetail(others)
        setDesc(description);
      }
    } catch (error) {
      Toastify.error(error.message)
    }

  }


  // get category 
  const getCategoryList = async () => {
    try {
      const { data, status } = await categoryServices.list()
      if (status === 200 && data.success) {
        setCategoryList(data.data.result);
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  // get authros 
  const getAuthors = async () => {
    try {
      const { data, status } = await adminServices.list()
      if (status === 200 && data.success) {
        let dataList = [];
        for (let i in data.data.result) {
          dataList.push(
            {
              _id: data.data.result[i]._id,
              title: data.data.result[i].firstName + `${" "}` + data.data.result[i].lastName
            }
          );
        }
        setAuthorList(dataList)
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  const editArticleDetail = async (vals) => {
    let formData = new FormData();
    for (let key in vals) {

      if (vals[key] !== articleDetail[key]) {
        if (key === "categories") {
          formData.append(`${key}[]`, vals[key])
          continue
        }
        formData.append(key, vals[key])

      }
    }
    if (articleImage) {
      formData.append("image", articleImage);
    }
    if (posterImage) {
      formData.append("poster", posterImage);
    }
    formData.append("description", desc);

    try {
      const { data, status } = await articleServices.update(articleId, formData)
      if (status === 201 && data.success) {
        Toastify.success(data.message)
        history.push("/articles/")
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  return (
    <div className="mt-5 p-4 border-radius-lg card-shadow bg-white">

      <div >

        <Formik
          innerRef={formikRef}
          initialValues={articleDetail}
          enableReinitialize={true}
          onSubmit={editArticleDetail}
          validationSchema={articleValidator.create}
        >
          {({ isValid, dirty }) => (
            <Form className="row justify-content-start align-items-end">
              <Col lg={12} className="mb-3 ">
                <p className="text-lightBlue is-size-5 yekan-ExtraBold mb-0 "><IoInformationCircleOutline size={20} /> عناوین</p>
              </Col>
              <Col lg={4} className="mb-4">
                <FastField
                  name="title"
                  label="عنوان مقاله *"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={4} className="mb-4">
                <FastField
                  name="page_title"
                  label="عنوان مرورگر *"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={4} className="mb-4">
                <FastField
                  name="url"
                  label="Url *"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={12} className="mb-3 mt-4">
                <p className="text-lightBlue is-size-5 yekan-ExtraBold mb-0"><IoInformationCircleOutline size={20} /> اطلاعات</p>
              </Col>

              <Col lg={4} className="mb-4">

                <Field
                  name="publish_time"
                  label="تاریخ شروع انتشار"
                  as={PersianDatePicker}
                />
              </Col>
              <Col lg={4} className="mb-4">
                <Field
                  name="categories"
                  label="دسته بندی"
                  options={categoryList}
                  as={CustomizedSelect}
                />
              </Col>
              <Col lg={4} className="mb-4">
                <Field
                  label="نویسنده "
                  name="author"
                  options={authorList}
                  as={CustomizedSelect}
                />

              </Col>
              <Col lg={12} className="mb-3 mt-4">
                <p className="text-lightBlue is-size-5 yekan-ExtraBold mb-0"><IoInformationCircleOutline size={20} /> سئو</p>
              </Col>
              <Col lg={4} className="mb-4">
                <FastField
                  name="meta_description"
                  label="توضیحات Meta *"
                  rows={3}
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={4} className="mb-4">
                <FastField
                  name="meta_keyword"
                  label="کلمات کلیدی *"
                  rows={3}
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={4} className="mb-4">
                <FastField
                  name="meta_tag"
                  label="تگ‌ها *"
                  rows={3}
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={12} className="mb-3 mt-4">
                <p className="text-lightBlue is-size-5 yekan-ExtraBold mb-0  "><IoInformationCircleOutline size={20} /> توضیحات</p>
              </Col>
              <Col lg={12} className="mb-4">
                <FastField
                  name="summary"
                  label="توضیحات مختصر *"
                  rows={4}
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={12} className="mb-4">
                <TextEditor
                  label="توضیحات کامل *"
                  data={desc}
                  onChange={(data) => setDesc(data)}
                // errorMessage={serverError && serverError.desc}
                />

              </Col>

              <Col lg={12} className="mb-4 mt-4 d-flex flex-wrap justify-content-center align-items-center">
                <Col lg={12} className="pr-0 mb-3">
                  <p className="text-lightBlue is-size-5 yekan-ExtraBold">
                    <RiImageEditLine size="20" /> ویرایش تصاویر مقاله
                  </p>
                </Col>
                <Col lg={4} md={6} className="mb-3 mb-md-0">
                  <Field
                    name="image"
                    iconSrc={uploadPoster}
                    title=" عکس شاخص (عکس بزرگ)"
                    data={articleImage}
                    imageSrc={`http://194.5.192.82:4000/api/v1/article/images/${articleDetail.image}`}
                    handleSetFiles={(e) => setArticleImage(e.target.files[0])}
                    handleDeleteFiles={() => setArticleImage()}
                    as={CustomizedFileButton}
                  />
                </Col>
                <Col lg={4} md={6}>
                  <Field
                    name="poster"
                    title=" عکس لیست (عکس کوچک) "
                    iconSrc={uploadList}
                    data={posterImage}
                    // errorMassage
                    imageSrc={`http://194.5.192.82:4000/api/v1/article/images/${articleDetail.poster}`}
                    handleSetFiles={(e) => setPosterImage(e.target.files[0])}
                    handleDeleteFiles={() => setPosterImage()}
                    as={CustomizedFileButton}
                  />
                </Col>
              </Col>
              <Col lg={12} className="mt-4 text-left">
                <CustomizedButton
                  type="submit"
                  className="px-5 is-size-5 yekan-ExtraBold "
                  variant="lightBlue"
                  size="lg"
                >
                  ذخیره
                </CustomizedButton>
              </Col>
            </Form>
          )}
        </Formik>
      </div>

    </div>
  );
}
