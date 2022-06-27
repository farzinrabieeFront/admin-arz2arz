import react, { useEffect, useState } from "react";
import {
  RiShieldUserLine, RiExchangeFundsLine, RiUserReceived2Line, FiChevronLeft,
  HiOutlineUsers,
  AiFillStar,
  AiOutlineTransaction, BsCreditCard, RiWechatLine
} from 'react-icons/all';
import { toast } from "react-toastify";
import * as math from 'mathjs';
import { Row, Col } from "react-bootstrap";

import CustomizedBadge from "../../components/badge/Badge";
import CustomizedTable from "../../components/table/Table";
import { orderServices } from "../../services";
import Styles from "./DashBoard.module.scss"
import DateConvert from '../../utils/date';
import { useTitle, useWebsocket } from "../../context";
import MiniLoading from "../../components/loading/miniLoading/MiniLoading";
import PieChartComp from "../../components/pie-chart/PieChart";
import ApexChart from '../../components/apex-chart/ApexCharts';


const DashBoardPage = () => {
  document.title = " ارز تو ارز | داشبورد";
  const { setTitle } = useTitle();
  const { allSpotOrders, allOpenOrders, allUsers, onlineUsers, dailyOrders, lastFiatOrders = [] } = useWebsocket();
  const [liveOpenOrders, setLiveOpenOrders] = useState([]);
  const [spotOrders, setSpotOrders] = useState([]);
  const [fiatOrders, setFiatOrders] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [dailyOrdersCount, setDailyOrdersCount] = useState(0);
  const [fiatAmount, setFiatAmount] = useState(75);
  const [spotAmount, setSpotAmount] = useState(20);

  useEffect(() => {
    setTitle(" ");
  }, [])

  useEffect(() => {
    setLiveOpenOrders(allOpenOrders)
  }, [allOpenOrders]);

  useEffect(() => {
    setSpotOrders(allSpotOrders)
  }, [allSpotOrders]);

  useEffect(() => {
    setFiatOrders(lastFiatOrders);
  }, [lastFiatOrders]);


  useEffect(() => {
    setUsersCount(allUsers)
  }, [allUsers]);

  useEffect(() => {
    setOnlineUsersCount(onlineUsers)
  }, [onlineUsers]);

  useEffect(() => {
    setDailyOrdersCount(dailyOrders)
  }, [dailyOrders]);



  return (
    <div className={`${Styles.container} mt-4`}>
      <div className={`${Styles.gridItems} ${Styles.spotWallet}`}>
        <div className="center-content flex-column p-3 border-radius-md card-shadow bg-white h-100">

          <div className={Styles.rialChart}>
            <PieChartComp
              data={[spotAmount]}
              colors={[spotAmount < 25 ? '#ff305b' :
                spotAmount < 50 ? "#ff9130" :
                  spotAmount < 75 ? "#ffd230"
                    : '#00c56e']}
              labels={["موجودی تتر"]}
            />
          </div>
          <div className="mt-2 w-100 d-flex flex-column">
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center is-size-6">
                <span className="ml-1 text-purple"><AiFillStar size={20} /></span>
                <span className="is-size-6 roboto-Bold">BTC</span>
              </span>
              <span className="roboto-Bold text-purple is-size-6">0.2655348</span>
            </div>
            <div className="mb-3 d-flex  justify-content-between align-items-center">
              <span className="d-flex align-items-center is-size-6">
                <span className="ml-1 link"><AiFillStar size={20} /></span>
                <span className="is-size-6 roboto-Bold">XRP</span>
              </span>
              <span className="roboto-Bold link is-size-6">0.10560</span>
            </div>
            <div className=" d-flex justify-content-between align-items-center">
              <span className="d-flex align-items-center is-size-6">
                <span className="ml-1 text-lightBlue"><AiFillStar size={20} /></span>
                <span className="is-size-6 roboto-Bold">ETH</span>
              </span>

              <span className="roboto-Bold text-lightBlue is-size-6">0.0158715</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.profits}`}>
        <div className="center-content flex-column p-3 border-radius-md card-shadow bg-white h-100">
        <div className={`${Styles.profitsChart} profitsChart position-relative w-100 h-100`}>
          <ApexChart />
        </div>
      </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.usdtPrice}`}><div className="center-content flex-column p-3 border-radius-md card-shadow bg-white h-100">قیمت خرید و فروش تتر</div></div>
      <div className={`${Styles.gridItems} ${Styles.fiatWallet}`}>
        <div className="d-flex flex-column p-3 border-radius-md card-shadow bg-white h-100 ">


          <div className={Styles.rialChart}>
            <PieChartComp
              data={[fiatAmount]}
              colors={[fiatAmount < 25 ? '#ff305b' :
                fiatAmount < 50 ? "#ff9130" :
                  fiatAmount < 75 ? "#ffd230"
                    : '#00c56e']}
              labels={["موجودی تومانی"]}
            />
          </div>
         

        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.usersCount}`}>
        <div className="center-content flex-column p-3 border-radius-md card-shadow bg-white h-100">
          <span className="is-size-6 yekan-Bold mb-2">تعداد کاربران</span>
          <span className="roboto-Black text-mediumBlue is-size-4 d-flex align-items-center flex-row-reverse"><HiOutlineUsers size={20} className="mr-1" />{new Number(usersCount).toLocaleString()}</span>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.onlineUsersCount}`}>
        <div className="center-content flex-column p-3 border-radius-md card-shadow bg-white h-100">
          <span className="is-size-6 yekan-Bold mb-2">کاربران آنلاین</span>
          <span className="roboto-Black text-success is-size-4 d-flex align-items-center flex-row-reverse"><RiUserReceived2Line size={20} className="mr-1" />{new Number(onlineUsersCount).toLocaleString()}</span>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.dailyOrdersCount}`}>
        <div className="center-content flex-column p-3 border-radius-md card-shadow bg-white h-100">
          <span className="is-size-6 yekan-Bold mb-2">سفارشات روزانه</span>
          <span className="roboto-Black text-purple is-size-4 d-flex align-items-center flex-row-reverse"><RiExchangeFundsLine size={20} className="mr-1" /> {new Number(dailyOrdersCount).toLocaleString()}</span>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.withdrawCount}`}>
        <div className="center-content flex-column p-3 border-radius-md card-shadow bg-white h-100">
          <span className="is-size-6 yekan-Bold mb-2"> برداشت تومانی</span>
          <span className="roboto-Black text-danger is-size-4 d-flex align-items-center flex-row-reverse"><AiOutlineTransaction size={20} className="mr-1" /> 20</span>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.identityCount}`}>
        <div className="center-content flex-column p-3 border-radius-md card-shadow bg-white">
          <span className="is-size-6 yekan-Bold mb-2"> احراز هویت</span>
          <span className="roboto-Black text-orange is-size-4 d-flex align-items-center flex-row-reverse"><RiShieldUserLine size={20} className="mr-1" /> 65</span>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.bankAccountCount}`}>
        <div className="center-content flex-column p-3 border-radius-md card-shadow bg-white">
          <span className="is-size-6 yekan-Bold mb-2"> کارت‌های بانکی</span>
          <span className="roboto-Black text-success is-size-4 d-flex align-items-center flex-row-reverse"><BsCreditCard size={20} className="mr-1" /> 126</span>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.ticketCount}`}>
        <div className="center-content flex-column p-3 border-radius-md card-shadow bg-white">
          <span className="is-size-6 yekan-Bold mb-2"> تیکت‌های خوانده نشده</span>
          <span className="roboto-Black text-lightBlue is-size-4 d-flex align-items-center flex-row-reverse"><RiWechatLine size={20} className="mr-1" /> 12</span>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.marketOrders}`}>
        <div className="p-3 border-radius-md card-shadow bg-white h-100">
          <div className="mb-2 d-flex align-items-center justify-content-between">
            <h1 className="is-size-7 mb-0"> معاملات تبدیل</h1>
            <span><FiChevronLeft /></span>
          </div>
          <div>
            <CustomizedTable
              header={
                <>
                  <th><span className="is-size-8">جفت ارز</span></th>
                  <th className="text-center"><span className="is-size-8">نوع سفارش</span></th>
                  <th className="text-center"><span className="is-size-8">مقدار پرداختی</span></th>
                  <th className="text-center"><span className="is-size-8">قیمت اولیه</span></th>
                </>
              }
              totalRecords={8}
              pageLimit={6}
            >
              {spotOrders.map((item, index) => {
                return (
                  <tr key={index}>
                    <td><span className="is-size-8">{item.pairedSymbol}</span></td>
                    <td className="text-center">
                      {item.side === "BUY" ? (
                        <CustomizedBadge pill className="no-min-width is-size-8" variant="success">
                          خرید
                        </CustomizedBadge>
                      )
                        :
                        (
                          <CustomizedBadge pill className="no-min-width is-size-8" variant="danger">
                            فروش
                          </CustomizedBadge>
                        )}
                    </td>
                    <td className="text-center"><span className="is-size-8">{item.baseAmount}</span></td>
                    <td className="text-center"><span className="is-size-8">{math.fix(item.firstPrice ? item.firstPrice : 0, 8)}</span></td>
                  </tr>
                );
              })}
            </CustomizedTable>
          </div>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.limitOrders}`}>
        <div className="p-3 border-radius-md card-shadow bg-white h-100">
          <div className="mb-2 d-flex align-items-center justify-content-between">
            <h1 className="is-size-7 mb-0"> معاملات باز</h1>
            <span><FiChevronLeft /></span>
          </div>
          <div>
            <CustomizedTable
              header={
                <>
                  <th><span className="is-size-8">جفت ارز</span></th>
                  <th className="text-center"><span className="is-size-8">نوع سفارش</span></th>
                  <th className="text-center"><span className="is-size-8">مقدار پرداختی</span></th>
                  <th className="text-center"><span className="is-size-8">قیمت اولیه</span></th>
                </>
              }
              totalRecords={8}
              pageLimit={6}
            >
              {liveOpenOrders.map((item, index) => {
                return (
                  <tr key={index}>
                    <td><span className="is-size-8">{item.pairedSymbol}</span></td>
                    <td className="text-center">
                      {item.side === "BUY" ? (
                        <CustomizedBadge pill className="no-min-width is-size-8" variant="success">
                          خرید
                        </CustomizedBadge>
                      )
                        :
                        (
                          <CustomizedBadge pill className="no-min-width is-size-8" variant="danger">
                            فروش
                          </CustomizedBadge>
                        )}
                    </td>
                    <td className="text-center"><span className="is-size-8">{item.baseAmount}</span></td>
                    <td className="text-center"><span className="is-size-8">{math.fix(item.firstPrice ? item.firstPrice : 0, 8)}</span></td>
                  </tr>
                );
              })}
            </CustomizedTable>
          </div>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.fiatOrders}`}>
        <div className="p-3 border-radius-md card-shadow bg-white h-100">
          <div className="mb-2 d-flex align-items-center justify-content-between">
            <h1 className="is-size-7 mb-0"> معاملات خرید و فروش</h1>
            <span><FiChevronLeft /></span>
          </div>
          <div>
            <CustomizedTable
              header={
                <>
                  <th><span className="is-size-8">ارز</span></th>
                  <th className="text-center"><span className="is-size-8">نوع </span></th>
                  <th className="text-center"><span className="is-size-8">مقدار پرداختی</span></th>
                  <th className="text-center"><span className="is-size-8">قیمت دلار</span></th>
                </>
              }
              totalRecords={8}
              pageLimit={8}
            // handleChangePage={(page) => setCurrentPage(page)}
            >
              {fiatOrders.map((item, index) => {
                return (
                  <tr key={index}>
                    <td><span className="is-size-8">{item.spotAsset}</span></td>

                    <td className="text-center">
                      {item.side === "BUY" ?
                        <span className="is-size-8 text-success">خرید</span>
                        :
                        <span className="is-size-8 lightRed">فروش</span>
                      }
                    </td>
                    <td className="text-center"><span className="is-size-8">{new Number(item.baseAmount ? item.baseAmount : 0).toLocaleString()}</span></td>

                    <td className="text-center">
                      <span className="is-size-8">  {new Number(item.usdPrice ? item.usdPrice : 0).toLocaleString()} </span>
                    </td>
                  </tr>
                );
              })}
            </CustomizedTable>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashBoardPage;
