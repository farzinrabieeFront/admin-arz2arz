import React, { useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import {
  BiBlock,
  BsCheckLg,
  BsShieldCheck,
  BsShieldX,
  IoInformationCircleOutline,
  TiInfo,
  BsShieldExclamation,
} from "react-icons/all";
import { useHistory, useParams } from "react-router-dom";
import Styles from "./FiatWithdraw.module.scss";
import Tip from "../../../components/tip/Tip";
import { bankAccountServices, transactionsServices } from "../../../services";
import { Toastify } from "../../../utils";
import DateConvert from "../../../utils/date";
import CustomizedBadge from "../../../components/badge/Badge";
import CustomizedTextarea from "../../../components/form/text-area/Textarea";
import CustomizedAlert from "../../../components/alert/CustomizedAlert";
import CustomizedButton from "../../../components/form/button/Button";
import FormikConfirmationModal from "../../../components/formik-modal/FormikConfirmationModal";
import { FastField } from "formik";
import CustomizedInput from "../../../components/form/input/Input";
import fiatWithdrawValidator from "../../../utils/validators/fiatWithdrawValidator";
import { useTitle } from "../../../context";

const SingleFiatWithdraw = () => {
  const history = useHistory();
  const { id } = useParams();
  const { setTitle } = useTitle();
  const [detail, setDetail] = useState({});
  const [bankAccountId, setBankAccountId] = useState();
  const [bankAccountData, setBankAccountData] = useState({});
  const [identityData, setIdentityData] = useState({});
  const [approvedModal, setApprovedModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  useEffect(() => {
    setTitle(" برداشت تومانی");
  }, []);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const { data, status } = await transactionsServices.fiat.withdraw.single(
        id
      );
      if (status === 200 && data.success) {
        const { bankAccount, ...others } = data.data.withdraw;
        setDetail(others);
        setBankAccountId(bankAccount);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  useEffect(() => {
    if (bankAccountId) {
      getBankAccount();
    }
  }, [bankAccountId]);

  const getBankAccount = async () => {
    try {
      const { data, status } = await bankAccountServices.single(bankAccountId);
      if (status === 200 && data.success) {
        setBankAccountData(data.data.bankAccount);
        console.log(data.data.bankAccount);
        setIdentityData(data.data.identity);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  const assignAdmin = async () => {
    try {
      let body = {
        assignAdmin: true,
      };
      const { data, status } = await transactionsServices.fiat.withdraw.assign(
        detail._id,
        body
      );
      if (status === 201 && data.success) {
        Toastify.success(data.message);
        getData();
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  const verifyWithdraw = async (body) => {
    try {
      const { data, status } = await transactionsServices.fiat.withdraw.confirm(
        detail._id,
        body
      );
      if (status === 201 && data.success) {
        Toastify.success(data.message);
        setApprovedModal();
        setRejectModal();
        getData();
        setApprovedModal();
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  const cancelWithdraw = async (body) => {
    try {
      const { data, status } = await transactionsServices.fiat.withdraw.cancel(
        detail._id,
        body
      );
      if (status === 201 && data.success) {
        Toastify.success(data.message);
        setApprovedModal();
        setRejectModal();
        getData();
        setApprovedModal();
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  return (
    <div className="mt-4">
      <FormikConfirmationModal
        show={rejectModal}
        title="رد درخواست برداشت"
        Icon={<BiBlock size={20} className="ml-1 text-danger" />}
        onHide={() => setRejectModal()}
        initialValues={{ message: "" }}
        onSubmit={cancelWithdraw}
        validationSchema={fiatWithdrawValidator.reject}
      >
        <FastField
          maxRows="10"
          minRows="3"
          rows="4"
          placeholder=" لطفا دلیل رد درخواست برداشت کاربر را وارد کنید"
          as={CustomizedTextarea}
          label="پیغام"
          name="message"
        />
      </FormikConfirmationModal>
      <FormikConfirmationModal
        show={approvedModal}
        title="تایید درخواست برداشت"
        Icon={<BsCheckLg size={20} className="ml-1 text-success" />}
        onHide={() => setApprovedModal()}
        initialValues={{ refId: "" }}
        onSubmit={verifyWithdraw}
        validationSchema={fiatWithdrawValidator.approved}
      >
        <FastField
          label="شناسه پرداخت"
          placeholder="شناسه پرداخت"
          name="refId"
          as={CustomizedInput}
        />
      </FormikConfirmationModal>
      <Row className="justify-content-center">
        <Col lg={10}>
          <div className="p-4 border-radius-lg card-shadow bg-white">
            <Row>
              <Col xs={12} className="mb-4">
                <h1 className="is-size-4 yekan-Bold mb-0">برداشت تومانی</h1>
              </Col>
              {detail.assignedAdminTime ? null : (
                <Col xs={12} className="mb-4">
                  <Row className="justify-content-between align-items-center">
                    <Col md={9}>
                      <span className="mb-0 is-size-6 text-gray-blue">
                        با انتساب این عملیات به خود، کل فرایند انتقال پول (شامل
                        واریز فیش بانکی و تایید یا رد درخواست برداشت کاربر) به
                        شما انتساب داده خواهد شد و ادمین دیگری دسترسی این کار را
                        نخواهد داشت و موظفید تا ۲۴ سایت آینده واریز را انجام
                        دهید .
                      </span>
                    </Col>
                    <Col md={3} className="text-left mt-3 mt-md-0">
                      <CustomizedButton
                        className="yekan-Bold is-size-6"
                        variant="yellow"
                        onClick={assignAdmin}
                      >
                        انتساب عملیات برداشت
                      </CustomizedButton>
                    </Col>
                  </Row>
                </Col>
              )}

              <Col xs={12} className="mb-3">
                {detail.customer?.fiatWithdrawAccess ? null : (
                  <CustomizedAlert variant="danger" className="mb-4">
                    <p className="mb-0 text-danger">
                      <IoInformationCircleOutline size={20} /> دسترسی برداشت
                      تومانی موقتا برای این کاربر بسته شده است!
                    </p>
                  </CustomizedAlert>
                )}

                <Tip
                  variant={`${
                    detail.status === "PENDING"
                      ? "info"
                      : detail.status === "ASSIGNED"
                      ? "info"
                      : detail.status === "CANCELED"
                      ? "danger"
                      : "success"
                  }`}
                  title={`برداشت مبلغ ${new Number(
                    detail.amount || 0
                  ).toLocaleString()} تومان`}
                >
                  <div className="row align-items-center">
                    <div
                      className={`${Styles.identityInfo} col-12 col-md-6 my-3 d-flex flex-column`}
                    >
                      <h2 className="is-size-5">اطلاعات کاربر</h2>
                      <div className="mb-2 d-flex align-items-center">
                        <span className="is-size-7 yekan-Light">
                          نام و نام خانوادگی :
                        </span>
                        <span className="mr-2">
                          {identityData.firstName || "__"}{" "}
                          {identityData.lastName}
                        </span>
                      </div>
                      <div className="mb-2 d-flex align-items-center">
                        <span className="is-size-7 yekan-Light">ایمیل :</span>
                        <span className="mr-2">{detail.customer?.email}</span>
                      </div>
                      <div className="mb-2 d-flex align-items-center">
                        <span className="is-size-7 yekan-Light">موبایل :</span>
                        <span className="FaNum mr-2">
                          {identityData.mobile || "__"}
                        </span>
                      </div>
                      <div className="mb-2 d-flex align-items-center">
                        <span className="is-size-7 yekan-Light">
                          تاریخ درخواست :
                        </span>
                        <span className="FaNum mr-2">
                          {DateConvert.getTime(detail.createdAt)}
                          <span className="mx-1 text-gainsboro">|</span>
                          {DateConvert.toShamsiDate(detail.createdAt)}
                        </span>
                      </div>
                      <div className="mb-2 d-flex align-items-center">
                        <span className="is-size-7 yekan-Light">
                          وضعیت احراز هویت :
                        </span>
                        <span className="FaNum mr-2">
                          {detail.customer?.isVerified ? (
                            <CustomizedBadge variant="success">
                              احراز شده
                            </CustomizedBadge>
                          ) : (
                            <CustomizedBadge variant="danger">
                              احراز نشده
                            </CustomizedBadge>
                          )}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`${Styles.bankAccountInfo} col-12 col-md-6 my-3 d-flex flex-column`}
                    >
                      <h2 className="is-size-5">اطلاعات حساب بانکی</h2>
                      <div className="mb-2 d-flex align-items-center">
                        <span className="is-size-7 yekan-Light">
                          نام بانک :
                        </span>
                        <span className="FaNum mr-2">
                          {bankAccountData?.bank?.name}
                        </span>
                      </div>

                      <div className="mb-2 d-flex align-items-center">
                        <span className="is-size-7 yekan-Light">
                          شماره کارت :
                        </span>
                        <span className="FaNum mr-2">
                          {bankAccountData?.card}
                        </span>
                      </div>
                      <div className="mb-2 d-flex align-items-center">
                        <span className="is-size-7 yekan-Light">
                          شماره شبا :
                        </span>
                        <span className="en mr-2">
                          {bankAccountData?.sheba}
                        </span>
                      </div>
                    </div>
                    <div className="col-12">
                      {detail.assignedAdminTime &&
                      detail.status === "PENDING" ? (
                        <p className=" is-size-5 yekan-ExtraBold mb-0">
                          <BsShieldExclamation
                            size={18}
                            className="ml-2 text-lightBlue"
                          />
                          در دست پیگیری توسط ادمین{" "}
                          <span className="text-lightBlue mx-1">
                            {detail.assignedAdmin?.firstName}{" "}
                            {detail.assignedAdmin?.lastName}
                          </span>{" "}
                          از تاریخ
                          <span className="FaNum d-inline-block mx-2 yekan-ExtraBold ltr">
                            {DateConvert.getTime(
                              detail.assignedAdminTime || new Date()
                            )}
                            <span className="mx-1 en roboto-Black">|</span>
                            {DateConvert.toShamsiDate(
                              detail.assignedAdminTime || new Date()
                            )}
                          </span>
                        </p>
                      ) : detail.assignedAdminTime &&
                        detail.status === "CANCELED" ? (
                        <div className=" is-size-5 yekan-ExtraBold mb-0">
                          <BsShieldX size={18} className="ml-2 text-darkRed" />
                          رد شده توسط ادمین{" "}
                          <span className="text-darkRed mx-1">
                            {detail.assignedAdmin?.firstName}{" "}
                            {detail.assignedAdmin?.lastName}
                          </span>{" "}
                          در تاریخ
                          <span className="FaNum d-inline-block mx-2 yekan-ExtraBold ltr">
                            {DateConvert.getTime(
                              detail.assignedAdminTime || new Date()
                            )}
                            <span className="mx-1 en roboto-Black">|</span>
                            {DateConvert.toShamsiDate(
                              detail.assignedAdminTime || new Date()
                            )}
                          </span>
                          <p className=" mt-2 mb-0 pr-4 ">
                            <span>به دلیل : </span>
                            <span className="yekan-Light is-size-6 text-darkRed">
                              {" "}
                              {detail.message}{" "}
                            </span>
                          </p>
                        </div>
                      ) : detail.assignedAdminTime &&
                        detail.status === "CONFIRMED" ? (
                        <div className=" is-size-5 yekan-ExtraBold mb-0">
                          <BsShieldCheck
                            size={18}
                            className="ml-2 text-success"
                          />
                          تایید شده توسط ادمین{" "}
                          <span className="text-success mx-1">
                            {detail.assignedAdmin?.firstName}{" "}
                            {detail.assignedAdmin?.lastName}
                          </span>{" "}
                          در تاریخ
                          <span className="FaNum  d-inline-block mx-2 yekan-ExtraBold  ltr">
                            {DateConvert.getTime(
                              detail.assignedAdminTime || new Date()
                            )}
                            <span className="mx-1 en roboto-Black">|</span>
                            {DateConvert.toShamsiDate(
                              detail.assignedAdminTime || new Date()
                            )}
                          </span>
                          <p className=" mt-2 mb-0 pr-4 ">
                            <span className="yekan-Light is-size-6">
                              {" "}
                              با شناسه پرداخت :{" "}
                            </span>
                            <span className="text-success FaNum">
                              {" "}
                              {detail.refId}{" "}
                            </span>
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Tip>
              </Col>
              {detail.assignedAdminTime &&
              (detail.status === "PENDING" || detail.status === "ASSIGNED") ? (
                <Col xs={12}>
                  <Row className="justify-content-end ">
                    <Col md={2} xs={6}>
                      <CustomizedButton
                        isFullWidth
                        className="yekan-Bold is-size-6"
                        variant="success"
                        onClick={() => setApprovedModal(true)}
                      >
                        تایید
                      </CustomizedButton>
                    </Col>
                    <Col md={2} xs={6}>
                      <CustomizedButton
                        isFullWidth
                        outlined
                        className="yekan-Bold is-size-6"
                        variant="lightRed"
                        onClick={() => setRejectModal(true)}
                      >
                        رد
                      </CustomizedButton>
                    </Col>
                  </Row>
                </Col>
              ) : null}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SingleFiatWithdraw;
