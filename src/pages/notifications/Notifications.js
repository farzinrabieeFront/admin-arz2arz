import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
//components
import CustomizedInput from "../../components/form/input/Input";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedSelect from "../../components/form/select/Select";
import CustomizedTextarea from "../../components/form/text-area/Textarea";
import { useTheme, useTitle } from "../../context";
import { notificationServices } from "../../services";
import CustomizedTable from "../../components/table/Table";
import DateConvert from '../../utils/date';
import NoData from "../../components/no-data/NoData";
import Notifications from "../../components/notifications/Notifications";
import NotifModal from './component/NotifModal';
import { notificationValidator } from "../../utils/validators";
import { Toastify } from "../../utils";

export default function NotificationsPage() {
  document.title = "ارز تو ارز | اعلانات";
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notifList, setNotifList] = useState([]);
  const [notifCount, setNotifCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [notifId, setNotifId] = useState(0);
  const { setTitle } = useTitle();

  const status = [
    { _id: "info", title: "info" },
    { _id: "success", title: "success" },
    { _id: "warning", title: "warning" },
    { _id: "error", title: "error" },
  ]
  useEffect(() => {
    setTitle("اعلانات");
    getNotificationList()
  }, [])


  const onSubmit = async (vals) => {
    try {
      const { data, status } = await notificationServices.create(vals)
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        getNotificationList()
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  const getNotificationList = async () => {
    try {
      let params = {
        pageNumber: currentPage,
        perPage: 10
      }
      const { data, status } = await notificationServices.list(params)
      if (status === 200 && data.success) {
        setNotifList(data.data.result)
        setNotifCount(data.data.count)
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  return (
    <Row className="mt-4 justify-content-center align-items-stretch">
      <NotifModal
        show={openModal}
        id={notifId}
        handleClose={() => setOpenModal(false)}
      />
      <Col lg={8} md={7} className="mb-3 mb-md-0">
        <div className="p-4 border-radius-lg card-shadow bg-white h-100 transition-height">
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <div>
              <h1 className="is-size-5 mb-2">اعلانات</h1>
              <p className="is-size-7 gainsboro mb-0">
                در این بخش شما می‌توانید اعلانات پنل کاربری را مدیریت کنید.
              </p>
            </div>
          </div>

          <Formik
            initialValues={{ title: "", description: "", type: "general", status: "" }}
            onSubmit={(values, actions) => {
              onSubmit(values)
              actions.resetForm();
            }}
            validationSchema={notificationValidator.create}
          >
            {({ isValid, dirty }) => (
              <Form className="row justify-content-start align-items-end">
                <Col md={8} xs={6} className="mb-4">
                  <Field
                    name="title"
                    label="عنوان"
                    type="text"
                    as={CustomizedInput}
                  />
                </Col>

                <Col md={4} xs={6} className="mb-4">
                  <Field
                    name="status"
                    label="نوع پیغام"
                    options={status}
                    as={CustomizedSelect}
                  />
                </Col>
                <Col lg={12} className="mb-4">

                  <Field
                    maxRows="12"
                    minRows="2"
                    label="توضیحات"
                    placeholder="توضیحات"
                    rows="1"
                    className="p-3"
                    // onChange={(e) => setMessageValue(e.target.value)}
                    name="description"
                    as={CustomizedTextarea}
                  />
                </Col>


                <Col lg={12} className="text-left">
                  <CustomizedButton
                    // isFullWidth
                    type="submit"
                    className="px-5"
                    variant="lightBlue"
                    size="lg"
                    disabled={isLoading || !(isValid && dirty)}
                  >
                    <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                      افزودن

                    </span>
                  </CustomizedButton>
                </Col>

              </Form>
            )}
          </Formik>
        </div>
      </Col>
      <Col lg={4} md={5} className="d-none d-md-block ">
        <div className="p-4 border-radius-lg card-shadow bg-white h-100 transition-height">
          <Row className="justify-content-between align-items-center">
            <Col xl={12} className="mb-3 d-flex flex-column">
              <Notifications theme={theme} type="info" title="info" body="متن پیام" />
            </Col>
            <Col xl={12} className="mb-3 d-flex flex-column">
              <Notifications theme={theme} type="success" title="success" body="متن پیام" />
            </Col>
            <Col xl={12} className="mb-3 d-flex flex-column">
              <Notifications theme={theme} type="warning" title="warning" body="متن پیام" />
            </Col>
            <Col xl={12}>
              <Notifications theme={theme} type="error" title="error" body="متن پیام" />
            </Col>
          </Row>
        </div>
      </Col>
      <Col lg={12} className="mt-4">
        <div className="p-4 border-radius-lg card-shadow bg-white h-100 transition-height">
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <h2 className="is-size-5 mb-2"> تاریخچه اعلانات</h2>
          </div>

          <div className="">
            <CustomizedTable
              header={
                <>
                  <th>ID</th>
                  <th>عنوان</th>
                  <th className="text-center">نوع</th>
                  <th className="text-center">تاریخ ایجاد</th>
                  <th className="text-center">ادمین</th>
                  <th className="text-center">عملیات</th>
                </>
              }
              totalRecords={notifCount}
              pageLimit={10}
              handleChangePage={(page) => setCurrentPage(page)}
            >
              {
                notifList.length ?
                  notifList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td >{item.messageId}</td>
                        <td >{item.title}</td>
                        <td className="FaNum ltr text-center">
                          {item.status === "success" ?
                            "success"
                            : item.status === "error" ?
                              "error"
                              : item.status === "warning" ?
                                "warning"
                                :
                                "info"
                          }
                        </td>
                        <td className="FaNum text-center">
                          {DateConvert.getTime(item.createdAt)}
                          <span className="mx-1 text-gainsboro">|</span>
                          {DateConvert.toShamsiDate(item.createdAt)}
                        </td>
                        <td className="text-center">{item.author?.email}</td>
                        <td className="text-center">
                          <span
                            onClick={() => {
                              setOpenModal(true)
                              setNotifId(item._id)
                            }}
                            className="lightLink yekan-Bold pointer">مشاهده</span>
                        </td>
                      </tr>
                    );
                  })
                  :
                  <tr>
                    <td colSpan="6">
                      <NoData />
                    </td>
                  </tr>

              }
            </CustomizedTable>
          </div>

        </div>
      </Col>
    </Row>
  );
}
