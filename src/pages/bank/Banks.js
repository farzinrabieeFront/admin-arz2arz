import { useState, useEffect } from "react";

import { FastField } from "formik";
import { bankServices } from "../../services";
import { Col, Row } from "react-bootstrap";

import {
  AiOutlineBank,
  BiEdit,
  RiDeleteBin5Line,
  VscCloudUpload,
} from "react-icons/all";
import CustomizedTable from "../../components/table/Table";
import CustomizedButton from "../../components/form/button/Button";
import CustomizedInput from "../../components/form/input/Input";
import CustomizedUploadIcon from "../../components/form/upload-icon/CustomizedUploadIcon";
import NoData from "../../components/no-data/NoData";
import DeleteConfirmationModal from "../../components/delete-modal/DeleteConfirmation";
import FormikConfirmationModal from "../../components/formik-modal/FormikConfirmationModal";
import { Field } from "formik";
import { Toastify } from "../../utils";
import Styles from "./Banks.module.scss";
import banksValidator from "../../utils/validators/banksValidator";

const Banks = () => {
  document.title = "ارز تو ارز | مدیریت بانک ها";

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [banksCount, setBanksCounts] = useState(0);
  const [banksList, setBanksList] = useState([]);
  const [activeConfirmDelete, setActiveConfirmDelete] = useState(0);
  const [activeUpdate, setActiveUpdate] = useState(0);
  const [activeCreate, setActiveCreate] = useState(0);
  const [currentData, setCurrentData] = useState({});
  const [bankImage, setBankImage] = useState();

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    console.log(currentPage);
    getList();
  }, [currentPage]);

  // get bank list
  const getList = async () => {
    try {
      setIsLoading(true);
      let params = {
        pageNumber: currentPage,
        perPage: 10,
        // ...body
      };
      const { data, status } = await bankServices.list(params);
      if (status === 200 && data.success) {
        setBanksList(data.data.result);
        setBanksCounts(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.invalidFields[0].msg);
    } finally {
      setIsLoading(false);
    }
  };

  // delete bank item
  const deleteBankItem = async (id) => {
    try {
      const { data, status } = await bankServices.delete(id);
      if (status === 200 && data.success) {
        Toastify.success(data.message);
        setActiveConfirmDelete();
        getList();
      }
    } catch (error) {
      Toastify.error(error.invalidFields[0].msg);
    }
  };

  // update category item
  const updateBankItem = async (vals) => {
    console.log(vals);
    try {
      let formData = new FormData();
      if (vals.title || vals.hardNumber) {
        formData.append("name", vals.title);
        formData.append("hardNumber", vals.hardNumber);
      }
      if (vals.hardNumber) {
        formData.append("hardNumber", vals.hardNumber);
      }
      if (bankImage) {
        formData.append("logo", bankImage);
      }
      const { data, status } = await bankServices.update(
        currentData._id,
        formData
      );
      if (status === 200 && data.success) {
        Toastify.success(data.message);
        setActiveUpdate();
        setCurrentData({ logo: "" });
        getList();
      }
    } catch (error) {
      Toastify.error(error.invalidFields[0].msg);
    }
  };

  //   get single
  const getData = async (id) => {
    try {
      const { data, status } = await bankServices.single(id);
      if (status === 200 && data.success) {
        setCurrentData(data.data);
      }
    } catch (error) {
      Toastify.error(error.invalidFields[0].msg);
    }
  };

  // create bank item
  const createBankItem = async (vals) => {
    // console.log(vals);
    try {
      let formData = new FormData();
      if (vals.title || vals.hardNumber) {
        formData.append("name", vals.title);
        formData.append("hardNumber", vals.hardNumber);
      }
      if (vals.hardNumber) {
        formData.append("hardNumber", vals.hardNumber);
      }
      if (bankImage) {
        formData.append("logo", bankImage);
      }
      const { data, status } = await bankServices.create(formData);
      if (status === 201 && data.success) {
        Toastify.success(data.message);
        setActiveCreate();
        setCurrentData({});
        setBankImage();
        getList();
      }
    } catch (error) {
      Toastify.error(error.invalidFields[0].msg);
    }
  };

  return (
    <div className="mt-4 p-4 border-radius-lg card-shadow bg-white">
      {/* delete confrim modal */}
      <DeleteConfirmationModal
        show={Boolean(activeConfirmDelete)}
        title="بانک"
        onHide={() => setActiveConfirmDelete(0)}
        onConfirm={() => deleteBankItem(activeConfirmDelete)}
      />

      {/* update form modal */}
      <FormikConfirmationModal
        show={activeUpdate}
        title="ویرایش بانک"
        Icon={<BiEdit size={25} className="ml-2 text-danger" />}
        onHide={() => {
          setActiveUpdate();
          setCurrentData({});
          setBankImage();
        }}
        initialValues={{
          title: activeUpdate?.name || "",
          hardNumber: activeUpdate?.hardNumber || "",
        }}
        onSubmit={updateBankItem}
        enableReinitialize={true}
        validationSchema={banksValidator.bank}
      >
        <Row className="px-5 d-flex justify-content-between align-items-center">
          <Col lg={4} className="d-flex justify-content-center">
            <Field
              name="icon"
              icon={<VscCloudUpload size="70" />}
              imageSrc={
                currentData
                  ? `http://194.5.192.82:4000/api/v1/bankLogo/images/${currentData.logo}`
                  : null
              }
              data={bankImage}
              handleSetFiles={(e) => setBankImage(e.target.files[0])}
              handleDeleteFiles={() => setBankImage()}
              as={CustomizedUploadIcon}
              className="rounded shadow-lg"
            />
          </Col>
          <Col lg={8}>
            <FastField
              name="title"
              light
              className="mb-3 "
              label="نام بانک"
              as={CustomizedInput}
            />
            <FastField
              name="hardNumber"
              light
              label="پیش شماره بانک"
              as={CustomizedInput}
            />
          </Col>
        </Row>
      </FormikConfirmationModal>

      {/* create form modal */}
      <FormikConfirmationModal
        show={activeCreate}
        title="اضافه کردن بانک"
        Icon={<BiEdit size={25} className="ml-2 text-danger" />}
        onHide={() => {
          setActiveCreate();
          setCurrentData({});
          setBankImage();
        }}
        initialValues={{ title: "", hardNumber: "" }}
        onSubmit={createBankItem}
        enableReinitialize={true}
        validationSchema={banksValidator.bank}
      >
        <Row className="px-5 d-flex justify-content-between align-items-center">
          <Col lg={4} className="d-flex justify-content-center">
            <Field
              name="icon"
              icon={<VscCloudUpload size="70" />}
              data={bankImage}
              handleSetFiles={(e) => setBankImage(e.target.files[0])}
              handleDeleteFiles={() => setBankImage()}
              as={CustomizedUploadIcon}
              className="rounded-10 shadow-lg"
            />
          </Col>
          <Col lg={8}>
            <FastField
              name="title"
              light
              placeholder="مثال : بانک ملت"
              className="mb-3 "
              label="نام بانک"
              as={CustomizedInput}
            />
            <FastField
              name="hardNumber"
              light
              placeholder="مثال : 610433"
              label="پیش شماره بانک"
              as={CustomizedInput}
            />
          </Col>
        </Row>
      </FormikConfirmationModal>

      {/* header */}
      <div className="d-flex justify-content-between align-items-center main-title mb-4">
        <div className="d-flex flex-column">
          <h1 className="is-size-5 mb-2">لیست بانک ها</h1>
          <p className="is-size-7 gainsboro mb-0">
            در این بخش شما می‌توانید لیست بانک ها را ببینید .
          </p>
        </div>
        <div>
          <CustomizedButton
            onClick={() => setActiveCreate(true)}
            className="ml-4 is-size-5 yekan-ExtraBold"
            variant="success"
            size="lg"
          >
            بانک جدید
          </CustomizedButton>
        </div>
      </div>

      {/* table */}
      <CustomizedTable
        header={
          <>
            <th></th>
            <th>نام بانک</th>
            <th>پیش شماره</th>
            <th className="text-center">عملیات</th>
          </>
        }
        totalRecords={banksCount}
        pageLimit={10}
        handleChangePage={(page) => setCurrentPage(page)}
      >
        {banksList.length ? (
          banksList.map((item, index) => {
            return (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className={`${Styles.banks} d-flex align-items-center`}>
                    <span className="center-content ml-2">
                      {item.logo ? (
                        <img
                          src={`https://main.arz2arz.net/api/v1/bankLogo/images/${item.logo}`}
                        />
                      ) : (
                        <AiOutlineBank size="30" />
                      )}
                    </span>
                    <span className="is-size-6 fa">{item.name}</span>
                  </div>
                </td>
                <td>{item.hardNumber || "__"}</td>
                <td className="text-center">
                  <span
                    className="d-inline-block p-1 ml-2 rounded-pill badge-success icon-hover pointer"
                    title="ویرایش"
                    onClick={() => {
                      getData(item._id);
                      setActiveUpdate(item);
                    }}
                  >
                    {" "}
                    <BiEdit size="20" />
                  </span>
                  <span
                    className="d-inline-block p-1 mr-2 rounded-pill badge-danger icon-hover pointer"
                    title="حذف"
                    onClick={() => setActiveConfirmDelete(item._id)}
                  >
                    {" "}
                    <RiDeleteBin5Line size="20" />
                  </span>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="7">
              <NoData />
            </td>
          </tr>
        )}
      </CustomizedTable>
    </div>
  );
};

export default Banks;
