import React, { useEffect, useState } from 'react'
import { Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import CustomizedTable from '../../../components/table/Table';
import { customerServices } from '../../../services';
import { Toastify } from '../../../utils';
import Styles from "../DetailUser.module.scss";
import { RiCopperCoinLine } from "react-icons/all";
import * as math from 'mathjs';
import CustomizedBadge from '../../../components/badge/Badge';
import CustomizedSwitch from "../../../components/form/switch/CustomizedSwitch";
import AddressModal from '../../../components/address-modal/AddressModal';

const UserWallets = ({ id }) => {
    const [walletsList, setWalletsList] = useState([])
    const [walletsCount, setWalletsCount] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [address, setAddress] = useState([]);
    const [showAddress, setShowAddress] = useState(false);

    useEffect(() => {
        getUserWallets()
    }, [currentPage])

    const getUserWallets = async () => {
        try {
            let params = {
                customer: id,
                pageNumber: currentPage,
                perPage: 10
            }
            const { data, status } = await customerServices.wallets(params);
            if (status === 200 && data.success) {
                // Toastify.success(data.message)
                setWalletsList(data.data.result)
                setWalletsCount(data.data.count)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    const handleChangeWalletStatus = async (walletId) => {
        try {
            let params = {
                customer: id
            }
            const { data, status } = await customerServices.changeWalletStatus(walletId, params)
            if (status === 200 && data.success) {
                Toastify.success(data.message)
                getUserWallets()
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    return (
        <div>
            <AddressModal data={address}
                show={showAddress}
                onHide={() => setShowAddress(false)}
            />

            <Row>
                <Col lg={12} className="mb-4">
                    <h2 className="is-size-5 mb-0 text-lightBlue">کیف پول‌ها</h2>
                </Col>

                <Col lg={12}>
                    <CustomizedTable
                        header={
                            <>
                                <th>ارز </th>
                                <th className="text-center">موجودی </th>
                                <th className="text-center"> فریز شده </th>
                                {/* <th className="text-center">وضعیت</th> */}
                                <th className="text-center">آدرس</th>
                            </>
                        }
                        totalRecords={walletsCount}
                        pageLimit={10}
                        handleChangePage={(page) => setCurrentPage(page)}
                    >
                        {walletsList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {item.symbol}
                                    </td>
                                    <td className="text-center">
                                        {math.fix(item.balance || 0, 8)}
                                    </td>
                                    <td className="text-center">
                                        {item.onOrder || "__"}
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
                                                    className="lightLink yekan-Bold pointer"
                                                >
                                                    آدرس‌ها
                                                </span>
                                                :
                                                "__"
                                        }

                                    </td>

                                </tr>
                            );
                        })}
                    </CustomizedTable>
                </Col>

            </Row>
        </div>
    )
}

export default UserWallets
