import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Formik, FastField, Field } from "formik";
import { Row, Col } from "react-bootstrap";
import {
  FiEdit,
  IoInformationCircleOutline,
  RiImageEditLine,
} from "react-icons/all";
//components
import articleServices from "../../services/httpServices/articleServices";
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import categoryServices from "../../services/httpServices/categoryServices";
import uploadPoster from "../../assets/images/uploadPoster.png";
import uploadList from "../../assets/images/uploadList.png";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedSelect from "../../components/form/select/Select";
import PersianDatePicker from "../../components/form/datepicker/PersianDatePicker";
import CustomizedFileButton from "../../components/form/file-button/FileButton";
import TextEditor from "../../components/form/text-editor/TextEditor";
import adminServices from "../../services/httpServices/adminServices";
import { useTitle } from "../../context";
import { Toastify } from "../../utils";
import articleValidator from "../../utils/validators/articeValidator";

export default function CreateArticleForm() {
  document.title = "ارز تو ارز | افزودن مقاله";
  const { title, setTitle } = useTitle();
  const history = useHistory();
  const [articleImage, setArticleImage] = useState();
  const [posterImage, setPosterImage] = useState();
  const [desc, setDesc] = useState();
  const [startPublish, setStartPublish] = useState(new Date().toISOString());
  const [categoryList, setCategoryList] = useState([]);
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    getCategoryList();
    getAuthors();
  }, []);

  useEffect(() => {
    setTitle("افزودن مقاله");
  }, []);

  const getCategoryList = async () => {
    try {
      const { data, status } = await categoryServices.list();
      if (status === 200 && data.success) {
        setCategoryList(data.data.result);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  // get authros detail
  const getAuthors = async () => {
    try {
      const { data, status } = await adminServices.list();
      if (status === 200 && data.success) {
        let dataList = [];
        for (let i in data.data.result) {
          dataList.push({
            _id: data.data.result[i]._id,
            title:
              data.data.result[i].firstName +
              `${" "}` +
              data.data.result[i].lastName,
          });
        }
        setAuthor(dataList);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  // create Article detail
  const createArticleDetail = async (vals) => {
    let formData = new FormData();
    if (articleImage && posterImage) {
      for (let key in vals) {
        if (key === "categories") {
          formData.append(`${key}[]`, vals[key]);
          continue;
        }
        formData.append(key, vals[key]);
      }
      formData.append("image", articleImage);
      formData.append("poster", posterImage);
      formData.append("description", desc);

      try {
        const { data, status } = await articleServices.create(formData);
        if (status === 200 && data.success) {
          Toastify.success(data.message);
          history.push("/articles/");
        }
      } catch (error) {
        Toastify.error(error.message);
      }
    } else {
      Toastify.error("افزودن فیلدهای تصاویر الزامی می‌باشند");
    }
  };

  return (
    <div className="mt-5 p-4 border-radius-lg card-shadow bg-white">
      <div>
        <Formik
          initialValues={FormikInitialValues.article.form}
          onSubmit={createArticleDetail}
          validationSchema={articleValidator.create}
        >
          {({ isValid, dirty }) => (
            <Form className="row justify-content-start align-items-end">
              <Col lg={12} className="mb-3 ">
                <p className="text-lightBlue is-size-5 yekan-ExtraBold mb-0 ">
                  <IoInformationCircleOutline size={20} /> عناوین
                </p>
              </Col>
              <Col lg={4} className="mb-4">
                <Field
                  name="title"
                  label="عنوان مقاله *"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={4} className="mb-4">
                <Field
                  name="page_title"
                  label="عنوان مرورگر *"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={4} className="mb-4">
                <Field name="url" label="Url *" as={CustomizedInput} />
              </Col>
              <Col lg={12} className="mb-3 mt-4">
                <p className="text-lightBlue is-size-5 yekan-ExtraBold mb-0">
                  <IoInformationCircleOutline size={20} /> اطلاعات
                </p>
              </Col>

              <Col lg={4} className="mb-4">
                {/* <Field
                  name="publish_time"
                  label="تاریخ شروع انتشار"
                  as={CustomizedDatePicker}
                /> */}
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
                  options={author}
                  as={CustomizedSelect}
                />
              </Col>
              <Col lg={12} className="mb-3  mt-4">
                <p className="text-lightBlue is-size-5 yekan-ExtraBold mb-0   ">
                  <IoInformationCircleOutline size={20} /> سئو
                </p>
              </Col>
              <Col lg={4} className="mb-4">
                <Field
                  name="meta_description"
                  label="توضیحات Meta *"
                  rows={3}
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={4} className="mb-4">
                <Field
                  name="meta_keyword"
                  label="کلمات کلیدی *"
                  rows={3}
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={4} className="mb-4">
                <Field
                  name="meta_tag"
                  label="تگ‌ها *"
                  rows={3}
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={12} className="mb-3 mt-4">
                <p className="text-lightBlue is-size-5 yekan-ExtraBold mb-0  ">
                  <IoInformationCircleOutline size={20} /> توضیحات
                </p>
              </Col>
              <Col lg={12} className="mb-4">
                <Field
                  name="summary"
                  label="توضیحات مختصر *"
                  rows={4}
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={12} className="mb-4">
                <TextEditor
                  label="توضیحات کامل *"
                  onChange={(data) => setDesc(data)}
                  // errorMessage={serverError && serverError.desc}
                />
              </Col>

              <Col
                lg={12}
                className="mb-4 mt-4 d-flex flex-wrap justify-content-center align-items-center"
              >
                <Col lg={12} className="pr-0 mb-3">
                  <p className="text-lightBlue is-size-5 yekan-ExtraBold">
                    <RiImageEditLine size="20" /> افزودن تصاویر مقاله
                  </p>
                </Col>
                <Col lg={4} md={6} className="mb-3 mb-md-0">
                  <Field
                    name="image"
                    iconSrc={uploadPoster}
                    title=" عکس شاخص (عکس بزرگ)"
                    data={articleImage}
                    handleSetFiles={(e) => setArticleImage(e.target.files[0])}
                    handleDeleteFiles={() => setArticleImage()}
                    as={CustomizedFileButton}
                  />
                </Col>
                <Col lg={4} md={6}>
                  <Field
                    name="poster"
                    iconSrc={uploadList}
                    title=" عکس لیست (عکس کوچک) "
                    data={posterImage}
                    handleSetFiles={(e) => setPosterImage(e.target.files[0])}
                    handleDeleteFiles={() => setPosterImage()}
                    as={CustomizedFileButton}
                  />
                </Col>
              </Col>
              <Col lg={12} className="mt-4 text-left">
                <CustomizedButton
                  type="submit"
                  className="px-5"
                  variant="lightBlue"
                  size="lg"
                >
                  <span className="is-size-5 yekan-ExtraBold ">افزودن</span>
                </CustomizedButton>
              </Col>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
