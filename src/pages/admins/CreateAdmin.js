import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col } from "react-bootstrap";
import { Form, Formik, FastField } from "formik";
import * as yup from "yup";
import Styles from "./AdminStyles.module.scss";
//components
import CustomizedInput from "../../components/form/input/Input";
import CustomizedButton from "../../components/form/button/Button";
import adminServices from "../../services/httpServices/adminServices";
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import { useTitle } from "../../context";
import CustomizedTabs from "../../components/tabs/Tabs";
import { adminValidator } from "../../utils/validators";
import { Toastify } from "../../utils";

export default function CreateAdmin() {
  document.title = "ارز تو ارز | افزودن ادمین‌";
  const { setTitle } = useTitle();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState();
  useEffect(() => {
    setTitle("مدیریت ادمین‌ها / افزودن ادمین‌ جدید");
  }, []);

  const createNewAdmin = async (vals) => {
    let body = {
      isActive: true,
      ...vals,
    };
    try {
      const { data, status } = await adminServices.create(body);
      if (status === 200 && data.success) {
        Toastify.success(data.message);

        history.push({
          pathname: `/admins/edit-admin/${data.data._id}`,
          state: { prevUrl: history.location.pathname },
        });
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  return (
    <div className="mt-3 mt-sm-5 d-flex flex-wrap justify-content-center">
      <div className="col-12 col-lg-8 d-flex p-0 mt-5">
        <CustomizedTabs
          data={["افزودن اطلاعات ادمین", "تعیین سطح دسترسی"]}
          handleSetTitle={(title) => setActiveTab(title)}
          disabledTab="تعیین سطح دسترسی"
        />
      </div>

      <div className="mt-4 col-12 col-lg-8 p-4 border-radius-lg card-shadow bg-white transition-height">
        <Formik
          initialValues={FormikInitialValues.admin.form}
          onSubmit={createNewAdmin}
          validationSchema={adminValidator.create}
        >
          {({ isValid, dirty, handleBlur, handleChange }) => (
            <Form className="row justify-content-start align-items-end">
              <Col lg={12} className="mb-3">
                <h1 className="is-size-5 mb-0">اطلاعات ادمین</h1>
              </Col>
              <Col md={6} className="mb-4">
                <FastField name="firstName" label="نام" as={CustomizedInput} />
              </Col>
              <Col md={6} className="mb-4">
                <FastField
                  name="lastName"
                  label="نام خانوادگی"
                  as={CustomizedInput}
                />
              </Col>
              <Col md={6} className="mb-4">
                <FastField
                  name="email"
                  required
                  label="ایمیل"
                  type="email"
                  as={CustomizedInput}
                />
              </Col>
              <Col md={6} className="mb-4">
                <FastField
                  name="mobile"
                  label="موبایل"
                  type="tel"
                  className="FaNum"
                  as={CustomizedInput}
                />
              </Col>

              <Col md={6} className="mb-4">
                <FastField
                  className="ltr"
                  name="password"
                  label="رمز عبور"
                  type="password"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={12} className="text-left">
                <CustomizedButton
                  type="submit"
                  className="px-5"
                  variant="lightBlue"
                  size="lg"
                >
                  <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                    ذخیره
                  </span>
                </CustomizedButton>
              </Col>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
