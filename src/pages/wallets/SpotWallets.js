import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { HiOutlineQrcode, RiCopperCoinLine } from "react-icons/all";
import { Link } from "react-router-dom";
import { Form, Formik, FastField } from "formik";
import DateConvert from '../../utils/date';
import * as math from 'mathjs';
//components
import CustomizedTable from "../../components/table/Table";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedSelect from "../../components/form/select/Select";
import CustomizedBadge from "../../components/badge/Badge";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedSwitch from "../../components/form/switch/CustomizedSwitch";
import walletServices from "../../services/httpServices/walletServices";
import Styles from './SpotWallets.module.scss';
import CustomizedModal from "../../components/modal/Modal";
import { useTitle } from "../../context";
import FormikInitialValues from "../../utils/constants/formikInitialValues";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import AddressModal from "../../components/address-modal/AddressModal";
import NoData from "../../components/no-data/NoData";
import { Toastify } from "../../utils";

export default function SpotWallets() {
  document.title = "ارز تو ارز | کیف پول‌ ها";
  const { title, setTitle } = useTitle();
  const [currentPage, setCurrentPage] = useState(1);
  const [walletList, setWalletList] = useState([]);
  const [walletCount, setWalletCount] = useState(0);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const status = [
    { _id: "true", title: "فعال" },
    { _id: "false", title: "غیر فعال " },
  ];
  useEffect(() => {
    setTitle("کیف پول‌ ها");
  }, [])

  useEffect(() => {
    getData()
  }, [currentPage])

  const getData = async () => {
    let params = {
      pageNumber: currentPage,
      perPage: 10
    }
    try {
      const { data, status } = await walletServices.list(params)
      if (status === 200 && data.success) {

        setWalletList(data.data.result);
        setWalletCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }


  const searchWallets = async (vals) => {
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
      const { data, status } = await walletServices.list(body)
      if (status === 200 && data.success) {
        setWalletList(data.data.result);
        setWalletCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }
  const handleChangeWalletStatus = async (walletId) => {
    try {
      const { data, status } = await walletServices.changeStatus(walletId)
      if (status === 200 && data.success) {
        Toastify.success(data.message)
        getData()
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
      <AddressModal data={address}
        show={showAddress}
        onHide={() => setShowAddress(false)}
      />
      <Formik
        initialValues={FormikInitialValues.spotWallets}
        onSubmit={searchWallets}
      >
        {({ isValid, dirty, resetForm }) => (
          <Form className="row justify-content-start align-items-end">

            <Col lg={8} className="mb-4">
              <div className="main-title">
                <h1 className="is-size-5 mb-2">لیست کیف پول‌‌ها</h1>
                <p className="is-size-7 gainsboro mb-0">در این بخش شما می‌توانید اطلاعات تمامی کاربران سایت را ببینید، کاربر مورد نظر خود را جستجو کرده و در صورت لزوم آن را ویرایش کنید.</p>
              </div>
            </Col>
            <Col lg={4} className="mb-4">
              <div className="d-flex justify-content-end">
                <CustomizedButton
                  onClick={() => {
                    resetForm(FormikInitialValues.spotWallets)
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
            <Col sm={4} className="mb-3">
              <FastField
                name="currency"
                placeholder="مثال : BTC , bitcoin , بیت کوین"
                label=" ارز"
                as={CustomizedInput}
              />
            </Col>
            <Col sm={4} className="mb-3">
              <FastField
                name="customerEmail"
                placeholder="sample@gmail.com"
                label=" ایمیل "
                as={CustomizedInput}
              />
            </Col>


            {/* <Col sm={4} className="mb-3">
              <FastField
                name="isActive"
                label=" وضعیت"
                options={status}
                as={CustomizedSelect}
              />
            </Col> */}
          </Form>
        )}
      </Formik>

      <div>
        <CustomizedTable
          header={
            <>
              <th>ارز </th>
              <th className="text-center">موجودی </th>
              <th className="text-center">موجودی قابل استفاده </th>
              <th className="text-center">ایمیل</th>
              {/* <th className="text-center">وضعیت</th> */}
              <th className="text-center">عملیات</th>
            </>
          }
          totalRecords={walletCount}
          pageLimit={10}
          handleChangePage={(page) => setCurrentPage(page)}
        >
          {
            walletList.length ?
              walletList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {item.symbol}
                    </td>
                    <td className="text-center">
                      {/* {item.balance ? item.balance : "__"} */}
                      {math.fix(item.balance || 0, 8)}
                    </td>
                    <td className="text-center">
                      {item.available ? item.balance : "__"}
                    </td>
                    <td className="text-center">
                      {item.customer?.email}
                    </td>
                    {/* <td className="text-center">
                      <CustomizedSwitch
                        handleChange={() => handleChangeWalletStatus(item._id)}
                        checked={item.isActive}
                      />
                    </td> */}

                    <td className="text-center">
                      {
                        item.addresses?.length ?
                          <span
                            onClick={() => {
                              setAddress(item.addresses)
                              setShowAddress(true)
                            }
                            }
                            className="text-lightBlue yekan-Bold pointer"
                          >
                            <HiOutlineQrcode size={22} />
                          </span>
                          :
                          "__"
                      }
                    </td>
                  </tr>
                );
              })
              :
              <tr>
                <td colSpan="6">
                  <NoData />
                </td>
              </tr>

          }
        </CustomizedTable>
      </div>
    </div>
  );
}
