import { useState } from "react";
import { roleServices } from "../../../services";
import CustomizedTable from "../../../components/table/Table";
import { Toastify } from "../../../utils";
import DeleteConfirmationModal from "../../../components/delete-modal/DeleteConfirmation";
import { RiDeleteBin5Line } from "react-icons/all";
import NoData from "../../../components/no-data/NoData";

const AdminRoles = ({ id, reLoad, adminRole }) => {
  const [roleConfirmDelete, setRoleConfirmDelete] = useState(0);

  const handleDeleteRole = async (roleID) => {
    try {
      let body = {
        roleID,
        adminID: id,
      };
      const { data, status } = await roleServices.delete(body);
      if (status === 201 && data.success) {
        setRoleConfirmDelete(0);
        Toastify.success(data.message);
        reLoad(id);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  return (
    <>
      <DeleteConfirmationModal
        show={Boolean(roleConfirmDelete)}
        title="دسترسی"
        onHide={() => setRoleConfirmDelete(0)}
        onConfirm={() => handleDeleteRole(roleConfirmDelete)}
      />
      <CustomizedTable
        header={
          <>
            <th>#</th>
            <th>سطح دسترسی</th>
            <th>دپارتمان</th>
            <th>عملیات</th>
          </>
        }
      >
        {adminRole.length ? (
          adminRole.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {item.role === "manager" ? (
                    <span>مدیر </span>
                  ) : item.role === "basic" ? (
                    <span>کارمند </span>
                  ) : null}
                </td>
                <td>{item.department?.faName}</td>
                <td>
                  <span
                    className="link pointer d-flex align-items-center"
                    onClick={() => setRoleConfirmDelete(item._id)}
                  >
                    <RiDeleteBin5Line size="20" className="pl-1" /> حذف
                  </span>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="4">
              <NoData />
            </td>
          </tr>
        )}
      </CustomizedTable>
    </>
  );
};

export default AdminRoles;
