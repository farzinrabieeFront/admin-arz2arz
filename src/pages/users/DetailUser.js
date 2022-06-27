import { useEffect, useState } from "react";
import Styles from "./DetailUser.module.scss";
import { Form, Formik, FastField, Field } from "formik";
import { Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import {
  RiSearchEyeLine, BiBlock, AiOutlineCloseCircle, BiBell,
  FaUsers, RiLockPasswordLine, HiOutlineChat
} from "react-icons/all";
import userAvatar from "../../assets/images/user-avatar.png";
import { useHistory, useParams } from "react-router-dom";
import { customerServices, twoFaServices } from "../../services";
import CustomizedBadge from "../../components/badge/Badge";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedButton from "../../components/form/button/Button";
import FormikConfirmationModal from "../../components/formik-modal/FormikConfirmationModal";

import BankCard from "../../components/bank-card/BankCard";
import { useTitle } from "../../context";

import CustomizedTabs from "../../components/tabs/Tabs";
import CustomizedCheckBox from "../../components/form/checkbox/CheckBox";
import NoData from "../../components/no-data/NoData";
import ImageModal from "../../components/image-modal/ImageModal";
import { customerValidator, passwordValidator } from "../../utils/validators";
import UserModal from "./components/modal/Modal";
import UserWallets from "./components/Wallets";
import { Toastify } from "../../utils";
import NotificationModal from "./components/modal/Notification";

export default function DetailUserPage() {
  document.title = "ارز تو ارز | ویرایش کاربر"
  const { id } = useParams();
  const { title, setTitle } = useTitle();
  const [activeTab, setActiveTab] = useState();
  const history = useHistory();
  const [customerDetail, setCustomerDetail] = useState([]);
  const [changePassword, setChangePassword] = useState(false);
  const [changeMobile, setChangeMobile] = useState(false);
  const [twoFaAuth, setTwoFaAuth] = useState({});
  const [imageShow, setImageShow] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openNotifModal, setOpenNotifModal] = useState(false);
  const [videoShow, setVideoShow] = useState();

  useEffect(() => {
    if (id) {
      getCustomerDetails(id)
    }
  }, [id])

  useEffect(() => {
    setTitle("ویرایش کاربر");
  }, []);

  const getCustomerDetails = async (id) => {
    try {
      const { data, status } = await customerServices.single(id);
      if (status === 200) {
        const { twoFactorAuthentication, ...others } = data.data
        setCustomerDetail(others)

        let twoFaType = {}
        for (let key in twoFactorAuthentication) {
          twoFaType = {
            ...twoFaType,
            [key]: twoFactorAuthentication[key].enabled
          }
          setTwoFaAuth(twoFaType)
        }

      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  const handleChangeData = async (vals) => {
    let body = {}
    for (const key in vals) {
      if (vals[key] !== customerDetail[key])
        body = { ...body, [key]: vals[key] }
    }

    try {
      const { data, status } = await customerServices.update(id, body)
      if (status === 201 && data.success) {
        Toastify.success(data.message)
        setChangePassword();
        getCustomerDetails(id);
        setChangeMobile();
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  const changeTwoFaServices = async (vals) => {
    try {
      const { data, status } = await twoFaServices.patch(id, vals)
      if (status === 201 && data.success) {
        Toastify.success(data.message)
        getCustomerDetails(id);
      }
    } catch (error) {
      Toastify.error(error.message)
      getCustomerDetails(id);
    }
  }

  return (
    <div className="mt-3 mt-sm-5 d-flex flex-wrap justify-content-center">
      {
        openModal ?
          <UserModal
            show={openModal}
            id={id}
            refresh={() => getCustomerDetails(id)}
            handleClose={() => setOpenModal()}
          />
          : null
      }
      {
        openNotifModal ?
          <NotificationModal
            show={openNotifModal}
            id={id}
            refresh={() => getCustomerDetails(id)}
            handleClose={() => setOpenNotifModal()}
          />
          : null
      }

      <ImageModal show={imageShow} onHide={() => setImageShow()} imgSrc={imageShow} />
      {videoShow ?
        <ImageModal show={videoShow} onHide={() => setVideoShow()} videoSrc={videoShow} />
        : null
      }
      <FormikConfirmationModal show={changePassword}
        title="تغییر رمز عبور"
        Icon={<RiLockPasswordLine size={25} className="ml-2 text-danger" />}
        onHide={() => setChangePassword()}
        initialValues={{ password: "" }}
        onSubmit={handleChangeData}
        validationSchema={passwordValidator.edit}
      >
        <FastField
          type="password"
          name="password"
          light
          label=" رمز عبور جدید"
          as={CustomizedInput}
        />
      </FormikConfirmationModal>


      <div className={`${Styles.bg} bg-blur shadow col-12`}>
        <div className={`${Styles.titleBlur} pt-4`}><h1 className="is-size-4 yekan-ExtraBold mb-0"><FaUsers size={22} className="ml-1" /> مدیریت کاربران</h1></div>
        <div className={`${Styles.info} blur`}>
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-sm-10 d-flex align-items-center">
              <div className={`${Styles.avatar} col p-0 shadow-sm`}><img src={userAvatar} /></div>
              <div className="col d-flex flex-column pr-3">
                <h2 className="is-size-4 d-flex flex-wrap align-items-center">
                  <span className="p-1 ml-3">{customerDetail.email}</span>
                  {
                    !customerDetail.isDeleted ?
                      <span className="lightRed p-1 is-size-6 d-flex align-items-center ml-3">
                        ( <BiBlock className="ml-1" size="16" />
                        محدودیت دسترسی به برداشت ارزی )</span>
                      :
                      null
                  }
                  {
                    !customerDetail.canWithdraw ?
                      <span className="lightRed p-1 is-size-6 d-flex align-items-center ">
                        ( <AiOutlineCloseCircle className="ml-1" size="16" />
                        محدودیت دسترسی به برداشت تومانی )</span>
                      :
                      null
                  }
                  {
                    customerDetail.isBanned ?
                      <span className="lightRed p-1 is-size-6 d-flex align-items-center ">
                        ( <AiOutlineCloseCircle className="ml-1" size="16" />
                        محدودیت دسترسی به پنل کاربری )</span>
                      :
                      null
                  }
                </h2>

                <div className="d-flex flex-wrap align-items-center mt-2">
                  <span className="is-size-7"> وضعیت احراز هویت</span>
                  {customerDetail?.isVerified ? (
                    <CustomizedBadge className="mr-2" pill variant="success">
                      احراز شده
                    </CustomizedBadge>
                  )
                    :
                    (
                      <CustomizedBadge className="mr-2" pill variant="danger">
                        احراز نشده
                      </CustomizedBadge>
                    )}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-2 mt-2 mt-sm-0 d-flex justify-content-end">
              <DropdownButton
                className={`${Styles.DropdownButton} header-dropdown  pointer`}
                id="dropdown-item-button"
                variant="light"
                title="عملیات"
              >
                <Dropdown.Item
                  as="button"
                  className={`${Styles.item} is-size-6 mb-0 yekan-Bold justify-content-start`}
                  onClick={() => setChangePassword(true)}
                >
                  <RiLockPasswordLine className="ml-1" size="16" />
                  تغییر رمز عبور
                </Dropdown.Item>

                <Dropdown.Item
                  as="button"
                  className={`${Styles.item} is-size-6 mb-0 yekan-Bold justify-content-start`}
                  onClick={() => history.push(`/ticket/new-ticke/${customerDetail?._id}`)}
                >
                  <HiOutlineChat className="ml-1" size="16" />
                  ارسال تیکت
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  className={`${Styles.item} is-size-6 mb-0 yekan-Bold justify-content-start`}
                  onClick={() => setOpenNotifModal(true)}
                >
                  <BiBell className="ml-1" size="16" />
                  ارسال نوتیفیکیشن
                </Dropdown.Item>

                <Dropdown.Item
                  as="button"
                  className={`${Styles.item} is-size-6 mb-0 yekan-Bold justify-content-start`}
                  onClick={() => setOpenModal(true)}
                >
                  <BiBlock className="ml-1" size="16" />
                  محدودیت دسترسی
                </Dropdown.Item>


              </DropdownButton>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-9 d-flex p-0 mt-5">
        <CustomizedTabs
          data={['اطلاعات کاربری', 'تنظیمات ورود دو مرحله‌ای', 'اطلاعات هویتی', 'کارت‌های بانکی', 'کیف پول‌ها']}
          handleSetTitle={(title) => setActiveTab(title)}
        // activeData={activeTab}
        />
      </div>
      <div className="mt-4 col-12 col-lg-9 p-4 border-radius-lg card-shadow bg-white transition-height">
        {
          activeTab === 'اطلاعات کاربری' ?
            <Formik
              // innerRef={formikRef}
              initialValues={customerDetail}
              onSubmit={handleChangeData}
              enableReinitialize={true}
              validationSchema={customerValidator.edit}

            >
              {({ isValid, dirty }) => (
                <Form className="row justify-content-start align-items-end">
                  <Col lg={12} className="mb-3">
                    <h1 className="is-size-5 mb-0 text-lightBlue">اطلاعات کاربری</h1>
                  </Col>
                  <Col sm={6} className="mb-4">
                    <FastField
                      name="email"
                      disabled
                      label="ایمیل"
                      className="cursor-disable"
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
            :
            null
        }
        {
          activeTab === 'اطلاعات هویتی' ?
            <>
              {
                customerDetail?.isVerified ?
                  <Row>
                    <Col lg={12} className="mb-4">
                      <h2 className="is-size-5 mb-0 text-lightBlue">اطلاعات هویتی</h2>
                    </Col>
                    <Col md={4} className="mb-4">
                      <span className=" ml-2 is-size-6">نام و نام خانوادگی {" "}</span>
                      <span className="dark yekan-Bold">{customerDetail?.identity?.firstName}{" "}{customerDetail?.identity?.lastName}</span>
                    </Col>
                    <Col md={4} className="mb-4">
                      <span className=" ml-2 is-size-6">نام پدر {" "}</span>
                      <span className="dark yekan-Bold">{customerDetail?.identity?.fatherName}</span>
                    </Col>
                    <Col md={4} className="mb-4">
                      <span className=" ml-2 is-size-6">تاریخ تولد {" "}</span>
                      <span className="dark yekan-Bold FaNum">{customerDetail?.identity?.birthDate}</span>
                    </Col>
                    <Col md={4} className="mb-4">
                      <span className=" ml-2 is-size-6">جنسیت{" "}</span>
                      <span className="dark yekan-Bold">
                        {
                          customerDetail?.identity?.gender === "female" ?
                            "خانم"
                            : "آقا"
                        }
                      </span>
                    </Col>
                    <Col md={4} className="mb-4">
                      <span className=" ml-2 is-size-6">کد ملی : </span>{" "}
                      <span className="dark yekan-Bold FaNum">{customerDetail?.identity?.nationalCode}</span>
                    </Col>
                    <Col md={4} className="mb-4">
                      <span className=" ml-2 is-size-6">شماره شناسنامه </span>{" "}
                      <span className="dark yekan-Bold FaNum">{customerDetail?.identity?.identityBookletNumber}</span>
                    </Col>
                    <Col md={4} className="mb-4">
                      <span className=" ml-2 is-size-6">تلفن ثابت </span>{" "}
                      <span className="dark yekan-Bold FaNum">{customerDetail?.identity?.phone}</span>
                    </Col>
                    <Col md={4} className="mb-4">
                      <span className=" ml-2 is-size-6">کشور </span>{" "}
                      <span className="dark yekan-Bold">{customerDetail?.identity?.country}</span>
                    </Col>
                    <Col md={4} className="mb-4">
                      <span className=" ml-2 is-size-6">استان </span>{" "}
                      <span className="dark yekan-Bold">{customerDetail?.identity?.province}</span>
                    </Col>
                    <Col md={4} className="mb-4">
                      <span className=" ml-2 is-size-6">شهر </span>
                      <span className="dark yekan-Bold">{customerDetail?.identity?.city}</span>
                    </Col>
                    <Col md={4} className="mb-4">
                      <span className=" ml-2 is-size-6">کد پستی </span>
                      <span className="dark yekan-Bold FaNum">{customerDetail?.identity?.postalCode}</span>
                    </Col>
                    <Col lg={12} className="mb-4">
                      <span className=" ml-2 is-size-6">آدرس </span>
                      <span className="dark yekan-Bold">{customerDetail?.identity?.address}</span>
                    </Col>
                    <hr className="col-12 horizontal light mt-0 mb-4" />
                    {customerDetail?.identity?.nationalCardImage ?
                      <Col md={4} className={`${Styles.imgIdentity} mb-3`}>
                        <span className=" is-size-6">تصویر کارت ملی </span>

                        <div className={`${Styles.img} shadow pointer mt-3 text-white line-height-normal`}
                          onClick={() => setImageShow(`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${customerDetail?.identity?._id}/${customerDetail?.identity?.nationalCardImage}`)}
                        >
                          <img src={`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${customerDetail?.identity?._id}/${customerDetail?.identity?.nationalCardImage}`} />
                          <span className={`${Styles.icon} text-white`}>
                            <RiSearchEyeLine size={35} />
                          </span>
                        </div>
                      </Col>
                      :
                      null}
                    {
                      customerDetail?.identity?.verificationSelfie ?
                        <Col md={4} className={`${Styles.imgIdentity} mb-3`}>
                          <span className=" is-size-6">تصویر چهره، کارت ملی و قوانین </span>

                          <div className={`${Styles.img} shadow pointer mt-3 text-white line-height-normal`}
                            onClick={() => setImageShow(`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${customerDetail?.identity?._id}/${customerDetail?.identity?.verificationSelfie}`)}
                          >
                            <img src={`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${customerDetail?.identity?._id}/${customerDetail?.identity?.verificationSelfie}`} />
                            <span className={`${Styles.icon} text-white`}>
                              <RiSearchEyeLine size={35} />
                            </span>
                          </div>
                        </Col>
                        :
                        null}
                    {customerDetail?.identity?.video ?
                      <Col md={4} className={`${Styles.imgIdentity} mb-3`}>
                        <span className=" is-size-6">ویدیو </span>
                        <div className={`${Styles.img} shadow pointer mt-3 text-white line-height-normal`}
                          onClick={() => setVideoShow(`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${customerDetail?.identity?._id}/${customerDetail?.identity?.video}`)}
                        >
                          <video width="400" autoplay={false}>
                            <source src={`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${customerDetail?.identity?._id}/${customerDetail?.identity?.video}`} type="video/mp4" />
                          </video>
                          <span className={`${Styles.icon} text-white`}>
                            <RiSearchEyeLine size={35} />
                          </span>
                        </div>

                      </Col>
                      :
                      null}

                  </Row>
                  :
                  <span className="center-content yekan-Bold ">
                    <NoData title="درخواست احراز هویت از طرف این کاربر ثبت نشده است" />
                  </span>

              }

            </>
            :
            null
        }
        {
          activeTab === 'کارت‌های بانکی' ?
            <>

              {customerDetail?.bankAccounts?.length > 0 ?
                <Row lg={12} className="justify-content-center justify-content-sm-start">
                  <Col lg={12} className="mb-4">
                    <h2 className="is-size-5 mb-0 text-lightBlue">کارت‌های بانکی</h2>
                  </Col>
                  {customerDetail?.bankAccounts?.map((item, index) => {
                    return (
                      <div className={`${Styles.bankCardCol} col-md-4 mb-4`}>
                        <BankCard data={item} />
                      </div>
                    )
                  })
                  }

                </Row>
                :
                <span className="center-content yekan-Bold ">
                  <NoData title="کارت بانکی برای این کاربر ثبت نشده است" />
                </span>
              }

            </>
            :
            null
        }
        {
          activeTab === 'تنظیمات ورود دو مرحله‌ای' ?
            <>
              <Formik
                // innerRef={formikRef}
                initialValues={twoFaAuth}
                onSubmit={changeTwoFaServices}
                enableReinitialize={true}
              >
                {({ isValid, dirty }) => (
                  <Form className="row justify-content-between align-items-end">
                    <Col lg={12} className="mb-4">
                      <h2 className="is-size-5 mb-0 text-lightBlue">تنظیمات ورود دو مرحله‌ای</h2>
                    </Col>
                    <Col lg={9}>
                      <Row>
                        <Col xs={4} className="mb-3">
                          <Field
                            name="email"
                            label="email"
                            id="email"
                            as={CustomizedCheckBox}
                          />
                        </Col>
                        <Col xs={4} className="mb-3">
                          <Field
                            name="google"
                            label="google"
                            id="google"
                            as={CustomizedCheckBox}
                          />
                        </Col>
                        <Col xs={4} className="mb-3">
                          <Field
                            name="sms"
                            label="sms"
                            id="sms"
                            as={CustomizedCheckBox}
                          />
                        </Col>
                        <Col xs={4} className="mb-3">
                          <Field
                            name="call"
                            label="call"
                            id="call"
                            as={CustomizedCheckBox}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={3} className="text-left mb-0 mb-lg-3">
                      <CustomizedButton
                        // isFullWidth
                        type="submit"
                        className="px-5"
                        variant="lightBlue"

                      >
                        <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                          ذخیره
                        </span>
                      </CustomizedButton>
                    </Col>
                  </Form>
                )}
              </Formik>
            </>
            :
            null
        }



        {
          activeTab === 'کیف پول‌ها' ?
            <UserWallets id={id} />
            :
            null
        }
      </div>
    </div >
  );
}
