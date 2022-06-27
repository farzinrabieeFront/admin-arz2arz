import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
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
import verificationServices from "../../services/httpServices/verificationServices";
import { useTitle } from "../../context";
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import NoData from "../../components/no-data/NoData";
import { Toastify } from "../../utils";

export default function VerificationPage() {
  document.title = "ارز تو ارز | احراز هویت";
  const { setTitle } = useTitle();
  const [currentPage, setCurrentPage] = useState(1);
  const [identitiesList, setIdentitiesList] = useState([])
  const [identitiesCount, setIdentitiesCount] = useState(0)

  const verified = [
    { _id: "rejected", title: "رد شده" },
    { _id: "approved", title: "تایید شده" },
    { _id: "pending", title: "درانتظار تایید" },
  ];

  useEffect(() => {
    getData()
  }, [currentPage])

  useEffect(() => {
    setTitle("تایید هویت");
  }, [])

  const getData = async () => {
    let params = {
      pageNumber: currentPage,
      perPage: 10
    }
    try {
      const { data, status } = await verificationServices.getData(params)
      if (status === 200 && data.success) {
        setIdentitiesList(data.data.result);
        setIdentitiesCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  const searchIdentities = async (vals) => {
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
      const { data, status } = await verificationServices.search(body)
      if (status === 200 && data.success) {
        setIdentitiesList(data.data.result);
        setIdentitiesCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  const removeFilters = () => {
    getData()
  }
  return (
    <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
      <Formik
        initialValues={FormikInitialValues.identity.search}
        onSubmit={searchIdentities}
      >
        {({ isValid, dirty, resetForm }) => (
          <Form className="row justify-content-start align-items-end">

            <Col lg={8} className="mb-4">
              <div className="main-title">
                <h1 className="is-size-5 mb-2">لیست درخواست‌های احراز هویت</h1>
                <p className="is-size-7 gainsboro mb-0">
                  در این بخش شما می‌توانید لیست درخواست‌های احراز هویت کاربران را ببینید و با توجه به اطلاعات کاربر آن را رد یا تایید کنید.
                </p>
              </div>
            </Col>
            <Col lg={4} className="mb-4">
              <div className="d-flex justify-content-end">
                <CustomizedButton
                  onClick={() => {
                    resetForm(FormikInitialValues.identity.search)
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
                placeholder="sample@gmail.com"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-3">
              <FastField
                name="firstName"
                placeholder="نام "
                label=" نام "
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-3">
              <FastField
                name="lastName"
                label=" نام خانوادگی"
                placeholder="نام خانوادگی"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-3">
              <FastField
                name="nationalCode"
                label=" کد ملی	"
                className="FaNum yekan-Light"
                type="tel"
                placeholder="0012345678"
                as={CustomizedInput}
              />
            </Col>
           
            <Col lg={2} md={4} sm={6} className="mb-3">
              <FastField
                name="mobile"
                label="موبایل"
                className="FaNum yekan-Light"
                placeholder="09123456789"
                type="tel"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-3">
              <FastField
                name="verified"
                label=" وضعیت"
                options={verified}
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
              <th>نام </th>
              <th>نام خانوادگی </th>
              <th className="text-center">کد ملی</th>
              <th className="text-center">موبایل</th>
              <th className="text-center">تاریخ درخواست‌</th>
              <th className="text-center">وضعیت احراز هویت</th>
              <th className="text-center">...</th>
            </>
          }
          totalRecords={identitiesCount}
          pageLimit={10}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {
            identitiesList.length ?
              identitiesList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item.customer?.email}
                    </td>
                    <td>
                      {item.firstName}
                    </td>
                    <td>
                      {item.lastName}
                    </td>
                    <td className="FaNum text-center">{item.nationalCode}</td>
                    <td className="FaNum text-center">{item.mobile ? item.mobile : "__"}</td>
                    <td className="text-center">
                      {DateConvert.getTime(item.createdAt)}
                      <span className="mx-1 text-gainsboro">|</span>
                      {DateConvert.toShamsiDate(item.createdAt)}
                    </td>
                    <td className="text-center">
                      {item.verified === "rejected" ? (
                        <CustomizedBadge pill variant="danger">
                          ردشده
                        </CustomizedBadge>
                      ) : item.verified === "approved" ? (
                        <CustomizedBadge pill variant="success">
                          تایید شده
                        </CustomizedBadge>
                      ) : (
                        <CustomizedBadge pill variant="secondary">
                          در انتظار تایید
                        </CustomizedBadge>
                      )}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/verifications/${item.customer?._id}`}
                        className="text-lightBlue yekan-Bold "
                      >
                        <RiEditLine size={20} />
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
