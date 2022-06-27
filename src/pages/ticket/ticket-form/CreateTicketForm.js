import { useEffect, useState } from "react";
import Styles from "./CreateTicketForm.module.scss";
import { Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Form, Formik, FastField, Field } from "formik";
import { useParams } from "react-router-dom";
import uploadPoster from "../../../assets/images/uploadPoster.png";
//components
import CustomizedInput from "../../../components/form/input/Input";
import CustomizedSelect from "../../../components/form/select/Select";
import CustomizedButton from "../../../components/form/button/Button";
import CustomizedFileButton from "../../../components/form/file-button/FileButton";
import { ticketServices } from "../../../services";
import FormikInitialValues from "../../../utils/constants/formikInitialValues";
import { useTitle } from "../../../context";
import { ticketValidator } from "../../../utils/validators";
import { Toastify } from "../../../utils";

export default function TicketForm() {
  document.title = "ارز تو ارز | تیکت جدید";
  const { setTitle } = useTitle();
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [ticketImage, setTicketImage] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    setTitle("تیکت جدید");
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const { data, status } = await ticketServices.categoryList();
      if (status === 201 && data.success) {
        setCategory(data.data.result);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  const onSubmit = async (vals) => {
    setIsLoading(true);
    let formData = new FormData();
    for (let key in vals) {
      formData.append(key, vals[key]);
    }
    ticketImage.forEach((image) => {
      formData.append(`images`, image);
    });
    formData.append("category", id);
    formData.append("customer", id);
    try {
      const { data, status } = await ticketServices.createTicket(formData);
      if (status === 200 && data.success) {
        Toastify.success(data.message);
        history.push("/tickets/");
      }
    } catch (error) {
      Toastify.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFiles = (image) => {
    let new_list = ticketImage.filter((item) => item.name !== image.name);
    setTicketImage(new_list);
  };
  return (
    <div className="mt-5 p-4 border-radius-lg card-shadow bg-white">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="is-size-5 mb-2">تیکت جدید</h1>
          <p className="is-size-7 gainsboro mb-0">
            در این بخش شما می‌توانید به کاربر مورد نظر خود تیکت ارسال کنید.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Formik
          initialValues={FormikInitialValues.ticket.createTicket}
          validationSchema={ticketValidator.create}
          onSubmit={onSubmit}
        >
          {({ isValid, dirty }) => (
            <Form className="d-flex flex-wrap">
              <Col lg={4} md={6} sm={12}>
                <Field
                  name="category"
                  label="دسته بندی"
                  options={category}
                  as={CustomizedSelect}
                />
              </Col>
              <Col lg={4} md={6} sm={12}>
                <FastField label="موضوع" name="title" as={CustomizedInput} />
              </Col>

              <Col lg={12} className="mt-3">
                <FastField
                  label="متن پیام"
                  name="description"
                  textArea
                  rows={5}
                  as={CustomizedInput}
                />
              </Col>

              <Col className="text-left mt-3">
                <CustomizedButton
                  type="submit"
                  size="md"
                  className=" yekan-ExtraBold"
                  style={{ minWidth: "200px" }}
                  disabled={isLoading || !(isValid && dirty)}
                  isLoading={isLoading}
                >
                  ارسال پیام
                </CustomizedButton>
              </Col>
            </Form>
          )}
        </Formik>
      </div>
      <div className="d-flex flex-wrap align-items-stretch mt-3">
        {ticketImage.map((item, index) => {
          return (
            <Col
              key={index}
              lg={3}
              sm={6}
              xs={12}
              className={`${Styles.addImageCol} mb-3`}
            >
              <CustomizedFileButton
                data={item}
                name="images"
                title="عکس جدید"
                handleSetFiles={(e) =>
                  setTicketImage((prev) => [...prev, e.target.files[0]])
                }
                handleDeleteFiles={(e) => deleteFiles(e)}
              />
            </Col>
          );
        })}
        {ticketImage.length <= 2 ? (
          <Col lg={3} sm={6} xs={12} className={`${Styles.addImageCol} mb-3`}>
            <CustomizedFileButton
              iconSrc={uploadPoster}
              name="images"
              title="عکس جدید"
              handleSetFiles={(e) =>
                setTicketImage((prev) => [...prev, e.target.files[0]])
              }
            />
            {/* <FastField as={CustomizedFileButton} />   */}
          </Col>
        ) : null}
      </div>
    </div>
  );
}
