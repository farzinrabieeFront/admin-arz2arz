import react, { useEffect, useState } from "react";
import {
  RiShieldUserLine, RiExchangeFundsLine, RiUserFollowLine, FiChevronLeft,
  HiOutlineUsers,
  AiFillStar,
  AiOutlineTransaction, BsCreditCard, RiWechatLine
} from 'react-icons/all';
import * as math from 'mathjs';
import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import BTCicon from "../../assets/images/BTC.png";
import ETHicon from "../../assets/images/ETH.png";
import XRPicon from "../../assets/images/XRP.png";
import USDTicon from "../../assets/images/USDT.png";
import Tethericon from "../../assets/images/Tether_ic.png";
import CustomizedBadge from "../../components/badge/Badge";
import CustomizedTable from "../../components/table/Table";
import Styles from "./DashBoard.module.scss"
import { useTheme, useTitle, useWebsocket } from "../../context";
import PieChartComp from "../../components/pie-chart/PieChart";
import ApexChart from '../../components/apex-chart/ApexCharts';


const DashBoardPage = () => {
  document.title = " ارز تو ارز | داشبورد";
  const { theme } = useTheme()
  const { setTitle } = useTitle();
  const { allSpotOrders, allOpenOrders, allUsers, onlineUsers, dailyOrders, lastFiatOrders = [] } = useWebsocket();
  const [liveOpenOrders, setLiveOpenOrders] = useState([]);
  const [spotOrders, setSpotOrders] = useState([]);
  const [fiatOrders, setFiatOrders] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [dailyOrdersCount, setDailyOrdersCount] = useState(0);
  const [fiatAmount, setFiatAmount] = useState(24);
  const [spotAmount, setSpotAmount] = useState(45);

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
    console.log(allUsers);
  }, [allUsers]);

  useEffect(() => {
    setOnlineUsersCount(onlineUsers)
  }, [onlineUsers]);

  useEffect(() => {
    setDailyOrdersCount(dailyOrders)
  }, [dailyOrders]);

  const dailyOrderTooltip = (props) => (
    <Tooltip {...props}>
      سفارشات 24 ساعت گذشته
    </Tooltip>
  );
  const onlineUsersTooltip = (props) => (
    <Tooltip {...props}>
      تعداد کاربران آنلاین
    </Tooltip>
  );
  const allUsersTooltip = (props) => (
    <Tooltip {...props}>
      تعداد کاربران سایت
    </Tooltip>
  );

  return (
    <div className={`${Styles.container} ${Styles[theme]} d-flex flex-wrap align-items-stretch mt-4`}>
      <div className={`${Styles.gridItems} ${Styles.spotWallet}`}>
        <div className="center-content flex-column p-3 border-radius-lg card-shadow bg-white h-100">

          <div className={`${Styles.rialChart} center-content flex-column`}>
            <p className="mb-0">موجودی تتر صرافی</p>
            <PieChartComp
              data={[spotAmount]}
              colors={[spotAmount < 25 ? '#ff305b' :
                spotAmount < 50 ? "#ff8e0c" :
                  spotAmount < 75 ? "#ffd230"
                    : '#00c56e']}
              labels={["موجودی تتر"]}
            />
          </div>
          <div className="mt-2 w-100 d-flex flex-column">
            <div className={`${Styles.mainCurrencies} ${Styles.usdt} mb-1 d-flex justify-content-between align-items-center`}>
              <span className="d-flex align-items-center is-size-6">
                <span className="ml-1"><img src={USDTicon} /></span>
                <span className="is-size-4 roboto-Bold">USDT</span>
              </span>
              <span className="roboto-Bold is-size-4">900,000</span>
            </div>
            <div className={`${Styles.mainCurrencies} ${Styles.btc} mb-1 d-flex justify-content-between align-items-center`}>
              <span className="d-flex align-items-center is-size-6">
                <span className="ml-1"><img src={BTCicon} /></span>
                <span className="is-size-6 roboto-Bold">BTC</span>
              </span>
              <span className="roboto-Bold is-size-6">0.2655348</span>
            </div>
            <div className={`${Styles.mainCurrencies} ${Styles.xrp} mb-1 d-flex justify-content-between align-items-center`}>
              <span className="d-flex align-items-center is-size-6">
                <span className="ml-1"><img src={XRPicon} /></span>
                <span className="is-size-6 roboto-Bold">XRP</span>
              </span>
              <span className="roboto-Bold is-size-6">0.10560</span>
            </div>
            <div className={`${Styles.mainCurrencies} ${Styles.eth} d-flex justify-content-between align-items-center`}>
              <span className="d-flex align-items-center is-size-6">
                <span className="ml-1"><img src={ETHicon} /></span>
                <span className="is-size-6 roboto-Bold">ETH</span>
              </span>

              <span className="roboto-Bold is-size-6">0.0158715</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.profits}`}>
        <div className="center-content flex-column p-3 border-radius-lg card-shadow bg-white h-100">
          <div className={`${Styles.profitsChart} profitsChart position-relative w-100 h-100`}>
            <ApexChart />
          </div>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.thirdBox}`}>
        <div className={`${Styles.thirdContainer} d-flex flex-wrap h-100`}>
          <div className={`${Styles.usersCount} `}>

            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={allUsersTooltip}
            >
              <div className={`${Styles.box} center-content flex-column py-2 px-3 border-radius-lg shadow h-100`}>
                <span className="roboto-Black">
                  <HiOutlineUsers size={50} />
                </span>
                <span className="roboto-Black is-size-3 mt-1">
                  {new Number(usersCount).toLocaleString()}
                </span>
              </div>
            </OverlayTrigger>
          </div>
          <div className={`${Styles.onlineUsersCount}`}>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={onlineUsersTooltip}
            >
              <div className={`${Styles.box} center-content flex-column py-2 px-3 border-radius-lg shadow h-100`}>
                <span className="roboto-Black">
                  <RiUserFollowLine size={50} />
                </span>
                <span className="roboto-Black is-size-3 mt-1">
                  {new Number(onlineUsersCount).toLocaleString()}
                </span>
              </div>
            </OverlayTrigger>
          </div>
          <div className={`${Styles.dailyOrdersCount}`}>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={dailyOrderTooltip}
            >
              <div className={`${Styles.box} center-content flex-column py-2 px-3 border-radius-lg shadow h-100`}>
                <span className="roboto-Black">
                  <RiExchangeFundsLine size={50} />
                </span>
                <span className="roboto-Black is-size-3 mt-1">
                  {new Number(dailyOrdersCount).toLocaleString()}
                </span>
              </div>
            </OverlayTrigger>
          </div>

          <div className={`${Styles.fiatWallet}`}>
            <div className="d-flex flex-column p-3 border-radius-lg card-shadow bg-white h-100 ">
              <div className={`${Styles.rialChart} center-content flex-column`}>
                <p className="mb-0">موجودی تومانی صرافی</p>
                <PieChartComp
                  data={[fiatAmount]}
                  colors={[fiatAmount < 25 ? '#ff305b' :
                    fiatAmount < 50 ? "#ff9130" :
                      fiatAmount < 75 ? "#ffd230"
                        : '#00c56e']}
                />
                <p className="mb-0" style={{
                  color: fiatAmount < 25 ? '#ff305b' :
                    fiatAmount < 50 ? "#ff9130" :
                      fiatAmount < 75 ? "#ffd230"
                        : '#00c56e'
                }}>
                  <span className="FaNum is-size-3">850,000,000</span>
                  <span className="yekn-Light is-size-6"> تومان</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.fiatOrders} `}>
        <div className="p-3 border-radius-lg card-shadow bg-white h-100">
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
      <div className={`${Styles.gridItems} ${Styles.onlineAdmins}`}>
        <div className="p-3 border-radius-lg card-shadow bg-white h-100">
          <div className="mb-2 d-flex align-items-center justify-content-between">
            <h1 className="is-size-7 mb-0"> ادمین‌های آنلاین</h1>
            <span><FiChevronLeft /></span>
          </div>
          <div>
            <CustomizedTable
              header={
                <>
                  <th className=""><span className="is-size-8">ایمیل</span></th>
                  <th className="text-center"><span className="is-size-8">IP</span></th>

                </>
              }
              totalRecords={8}
              pageLimit={8}
            // handleChangePage={(page) => setCurrentPage(page)}
            >
              {["", "", "", ""].map((item, index) => {
                return (
                  <tr>
                    <td className="text-center"><span className="is-size-8">mah**@gmail.com</span></td>
                    <td className="text-center"><span className="is-size-8">213.207.204.30</span></td>
                  </tr>
                );
              })}

            </CustomizedTable>
          </div>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.usdtBox}`}>
        <div className={`${Styles.usdtContainer} h-100 d-flex flex-wrap`}>
          <div className={`${Styles.usdtItems}`}>
            <div className={`${Styles.box} ${Styles.buyPrice} center-content flex-column p-3 border-radius-lg card-shadow h-100`}>
              <span className={`${Styles.icon} center-content mb-3`}>
                <img src={Tethericon} />
              </span>
              <div className="center-content flex-column">
                <span className="yekan-Light is-size-6 mb-3">قیمت خرید تتر</span>
                <span className="FaNum is-size-3 yekan-Bold mb-2">30,500</span>
                <span className="yekan-Light is-size-6">تومان</span>
              </div>
            </div>
          </div>
          <div className={`${Styles.usdtItems}`}>
            <div className={`${Styles.box} ${Styles.sellPrice} center-content flex-column p-3 border-radius-lg card-shadow h-100`}>
              <span className={`${Styles.icon} center-content mb-3 `}>
                <img src={Tethericon} />
              </span>
              <div className="center-content flex-column">
                <span className="yekan-Light is-size-6 mb-3">قیمت فروش تتر</span>
                <span className="FaNum is-size-3 yekan-Bold mb-2">30,800</span>
                <span className="yekan-Light is-size-6">تومان</span>
              </div>
            </div>
          </div>
          <div className={`${Styles.usdtItems}`}>
            <div className={`${Styles.box} ${Styles.sellLimit} center-content flex-column p-3 border-radius-lg card-shadow h-100`}>
              <span className={`${Styles.icon} center-content mb-3 `}>
                <img src={Tethericon} />
              </span>
              <div className="center-content flex-column">
                <span className="yekan-Light is-size-6 mb-3">حد فروش تتر</span>
                <span className="is-size-2 roboto-Bold mb-2">3,000</span>
                <span className="yekan-Light is-size-6">USDT</span>
              </div>
            </div>
          </div>
          <div className={`${Styles.fullwidth}`}>
            <div className={`${Styles.box} bg-white center-content flex-column p-3 border-radius-lg card-shadow h-100`}>
            </div>

          </div>
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.vasat}`}>
        <div className="center-content flex-column p-3 border-radius-lg card-shadow bg-white h-100">
        </div>
      </div>
      <div className={`${Styles.gridItems} ${Styles.marketOrders}`}>
        <div className="p-3 border-radius-lg card-shadow bg-white h-100">
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


    </div>
  );
};
export default DashBoardPage;
{/* <div className={`${Styles.usdtPrice}  col-12`}>
            <div className="center-content flex-column p-3 border-radius-lg card-shadow bg-white h-100">
              خرید
            </div>
          </div> */}



// <div className={`${Styles.gridItems} ${Styles.fiatWallet}`}>
//         <div className="d-flex flex-column p-3 border-radius-lg card-shadow bg-white h-100 ">
//           <div className={Styles.rialChart}>
//             <PieChartComp
//               data={[fiatAmount]}
//               colors={[fiatAmount < 25 ? '#ff305b' :
//                 fiatAmount < 50 ? "#ff9130" :
//                   fiatAmount < 75 ? "#ffd230"
//                     : '#00c56e']}
//               labels={["موجودی تومانی"]}
//             />
//           </div>
//         </div>
//       </div>