import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik, FastField, Field } from "formik";
import { Col, Row } from "react-bootstrap";
import { RiEditLine } from "react-icons/all";
//components
import bankAccountServices from "../../services/httpServices/bankAccountServices";
import CustomizedTable from "../../components/table/Table";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedBadge from "../../components/badge/Badge";
import CustomizedSwitch from "../../components/form/switch/CustomizedSwitch";
import DeleteConfirmationModal from "../../components/delete-modal/DeleteConfirmation";
import DateConvert from '../../utils/date'
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import CustomizedSelect from "../../components/form/select/Select";
import { useTitle } from "../../context";
import NoData from "../../components/no-data/NoData";
import { Toastify } from "../../utils";

export default function BankAccountsPage() {
  document.title = "ارز تو ارز | مدیریت کارت‌های بانکی";
  const [currentPage, setCurrentPage] = useState(1);
  const { title, setTitle } = useTitle();
  const formikRef = useRef(null);
  const [bankAccountCount, setBankAccountCount] = useState(0);
  const [bankAccountList, setBankAccountList] = useState([]);
  const [activeConfirmDelete, setActiveConfirmDelete] = useState(0);
  const [bankAccDetail, setBankAccDetail] = useState({});
  const verified = [
    { _id: "rejected", title: "رد شده" },
    { _id: "approved", title: "تایید شده" },
    { _id: "pending", title: "درانتظار تایید" },
  ];
  useEffect(() => {
    getBankAccountList()
  }, [currentPage])

  useEffect(() => {
    setTitle("مدیریت کارت‌های بانکی");
  }, [])
  // get bankAccount list
  const getBankAccountList = async () => {
    try {
      let params = {
        pageNumber: currentPage,
        perPage: 10
      }
      const { data, status } = await bankAccountServices.list(params)
      if (status === 200 && data.success) {
        setBankAccountList(data.data.result);
        setBankAccountCount(data.data.count)
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  // search bankAccount item
  const searchBankAccountList = async (vals) => {
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
    try {
      const { data, status } = await bankAccountServices.search(params)
      if (status === 200 && data.success) {
        setBankAccountList(data.data.result);
        setBankAccountCount(data.data.count)
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  const removeFilters = () => {
    getBankAccountList()
  }
  return (
    <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">

      <div>
        <Formik
          innerRef={formikRef}
          initialValues={FormikInitialValues.bankAccount.search}
          onSubmit={searchBankAccountList}
        >
          {({ isValid, dirty, resetForm }) => (
            <Form className="row justify-content-start align-items-end">


              <Col lg={8} className="mb-4">
                <div className="main-title">
                  <h1 className="is-size-5 mb-2">لیست کارت‌های بانکی</h1>
                  <p className="is-size-7 gainsboro mb-0">
                    در این بخش شما می‌توانید لیست کارت‌های بانکی تمامی کاربران را ببینید و با توجه به اطلاعات کاربر آن را رد یا تایید کنید.
                  </p>
                </div>
              </Col>

              <Col lg={4} className="mb-4">

                <div className="d-flex justify-content-end">
                  <CustomizedButton
                    onClick={() => {
                      resetForm(FormikInitialValues.bankAccount.search)
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
              <Col lg={2} md={4} sm={6} className="mb-3">
                <Field
                  name="firstName"
                  placeholder="نام "
                  label="نام"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={2} md={4} sm={6} className="mb-3">
                <Field
                  name="lastName"
                  label="نام خانوادگی"
                  placeholder="نام خانوادگی"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={2} md={4} sm={6} className="mb-3">
                <Field
                  name="email"
                  label=" ایمیل"
                  placeholder="sample@gmail.com"
                  as={CustomizedInput}
                />
              </Col>
              <Col lg={2} md={4} sm={6} className="mb-3">
                <Field
                  name="card"
                  label="شماره کارت"
                  placeholder="1234567891234567"
                  type="tel"
                  as={CustomizedInput}
                />
              </Col>
              {/* <Col lg={2} md={4} sm={6} className="mb-3">
                <Field
                  name="bankAccountNumber"
                  type="tel"
                  placeholder="12345678912345"
                  label="شماره حساب"
                  as={CustomizedInput}
                />
              </Col> */}
              <Col lg={2} md={4} sm={6} className="mb-3">
                <Field
                  name="verified"
                  label=" وضعیت"
                  options={verified}
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
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th className="text-center">بانک</th>
              <th className="text-center">شماره کارت</th>
              {/* <th className="text-center">شماره حساب</th> */}
              <th className="text-center">شماره شبا</th>
              <th className="text-center">وضعیت</th>
              <th className="text-center">تاریخ درخواست</th>
              <th className="text-center">...</th>
            </>
          }
          totalRecords={bankAccountCount}
          pageLimit={10}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {
            bankAccountList.length ?
              bankAccountList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.customerIdentity?.firstName}{" "}{item.customerIdentity?.lastName}</td>
                    <td>{item.customer?.email}</td>
                    <td className="text-center">{item.bank}</td>
                    <td className="text-center">{item.card}</td>
                    {/* <td className="text-center">{item.bankAccountNumber ? item.bankAccountNumber : "-"}</td> */}
                    <td className="text-center"> {`${item.sheba?.slice(0, 6)}****${item.sheba?.slice(-10)}`}</td>
                    <td className="text-center">
                      {item.verified === "rejected" ? (
                        <CustomizedBadge pill variant="danger" >
                          ردشده
                        </CustomizedBadge>
                      ) : item.verified === "approved" ? (
                        <CustomizedBadge pill variant="success" >
                          تایید شده
                        </CustomizedBadge>
                      ) : (
                        <CustomizedBadge pill variant="secondary" >
                          در انتظار تایید
                        </CustomizedBadge>
                      )}
                    </td>
                    <td className="text-center">
                      {DateConvert.toShamsiDate(item.createdAt)}
                    </td>
                    <td className="text-center">

                      <Link
                        to={`/bank-accounts/${item._id}`}
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
                <td colSpan="7">
                  <NoData />
                </td>
              </tr>
          }
        </CustomizedTable>{" "}
      </div>

    </div>
  );
}
