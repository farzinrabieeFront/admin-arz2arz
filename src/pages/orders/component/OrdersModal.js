import React, { useEffect, useState } from 'react'
import { IoCloseSharp, HiOutlineMail } from 'react-icons/all';
import * as math from 'mathjs';

import CustomizedBadge from '../../../components/badge/Badge';
import CustomizedModal from '../../../components/modal/Modal';
import { orderServices } from '../../../services';
import Styles from './OrdersModal.module.scss';
import DateConvert from '../../../utils/date';
import NoData from '../../../components/no-data/NoData';
import CustomizedButton from '../../../components/form/button/Button';
import { Toastify } from '../../../utils';


const OrdersModal = ({ type, marketId, zone, handleClose, show }) => {


    const [data, setData] = useState()

    useEffect(() => {
        if (zone === "FIAT") {
            getFiatData()
        } else {
            getData()
        }
    }, [])

    const getFiatData = async () => {
        try {
            let params = {
                marketId,
            }
            const { data, status } = await orderServices.fiat.get(params)
            if (status === 200 && data.success) {
                setData(data.data.result[0]);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    const getData = async () => {
        try {
            let params = {
                marketId,
                zone,
            }
            if (type) {
                params = {
                    ...params,
                    type
                }
            }
            const { data, status } = await orderServices.get(params)
            if (status === 200 && data.success) {
                setData(data.data.result[0]);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }
    return (
        <div>
            {/* {data ? */}
            <CustomizedModal
                show={show}
                size="lg"
            >
                {data ?
                    zone === "FIAT" ?
                        <>
                            <div className={`${Styles.header} d-flex justify-content-between align-items-center text-gainsboro mb-3 pb-3`}>
                                <span className="d-flex align-items-center"><HiOutlineMail size="20" className="ml-2" />
                                    {data.customer?.email}
                                </span>
                                <span onClick={handleClose} className="pointer"><IoCloseSharp size="20" /></span>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3"><span className="is-size-6">اطلاعات معامله</span></div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">spotAsset</span>
                                    <span className="is-size-7 text-dark text-dark">{data.spotAsset}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">baseAmount</span>
                                    <span className="is-size-7 text-dark">{data.baseAmount}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">status</span>
                                    <span className="is-size-7 text-dark">{data.status}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">date</span>
                                    <span className="is-size-7 text-dark">
                                        {DateConvert.getTime(data.createdAt)}
                                        <span className="mx-1 text-gainsboro">|</span>
                                        {DateConvert.toShamsiDate(data.createdAt)}
                                    </span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">price</span>
                                    <span className="is-size-7 text-dark">{data.price}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">marketId</span>
                                    <span className="is-size-7 text-dark">{data.marketId}</span>
                                </div>

                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">pairedSymbol</span>
                                    <span className="is-size-7 text-dark">{data.pairedSymbol}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">quoteAmount</span>
                                    <span className="is-size-7 text-dark">{data.quoteAmount}</span>
                                </div>

                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">usdPrice</span>
                                    <span className="is-size-7 text-dark">{data.usdPrice}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">side</span>
                                    <span className="is-size-7 text-dark">{data.side}</span>
                                </div>

                            </div>
                            {
                                data.spotOrder ?
                                    <div className="row mt-3">
                                        <div className="col-12 mb-3"><span className="is-size-6">اطلاعات ارزی معامله</span></div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">requestedAmount</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.requestedAmount?math.fix(data.spotOrder?.requestedAmount, 8):''} </span>
                                        </div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">baseAmount</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.baseAmount}</span>
                                        </div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">baseAsset</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.baseAsset}</span>
                                        </div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">status</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.status}</span>
                                        </div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">firstPrice</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.firstPrice}</span>
                                        </div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">orderId</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.orderId}</span>
                                        </div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">pairedSymbol</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.pairedSymbol}</span>
                                        </div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">quoteAmount</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.quoteAmount}</span>
                                        </div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">quoteAsset</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.quoteAsset}</span>
                                        </div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">finalPrice</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.finalPrice}</span>
                                        </div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">type</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.type}</span>
                                        </div>
                                        <div className="col-3 mb-3 d-flex flex-column">
                                            <span className="is-size-8 text-gainsboro mb-2">zone</span>
                                            <span className="is-size-7 text-dark">{data.spotOrder?.zone}</span>
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            <div className="row mt-3">
                                <div className="col-12 mb-3"><span className="is-size-6">پاسخ بایننس</span></div>
                                <div className="col-12 mb-3">
                                    {
                                        data.spotOrder?.binanceRes?.length > 0 ?
                                            data.spotOrder?.binanceRes?.map((item, index) => {
                                                return (
                                                    <div className="row mt-3" key={index}>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">applyTime</span>
                                                            <span className="is-size-7 text-dark">
                                                                {DateConvert.getTime(data.applyTime)}
                                                                <span className="mx-1 text-gainsboro">|</span>
                                                                {DateConvert.toShamsiDate(data.applyTime)}
                                                            </span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">baseAmount</span>
                                                            <span className="is-size-7 text-dark">{item.baseAmount}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">binCommission</span>
                                                            <span className="is-size-7 text-dark">{item.binCommission}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">binPrice</span>
                                                            <span className="is-size-7 text-dark">{item.binPrice}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">commissionAsset</span>
                                                            <span className="is-size-7 text-dark">{item.commissionAsset}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">createdAt</span>
                                                            <span className="is-size-7 text-dark">
                                                                {DateConvert.getTime(data.createdAt)}
                                                                <span className="mx-1 text-gainsboro">|</span>
                                                                {DateConvert.toShamsiDate(data.createdAt)}
                                                            </span>
                                                        </div>

                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">orderId</span>
                                                            <span className="is-size-7 text-dark">{item.orderId}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">quoteAmount</span>
                                                            <span className="is-size-7 text-dark">{item.quoteAmount}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">tradeId</span>
                                                            <span className="is-size-7 text-dark">{item.tradeId}</span>
                                                        </div>
                                                        <div className="col-12 mb-3 border-bottom"></div>
                                                    </div>
                                                )
                                            })
                                            : null
                                    }
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className={`${Styles.header} d-flex justify-content-between align-items-center text-gainsboro mb-3 pb-3`}>
                                <span className="d-flex align-items-center"><HiOutlineMail size="20" className="ml-2" />
                                    {data.customer?.email}
                                </span>
                                <span onClick={handleClose} className="pointer"><IoCloseSharp size="20" /></span>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3"><span className="is-size-6">اطلاعات معامله</span></div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">baseAsset</span>
                                    <span className="is-size-7 text-dark text-dark">{data.baseAsset}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">quoteAsset</span>
                                    <span className="is-size-7 text-dark text-dark">{data.quoteAsset}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">requestedAmount</span>
                                    <span className="is-size-7 text-dark text-dark">{data.requestedAmount}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">baseAmount</span>
                                    <span className="is-size-7 text-dark">{data.baseAmount}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">status</span>
                                    <span className="is-size-7 text-dark">{data.status}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">createdAt</span>
                                    <span className="is-size-7 text-dark">{DateConvert.toShamsiDate(data.createdAt)}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">firstPrice</span>
                                    <span className="is-size-7 text-dark">{data.firstPrice}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">marketId</span>
                                    <span className="is-size-7 text-dark">{data.marketId}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">orderId</span>
                                    <span className="is-size-7 text-dark">{data.orderId}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">pairedSymbol</span>
                                    <span className="is-size-7 text-dark">{data.pairedSymbol}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">quoteAmount</span>
                                    <span className="is-size-7 text-dark">{data.quoteAmount}</span>
                                </div>

                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">finalPrice</span>
                                    <span className="is-size-7 text-dark">{data.finalPrice}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">side</span>
                                    <span className="is-size-7 text-dark">{data.side}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">type</span>
                                    <span className="is-size-7 text-dark">{data.type}</span>
                                </div>
                                <div className="col-3 mb-3 d-flex flex-column">
                                    <span className="is-size-8 text-gainsboro mb-2">zone</span>
                                    <span className="is-size-7 text-dark">{data.zone}</span>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 mb-3"><span className="is-size-6">پاسخ بایننس</span></div>
                                <div className="col-12 mb-3">
                                    {
                                        data.binanceRes?.length > 0 ?
                                            data.binanceRes?.map((item, index) => {
                                                return (
                                                    <div className="row mt-3" key={index}>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">applyTime</span>
                                                            <span className="is-size-7 text-dark">
                                                                {DateConvert.getTime(data.applyTime)}
                                                                <span className="mx-1 text-gainsboro">|</span>
                                                                {DateConvert.toShamsiDate(data.applyTime)}
                                                            </span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">baseAmount</span>
                                                            <span className="is-size-7 text-dark">{item.baseAmount}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">binCommission</span>
                                                            <span className="is-size-7 text-dark">{item.binCommission}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">binPrice</span>
                                                            <span className="is-size-7 text-dark">{item.binPrice}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">commissionAsset</span>
                                                            <span className="is-size-7 text-dark">{item.commissionAsset}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">createdAt</span>
                                                            <span className="is-size-7 text-dark">
                                                                {DateConvert.getTime(data.createdAt)}
                                                                <span className="mx-1 text-gainsboro">|</span>
                                                                {DateConvert.toShamsiDate(data.createdAt)}
                                                            </span>
                                                        </div>

                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">orderId</span>
                                                            <span className="is-size-7 text-dark">{item.orderId}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">quoteAmount</span>
                                                            <span className="is-size-7 text-dark">{item.quoteAmount}</span>
                                                        </div>
                                                        <div className="col-3 mb-3 d-flex flex-column">
                                                            <span className="is-size-8 text-gainsboro mb-2">tradeId</span>
                                                            <span className="is-size-7 text-dark">{item.tradeId}</span>
                                                        </div>
                                                        <div className="col-12 mb-3 border-bottom"></div>
                                                    </div>
                                                )
                                            })
                                            : null
                                    }
                                    {/* {data.binanceRes[0]} */}
                                </div>
                            </div>
                        </>
                    :
                    <div className="center-content flex-column">
                        <NoData />
                        <CustomizedButton variant="lightBlue" onClick={handleClose}>تایید</CustomizedButton>
                    </div>
                }
            </CustomizedModal>
        </div>
    )
}

export default OrdersModal
