import { useEffect, useState } from "react";
import Styles from "./DetailBankAccounts.module.scss";
import { Form, Formik, FastField, Field } from "formik";
import { Row, Col } from "react-bootstrap";
import { BiBlock, BsCreditCard, BiCheckCircle, AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/all";
import { useParams } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import CustomizedTextarea from "../../components/form/text-area/Textarea";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedBadge from "../../components/badge/Badge";
import CustomizedInput from "../../components/form/input/Input";
import FormikConfirmationModal from "../../components/formik-modal/FormikConfirmationModal";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import userAvatar from "../../assets/images/user-avatar.png";
import { bankAccountServices } from "../../services";
import { useTitle } from "../../context";
import CustomizedAlert from "../../components/alert/CustomizedAlert";
import { identityValidator } from "../../utils/validators";
import { Toastify } from "../../utils";
import DateConvert from '../../utils/date';
import Tip from "../../components/tip/Tip";

export default function DetailBankAccounts() {
  document.title = "ارز تو ارز | مدیریت کارت‌های بانکی";
  const { id } = useParams();
  const { setTitle } = useTitle();
  const [bankAccount, setBankAccount] = useState({});
  const [identity, setIdentity] = useState({});
  const [rejectMessage, setRejectMessage] = useState(false);
  const [approvedMessage, setApprovedMessage] = useState(false);
  const [disabledEdit, setDisabledEdit] = useState(true);
  const [isBanned, setIsBanned] = useState(false);

  useEffect(() => {
    setTitle("مدیریت کارت‌ بانکی");
  }, []);

  useEffect(() => {
    if (id) {
      getBankAccount(id)
    }
  }, [id])

  const getBankAccount = async () => {
    try {
      const { data, status } = await bankAccountServices.single(id);
      if (status === 200 && data.success) {
        setBankAccount(data.data.bankAccount);
        setIdentity(data.data.identity)
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  const approvedRequest = async () => {
    try {
      let vals = {
        verified: "approved"
      }
      const { data, status } = await bankAccountServices.verifybankAccount(id, vals);
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        setApprovedMessage()
        getBankAccount(id)
      }
    } catch (error) {
      Toastify.error(error.message)
      setApprovedMessage()
    }
  }

  const rejectRequest = async (vals) => {
    try {
      vals = { ...vals, verified: "rejected" }

      const { data, status } = await bankAccountServices.verifybankAccount(id, vals);
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        setRejectMessage()
        getBankAccount(id)
      }
    } catch (error) {
      Toastify.error(error.message)
      setRejectMessage()
    }
  }

  const handleBannedStatus = async (isBanned) => {
    let body = {
      isBanned
    }
    try {
      const { data, status } = await bankAccountServices.banned(id, body)
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        setIsBanned();
        getBankAccount(id)
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  return (
    <div className="mt-5 d-flex flex-wrap justify-content-center">
      <FormikConfirmationModal show={rejectMessage}
        title="متن پیام رد کارت بانکی"
        Icon={<BiBlock size={25} className="ml-1 text-danger" />}
        onHide={() => setRejectMessage()}
        initialValues={{ adminMessage: "" }}
        onSubmit={rejectRequest}
        validationSchema={identityValidator.edit}
      >
        <FastField
          maxRows="10"
          rows="3"
          placeholder=" پیغام خود را وارد کنید"
          name="adminMessage"
          as={CustomizedTextarea}
        />
        <p className=" mt-2 mb-0 yekan-Bold text-gainsboro is-size-6">
          <AiOutlineCheckCircle size={18} className="ml-1 text-success" />
          رد درخواست کارت بانکی کاربر{" "}{bankAccount?.customer?.email}{" "}
        </p>
      </FormikConfirmationModal>

      <ConfirmModal show={approvedMessage}
        onHide={() => setApprovedMessage()}
        onConfirm={approvedRequest}
      >
        <span className="text-gainsboro is-size-6">
          آیا از تایید شماره کارت کاربر
          <span className="px-2 yekan-Bold text-gray-blue is-size-5">{bankAccount?.customer?.email}</span>
          اطمینان دارید؟
        </span>
      </ConfirmModal>

      <ConfirmModal show={isBanned}
        onHide={() => setIsBanned()}
        onConfirm={() => handleBannedStatus(!bankAccount?.isBanned)}
      >
        {
          bankAccount?.isBanned ?
            <span className="is-size-6 text-blue yekan-Bold">
              با فعال سازی این کارت، کاربر به انجام معاملات با این حساب بانکی دسترسی خواهد داشت
            </span>
            :
            <span className="is-size-6 text-blue yekan-Bold">
              با مسدود سازی این کارت، کاربر دسترسی انجام معاملات با این حساب بانکی را نخواهد داشت
            </span>
        }
      </ConfirmModal>

      <div className={`${Styles.bg} bg-blur shadow col-12`}>
        <div className={`${Styles.titleBlur} pt-4`}><h1 className="is-size-4 yekan-ExtraBold mb-0"><BsCreditCard size={22} className="ml-1" /> مدیریت کارت‌ بانکی</h1></div>

        <div className={`${Styles.info} blur`}>
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-sm-10  d-flex align-items-center">
              <div className={`${Styles.avatar} col p-0 shadow-sm`}><img src={userAvatar} /></div>
              <div className="col d-flex flex-column pr-3">
                <h2 className="is-size-4 d-flex flex-wrap align-items-center">
                  <span className="p-1 ml-3">{bankAccount?.customer?.email}</span>
                  {
                    !bankAccount?.customer?.isActive ?
                      <span className="lightRed p-1 is-size-6 d-flex align-items-center ml-3">
                        ( <BiBlock className="ml-1" size="16" />
                        کاربر غیرفعال می‌باشد )</span>
                      :
                      null
                  }
                  {
                    bankAccount?.customer?.isBanned ?
                      <span className="lightRed p-1 is-size-6 d-flex align-items-center ">
                        ( <AiOutlineCloseCircle className="ml-1" size="16" />
                        کاربر  بلاک می‌باشد )</span>
                      :
                      null
                  }

                  {
                    bankAccount.isBanned ?
                      <span className="lightRed p-1 is-size-6 d-flex align-items-center ml-3">
                        ( <BiBlock className="ml-1" size="16" />
                        کارت بانکی غیرفعال می‌باشد )</span>
                      :
                      null
                  }
                </h2>
                <div className="d-flex flex-wrap align-items-center mt-2">
                  <span className="is-size-7 ml-2"> وضعیت کارت بانکی :</span>
                  {bankAccount?.verified === "pending" ?
                    <CustomizedBadge className="mr-2" pill variant="secondary" className="shadow">
                      در انتظار برای تایید
                    </CustomizedBadge>
                    :
                    bankAccount?.verified === "approved" ?
                      <CustomizedBadge className="mr-2" pill variant="success" className="shadow">
                        تایید شده
                      </CustomizedBadge>
                      :
                      <CustomizedBadge className="mr-2" pill variant="danger" className="shadow">
                        رد شده
                      </CustomizedBadge>
                  }
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-2  mt-2 mt-sm-0  d-flex justify-content-end">
              {bankAccount?.verified === "pending" || bankAccount?.verified === "rejected" ?
                null
                :
                <DropdownButton
                  className={`${Styles.DropdownButton} header-dropdown text-dark  pointer`}
                  id="dropdown-item-button"
                  variant="light"
                  title="عملیات"
                >

                  <Dropdown.Item
                    as="button"
                    className={`${Styles.item} is-size-6 mb-0 text-blue yekan-Bold justify-content-start`}
                    onClick={() => setIsBanned(true)}
                  >
                    {
                      bankAccount?.isBanned ?
                        <>
                          <BiCheckCircle className="ml-1" size="16" />
                          فعال سازی کارت
                        </>
                        :
                        <>
                          <BiBlock className="ml-1" size="16" />
                          مسدود سازی کارت
                        </>
                    }
                  </Dropdown.Item>

                </DropdownButton>
              }

            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 col-12 col-lg-11 p-4 border-radius-lg card-shadow bg-white transition-height">

        <Row className="align-items-stretch justify-content-start">
          <Col lg={12} className="mb-4">
            <h1 className="is-size-4 yekan-Bold mb-0">اطلاعات کارت بانکی</h1>
          </Col>
          <Col lg={8} md={7}>
            <div >
              <Formik
                enableReinitialize={true}
                initialValues={bankAccount}
              // onSubmit={editBankAccount}
              >
                <Form className="row justify-content-start align-items-center">
                  <Col md={6} className="mb-3">
                    <Field
                      disabled={disabledEdit}
                      name="bank"
                      label="بانک"
                      as={CustomizedInput}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Field
                      disabled={disabledEdit}
                      name="bankAccountNumber"
                      label="شماره حساب"
                      as={CustomizedInput}
                    />
                  </Col>
                  <Col lg={6} className="mb-3">
                    <Field
                      disabled={disabledEdit}
                      name="card"
                      label="شماره کارت"
                      as={CustomizedInput}
                    />
                  </Col>
                  <Col lg={6} className="mb-3">
                    <Field
                      disabled={disabledEdit}
                      name="sheba"
                      label="شماره شبا "
                      as={CustomizedInput}
                    />
                  </Col>
                  <Col lg={12} className="mt-3 ">
                    {bankAccount?.verified === "approved" ?
                      null
                      :
                      <div className={`row justify-content-end`}>
                        {bankAccount?.verified === "rejected" ? null :
                          <Col lg={2} xs={6} className="d-flex justify-content-start">
                            <CustomizedButton
                              isFullWidth
                              outlined
                              className="py-2 yekan-ExtraBold is-size-6"
                              variant="lightRed"
                              onClick={() => setRejectMessage(true)}
                            >
                              رد
                            </CustomizedButton>
                          </Col>
                        }
                        <Col lg={2} xs={6} className="d-flex justify-content-start">
                          <CustomizedButton
                            isFullWidth
                            className="py-2 yekan-ExtraBold is-size-6"
                            variant="success"
                            onClick={() => setApprovedMessage(true)}
                          >
                            تایید
                          </CustomizedButton>
                        </Col>
                      </div>
                    }
                  </Col>






                </Form>
              </Formik>


            </div>
          </Col>

          {
            identity === null || identity?.firstName === null || identity?.lastName === null ?
              null :
              <Col lg={4} md={5} className="mt-3 mt-md-0">
                {/* <CustomizedAlert variant="primary" title={`کارت بانکی باید به نام ${identity?.firstName}${" "}${identity?.lastName} باشد.`} /> */}

                <Tip variant="info" className="h-100">

                  <div className="w-100 d-flex flex-column">
                    <div className='mb-3 d-flex align-items-center'><span className='is-size-7 yekan-Light'>نام و نام خانوادگی :</span><span className='mr-2'>{identity?.firstName || "__"}{" "}{identity?.lastName}</span></div>
                    <div className='mb-3 d-flex align-items-center'><span className='is-size-7 yekan-Light'>کد ملی :</span><span className='FaNum mr-2'>{identity?.nationalCode}</span></div>
                    <div className='mb-3 d-flex align-items-center'><span className='is-size-7 yekan-Light'>موبایل :</span><span className='FaNum mr-2'>{identity?.mobile || "__"}</span></div>
                    <div className='mb-3 d-flex align-items-center'><span className='is-size-7 yekan-Light'>تاریخ درخواست :</span>
                      <span className='FaNum mr-2'>
                        {DateConvert.getTime(identity?.createdAt)}
                        <span className="mx-1 text-gainsboro">|</span>
                        {DateConvert.toShamsiDate(identity?.createdAt)}
                      </span>
                    </div>
                    <div className='mb-0 d-flex align-items-center'><span className='is-size-7 yekan-Light'>وضعیت احراز هویت :</span>
                      <span className='FaNum mr-2'>
                        {bankAccount?.customer?.isVerified ?
                          <CustomizedBadge variant="success">احراز شده</CustomizedBadge> : <CustomizedBadge variant="danger">احراز نشده</CustomizedBadge>
                        }
                      </span>
                    </div>
                  </div>


                </Tip>
              </Col>
          }


          {bankAccount.adminMessage === null || !bankAccount.adminMessage ?
            null
            :
            <Col lg={12} className="mt-4">
              <Tip variant="danger" title="پیغام ادمین برای رد این کارت بانکی :">
                {bankAccount?.adminMessage}
              </Tip>
            </Col>
          }

        </Row>
      </div>
    </div>
  );
}
