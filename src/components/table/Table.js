import { useEffect } from "react";
import { Table } from "react-bootstrap";
import Styles from "./Table.module.scss";
import Pagination from "../pagination/Pagination";
import { useTheme } from "../../context";

export default function CustomizedTable({
    header: Header,
    children,
    className,
    isPaiginate = false,
    totalRecords,
    pageLimit,
    handleChangePage,
    pageNeighbours = 2,
    marginPagesDisplayed,
}) {
    const { theme } = useTheme()
    return (
        <div className={`${Styles.customizeTable} ${Styles[theme]}`}>
            <div >
                <Table responsive className={`m-0 ${className}`}>
                    <thead>
                        <tr className="">{Header}</tr>
                    </thead>
                    <tbody>{children}</tbody>
                </Table>
            </div>
            {handleChangePage
                ?
                <div className={`${Styles.dataPart} d-flex justify-content-between align-items-center py-3`}>
                    {/* {isPaiginate && totalRecords > pageLimit ? ( */}
                    <div className="col-12 p-0 mt-3">
                        <Pagination
                            totalRecords={totalRecords}
                            pageLimit={pageLimit}
                            handleChangePage={handleChangePage}
                            pageNeighbours={pageNeighbours}
                            marginPagesDisplayed={marginPagesDisplayed}
                            inputPage
                        />
                    </div>
                </div>
                :
                null
            }

        </div>
    )
}
