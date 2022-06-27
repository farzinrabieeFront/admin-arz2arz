import { useEffect, useRef, useState } from "react";
import { sessionServices } from "../../../services";
import CustomizedTable from "../../../components/table/Table";
import { Toastify } from "../../../utils";
import DeleteConfirmationModal from "../../../components/delete-modal/DeleteConfirmation";
import { RiDeleteBin5Line } from "react-icons/all";
import NoData from "../../../components/no-data/NoData";
import DateConvert from "../../../utils/date";
import CustomizedBadge from "../../../components/badge/Badge";

const AdminSession = ({ id }) => {
  // const [roleConfirmDelete, setRoleConfirmDelete] = useState(0);
  const [deleteSession, setDeleteSession] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionList, setSessionList] = useState([]);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    getList();
  }, [currentPage]);

  const getList = async () => {
    try {
      let params = {
        pageNumber: currentPage,
        perPage: 10,
      };
      const { data, status } = await sessionServices.single(id, params);
      if (status === 200 && data.success) {
        setSessionList(data.data.result);
        setSessionCount(data.data.count);
      }
    } catch (error) {
      Toastify.error(error.message);
    }
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
    <>
      <DeleteConfirmationModal
        show={Boolean(deleteSession)}
        title="نشست"
        onHide={() => setDeleteSession(0)}
        onConfirm={() => handleDeleteSession(deleteSession)}
      />
      <CustomizedTable
        header={
          <>
            <th>آدرس IP </th>
            <th className="text-center">تاریخ ورود </th>
            <th className="text-center">وضعیت</th>
            <th className="text-center">حذف</th>
          </>
        }
        totalRecords={sessionCount}
        pageLimit={10}
        handleChangePage={(page) => setCurrentPage(page)}
      >
        {sessionList.length ? (
          sessionList.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.ip.slice(7)}</td>
                {/* <td>{item.ip.uaP(7)}</td> */}
                <td className="text-center">
                  {DateConvert.getTime(item.createdAt)}
                  <span className="mx-1 text-gainsboro">|</span>
                  {DateConvert.toShamsiDate(item.createdAt)}
                </td>
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
                      className="text-danger pointer center-content"
                      onClick={() => setDeleteSession(item._id)}
                    >
                      <RiDeleteBin5Line size="20" className="pl-1" />
                    </span>
                  )}
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

export default AdminSession;
