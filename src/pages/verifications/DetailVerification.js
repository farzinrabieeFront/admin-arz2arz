import { useEffect, useState } from "react";
import Styles from "./DetailVerification.module.scss";
import { FastField } from "formik";
import { Row, Col } from "react-bootstrap";
import { RiShieldUserLine, BiBlock, AiOutlineCloseCircle, RiSearchEyeLine, AiOutlineCheckCircle } from "react-icons/all";
import { useParams } from "react-router-dom";
import verificationServices from "../../services/httpServices/verificationServices";
import userAvatar from "../../assets/images/user-avatar.png";

import CustomizedTextarea from "../../components/form/text-area/Textarea";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedBadge from "../../components/badge/Badge";
import FormikConfirmationModal from "../../components/formik-modal/FormikConfirmationModal";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";

import ImageModal from "../../components/image-modal/ImageModal";
import notFoundImage from "../../assets/images/notFoundImage.png";
import { useTitle } from "../../context";
import { identityValidator } from "../../utils/validators";
import Tip from "../../components/tip/Tip";
import { Toastify } from "../../utils";


export default function DetailVerificationPage() {
  document.title = "ارز تو ارز | تایید هویت کاربر"
  const { id } = useParams();
  const { setTitle } = useTitle();
  const [identityData, setIdentityData] = useState({});
  const [rejectMessage, setRejectMessage] = useState(false);
  const [approvedMessage, setApprovedMessage] = useState(false);
  const [imageShow, setImageShow] = useState();
  const [videoShow, setVideoShow] = useState();

  useEffect(() => {
    if (id) {
      getOneIdentity(id)
    }
  }, [id])

  useEffect(() => {
    setTitle("تایید هویت کاربر");
  }, [])

  const getOneIdentity = async (id) => {
    try {
      const { data, status } = await verificationServices.getOneData(id);
      if (status === 200 && data.success) {
        setIdentityData(data.data);
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
      const { data, status } = await verificationServices.verifyIdentity(id, vals);
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        setApprovedMessage();
        getOneIdentity(id)
      }
    } catch (error) {
      Toastify.error(error.message)
      setApprovedMessage();
    }
  }

  const rejectRequest = async (vals) => {
    try {
      vals = { ...vals, verified: "rejected" }

      const { data, status } = await verificationServices.verifyIdentity(id, vals);
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        getOneIdentity(id);
        setRejectMessage();
      }
    } catch (error) {
      Toastify.error(error.message)
      setRejectMessage();
    }
  }



  return (
    <div className="mt-5 d-flex flex-wrap justify-content-center">
      <FormikConfirmationModal show={rejectMessage}
        title="متن پیام رد احراز هویت"
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
          رد درخواست احراز هویت کاربر{" "}{identityData?.customer?.email}{" "}
        </p>
      </FormikConfirmationModal>

      <ConfirmModal show={approvedMessage}
        onHide={() => setApprovedMessage()}
        onConfirm={approvedRequest}
      >
        <span className="text-gainsboro is-size-6">
          آیا از تایید درخواست احراز کاربر
          <span className="px-2 yekan-Bold text-gray-blue is-size-5">{identityData?.customer?.email}</span>
          اطمینان دارید؟
        </span>
      </ConfirmModal>

      <ImageModal show={imageShow} onHide={() => setImageShow()} imgSrc={imageShow} videoSrc={videoShow} />
      {videoShow ?
        <ImageModal show={videoShow} onHide={() => setVideoShow()} videoSrc={videoShow} />
        : null
      }

      <div className={`${Styles.bg} bg-blur shadow col-12`}>
        <div className={`${Styles.titleBlur} pt-4`}><h1 className="is-size-4 yekan-ExtraBold mb-0"><RiShieldUserLine size={22} className="ml-1" /> تایید هویت کاربر</h1></div>
        <div className={`${Styles.info} blur`}>
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-sm-9 d-flex align-items-center">
              <div className={`${Styles.avatar} col p-0 shadow-sm`}><img src={userAvatar} /></div>
              <div className="col d-flex flex-column pr-3">
                <h2 className="is-size-4 d-flex flex-wrap align-items-center">
                  <span className="p-1 ml-3">{identityData?.customer?.email}</span>
                  {
                    !identityData?.customer?.isActive ?
                      <span className="lightRed p-1 is-size-6 d-flex align-items-center ml-3">
                        ( <BiBlock className="ml-1" size="16" />
                        کاربر غیرفعال می‌باشد )</span>
                      :
                      null
                  }
                  {
                    identityData?.customer?.isBanned ?
                      <span className="lightRed p-1 is-size-6 d-flex align-items-center ">
                        ( <AiOutlineCloseCircle className="ml-1" size="16" />
                        کاربر  بلاک می‌باشد )</span>
                      :
                      null
                  }
                </h2>

                <div className="d-flex flex-wrap align-items-center mt-2">
                  <span className="is-size-7"> وضعیت درخواست احراز :</span>
                  {identityData?.verified === "approved" ?
                    <CustomizedBadge pill variant="success" className="mr-2 shadow">تایید شده</CustomizedBadge>
                    : identityData?.verified === "rejected" ?
                      <CustomizedBadge pill variant="danger" className="mr-2 shadow">رد شده</CustomizedBadge>
                      :
                      <CustomizedBadge pill variant="secondary" className="mr-2 shadow">در انتظار تایید</CustomizedBadge>
                  }
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-3 mt-3 mt-sm-0 pr-3 pr-sm-0">
              {identityData?.verified === "rejected" || identityData?.verified === "approved" ? null :
                <div className="d-flex flex-wrap w-100 align-items-center justify-content-between justify-content-sm-end">
                  <Col xs={6} className="pr-0 pl-1">
                    <CustomizedButton
                      isFullWidth
                      className="py-2 is-size-6 yekan-ExtraBold"
                      variant="lightRed"
                      onClick={() => setRejectMessage(true)}
                    >
                      رد
                    </CustomizedButton>
                  </Col>

                  <Col xs={6} className="pl-0 pr-1">
                    <CustomizedButton
                      isFullWidth
                      className="py-2 is-size-6 yekan-ExtraBold"
                      variant="success"
                      onClick={() => setApprovedMessage(true)}
                    >
                      تایید
                    </CustomizedButton>
                  </Col>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 col-12 col-lg-9 p-4 border-radius-lg card-shadow bg-white transition-height">

        <Row className="align-items-stretch">

          <Col lg={12} className="mb-3">
            <h1 className="is-size-5 mb-0 text-lightBlue">احراز هویت</h1>
          </Col>


          <Col lg={12} className={Styles.identityBox}>

            <Row className={`${Styles.texts} align-items-start`}>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>نام :</span>
                <span className="yekan-Bold line-height-normal">{identityData?.firstName}</span>
              </Col>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>نام خانوادگی :</span>
                <span className="yekan-Bold line-height-normal">{identityData?.lastName}</span>
              </Col>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>نام پدر :</span>
                <span className="yekan-Bold line-height-normal">{identityData?.fatherName}</span>
              </Col>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>جنسیت :</span>
                <span className="yekan-Bold line-height-normal">{identityData?.gender === "female" ? "خانم" : identityData?.gender === "male" ? "آقا" : null}</span>
              </Col>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>تاریخ تولد :</span>
                <span className="yekan-Bold line-height-normal FaNum yekan-Medium">{identityData?.birthDate}</span>
              </Col>

              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>کد ملی :</span>
                <span className="yekan-Bold line-height-normal FaNum yekan-Medium">{identityData?.nationalCode}</span>
              </Col>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>شماره شناسنامه :</span>
                <span className="yekan-Bold line-height-normal FaNum yekan-Medium">{identityData?.identityBookletNumber}</span>
              </Col>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>تلفن ثابت :</span>
                <span className="yekan-Bold line-height-normal FaNum yekan-Medium">{identityData?.phone}</span>
              </Col>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>موبایل :</span>
                <span className="yekan-Bold line-height-normal FaNum yekan-Medium">{identityData?.mobile}</span>
              </Col>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>کشور :</span>
                <span className="yekan-Bold line-height-normal">{identityData?.country}</span>
              </Col>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>استان :</span>
                <span className="yekan-Bold line-height-normal">{identityData?.province}</span>
              </Col>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>شهر :</span>
                <span className="yekan-Bold line-height-normal">{identityData?.city}</span>
              </Col>
              <Col md={4} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>کد پستی :</span>
                <span className="yekan-Bold line-height-normal FaNum yekan-Medium">{identityData?.postalCode}</span>
              </Col>
              <Col lg={12} className="mb-4">
                <span className={`${Styles.title} is-size-6 ml-2`}>آدرس :</span>
                <span className="yekan-Bold line-height-normal">{identityData?.address}</span>
              </Col>
              <hr className="col-12 horizontal light mt-0 mb-4" />
              <Col md={4}>
                <div className="mb-4">
                  <span className={`${Styles.title} is-size-6 ml-2`}>تصویر کارت ملی :</span>
                  {identityData?.nationalCardImage ?
                    <div className={`${Styles.img} shadow  pointer mt-3 text-gainsboro line-height-normal`}
                      onClick={() => setImageShow(`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${identityData?._id}/${identityData?.nationalCardImage}`)}
                    >
                      <img src={`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${identityData?._id}/${identityData?.nationalCardImage}`} />
                      <span className={`${Styles.icon} text-white is-size-6`}>
                        <RiSearchEyeLine size={35} />
                      </span>
                    </div>
                    :
                    <div className={`${Styles.img} shadow  ${Styles.noImg} mt-3 text-gainsboro line-height-normal`}>
                      <img src={notFoundImage} />
                      <span className="is-size-6 mt-2 yekan-Bold  ">هنوز عکسی آپلود نشده</span>
                    </div>
                  }
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-4">
                  <span className={`${Styles.title} is-size-6 ml-2`}>تصویر چهره، کارت ملی و قوانین :</span>
                  {identityData?.verificationSelfie ?
                    <div className={`${Styles.img} shadow  pointer mt-3 text-gainsboro line-height-normal`}
                      onClick={() => setImageShow(`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${identityData?._id}/${identityData?.verificationSelfie}`)}
                    >
                      <img src={`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${identityData?._id}/${identityData?.verificationSelfie}`} />
                      <span className={`${Styles.icon} text-white is-size-6`}>
                        <RiSearchEyeLine size={35} />
                      </span>
                    </div>
                    :
                    <div className={`${Styles.img} shadow  ${Styles.noImg} mt-3 text-gainsboro line-height-normal`}>
                      <img src={notFoundImage} />
                      <span className="is-size-6 mt-2 yekan-Bold ">هنوز عکسی آپلود نشده</span>
                    </div>
                  }
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-4">
                  <span className={`${Styles.title} is-size-6 ml-2`}>ویدیو احراز هویت :</span>

                  {identityData?.video ?
                    <div className={`${Styles.img}  shadow pointer mt-3 text-gainsboro line-height-normal`}
                      onClick={() => setVideoShow(`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${identityData?._id}/${identityData?.video}`)}
                    >

                      <video width="400" autoplay={false}>
                        <source src={`http://194.5.192.82:4000/api/v1/admin/customer/identity/static/${identityData?._id}/${identityData?.video}`} type="video/mp4" />
                      </video>
                      <span className={`${Styles.icon} text-white is-size-6`}>
                        <RiSearchEyeLine size={35} />
                      </span>
                    </div>
                    :
                    <div className={`${Styles.img} shadow ${Styles.noImg} mt-3 text-gainsboro line-height-normal`}>
                      <img src={notFoundImage} />
                      <span className="is-size-6 mt-2 yekan-Bold  ">هنوز ویدیویی آپلود نشده</span>
                    </div>
                  }

                </div>
              </Col>
            </Row>

          </Col>

          {identityData?.adminMessage === null ?
            null
            :
            <Col lg={12} className="mt-3">
              <Tip variant="danger" title="پیغام ادمین برای رد این درخواست :">
                {identityData?.adminMessage}
              </Tip>
            </Col>
          }
        </Row>
      </div>
    </div>
  );
}
