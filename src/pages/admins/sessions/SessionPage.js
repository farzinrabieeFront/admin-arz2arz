import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { CgLogOut } from "react-icons/all";
import Styles from "./SessionPage.module.scss";
import { Form, Formik, FastField } from "formik";
//components
import CustomizedTable from "../../../components/table/Table";
import CustomizedInput from "../../../components/form/input/Input";
import CustomizedButton from "../../../components/form/button/Button";
import { sessionServices } from "../../../services";
import FormikInitialValues from "../../../utils/constants/formikInitialValues";
import { useTitle } from "../../../context";
import { toast } from "react-toastify";
import NoData from "../../../components/no-data/NoData";
import DateConvert from "../../../utils/date";
import CustomizedBadge from "../../../components/badge/Badge";
import { Toastify } from "../../../utils";
import DeleteConfirmationModal from "../../../components/delete-modal/DeleteConfirmation";
import CustomizedSelect from "../../../components/form/select/Select";

export default function SessionPage() {
  document.title = "ارز تو ارز | مدیریت نشست‌ها";
  const { title, setTitle } = useTitle();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsList, setSessionsList] = useState([]);
  const [sessionCount, setSessionCount] = useState(0);
  const [deleteSession, setDeleteSession] = useState(0);

  const revoked = [
    { _id: true, title: "غیرفعال" },
    { _id: false, title: "فعال" },
  ];
  useEffect(() => {
    setTitle("مدیریت نشست‌ها");
  }, []);

  useEffect(() => {
    getList();
  }, [currentPage]);

  const getList = async () => {
    try {
      setIsLoading(true);
      let params = {
        pageNumber: currentPage,
        perPage: 10,
      };
      const { data, status } = await sessionServices.list(params);
      if (status === 200 && data.success) {
        setSessionsList(data.data.result);
        setSessionCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const searchSessions = async (vals) => {
    setCurrentPage(1);
    let body = {};
    let params = {
      pageNumber: currentPage,
      perPage: 10,
    };
    for (const key in vals) {
      if (vals[key])
        body = {
          ...body,
          [key]: vals[key],
          ...params,
        };
    }
    try {
      const { data, status } = await sessionServices.search(body);
      if (status === 200 && data.success) {
        setSessionsList(data.data.result);
        setSessionCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  const removeFilters = () => {
    getList();
  };

  const handleDeleteSession = async (id) => {
    try {
      const { data, status } = await sessionServices.delete(id);
      if (status === 200 && data.success) {
        setDeleteSession();
        Toastify.success(data.message);
        getList();
      }
    } catch (error) {
      Toastify.error(error.message);
      setDeleteSession();
    }
  };
  return (
    <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
      <DeleteConfirmationModal
        show={Boolean(deleteSession)}
        title="نشست"
        onHide={() => setDeleteSession(0)}
        onConfirm={() => handleDeleteSession(deleteSession)}
      />
      <Formik
        initialValues={FormikInitialValues.session}
        onSubmit={searchSessions}
      >
        {({ isValid, dirty, resetForm }) => (
          <Form className="row justify-content-start align-items-end">
            <Col lg={8} className="mb-4">
              <div className="main-title">
                <h1 className="is-size-5 mb-2">مدیریت نشست‌ها</h1>
                <p className="is-size-7 gainsboro mb-0">
                  در این بخش شما می‌توانید نشست‌های تمامی ادمین‌های سایت را
                  مشاهده کنید و در صورت تمایل نشست مورد نظر خود را حذف کنید.
                </p>
              </div>
            </Col>

            <Col lg={4} className="mb-4">
              <div className="d-flex justify-content-end">
                <CustomizedButton
                  onClick={() => {
                    resetForm(FormikInitialValues.session.search);
                    removeFilters();
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

            <Col lg={3} sm={6} className="mb-3">
              <FastField
                name="email"
                type="email"
                label="ایمیل"
                placeholder="sample@gmail.com"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={3} sm={6} className="mb-3">
              <FastField
                name="firstName"
                placeholder="نام"
                label="نام"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={3} sm={6} className="mb-3">
              <FastField
                name="lastName"
                label="نام خانوادگی"
                placeholder="نام خانوادگی"
                as={CustomizedInput}
              />
            </Col>

            <Col lg={3} sm={6} className="mb-3">
              <FastField
                name="isRevoked"
                label="وضعیت"
                options={revoked}
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
              <th>نام و نام خانوادگی</th>
              <th className="text-center">تاریخ ورود</th>
              <th className="text-center">آدرس IP</th>
              <th className="text-center">وضعیت</th>
              <th className="text-center">حذف </th>
            </>
          }
          totalRecords={sessionCount}
          pageLimit={10}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {sessionsList.length ? (
            sessionsList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.admin?.email}</td>
                  <td>
                    {" "}
                    {item.admin?.firstName} {item.admin?.lastName}{" "}
                  </td>
                  <td className="FaNum text-center">
                    {DateConvert.getTime(item.createdAt)}
                    <span className="mx-1 text-gainsboro">|</span>
                    {DateConvert.toShamsiDate(item.createdAt)}
                  </td>
                  <td className="text-center"> {item.ip.slice(7)} </td>
                  <td className="text-center">
                    {!item.isRevoked ? (
                      <CustomizedBadge
                        pill
                        className="is-size-8"
                        variant="success"
                      >
                        فعال
                      </CustomizedBadge>
                    ) : (
                      <CustomizedBadge
                        pill
                        className="is-size-8"
                        variant="secondary"
                      >
                        غیرفعال
                      </CustomizedBadge>
                    )}
                  </td>
                  <td className="text-center">
                    {item.currentSession ? (
                      "__"
                    ) : (
                      <span
                        className="text-danger pointer"
                        onClick={() => setDeleteSession(item._id)}
                      >
                        <CgLogOut size={18} />
                      </span>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">
                <NoData />
              </td>
            </tr>
          )}
        </CustomizedTable>
      </div>
    </div>
  );
}
