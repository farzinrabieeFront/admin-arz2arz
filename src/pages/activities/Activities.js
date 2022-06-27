import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BiBlock } from "react-icons/all";
import { Field } from "formik";
//components
import CustomizedButton from "../../components/form/button/Button";
import CustomizedTextarea from "../../components/form/text-area/Textarea";

import { useTitle } from "../../context";
import CustomizedTabs from "../../components/tabs/Tabs";
import ActivityActions from "./data/actions";
import {
  FiatDeposit,
  SpotDeposit,
  SpotWithdraw,
  FiatWithdraw,
  Trade,
  LimitTrade,
  FiatTrade,
} from "./component";
import { activityValidator } from "../../utils/validators";
import { exchangeActivityServices } from "../../services";
import { Toastify } from "../../utils";
import Tip from "../../components/tip/Tip";
import FormikConfirmationModal from "../../components/formik-modal/FormikConfirmationModal";

export default function ActivitiesPage() {
  document.title = "ارز تو ارز | فعالیت‌ها";
  const { setTitle } = useTitle();
  const [activeAction, setActiveAction] = useState();
  const [exchangeData, setExchangeData] = useState();
  const [formikModal, setFormikModal] = useState(false);
  const [adminMessage, setAdminMessage] = useState();

  useEffect(() => {
    setTitle("فعالیت‌ها");
    getExchangeActivity();
  }, []);
  const getExchangeActivity = async () => {
    try {
      const { data, status } = await exchangeActivityServices.get();
      if (status === 200 && data.success) {
        setExchangeData(data.result.deactivate);
        setAdminMessage(data.result.message);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  const handleChangeExchangeActivity = async (vals) => {
    try {
      let body = {};
      if (exchangeData) {
        body = {
          deactivate: false,
        };
      } else {
        body = {
          ...vals,
          deactivate: true,
        };
      }
      const { data, status } = await exchangeActivityServices.create(body);
      if (status === 201 && data.success) {
        Toastify.success(data.message);
        getExchangeActivity();
        setFormikModal();
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  return (
    <div className="w-100 mt-3 mt-sm-5">
      <FormikConfirmationModal
        show={formikModal}
        title="مسدودسازی صرافی ارز تو ارز"
        Icon={<BiBlock size={25} className="ml-1 text-danger" />}
        onHide={() => setFormikModal()}
        initialValues={{ message: "" }}
        onSubmit={handleChangeExchangeActivity}
        validationSchema={activityValidator.edit}
      >
        <Field
          maxRows="10"
          rows="3"
          label=" لطفا دلیل مسدودسازی را بنویسید"
          name="message"
          as={CustomizedTextarea}
        />
      </FormikConfirmationModal>

      <Row className="justify-content-center align-items-stretch">
        <Col lg={9} className="mt-5 mb-4">
          <CustomizedTabs
            data={ActivityActions.titleActions}
            handleSetTitle={(title) => setActiveAction(title)}
            activeData={activeAction}
          />
        </Col>
        <Col lg={9}>
          <div className="p-4 border-radius-md box-shadow bg-white h-100 transition-height">
            <div className="mb-4 d-flex justify-content-between align-items-center">
              <div>
                <h1 className="is-size-5 mb-2">فعالیت‌ها</h1>
                <p className="is-size-7 gainsboro mb-0">
                  در این بخش شما می‌توانید فعالیت‌های بخش {activeAction} را
                  مدیریت کنید.
                </p>
              </div>
            </div>
            {activeAction === "صرافی" ? (
              <div className="row justify-content-between align-items-center">
                <div className="col-12">
                  {exchangeData ? (
                    <Tip className="mb-0" variant="danger" title="صرافی">
                      <p className="is-size-6 mb-0">
                        تمامی بخش های صرافی (واریز و برداشت ارزی و تومانی و
                        معاملات Fiat و Spot){" "}
                        {adminMessage ? (
                          <>
                            به دلیل{" "}
                            <span className=" text-darkRed">
                              {adminMessage}{" "}
                            </span>
                          </>
                        ) : null}
                        غیرفعال می‌باشد.
                        <br />
                        با فعال سازی صرافی تمامی این بخش‌ها قابل دسترسی خواهند
                        بود.
                      </p>
                    </Tip>
                  ) : (
                    <Tip className="mb-0" variant="success" title="صرافی">
                      <p className="is-size-6 mb-0">
                        {" "}
                        تمامی بخش های صرافی (واریز و برداشت ارزی و تومانی و
                        معاملات Fiat و Spot) فعال می‌باشد.
                        <br />
                        با غیرفعال سازی صرافی، تمامی این بخش‌ها از دسترس کاربران
                        خارج خواهد شد
                      </p>
                    </Tip>
                  )}
                </div>
                <div className="col-12 mt-3 text-left">
                  {exchangeData ? (
                    <CustomizedButton
                      onClick={handleChangeExchangeActivity}
                      variant="success"
                      size="md"
                      className="is-size-6"
                    >
                      فعال سازی
                    </CustomizedButton>
                  ) : (
                    <CustomizedButton
                      onClick={() => setFormikModal(true)}
                      variant="lightRed"
                      size="md"
                      className="is-size-6"
                    >
                      غیرفعال سازی
                    </CustomizedButton>
                  )}
                </div>
              </div>
            ) : activeAction === "واریز تومانی" ? (
              <FiatDeposit />
            ) : activeAction === "واریز ارزی" ? (
              <SpotDeposit />
            ) : activeAction === "برداشت تومانی" ? (
              <FiatWithdraw />
            ) : activeAction === "برداشت ارزی" ? (
              <SpotWithdraw />
            ) : activeAction === "معاملات تبدیل ارز" ? (
              <Trade />
            ) : activeAction === "معاملات اتوماتیک" ? (
              <LimitTrade />
            ) : activeAction === "معاملات خرید و فروش" ? (
              <FiatTrade />
            ) : null}
          </div>
        </Col>
      </Row>
    </div>
  );
}
