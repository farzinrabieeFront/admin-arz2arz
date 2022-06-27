import { useEffect, useState } from "react";
import { RiWechatLine, BiChevronLeft } from "react-icons/all";
import { Link } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import { Col } from "react-bootstrap";
import { HiOutlineNewspaper, TiChevronLeft, BsReply, AiOutlineCloseCircle } from "react-icons/all";
import DateConvert from '../../utils/date'

//components
import CustomizedTable from "../../components/table/Table";
import CustomizedBadge from "../../components/badge/Badge";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedSelect from "../../components/form/select/Select";
import { ticketServices } from "../../services";
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import { useTitle } from "../../context";
import NoData from "../../components/no-data/NoData";
import { Toastify } from "../../utils";


const statusList = [
  { _id: "بررسی شده", title: "بررسی شده" },
  { _id: "در حال بررسی", title: "در حال بررسی" },
  { _id: "بررسی نشده", title: "بررسی نشده" },
  { _id: "بسته شده", title: "بسته شده" },
]

export default function TicketsPage() {
  document.title = "ارز تو ارز | پشتیبانی";
  const { title, setTitle } = useTitle();
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketList, setTicketList] = useState([]);
  const [ticketCount, setTicketCount] = useState(0);
  const [statusTicket, setStatusTicket] = useState(0);
  useEffect(() => {
    setTitle("پشتیبانی");
  }, [])
  useEffect(() => {
    getTicketList()
  }, [currentPage])

  // get ticket list
  const getTicketList = async () => {

    try {
      let params = {
        pageNumber: currentPage,
        perPage: 10
      }
      const { data, status } = await ticketServices.list(params)
      setTicketList(data.data.result);
      setTicketCount(data.data.count)
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  const searchTicket = async (vals) => {
    try {
      let body = {}
      for (const key in vals) {
        if (vals[key])
          body = { ...body, [key]: vals[key] }
      }
      let params = {
        pageNumber: currentPage,
        perPage: 10,
        ...body
      }
      const { data, status } = await ticketServices.search(params)
      if (status === 200 && data.success) {
        setTicketList(data.data.result);
        setTicketCount(data.data.count)
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  // close Ticket

  const closeTicket = async (id) => {
    try {
      let body = {
        status: "بسته شده"
      }
      const { data, status } = await ticketServices.changeStatus(id, body);
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        getTicketList()
      }

    } catch (error) {
      Toastify.error(error.message)
    }
  }

  const removeFilters = () => {
    getTicketList()
  }
  return (
    <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
      <div>
        <Formik
          initialValues={FormikInitialValues.ticket.search}
          onSubmit={searchTicket}
        >
          {({ isValid, dirty, resetForm }) => (
            <Form className="row justify-content-start align-items-end">

              <Col lg={8} className="mb-4">
                <div className="main-title">
                  <h1 className="is-size-5 mb-2">لیست تیکت‌ها</h1>
                  <p className="is-size-7 gainsboro mb-0">
                    در این بخش شما می‌توانید لیست مقالات را تیکت‌ها کنید، و به آنها پاسخ دهید.
                  </p>
                </div>
              </Col>
              <Col lg={4} className="mb-4">
                <div className="d-flex justify-content-end">
                  <CustomizedButton
                    onClick={() => {
                      resetForm(FormikInitialValues.ticket.search)
                      removeFilters()
                    }}
                    className="ml-3"
                    variant="orange"
                    size="lg"
                  >
                    <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                      حذف فیلترها
                    </span>
                  </CustomizedButton>
                  <CustomizedButton
                    type="submit"
                    className="px-4"
                    variant="lightBlue"
                    size="lg"
                  >
                    <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                      جستجو
                    </span>
                  </CustomizedButton>
                </div>
              </Col>
              <Col lg={2} md={4} className="mb-3">
                <Field
                  name="ticketID"
                  label="ID"
                  placeholder="ticketID"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={2} md={4} className="mb-3">
                <Field
                  name="firstName"
                  label="نام"
                  placeholder="نام"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={2} md={4} className="mb-3">
                <Field
                  name="lastName"
                  label="نام خانوادگی"
                  placeholder="نام خانوادگی"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={2} md={4} className="mb-3">
                <Field
                  name="email"
                  label="ایمیل"
                  placeholder="sample@gmail.com"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={2} md={4} className="mb-3">
                <Field
                  name="mobile"
                  label="موبایل"
                  type="tel"
                  className="FaNum yekan-Medium"
                  placeholder="09123456789"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={2} md={4} className="mb-3">
                <Field
                  name="status"
                  label="وضعیت"
                  options={statusList}
                  as={CustomizedSelect}
                />
              </Col>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <CustomizedTable
          header={
            <>
              <th>ID</th>
              <th>عنوان</th>
              <th>ایمیل</th>
              <th className="text-center">موبایل</th>
              <th className="text-center">دپارتمان</th>
              <th className="text-center">تاریخ ایجاد</th>
              <th className="text-center">وضعیت</th>
              <th className="text-center">عملیات</th>
            </>
          }
          totalRecords={ticketCount}
          pageLimit={10}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {
            ticketList.length ?
              ticketList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.ticketID}</td>
                    <td>{item.title}</td>
                    <td>{item.customer?.email}</td>
                    <td className="text-center FaNum yekan-Medium">{item.customer?.mobile}</td>
                    <td className="text-center FaNum yekan-Medium">
                      <CustomizedBadge variant="purple">
                      {item.department?.faName}
                      </CustomizedBadge>
                    </td>
                    <td className="text-center">
                      {DateConvert.getTime(item.createdAt)}
                      <span className="mx-1 text-gainsboro">|</span>
                      {DateConvert.toShamsiDate(item.createdAt)}
                    </td>

                    <td className="text-center">

                      <CustomizedBadge pill
                        variant={
                          item.status === "بررسی نشده"
                            ? "secondary"
                            : item.status === "در حال بررسی"
                              ? "warning"
                              : item.status === "بررسی شده"
                                ? "success"
                                : "danger"
                        }
                      >
                        {item.status}
                      </CustomizedBadge>
                    </td>
                    <td className="text-center">
                      <Link to={`/tickets/${item._id}`} className="d-inline-block p-1 ml-2 rounded-pill text-lightBlue icon-hover" title="پاسخ">
                        <BsReply size="25" />
                      </Link>
                      {
                        item.status === "بسته شده" ?
                          <span className="d-inline-block p-1 mr-2 rounded-pill text-secondary icon-hover cursor-not-allowed"
                            title="بسته شده"
                          > <AiOutlineCloseCircle size="25" /></span>
                          :
                          <span className="d-inline-block p-1 mr-2 rounded-pill text-danger icon-hover "
                            title="بستن تیکت"
                            onClick={() => closeTicket(item._id)}
                          > <AiOutlineCloseCircle size="25" /></span>
                      }


                    </td>
                  </tr>
                );
              })
              :
              <tr>
                <td colSpan="7">
                  <NoData />
                </td>
              </tr>

          }
        </CustomizedTable>
      </div>
    </div>
  );
}
