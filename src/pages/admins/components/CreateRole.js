import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Form, Formik, Field } from "formik";

import CustomizedButton from "../../../components/form/button/Button";
import CustomizedSelect from "../../../components/form/select/Select";
import { departmentServices, roleServices } from "../../../services";
import { Toastify } from "../../../utils";
import { adminValidator } from "../../../utils/validators";

const CreateAdminRole = ({ id, reLoad }) => {
  const [department, setDepartment] = useState([]);
  const roles = [
    { _id: "manager", title: "مدیر" },
    { _id: "basic", title: "کارمند" },
  ];

  useEffect(() => {
    if (id) {
      getDepartments();
    }
  }, [id]);

  const getDepartments = async () => {
    try {
      const { data, status } = await departmentServices.get();
      if (status === 200 && data.success) {
        let dataList = [];
        for (let i in data.data.result) {
          dataList.push({
            _id: data.data.result[i]._id,
            title: data.data.result[i].faName,
          });
        }
        setDepartment(dataList);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  const createRole = async (vals) => {
    const body = {
      adminID: id,
      ...vals,
    };
    try {
      const { data, status } = await roleServices.create(body);
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
      initialValues={{ roleName: "", department: "" }}
      onSubmit={createRole}
      validationSchema={adminValidator.role}
    >
      {({ isValid, dirty }) => (
        <Form className="row justify-content-start align-items-end">
          <Col lg={12} className="mb-3">
            <h1 className="is-size-5 mb-0">ایجاد دسترسی جدید</h1>
          </Col>
          <Col sm={6} className="mb-4">
            <Field
              name="roleName"
              label="سطح دسترسی"
              options={roles}
              as={CustomizedSelect}
            />
          </Col>
          <Col sm={6} className="mb-4">
            <Field
              name="department"
              label="دپارتمان"
              options={department}
              as={CustomizedSelect}
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
  );
};

export default CreateAdminRole;
