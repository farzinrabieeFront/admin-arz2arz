import { useEffect, useState } from "react";
import { Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { RiEditLine } from "react-icons/all";
import { Link } from "react-router-dom";
import { Form, Formik, FastField } from "formik";
import DateConvert from '../../utils/date';

//components
import CustomizedTable from "../../components/table/Table";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedSelect from "../../components/form/select/Select";
import CustomizedBadge from "../../components/badge/Badge";
import CustomizedButton from "../../components/form/button/Button";
import NoData from "../../components/no-data/NoData";
import { customerServices } from "../../services";
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import { useTitle } from "../../context";
import { Toastify } from "../../utils";

export default function UsersPage() {
  document.title = "ارز تو ارز | مدیریت کاربران";
  const { setTitle } = useTitle();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [customerCount, setCustomerCount] = useState();

  const isActiveList = [
    { _id: true, title: " فعال" },
    { _id: false, title: "غیر فعال" },
  ]
  const isVerifiedList = [
    { _id: true, title: " احراز شده" },
    { _id: false, title: "احراز نشده" },
  ]

  const editTooltip = (props) => (
    <Tooltip {...props} className="is-size-7">
      ویرایش اطلاعات
    </Tooltip>
  );

  useEffect(() => {
    getList()
  }, [currentPage])

  useEffect(() => {
    setTitle("مدیریت کاربران");
  }, [])

  const getList = async () => {
    try {
      setIsLoading(true)
      let params = {
        pageNumber: currentPage,
        perPage: 10
      }
      const { data, status } = await customerServices.list(params)
      if (status === 200 && data.success) {
        setCustomerList(data.data.result);
        setCustomerCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const searchCustomer = async (vals) => {
    let body = {}
    let params = {
      pageNumber: currentPage,
      perPage: 10
    }
    for (const key in vals) {
      if (vals[key])
        body = {
          ...body,
          [key]: vals[key],
          ...params,
        }
    }
    try {
      const { data, status } = await customerServices.search(body)
      if (status === 200 && data.success) {
        setCustomerList(data.data.result);
        setCustomerCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  const removeFilters = () => {
    getList()
  }


  return (
    <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
      <Formik
        initialValues={FormikInitialValues.customer.search}
        onSubmit={searchCustomer}
      >
        {({ isValid, dirty, resetForm }) => (
          <Form className="row justify-content-start align-items-end">
            <Col lg={8} className="mb-4">
              <div className="main-title">
                <h1 className="is-size-5 mb-2">لیست مشتریان</h1>
                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید اطلاعات تمامی مشتریان سایت را ببینید، کاربر مورد نظر خود را جستجو کرده و در صورت لزوم آن را ویرایش کنید.</p>
              </div>
            </Col>
            <Col lg={4} className="mb-4">
              <div className="d-flex justify-content-end">
                <CustomizedButton
                  onClick={() => {
                    resetForm(FormikInitialValues.customer.search)
                    removeFilters()
                  }}
                  className="ml-3 is-size-5 yekan-ExtraBold"
                  variant="orange"
                  size="lg"
                >
                  حذف فیلترها
                </CustomizedButton>

                <CustomizedButton
                  type="submit"
                  className="px-4 is-size-5 yekan-ExtraBold"
                  variant="lightBlue"
                  size="lg"
                >
                  جستجو
                </CustomizedButton>
              </div>
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-3">
              <FastField
                name="email"
                label="ایمیل"
                type="email"
                placeholder="sample@gmail.com"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-3">
              <FastField
                name="firstName"
                label="نام"
                className="FaNum yekan-Light"
                placeholder="نام"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-3">
              <FastField
                name="lastName"
                label="نام خانوادگی"
                className="FaNum yekan-Light"
                placeholder="نام خانوادگی"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-3">
              <FastField
                name="nationalCode"
                label="کد ملی"
                className="FaNum yekan-Light"
                placeholder="کد ملی"
                as={CustomizedInput}
              />
            </Col>

            <Col lg={2} md={4} sm={6} className="mb-3">
              <FastField
                name="mobile"
                label="موبایل"
                type="tel"
                className="FaNum yekan-Light"
                placeholder="09123456789"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-3">
              <FastField
                name="isVerified"
                label="وضعیت احراز هویت"
                options={isVerifiedList}
                as={CustomizedSelect}
              />
            </Col>
          </Form>
        )}
      </Formik>

      <div>
        <CustomizedTable
          header={
            <>
              <th>ایمیل</th>
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th className="text-center">کد ملی</th>
              <th className="text-center">موبایل</th>
              <th className="text-center">تاریخ ثبت نام</th>
              <th className="text-center">وضعیت احراز هویت</th>
              <th className="text-center">...</th>
            </>
          }
          totalRecords={customerCount}
          pageLimit={10}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {
            customerList.length ?
              customerList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td> {item.email} </td>
                    <td> {item.customerIdentity?.firstName || "__"} </td>
                    <td> {item.customerIdentity?.lastName || "__"} </td>
                    <td className="FaNum text-center"> {item.customerIdentity?.nationalCode || "__"} </td>
                    <td className="FaNum text-center">{item.mobile || "__"}</td>
                    <td className="text-center">

                      {DateConvert.toShamsiDate(item.createdAt)}
                    </td>
                    <td className="text-center">
                      {item.isVerified ? (
                        <CustomizedBadge pill variant="success">
                          احراز شده
                        </CustomizedBadge>
                      )
                        :
                        (
                          <CustomizedBadge pill variant="danger">
                            احراز نشده
                          </CustomizedBadge>
                        )}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/users/${item._id}`}
                        className="text-lightBlue yekan-Bold "
                      >
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={editTooltip}
                        >
                          <RiEditLine size={20} />
                        </OverlayTrigger>
                      </Link>
                    </td>
                  </tr>
                );
              })
              :

              <tr>
                <td colSpan="8">
                  <NoData />
                </td>
              </tr>

          }
        </CustomizedTable>
      </div>
    </div>
  );
}
