import React, { useEffect, useState } from 'react';

import { BsCheckLg, IoClose, IoCloseSharp } from 'react-icons/all';
import Styles from './NetworksModal.module.scss';

import CustomizedModal from '../../../../components/modal/Modal';
import NoData from "../../../../components/no-data/NoData";

const NetworksModal = ({ handleClose, show, data = [] }) => {
    const [active, setActive] = useState(0)
    return (
        <div>
            <CustomizedModal
                show={show}
                size="lg"
            >
                <div className={`${Styles.header} d-flex justify-content-between align-items-center text-gainsboro mb-3 pb-3`}>
                    <div className="d-flex align-items-center">
                        <span className="d-flex ">
                            <span className="is-size-5 en yekan-Bold">{data.symbol}</span>
                            <span className="is-size-6 text-gainsboro en mr-2">({data.name})</span>
                        </span>
                    </div>
                    <span onClick={handleClose} className="pointer"><IoCloseSharp size="20" /></span>
                </div>
                <div className="row">
                    <div className="col-12 mb-3"><span className="is-size-6 text-dark">شبکه‌ها (networks)</span></div>
                    <div className={`${Styles.containerNetworks} col-12 pb-3`}>
                        <div className={`${Styles.tabNetworks} d-flex`}>
                            {
                                data?.network?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setActive(index)}
                                            className={`${Styles.bchName} ${index === active ? Styles.active : ""} text-gray-blue shadow ml-3 py-2 px-3 pointer is-size-7 border-radius-md`}
                                        >
                                            {item.blockchain?.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="col-12">
                        {data?.network ?
                            <div className={`${Styles.networks} shadow py-2 px-3 d-flex flex-column border-radius-md`}>
                                <div
                                    className={`py-2 px-3 text-gray-blue is-size-6 d-flex align-items-center`}
                                >
                                    <span className="ml-2">قابلیت برداشت (Whithdraw): </span>
                                    {
                                        data?.network[active]?.withdrawEnable ?
                                            <BsCheckLg className="text-success" />
                                            :
                                            <IoClose className="text-danger" size="23" />
                                    }
                                </div>
                                <div
                                    className={`py-2 px-3 text-gray-blue is-size-6 d-flex align-items-center `}
                                >
                                    <span className="ml-2">قابلیت واریز (Deposit): </span>
                                    {
                                        data?.network[active]?.depositEnable ?
                                            <BsCheckLg className="text-success" />
                                            :
                                            <IoClose className="text-danger" size="23" />
                                    }
                                </div>
                                <div
                                    className={`py-2 px-3 text-gray-blue is-size-6 d-flex align-items-center `}
                                >
                                    <span className="ml-2">حداکثر مقدار برداشتی: </span>
                                    <span className="en">{new Number(data?.network[active]?.withdrawMax).toLocaleString()}</span>
                                </div>
                                <div
                                    className={`py-2 px-3 text-gray-blue is-size-6 d-flex align-items-center `}
                                >
                                    <span className="ml-2">حداقل مقدار برداشتی: </span>
                                    <span className="en">{data?.network[active]?.withdrawMin}</span>
                                </div>
                                <div
                                    className={`py-2 px-3 text-gray-blue is-size-6 d-flex align-items-center `}
                                >
                                    <span className="ml-2">کارمزد شبکه: </span>
                                    <span className="en">{data?.network[active]?.withdrawFee}</span>
                                </div>
                            </div>

                            :
                            <div className="center-content">
                                <NoData />
                            </div>

                        }
                    </div>
                </div>
            </CustomizedModal>
        </div>
    )
}

export default NetworksModal
