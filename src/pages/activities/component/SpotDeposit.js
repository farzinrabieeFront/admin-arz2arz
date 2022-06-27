import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import { inactivityIntervalServices } from "../../../services";
import CustomizedButton from "../../../components/form/button/Button";
import CustomizedTextarea from "../../../components/form/text-area/Textarea";
import DateConvert from "../../../utils/date";
import PersianDatePicker from "../../../components/form/datepicker/PersianDatePicker";
import Tip from "../../../components/tip/Tip";
import { Toastify } from "../../../utils";

const SpotDeposit = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getActivity();
  }, []);
  const getActivity = async () => {
    let params = {
      action: "spotDeposit",
    };
    try {
      const { data, status } = await inactivityIntervalServices.single(params);
      if (status === 200 && data.success) {
        setData(data.result);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  const onSubmit = async (values) => {
    let { start, end, ...rest } = values;
    const body = {
      ...rest,
      start: new Date(start).getTime(),
      end: new Date(end).getTime(),
      action: "spotDeposit",
    };
    try {
      const { data, status } = await inactivityIntervalServices.create(body);
      if (status === 201 && data.success) {
        Toastify.success(data.message);
        getActivity();
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  const handleDeletInactivity = async () => {
    let params = {
      action: "spotDeposit",
    };
    try {
      const { data, status } = await inactivityIntervalServices.delete(params);
      if (status === 201 && data.success) {
        Toastify.success(data.message);
        getActivity();
        setData();
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  return (
    <div>
      {data ? (
        <div className="row justify-content-between ">
          <div className="col-12">
            <Tip variant="danger" title=" واریز ارزی" className="m-0">
              <p className="is-size-6 mb-0">
                بخش واریز ارزی از تاریخ
                <span className="mx-2 yekan-Bold text-darkRed">
                  {DateConvert.toShamsiDate(new Date(+data?.start))} ساعت{" "}
                  <span className="FaNum">
                    {new Date(+data?.start).getHours()}:
                    {new Date(+data?.start).getMinutes()}
                  </span>
                </span>
                تا تاریخ
                <span className="mx-2 yekan-Bold text-darkRed">
                  {DateConvert.toShamsiDate(new Date(+data?.end))} ساعت{" "}
                  <span className="FaNum">
                    {new Date(+data?.end).getHours()}:
                    {new Date(+data?.end).getMinutes()}
                  </span>
                </span>
                {data?.message ? (
                  <>
                    به دلیل{" "}
                    <span className=" text-darkRed">{data?.message} </span>
                  </>
                ) : null}{" "}
                غیر فعال می‌باشد
              </p>
            </Tip>
          </div>
          <div className="col-12 mt-3 text-left">
            <CustomizedButton
              onClick={handleDeletInactivity}
              variant="lightRed"
              size="md"
              className="is-size-6"
            >
              حذف محدودیت‌ها
            </CustomizedButton>
          </div>
        </div>
      ) : null}
      {data ? null : (
        <Formik
          initialValues={{ start: new Date(), end: new Date() }}
          onSubmit={onSubmit}
        >
          {({ isValid, dirty }) => (
            <Form className={`row justify-content-start align-items-end`}>
              <Col lg={6} className="mb-3">
                <Field
                  name="start"
                  timePicer
                  label="لطفا تاریخ و ساعت شروع مسدود سازی را مشخص کنید"
                  as={PersianDatePicker}
                />
              </Col>
              <Col lg={6} className="mb-3">
                <Field
                  name="end"
                  timePicer
                  label="لطفا تاریخ و ساعت پایان مسدود سازی را مشخص کنید"
                  as={PersianDatePicker}
                />
              </Col>
              <Col lg={12} className="mb-3">
                <Field
                  minRows="3"
                  maxRows="6"
                  label="لطفا دلیل مسدودسازی این بخش را بنویسید."
                  name="message"
                  as={CustomizedTextarea}
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
                    افزودن
                  </span>
                </CustomizedButton>
              </Col>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default SpotDeposit;
