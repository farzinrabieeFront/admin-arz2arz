import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import { HiChevronLeft } from 'react-icons/all';
import * as math from 'mathjs';

//components
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import CustomizedTable from "../../components/table/Table";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedBadge from "../../components/badge/Badge";
import CustomizedSelect from "../../components/form/select/Select";
import NoData from "../../components/no-data/NoData";
import { useTitle } from "../../context";
import { orderServices } from "../../services";
import DateConvert from '../../utils/date';
import OrdersData from "./data/data";
import Styles from "./Orders.module.scss"
import OrdersModal from "./component/OrdersModal";
import { Toastify } from "../../utils";

export default function LimitOrdersPage() {
  document.title = "ارز تو ارز | تاریخچه معاملات اتوماتیک";
  const { title, setTitle } = useTitle();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderList, setOrderList] = useState([]);
  const [orderCount, setOrderCount] = useState();
  const [openModal, setOpenModal] = useState();
  const [marketId, setMarketId] = useState();

  useEffect(() => {
    setTitle("تاریخچه معاملات اتوماتیک");
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
        zone: 'SPOT',
        type: 'LIMIT',
      }
      const { data, status } = await orderServices.get(params)
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
  const searchOrders = async (vals) => {
    try {
      setIsLoading(true)
      let body = {}
      for (const key in vals) {
        if (vals[key])
          body = {
            ...body,
            [key]: vals[key],
          }
      }
      let params = {
        pageNumber: currentPage,
        perPage: 10,
        zone: 'SPOT',
        type: 'LIMIT',
        ...body,
      }
      const { data, status } = await orderServices.get(params)
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
      {
        openModal ?
          <OrdersModal marketId={marketId} show={openModal} zone="SPOT" type="LIMIT" handleClose={() => setOpenModal()} />
          : null
      }
      <Formik
        initialValues={FormikInitialValues.orders}
        onSubmit={searchOrders}
      >
        {({ isValid, dirty, resetForm }) => (
          <Form className="row justify-content-start align-items-end">
            <Col lg={8} className="mb-4">
              <div className="main-title">
                <h1 className="is-size-5 mb-2">تاریخچه معاملات اتوماتیک</h1>
                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید تاریخچه تمامی معاملات اتوماتیک در صرافی ارز تو ارز را مشاهده نمایید</p>
              </div>
            </Col>

            <Col lg={4} className="mb-4">
              <div className="d-flex justify-content-end">
                <CustomizedButton
                  onClick={() => {
                    resetForm(FormikInitialValues.orders)
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

            <Col lg={1} md={2} sm={6} className="mb-3">
              <Field
                name="baseAsset"
                placeholder="BTC"
                label="ارز مبدا"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={1} md={2} sm={6} className="mb-3">
              <Field
                name="quoteAsset"
                placeholder="USDT"
                label="ارز مقصد"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-3">
              <Field
                name="side"
                label="نوع سفارش"
                options={OrdersData.side}
                as={CustomizedSelect}
              />
            </Col>
            <Col lg={2} md={4} sm={6} className="mb-3">
              <Field
                name="email"
                placeholder="sample@gmail.com"
                label="ایمیل"
                as={CustomizedInput}
              />
            </Col>

            <Col lg={2} sm={4} className="mb-3">
              <Field
                name="status"
                label="وضعیت"
                options={OrdersData.status}
                as={CustomizedSelect}
              />
            </Col>
            <Col lg={2} sm={4} className="mb-3">
              <Field
                name="orderId"
                label="OrderID"
                placeholder="8216689574"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} sm={4} className="mb-3">
              <Field
                name="marketId"
                placeholder="H0PYEpkko"
                label="MarketID"
                as={CustomizedInput}
              />
            </Col>
          </Form>
        )}
      </Formik>
      <div>
        <CustomizedTable
          header={
            <>
              <th>جفت ارز</th>
              <th className="text-center">تاریخ</th>
              <th className="text-center">نوع سفارش</th>
              <th className="text-center">مقدار پرداختی</th>
              <th className="text-center">مقدار درخواستی</th>
              <th className="text-center">مقدار دریافتی</th>
              <th className="text-center">قیمت اولیه</th>
              <th className="text-center">قیمت نهایی</th>
              <th className="text-center">ایمیل</th>
              <th className="text-center">وضعیت</th>
              <th className="text-center">OrderID</th>
              <th className="text-center">MarketID</th>
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
                    <td>
                      <span title="ارز مبدا">{item.baseAsset}</span><span className="mx-1">/</span><span title="ارز مقصد">{item.quoteAsset}</span>
                    </td>
                    <td className="text-center">
                      {DateConvert.getTime(item.createdAt)}
                      <span className="mx-1 text-gainsboro">|</span>
                      {DateConvert.toShamsiDate(item.createdAt)}
                    </td>
                    <td className="text-center">
                      {item.side === "BUY" ? (
                        <CustomizedBadge pill className="no-min-width" variant="success">
                          خرید
                        </CustomizedBadge>
                      )
                        :
                        (
                          <CustomizedBadge pill className="no-min-width" variant="danger">
                            فروش
                          </CustomizedBadge>
                        )}
                    </td>
                    <td title="مقدار پرداختی" className="text-center"> {math.fix(item.baseAmount || 0, 8)}
                      <span className="is-size-8 ml-1 ltr text-gainsboro">{item.baseAsset}</span>
                    </td>
                    <td title="مقدار درخواستی" className="text-center">{math.fix(item.requestedAmount || 0, 8)}
                      <span className="is-size-8 ml-1 ltr text-gainsboro">{item.quoteAsset}</span>
                    </td>
                    <td title="مقدار دریافتی" className="text-center">
                      {math.fix(item.quoteAmount || 0, 8)}
                      <span className="is-size-8 ml-1 ltr text-gainsboro">{item.quoteAsset}</span>
                    </td>
                    <td title="قیمت اولیه" className="text-center">{math.fix(item.firstPrice, 8)}
                      <span className="is-size-8 ml-1 ltr text-gainsboro">{item.pairedSymbol}</span></td>
                    <td title="قیمت نهایی	" className="text-center">
                      {item.finalPrice ?
                        <>
                          {item.finalPrice}
                          <span className="is-size-8 ml-1 ltr text-gainsboro">{item.pairedSymbol}</span>
                        </>
                        :
                        "__"
                      }

                    </td>
                    <td className="ltr text-center">{item.customer?.email?.slice(0, 3)}**</td>
                    <td className="text-center">
                      <CustomizedBadge pill className="no-min-width"
                        variant={
                          item.status === "NEW" ? "info"
                            :
                            item.status === "PENDING" || item.status === "CHECKING" || item.status === "PARTIALLY_FILLED" || item.status === "PENDING_CANCEL" ? "warning"
                              :
                              item.status === "FILLED" ? "success"
                                :
                                item.status === "EXPIRED" ? "secondary"
                                  :
                                  item.status === "REJECTED" || item.status === "CANCELED" ? "danger"
                                    :
                                    "light"
                        }
                      >
                        {item.status}
                      </CustomizedBadge>
                    </td>
                    <td className="text-center">
                      {item.orderId ?
                        <span className={`${Styles.binanceId} pointer`}>{item.orderId}</span>
                        :
                        "__"
                      }
                    </td>
                    <td className="text-center">
                      {item.marketId ?
                        <span className={`${Styles.marketId} ltr justify-content-center text-lightBlue d-flex align-items-start pointer`}
                          onClick={() => {
                            setMarketId(item.marketId)
                            setOpenModal(true)
                          }}
                        >
                          <HiChevronLeft size="16" /> {item.marketId}
                        </span>
                        :
                        <tr>
                          <td colSpan="12">
                            <NoData />
                          </td>
                        </tr>
                      }
                    </td>
                  </tr>
                );
              })
              :
              <tr>
                <td colSpan="12">
                  <NoData />
                </td>
              </tr>

          }
        </CustomizedTable>
      </div>
    </div >
  );
}
