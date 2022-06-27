import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Form, Formik, FastField } from "formik";
//pics
import bitcoinPic from "../../assets/images/BitCoin_ICON.png";
import lightcoinPic from "../../assets/images/LightCoin_ICON.png";

//components
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import CustomizedTable from "../../components/table/Table";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedInput from "../../components/form/input/Input";
import { useTitle } from "../../context";
import { orderServices } from "../../services";
import { Toastify } from "../../utils";

export default function OrdersPage() {
  document.title = "ارز تو ارز | تاریخچه معاملات";
  const { setTitle } = useTitle();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderList, setOrderList] = useState([]);
  const [orderCount, setOrderCount] = useState();

  useEffect(() => {
    setTitle("تاریخچه معاملات");
  }, [])
  useEffect(() => {
    getList()
  }, [currentPage])

  const getList = async () => {
    try {
      setIsLoading(true)
      let params = {
        pageNumber: currentPage,
        perPage: 10
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

  }
  const removeFilters = () => {
    getList()
  }
  return (
    <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
      <Formik
        initialValues={FormikInitialValues.orders}
        onSubmit={searchOrders}
      >
        {({ isValid, dirty, resetForm }) => (
          <Form className="row justify-content-start align-items-end">
            <Col lg={12} className="mb-4 d-flex justify-content-between align-items-center">
              <div>
                <h1 className="is-size-5 mb-2">تاریخچه معاملات</h1>
                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید تاریخچه تمامی معاملات انجام شده در صرافی ارز تو ارز را مشاهده نمایید</p>
              </div>
              <div className="d-flex">
                <CustomizedButton
                  onClick={() => {
                    resetForm(FormikInitialValues.orders)
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
            <Col lg={3} className="mb-3">
              <FastField
                name="baseAsset"
                label="baseAsset"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={3} className="mb-3">
              <FastField
                name="quoteAsset"
                label="quoteAsset"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={3} className="mb-3">
              <FastField
                name="type"
                label="type"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={3} className="mb-3">
              <FastField
                name="mobile"
                label="موبایل"
                className="FaNum yekan-Medium"
                type="tel"
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
              <th className=" yekan-Light is-size-6">جفت ارز</th>
              <th className=" yekan-Light is-size-6">تاریخ</th>
              <th className=" yekan-Light is-size-6">مقدار</th>
              <th className=" yekan-Light is-size-6">نوع سفارش</th>
              <th className=" yekan-Light is-size-6">مبلغ سفارش</th>
              <th className=" yekan-Light is-size-6">کارمزد</th>
              <th className=" yekan-Light is-size-6">مبلغ کل</th>
            </>
          }
          totalRecords={orderCount}
          pageLimit={10}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {orderList.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <span className="CurrencyPairs">
                    <img src={bitcoinPic} />
                    <img src={lightcoinPic} />
                  </span>
                  <span className="mr-2 yekan-Medium is-size-7">BTC / LTC</span>
                </td>
                <td className="is-size-7 yekan-Medium">
                  ۱۳۹۹/۱۰/۱۴<span className="text-gainsboro mx-2">|</span>
                  ۱۳:۳۱:۴۸
                </td>
                <td className="is-size-7 yekan-Medium">
                  ۰.۷۲۱۷۲۶,۲۰۰{" "}
                  <span className="text-gainsboro is-size-7 mr-1">تومان</span>
                </td>
                <td className="is-size-7 yekan-Medium">
                  {index % 5 === 0 ? (
                    <span className="text-info">تبدیل</span>
                  ) : index % 2 === 0 ? (
                    <span className="text-success">خرید</span>
                  ) : (
                    <span className="text-danger">فروش</span>
                  )}
                </td>
                <td className="is-size-7 yekan-Medium">۲۹۶,۷۲۶,۲۰۰</td>
                <td className="is-size-7 yekan-Medium">۲,۱۰۰,۰۰۰</td>
                <td className="is-size-7 yekan-Medium">۲۹۶,۷۲۶,۲۰۰</td>
              </tr>
            );
          })}
        </CustomizedTable>
      </div>
    </div>
  );
}
