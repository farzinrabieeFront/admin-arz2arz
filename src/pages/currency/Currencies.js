import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import { RiCopperCoinLine, BsCheckLg, IoClose, BiDotsVerticalRounded } from 'react-icons/all';
import { DropdownButton, Dropdown } from "react-bootstrap";

//components
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import CustomizedTable from "../../components/table/Table";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedBadge from "../../components/badge/Badge";
import CustomizedSelect from "../../components/form/select/Select";
import { useTitle } from "../../context";
import { currencyServices } from "../../services";
import Styles from "./Currencies.module.scss";
import CustomizedCheckBox from "../../components/form/checkbox/CheckBox";
import NetworksModal from "./component/networks-modal/NetworksModal";
import OperationModal from "./component/operation-modal/OperationModal";
import NoData from "../../components/no-data/NoData";
import { Toastify } from "../../utils";


export default function CurrenciesPage() {
  document.title = "ارز تو ارز | مدیریت ارزها";
  const { title, setTitle } = useTitle();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currencyList, setCurrencyList] = useState([]);
  const [currencyCount, setCurrencyCount] = useState();
  const [networkModal, setNetworkModal] = useState(false);
  const [operationModal, setOperationModal] = useState();
  const [singleData, setSingleData] = useState({});
  const [currentId, setCurrentId] = useState();
  const [searchData, setSearchData] = useState({});

  const activeStatus = [
    { _id: true, title: "فعال" },
    { _id: false, title: "غیرفعال" },
  ]
  const depositSupport = [
    { _id: true, title: "نمایش ارزهایی که قابلیت واریز دارند" },
    { _id: false, title: "نمایش ارزهایی که قابلیت واریز ندارند" },
  ]
  const withdrawSupport = [
    { _id: true, title: "نمایش ارزهایی که قابلیت برداشت دارند" },
    { _id: false, title: "نمایش ارزهایی که قابلیت برداشت ندارند" },
  ]

  useEffect(() => {
    setTitle("مدیریت ارزها");
  }, [])

  useEffect(() => {
    getList()
  }, [currentPage])


  const getList = async () => {
    try {
      setIsLoading(true)
      // let params = {};
      // let body = {}
      // if (vals) {
      //   for (const key in vals) {
      //     if (vals[key])
      //       body = {
      //         ...body,
      //         [key]: vals[key],
      //       }
      //   }
      // }
      let params = {
        pageNumber: currentPage,
        perPage: 10,
        // ...body
      }
      if (searchData) params = { ...params, ...searchData };
      const { data, status } = await currencyServices.get(params)
      if (status === 200 && data.success) {
        setCurrencyList(data.data.result);
        setCurrencyCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const search = async (vals) => {
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
        ...body,
      }
      const { data, status } = await currencyServices.get(params)
      if (status === 200 && data.success) {
        setCurrencyList(data.data.result);
        setCurrencyCount(data.data.count);
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

      <NetworksModal show={networkModal}
        data={singleData}
        handleClose={() => setNetworkModal(false)}
      />

      {
        operationModal ?
          <OperationModal show={operationModal}
            id={currentId}
            handleClose={() => setOperationModal()}
            refresh={() => getList()}
          />
          :
          null
      }

      <Formik
        initialValues={FormikInitialValues.currency}
        onSubmit={search}
      // onSubmit={(vals) => {
      //   // setSearchData(vals)
      //   getList(vals)
      // }}
      >
        {({ isValid, dirty, resetForm }) => (
          <Form className="row justify-content-start align-items-end">
            <Col lg={8} className="mb-4">
              <div className="main-title">
                <h1 className="is-size-5 mb-2">مدیریت ارزها</h1>
                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید تاریخچه تمامی معاملات تبدیل ارز در صرافی ارز تو ارز را مشاهده نمایید</p>
              </div>
            </Col>
            <Col lg={4} className="mb-4">
              <div className="d-flex justify-content-end">
                <CustomizedButton
                  onClick={() => {
                    resetForm(FormikInitialValues.currency)
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
            <Col lg={3} sm={12} className="mb-3">
              <Field
                name="search_keys"
                placeholder="مثال : BTC ، bitcoin ، بیت کوین"
                label="ارز"
                as={CustomizedInput}
              />
            </Col>
            <Col lg={2} xs={6} className="mb-3">
              <Field
                name="isActive"
                label="وضعیت"
                options={activeStatus}
                as={CustomizedSelect}
              />
            </Col>
            <Col lg={2} xs={6} className="mb-3">
              <Field
                name="depositIsSupport"
                label="قابلیت واریز"
                options={depositSupport}
                as={CustomizedSelect}
              />
            </Col>
            <Col lg={2} xs={6} className="mb-3">
              <Field
                name="withdrawIsSupport"
                label="قابلیت برداشت"
                options={withdrawSupport}
                as={CustomizedSelect}
              />
            </Col>
            <Col lg={3} xs={6} className="mb-3">
              <Field
                name="isMain"
                label="ارزهای معروف"
                className="is-size-6"
                id="isMain"
                as={CustomizedCheckBox}
              />
            </Col>

          </Form>
        )}
      </Formik>
      <div>
        <CustomizedTable
          header={
            <>
              <th>نام ارز</th>
              <th className="text-center">قابلیت معامله (Trade)</th>
              <th className="text-center">قابلیت واریز (Deposit)</th>
              <th className="text-center">قابلیت واریز در بایینس</th>
              <th className="text-center">قابلیت برداشت (Whithdraw)</th>
              <th className="text-center">قابلیت برداشت در بایینس</th>
              <th className="text-center">وضعیت</th>
              <th className="text-center">حداقل مقدار واریزی</th>
              <th className="text-center">{" "}</th>
            </>
          }
          totalRecords={currencyCount}
          pageLimit={10}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {
            currencyList?.length ?
              currencyList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className={`${Styles.currency} d-flex align-items-center`}>
                        <span className={`${Styles.icon} center-content  ml-2`}>
                          {
                            item.icon ?
                              <img src={`http://194.5.192.82:4000/api/v1/spotCurrency/images/${item.icon}`} />
                              :
                              <RiCopperCoinLine size="30" />
                          }
                        </span>
                        <span className="d-flex flex-column">
                          <span className="is-size-6 en">{item.symbol}</span>
                          <span className="is-size-7 text-gainsboro en">{item.name}
                            {item.faName ? <span className="is-size-8 mr-1">({item.faName})</span> : null}
                          </span>
                        </span>
                      </div>
                    </td>

                    <td className="text-center">{item.trading ?
                      <BsCheckLg className="text-success" />
                      :
                      <IoClose className="text-danger" size="23" />
                    }
                    </td>
                    <td className="text-center">{item.depositIsSupport ?
                      <BsCheckLg className="text-success" />
                      :
                      <IoClose className="text-danger" size="23" />
                    }
                    </td>
                    <td className="text-center">{item.depositAllEnable ?
                      <BsCheckLg className="text-success" />
                      :
                      <IoClose className="text-danger" size="23" />
                    }
                    </td>
                    <td className="text-center">{item.withdrawIsSupport ?
                      <BsCheckLg className="text-success" />
                      :
                      <IoClose className="text-danger" size="23" />
                    }
                    </td>
                    <td className="text-center">{item.withdrawAllEnable ?
                      <BsCheckLg className="text-success" />
                      :
                      <IoClose className="text-danger" size="23" />
                    }
                    </td>


                    <td className="text-center">
                      {item.isActive ?
                        <CustomizedBadge pill className="no-min-width" variant="success">
                          فعال
                        </CustomizedBadge>

                        :
                        <CustomizedBadge pill className="no-min-width" variant="danger">
                          غیرفعال
                        </CustomizedBadge>
                      }
                    </td>
                    <td className="text-center">{item.minimumTransferAmount ? item.minimumTransferAmount : "__"}</td>
                    <td className="text-center">
                      {/* <span className="pointer link"
                    onClick={() => {
                      setNetworkModal(true)
                      setSingleData(item)
                    }}><BiDotsVerticalRounded size="20" /></span> */}
                      <DropdownButton
                        className="noIcon header-dropdown link d-flex justify-content-end pointer"
                        id="dropdown-item-button"
                        variant="light"
                        title={<BiDotsVerticalRounded size="20" />}
                      >

                        <Dropdown.Item
                          as="button"
                          className={`${Styles.item} is-size-6 mb-0 text-blue yekan-Bold justify-content-start`}
                          onClick={() => {
                            setNetworkModal(true)
                            setSingleData(item)
                          }}
                        >
                          شبکه‌ها
                        </Dropdown.Item>
                        <Dropdown.Item
                          as="button"
                          className={`${Styles.item} is-size-6 mb-0 text-blue yekan-Bold justify-content-start`}
                          onClick={() => {
                            setOperationModal(true)
                            setCurrentId(item._id)
                          }
                          }
                        >
                          عملیات
                        </Dropdown.Item>

                      </DropdownButton>
                    </td>
                    {/* <td className="text-center">
                  <span className="pointer link"
                    onClick={() => {
                      setNetworkModal(true)
                      setSingleData(item)
                    }}><BiDotsVerticalRounded size="20" /></span>
                </td> */}
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
