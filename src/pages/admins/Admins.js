import { useEffect, useState } from "react";
import { Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { RiEditLine } from "react-icons/all";
import { Link } from "react-router-dom";
import { Form, Formik, FastField, Field } from "formik";
import DateConvert from "../../utils/date";
//components
import CustomizedTable from "../../components/table/Table";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedSelect from "../../components/form/select/Select";
import CustomizedButton from "../../components/form/button/Button";
import adminServices from "../../services/httpServices/adminServices";
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import { useTitle } from "../../context";
import NoData from "../../components/no-data/NoData";
import Styles from "./AdminStyles.module.scss";
import { departmentServices, onlineAdminServices } from "../../services";
import { Toastify } from "../../utils";
export default function AdminPage() {
  document.title = "ارز تو ارز | مدیریت ادمین‌ها";
  const { title, setTitle } = useTitle();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsList, setAdminsList] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const [department, setDepartment] = useState([]);

  const editTooltip = (props) => (
    <Tooltip {...props} className="is-size-7">
      ویرایش اطلاعات
    </Tooltip>
  );

  useEffect(() => {
    setTitle("مدیریت ادمین‌ها");
  }, []);

  useEffect(() => {
    getList();

    getDepartments();
  }, [currentPage]);

  const getList = async () => {
    try {
      setIsLoading(true);
      let params = {
        pageNumber: currentPage,
        perPage: 10,
      };
      const { data, status } = await adminServices.list(params);
      if (status === 200 && data.success) {
        setAdminsList(data.data.result);
        setAdminCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const searchAdmins = async (vals) => {
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
      const { data, status } = await adminServices.search(body);
      if (status === 200 && data.success) {
        setAdminsList(data.data.result);
        setAdminCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  const getDepartments = async () => {
    try {
      const { data, status } = await departmentServices.get();
      if (status === 200 && data.success) {
        let dataList = [];
        for (let i in data.data.result) {
          dataList.push({
            _id: data.data.result[i]._id,
            title: data.data.result[i].faName,
          });
        }
        setDepartment(dataList);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  const removeFilters = () => {
    getList();
  };

  return (
    <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
      <Formik
        initialValues={FormikInitialValues.admin.search}
        onSubmit={searchAdmins}
      >
        {({ isValid, dirty, resetForm }) => (
          <Form className="row justify-content-start align-items-end">
            <Col lg={8} className="mb-4">
              <div className="main-title">
                <h1 className="is-size-5 mb-2">لیست ادمین‌ها</h1>
                <p className="is-size-7 gainsboro mb-0">
                  در این بخش شما می‌توانید اطلاعات تمامی ادمین‌های سایت را
                  ببینید، ادمین مورد نظر خود را جستجو کرده و در صورت لزوم آن را
                  ویرایش کنید.
                </p>
              </div>
            </Col>

            <Col lg={4} className="mb-4">
              <div className="d-flex justify-content-end">
                <CustomizedButton
                  onClick={() => {
                    resetForm(FormikInitialValues.admin.search);
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
            <Col lg={2} xs={6} className="mb-3">
              <Field
                name="firstName"
                placeholder="نام"
                label="نام"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} xs={6} className="mb-3">
              <Field
                name="lastName"
                label="نام خانوادگی"
                placeholder="نام خانوادگی"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={3} className="mb-3">
              <Field
                name="email"
                label="ایمیل"
                type="email"
                placeholder="sample@gmail.com"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={3} xs={6} className="mb-3">
              <Field
                name="mobile"
                label="موبایل"
                className="FaNum yekan-Medium"
                placeholder="09123456789"
                type="tel"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} xs={6} className="mb-3">
              <Field
                name="department"
                label="دپارتمان"
                options={department}
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
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th className="text-center">موبایل</th>
              <th className="text-center">سطح دسترسی</th>
              <th className="text-center">تاریخ عضویت</th>
              <th className="text-center">...</th>
            </>
          }
          totalRecords={adminCount}
          pageLimit={10}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {adminsList.length ? (
            adminsList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Tooltip>
                            {index % 2 === 0 ? (
                              <span>آنلاین</span>
                            ) : item.isActive === false ? (
                              <span>غیرفعال</span>
                            ) : (
                              <span>آفلاین</span>
                            )}
                          </Tooltip>
                        }
                      >
                        <div>
                          <span
                            className={`${Styles.icon} ${
                              item.isActive ? "" : Styles.notActive
                            } ${index % 2 === 0 ? Styles.online : ""} ml-1 en`}
                          >
                            {item.email?.slice(0, 1).toLocaleUpperCase()}
                          </span>
                          <span>
                            {item.firstName} {item.lastName}
                          </span>
                        </div>
                      </OverlayTrigger>
                    </div>
                  </td>
                  <td>{item.email}</td>
                  <td className="FaNum text-center">{item.mobile}</td>
                  <td>
                    <div
                      className={`${Styles.adminRoles} center-content flex-wrap`}
                    >
                      {item.role.length
                        ? item.role?.map((level, index) => {
                            return (
                              <span
                                className={`${
                                  level.role === "manager"
                                    ? Styles.manager
                                    : Styles.basic
                                } is-size-8 py-1 px-2 m-1`}
                                key={index}
                              >
                                {level.role === "manager"
                                  ? "مدیر"
                                  : level.role === "basic"
                                  ? "کارمند"
                                  : null}{" "}
                                {level.department?.faName}
                              </span>
                            );
                          })
                        : "__"}
                    </div>
                  </td>
                  <td className="text-center FaNum">
                    {DateConvert.toShamsiDate(item.createdAt)}
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/admins/edit-admin/${item._id}`}
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
