import React from "react";
import { Col } from "react-bootstrap";
import { Form, Formik, FastField, Field } from "formik";
import * as yup from "yup";

import CustomizedInput from "../../../components/form/input/Input";
import CustomizedButton from "../../../components/form/button/Button";
import { adminServices } from "../../../services";
import { Toastify } from "../../../utils";
import { adminValidator } from "../../../utils/validators";

const AdminInfo = ({ id, reLoad, adminData }) => {
  const updateAdmin = async (vals) => {
    let body = {};
    for (const key in vals) {
      if (vals[key] !== adminData[key]) body = { ...body, [key]: vals[key] };
    }
    try {
      const { data, status } = await adminServices.update(id, body);
      if (status === 201 && data.success) {
        Toastify.success(data.message);
        reLoad();
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  return (
    <Formik
      initialValues={adminData}
      onSubmit={updateAdmin}
      enableReinitialize={true}
      validationSchema={adminValidator.edit}
    >
      {({ isValid, dirty }) => (
        <Form className="row justify-content-start align-items-end">
          <Col lg={12} className="mb-3">
            <h1 className="is-size-5 mb-0">اطلاعات ادمین</h1>
          </Col>
          <Col sm={6} className="mb-4">
            <FastField name="firstName" label="نام" as={CustomizedInput} />
          </Col>
          <Col sm={6} className="mb-4">
            <FastField
              name="lastName"
              label="نام خانوادگی"
              as={CustomizedInput}
            />
          </Col>

          <Col sm={6} className="mb-4">
            <FastField
              name="email"
              label="ایمیل"
              type="email"
              as={CustomizedInput}
            />
          </Col>

          <Col sm={6} className="mb-4">
            <FastField
              name="mobile"
              label="موبایل"
              type="tel"
              className="FaNum"
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
                ویرایش
              </span>
            </CustomizedButton>
          </Col>
        </Form>
      )}
    </Formik>
  );
};

export default AdminInfo;
