import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Styles from './AdminStyles.module.scss';
import { HiOutlineUsers, BiBlock } from 'react-icons/all'
//components 
import adminAvatar from "../../assets/images/man-admin.png";
import { useTitle } from "../../context";
import CustomizedTabs from "../../components/tabs/Tabs";
import CustomizedSwitch from "../../components/form/switch/CustomizedSwitch";
import { adminServices, departmentServices } from "../../services";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import AdminInfo from "./components/Info";
import CreateAdminRole from "./components/CreateRole";
import AdminRoles from "./components/Roles";
import AdminSession from "./components/Session";
import { Toastify } from "../../utils";

export default function EditAdmin() {
  document.title = "ارز تو ارز | ویرایش ادمین‌";
  const history = useHistory();
  const { id } = useParams();
  const { setTitle } = useTitle();
  const [adminDetail, setAdminDetail] = useState({});
  const [activeTab, setActiveTab] = useState();
  const [adminRole, setAdminRole] = useState([]);
  const [department, setDepartment] = useState([]);
  const [adminStatus, setAdminStatus] = useState(false);

  useEffect(() => {
    if (id) {
      getAdminDetails(id)
      getDepartments()
    }
  }, [id])


  useEffect(() => {
    setTitle("مدیریت ادمین‌ها / ویرایش ادمین‌");
    if (history.location.state?.prevUrl?.includes('create-admin')) {
      setActiveTab('ایجاد دسترسی جدید')
    }
  }, []);

  const getAdminDetails = async (id) => {
    try {
      const { data, status } = await adminServices.single(id)
      let { role, updatedAt, createdAt, _id, twoFactorAuthentication, type, ...others } = data.data
      if (status === 200 && data.success) {
        setAdminDetail(others)
        setAdminRole(role)
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  const handleChangeStatus = async (isActive) => {
    let body = {
      isActive
    }
    try {
      const { data, status } = await adminServices.update(id, body)
      if (status === 201 && data.success) {
        Toastify.success(data.message)
        getAdminDetails(id)
        setAdminStatus()
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  const getDepartments = async () => {
    try {
      const { data, status } = await departmentServices.get()
      if (status === 200 && data.success) {
        let dataList = [];
        for (let i in data.data.result) {
          dataList.push({
            _id: data.data.result[i]._id,
            title: data.data.result[i].faName
          })
        }
        setDepartment(dataList)
      }
    } catch (error) {
      Toastify.error(error.message)
    }
  }

  return (
    <div className="mt-3 mt-sm-5 d-flex flex-wrap justify-content-center">
      <ConfirmModal show={adminStatus}
        onHide={() => setAdminStatus()}
        onConfirm={() => handleChangeStatus(!adminDetail.isActive)}
      >
        {
          adminDetail.isActive ?
            <span className="text-gainsboro is-size-6">
              آیا از غیرفعال سازی ادمین
              <span className="px-2 yekan-Bold text-gray-blue is-size-5">{adminDetail?.email}</span>
              اطمینان دارید؟
            </span>
            :
            <span className="text-gainsboro is-size-6">
              آیا از فعال سازی ادمین
              <span className="px-2 yekan-Bold text-gray-blue is-size-5">{adminDetail?.email}</span>
              اطمینان دارید؟
            </span>
        }
      </ConfirmModal>
      <div className={`${Styles.bg} bg-blur shadow col-12`}>
        <div className={`${Styles.titleBlur} pt-4`}><h1 className="is-size-4 yekan-ExtraBold mb-0"><HiOutlineUsers size={22} className="ml-1" /> مدیریت ادمین‌ها</h1></div>
        <div className={`${Styles.info} blur`}>
          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-sm-10 d-flex align-items-center">
              <div className={`${Styles.avatar} ${!adminDetail.isActive ? Styles.notActive : ""} ml-3 col p-0 shadow-sm`}><img src={adminAvatar} /></div>
              <div className="col d-flex flex-column p-0">
                <h2 className="is-size-4 d-flex flex-wrap align-items-center">
                  <span className="p-1 ml-3">{adminDetail.email}</span>
                  {
                    !adminDetail.isActive ?
                      <span className="lightRed p-1 is-size-6 d-flex align-items-center ml-3">
                        ( <BiBlock className="ml-1" size="16" />
                        ادمین غیرفعال می‌باشد )</span>
                      :
                      null
                  }
                </h2>
                <div className="d-flex flex-wrap justify-content-start">
                  <div className={`${Styles.adminRoles} ${Styles.editAdmin} d-flex align-items-center justify-content-start flex-wrap`}>
                    {adminRole?.map((level, index) => {
                      return <span className={`${level.role === "manager" ? Styles.manager : Styles.basic} is-size-8 py-1 px-2 m-1 shadow`} key={index}>
                        {
                          level.role === "manager" ? "مدیر"
                            :
                            level.role === "basic" ? "کارمند"
                              :
                              null
                        }{" "}
                        {level.department?.faName}

                      </span>
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-2 mt-2 mt-sm-0 text-left">
              <CustomizedSwitch
                handleChange={() => setAdminStatus(true)}
                checked={adminDetail?.isActive}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-8 p-0 mt-5">
        <CustomizedTabs
          data={['ویرایش اطلاعات', 'ایجاد دسترسی جدید', 'لیست دسترسی ها', 'نشست‌ها']}
          handleSetTitle={(title) => setActiveTab(title)}
          activeData={activeTab}
        />
      </div>
      <div className="mt-4 col-12 col-lg-8 p-4 border-radius-lg card-shadow bg-white transition-height">
        {
          activeTab === 'ویرایش اطلاعات' ?
            <AdminInfo id={id} reLoad={() => getAdminDetails(id)} adminData={adminDetail} />
            :
            null
        }
        {activeTab === 'ایجاد دسترسی جدید' ?
          <CreateAdminRole id={id} reLoad={() => getAdminDetails(id)} />
          :
          null
        }
        {
          activeTab === 'لیست دسترسی ها' ?
            <AdminRoles id={id} reLoad={() => getAdminDetails(id)} adminRole={adminRole} />
            :
            null
        }
        {
          activeTab === 'نشست‌ها' ?
            <AdminSession id={id} reLoad={() => getAdminDetails(id)} adminRole={adminRole} />
            :
            null
        }
      </div>

    </div>
  );
}
