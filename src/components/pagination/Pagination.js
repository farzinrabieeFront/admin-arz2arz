import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Styles from "./Pagination.module.scss";
import { VscChevronRight, VscChevronLeft } from "react-icons/all";
import CustomizedInput from "../form/input/Input";
import { Form } from "react-bootstrap";
const Pagination = ({
  totalRecords = 0,
  pageLimit = 5,
  pageNeighbours = 1,
  handleChangePage,
  marginPagesDisplayed = 1,
  inputPage = false,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPages, setCurrentPages] = useState(1);
  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit));
  }, [totalRecords, pageLimit]);
  useEffect(() => {
    handleChangePage(currentPages)
  }, [currentPages])
  return (
    <div
      className={`${Styles.pagination} border-top-lightGray pt-3 w-100 d-flex justify-content-center justify-content-md-between `}
    >

      <ReactPaginate
        previousLabel={<VscChevronRight className="yekan-Bold" size={22} />}
        nextLabel={<VscChevronLeft className="yekan-Bold" size={22} />}
        breakLabel={"..."}
        pageClassName={"px-1 mx-1 text-center"}
        breakClassName={"break-me mx-3"}
        pageCount={totalPages}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageNeighbours}
        onPageChange={(data) => setCurrentPages(data.selected + 1)}
        // onPageChange={(data)=>handleChangePage(data.selected*pageLimit)}
        containerClassName={`pagination  m-0`}
        subContainerClassName={"pages pagination "}
        activeClassName={`${Styles.active} text-link yekan-ExtraBold is-size-4`}
      />

      <div className={`${Styles.PageInput} pr-3  pr-0 d-flex align-items-center justify-content-end`}>
        {/* <span className="is-size-7 col-6 text-left text-gainsboro pl-3 pr-0">
          صفحه :
        </span> */}
        <Form.Group className={`${Styles.goToPage} p-0 m-0 d-flex align-items-center justify-content-end`}>
          <Form.Control type="number" size="sm"
            className="m-0 col-12 FaNum text-center" placeholder="1" onChange={({ target }) => {
              if (target.value <= totalPages && target.value > 0) {
                setCurrentPages(target.value)
              }
            }} />
        </Form.Group>

      </div>
    </div>
  );
};
export default Pagination;
// fantasy