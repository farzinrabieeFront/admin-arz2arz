import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import { RiCoinsLine } from 'react-icons/all';
import * as math from 'mathjs';

//components
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import CustomizedTable from "../../components/table/Table";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedBadge from "../../components/badge/Badge";
import CustomizedSelect from "../../components/form/select/Select";
import { useTitle } from "../../context";
import { reportProfitServices } from "../../services";
import DateConvert from '../../utils/date';
import PersianDatePicker from "../../components/form/datepicker/PersianDatePicker";
import NoData from "../../components/no-data/NoData";
import { Toastify } from "../../utils";
// import ProfitData from "./data/data";
// import Styles from "./Profit.module.scss"

export default function ReportsPage() {
  document.title = "ارز تو ارز | گزارشات سودهای صرافی";
  const { title, setTitle } = useTitle();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderList, setOrderList] = useState([]);
  const [orderCount, setOrderCount] = useState();
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();

  useEffect(() => {
    setTitle("گزارشات سودهای صرافی");
  }, [])
  useEffect(() => {
    getList()
  }, [currentPage])

  const getList = async () => {
    try {
      setIsLoading(true)
      let params = {
        pageNumber: currentPage,
        perPage: 10,

      }
      const { data, status } = await reportProfitServices.get(params)
      if (status === 200 && data.success) {
        setOrderList(data.data.result);
        setOrderCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  const searchProfit = async (vals) => {
    const { startAt, endAt, ...other } = vals

    try {
      let body = {}
      let timeData = {}
      if (new Date(startAt).getTime() !== new Date(endAt).getTime()) {
        timeData = {
          ...timeData,
          startAt: new Date(startAt).toISOString(),
          endAt: new Date(endAt).toISOString(),
        }
      
      }
      for (const key in other) {
        if (other[key])
          body = {
            ...body,
            [key]: other[key],
           
          }
      }
      let params = {
        pageNumber: currentPage,
        perPage: 10,
        ...body,
        ...timeData
      }
      const { data, status } = await reportProfitServices.get(params)
      if (status === 200 && data.success) {
        setOrderList(data.data.result);
        setOrderCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message)
    } finally {
      setIsLoading(false)
    }


  }
  const removeFilters = () => {
    getList()
  }
  return (
    <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
      <Formik
        initialValues={{ symbol: "", startAt: new Date(), endAt: new Date() }}
        onSubmit={searchProfit}
      >
        {({ isValid, dirty, resetForm }) => (
          <Form className="row justify-content-start align-items-end">
            <Col lg={12} className="mb-4 d-flex justify-content-between align-items-center">
              <div>
                <h1 className="is-size-5 mb-2">گزارشات سودهای صرافی</h1>
                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید گزارشات سودهای صرافی ارز تو ارز را مشاهده نمایید</p>
              </div>
            </Col>
            <Col lg={2} md={4} xs={12} className="mb-3">
              <Field
                name="symbol"
                placeholder="BTC"
                label="ارز"
                as={CustomizedInput}
              />
            </Col>

            <Col lg={2} md={4} xs={6} className="mb-3">
              <Field
                name="startAt"
                label="از تاریخ"
                as={PersianDatePicker}
              />
            </Col>
            <Col lg={2} md={4} xs={6} className="mb-3">
              <Field
                name="endAt"
                label="تا تاریخ"
                as={PersianDatePicker}
              />
            </Col>
            <Col lg={6} className="mb-3 d-flex justify-content-end">
              <CustomizedButton
                onClick={() => {
                  resetForm({ symbol: "", startAt: new Date(), endAt: new Date() })
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
            </Col>
          </Form>
        )}
      </Formik>
      <div>
        <CustomizedTable
          header={
            <>
              <th>ارز</th>
              <th className="text-center">سود</th>
              <th className="text-center">تعداد کل معاملات</th>
              <th className="text-center">تعداد معاملات تومانی</th>
              <th className="text-center">تعداد معاملات اتوماتیک</th>
              <th className="text-center">تعداد معاملات تبدیل ارز</th>
              <th className="text-center">فروش</th>
              <th className="text-center">خرید</th>
              <th className="text-center">برداشت</th>

            </>
          }
          totalRecords={orderCount}
          pageLimit={10}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {
            orderList.length ?
              orderList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item._id}</td>
                    <td className="text-center">{item.amount}</td>
                    <td className="text-center">{item.count}</td>
                    <td className="text-center">{item.fiat}</td>
                    <td className="text-center">{item.limit}</td>
                    <td className="text-center">{item.market}</td>
                    <td className="text-center">{item.sell}</td>
                    <td className="text-center">{item.buy}</td>
                    <td className="text-center">{item.withdraw}</td>
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
