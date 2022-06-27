import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Styles from "./Sidebar.module.scss";
import DarkLogo from "../../assets/images/arzTpArz_logo-w.png";
import Logo from "../../assets/images/arzTpArz_logo.png";
import {
  HiOutlineUsers,
  RiShieldUserLine,
  RiExchangeLine,
  BsCreditCard,
  AiOutlineBank,
  RiWechatLine,
  HiOutlineCurrencyDollar,
  HiOutlineNewspaper,
  AiOutlinePercentage,
  HiOutlineUserGroup,
  IoNotificationsOutline,
  RiExchangeDollarFill,
  AiOutlineSetting,
  AiOutlineLineChart,
  RiDoubleQuotesL,
  RiWallet3Line,
  AiOutlineBarChart,
  IoIosClose,
  RiHistoryLine,
} from "react-icons/all";
import { useSelector } from 'react-redux'
import SideBarItem from "./items/SideBarItem";
import { useTheme } from "../../context/themeManager";
const Sidebar = ({ close, openMobileMenu, closeMobileMenu }) => {
  const user = useSelector(state => state.user)
  const { theme } = useTheme()
  const { pathname } = useLocation();

  return (

    <div>
      <div className={`${Styles.logo} ${Styles[theme]} col-12 center-content px-0 pb-3 `}>

        <div className={`${Styles.img} d-flex align-items-center justifyy-content-between`}>
          <Link to="/profile" className="d-flex align-items-center">
            <img src={`${theme === "light" ? Logo : DarkLogo}`} />
            <h2 className="mr-2">
              <span className="yekan-Light is-size-6">صرافی آنلاین </span>
              <span className="yekan-ExtraBold is-size-6">ارز تو ارز </span>
            </h2>
          </Link>
          {openMobileMenu ?
            <span className="mr-3" onClick={() => closeMobileMenu(false)}><IoIosClose size="40" /></span>
            :
            null}
        </div>
      </div>
      <hr className={`horizontal ${theme} mt-0`} />
      <ul className={` mb-0 px-3 ${theme}`}>
        <li className="yekan-Bold text-blue-medium is-size-7 py-2">ادمین‌ها</li>
        <SideBarItem
          title="مدیریت ادمین‌ها"
          theme={theme}
          url="admins"
          icon={<HiOutlineUserGroup size={20} />}
          subItem={[
            { title: "افزودن ادمین‌", url: "/admins/create-admin" },
            { title: "لیست ادمین‌ها", url: "/admins" },
            // { title: "ادمین‌های آنلاین", url: "/admins/online-admins" },
            { title: "لیست نشست‌ها", url: "/admins/sessions/" },
          ]}
        />

        <hr className={`w-100 horizontal ${theme} my-1`} />
        <li className="yekan-Bold text-blue-medium is-size-7 py-2">مشتریان</li>


        <SideBarItem
          title="مدیریت مشتریان"
          theme={theme}
          url="/users"
          icon={<HiOutlineUsers size={20} />}

        />
        {/* <SideBarItem
          title="مدیریت مشتریان"
          theme={theme}
          url="users"
          icon={<HiOutlineUsers size={20} />}
          subItem={[
            { title: "لیست مشتریان", url: "/users" },
            { title: "لیست نشست‌ها", url: "/" },
            { title: "مشتریان آنلاین", url: "/" },
          ]}
        /> */}

        <SideBarItem
          title=" تایید هویت"
          url="/verifications"
          theme={theme}
          icon={<RiShieldUserLine size={20} />}
        />
        <SideBarItem
          title="کارت های بانکی"
          url="/bank-accounts"
          theme={theme}
          icon={<BsCreditCard size={20} />}
        />
        <SideBarItem
          title="مدیریت بانک ها"
          url="/banks"
          theme={theme}
          icon={<AiOutlineBank size={20} />}
        />

        <SideBarItem
          title="کیف پول‌های مشتریان"
          theme={theme}
          url="/wallets"
          icon={<RiWallet3Line size={20} />}

        />
        {/* <SideBarItem
          title="تنظیمات"
          theme={theme}
          url="user/setting"
          icon={<HiOutlineUsers size={20} />}
          subItem={[
            { title: "کیف پول‌ها", url: "/wallets" },
          ]}
        /> */}
        <hr className={`w-100 horizontal ${theme} my-1`} />
        <li className="yekan-Bold text-blue-medium is-size-7 py-2">معاملات</li>

        <SideBarItem
          title="تاریخچه معاملات"
          theme={theme}
          url="orders"
          icon={<RiExchangeLine size={20} />}
          subItem={[
            { title: "معاملات خرید و فروش", url: "/fiat-orders" },
            { title: "معاملات تبدیل ارز", url: "/market-orders" },
            { title: "معاملات اتوماتیک", url: "/limit-orders" },
          ]}
        />

        <SideBarItem
          title="کمیسیون‌ معاملات"
          theme={theme}
          url="order-commissions"
          icon={<AiOutlinePercentage size={20} />}
          subItem={[
            { title: "معاملات خرید و فروش", url: "/fiat-order-commissions" },
            { title: "معاملات تبدیل ارز", url: "/market-order-commissions" },
            { title: "معاملات اتوماتیک", url: "/limit-order-commissions" },
          ]}
        />
        <SideBarItem
          title="تنظیمات معاملات"
          theme={theme}
          url="order/setting"
          icon={<AiOutlineSetting size={20} />}
          subItem={[
            { title: "حد اختلاف قیمت معاملات", url: "/order/setting/spot-fiat-order/" },
            { title: "حد خرید و فروش", url: "/order/setting/fiat-order-limit" },
            // { title: "معاملات تبدیل ارز", url: "/order/setting/market-order-limit" },
            // { title: "معاملات اتوماتیک", url: "/order/setting/limit-order-limit" },
          ]}
        />
        <hr className={`w-100 horizontal ${theme} my-1`} />
        <li className="yekan-Bold text-blue-medium is-size-7 py-2">واریز و برداشت ارزی</li>
        <SideBarItem
          title="کمیسیون برداشت ارزی"
          theme={theme}
          url="/withdraw-commissions"
          icon={<AiOutlinePercentage size={20} />}
        />
        <SideBarItem
          title="تاریخچه"
          theme={theme}
          url="/spot-transactions/"
          icon={<RiHistoryLine size={20} />}
        />
        <SideBarItem
          title="تنظیمات"
          theme={theme}
          url="/spot-transaction-limit"
          icon={<AiOutlineSetting size={20} />}
        />
        <hr className={`w-100 horizontal ${theme} my-1`} />
        <li className="yekan-Bold text-blue-medium is-size-7 py-2">واریز و برداشت تومانی</li>
        <SideBarItem
          title="برداشت تومانی"
          theme={theme}
          url="/fiat/fiat-withdraw/"
          icon={<RiExchangeLine size={20} />}
        />
        <SideBarItem
          title="تاریخچه"
          theme={theme}
          url="/fiat-transactions"
          icon={<RiHistoryLine size={20} />}
        />
        <SideBarItem
          title="تنظیمات"
          theme={theme}
          url="/fiat-transaction-limit"
          icon={<AiOutlineSetting size={20} />}
        />
        <hr className={`w-100 horizontal ${theme} my-1`} />
        <li className="yekan-Bold text-blue-medium is-size-7 py-2">صرافی</li>
        <SideBarItem
          title="مدیریت ارزها"
          url="/currencies"
          theme={theme}
          icon={<HiOutlineCurrencyDollar size={20} />}
        />

        <SideBarItem
          title="مدیریت ارز مرجع"
          theme={theme}
          url="ref-currency"
          icon={<RiExchangeDollarFill size={20} />}
          subItem={[
            { title: "قیمت خرید و فروش", url: "/ref-currency/price" },
            { title: "حد خرید و فروش", url: "/ref-currency/limitation" },
            { title: "حجم دارایی صرافی", url: "/ref-currency/volume" },
          ]}
        />
        <SideBarItem
          title="تنظیمات صرافی"
          theme={theme}
          // url="/exchange-setting"
          url="/activities"
          icon={<AiOutlineSetting size={20} />}
        // subItem={[
        //   { title: "فعالیت صرافی", url: "/exchange-setting" },
        // ]}
        />
        <SideBarItem
          title="سودها"
          url="/profits/"
          theme={theme}
          icon={<AiOutlineLineChart size={20} />}
        />
        <SideBarItem
          title="گزارشات"
          url="/reports/"
          theme={theme}
          icon={<AiOutlineBarChart size={20} />}
        />
        <SideBarItem
          title="اعلانات"
          url="/notifications"
          theme={theme}
          icon={<IoNotificationsOutline size={20} />}
        />
        <SideBarItem
          title="کیف پول‌های صرافی"
          url="/exchange-wallets"
          theme={theme}
          icon={<RiWallet3Line size={20} />}
        />
        <SideBarItem
          title="کیف پول‌های binance"
          url="/binance-wallets/"
          theme={theme}
          icon={<RiWallet3Line size={20} />}
        />

        <hr className={`w-100 horizontal ${theme} my-1`} />
        <li className="yekan-Bold text-blue-medium is-size-7 py-2">سایت</li>
        <SideBarItem
          title=" مقالات"
          theme={theme}
          icon={<HiOutlineNewspaper size={20} />}
          url="articles"
          subItem={[
            { title: "لیست مقالات", url: "/articles" },
            { title: "دسته‌ بندی‌ها ", url: "/articles/articles-category" },
          ]}
        />
        <SideBarItem
          title=" سوالات متداول"
          url="faq"
          theme={theme}
          icon={<RiDoubleQuotesL size={20} />}
          subItem={[
            { title: "دسته بندی‌ها ", url: "/faq-category" },
            { title: "لیست سوالات متداول", url: "/faq" },
          ]}
        />
        <SideBarItem
          title="پشتیبانی "
          url="/tickets"
          theme={theme}
          icon={<RiWechatLine size={20} />}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
















{/* <hr className={`w-100 horizontal ${theme} my-1`} />
        <li className="nav-link yekan-Medium is-size-7 px-0">مالی</li>
        <SideBarItem
          title="کمیسیون‌ها"
          theme={theme}
          url="commissions"
          icon={<AiOutlinePercentage size={20} />}
          subItem={[
            { title: "برداشت ارزی", url: "/withdraw-commissions" },
            { title: "خرید و فروش ارز", url: "/fiat-commissions" },
            { title: "معاملات تبدیل ارز", url: "/market-commissions" },
            { title: "معاملات اتوماتیک", url: "/limit-commissions" },
          ]}
        />
        <SideBarItem
          title="تاریخچه تراکنش‌ها"
          theme={theme}
          url="transactions"
          icon={<AiOutlineTransaction size={20} />}
          subItem={[
            { title: "واریز و برداشت تومانی", url: "/fiat-transactions" },
            // { title: " تومانی", url: "/rial-withdraw-transactions" },
            { title: "واریز و برداشت ارزی", url: "/spot-transactions" },
            // { title: "برداشت ارزی", url: "/crypto-withdraw-transactions" },
          ]}
        />
        <SideBarItem
          title="تاریخچه معاملات"
          theme={theme}
          url="orders"
          icon={<RiExchangeLine size={20} />}
          subItem={[
            { title: "خرید و فروش", url: "/fiat-orders" },
            { title: "تبدیل ارز", url: "/market-orders" },
            { title: "اتوماتیک", url: "/limit-orders" }, 
          ]}
        />

        <hr className={`w-100 horizontal ${theme} my-1`} />
        <li className="nav-link yekan-Medium is-size-7 px-0">مدیریت صرافی</li>
        <SideBarItem
          title="مدیریت ارز مرجع"
          theme={theme}
          url="ref-currency"
          icon={<RiExchangeDollarFill size={20} />}
          subItem={[
            { title: "قیمت خرید و فروش", url: "/ref-currency/price" },
            { title: "حد خرید و فروش", url: "/ref-currency/limitation" },
            { title: "حجم دارایی صرافی", url: "/ref-currency/volume" },
          ]}
        />
        <SideBarItem
          title="مدیریت ارزها"
          url="/currencies"
          theme={theme}
          icon={<HiOutlineCurrencyDollar size={20} />}
        />
        <SideBarItem
          title="حد معاملات تومانی"
          theme={theme}
          url="/fiat-volume-limit"
          icon={<RiExchangeBoxLine size={20} />}
        />
        <SideBarItem
          title="دارایی تومانی صرافی"
          theme={theme}
          url="/fiat-exchange-wallet"
          icon={<RiExchangeBoxLine size={20} />}
        />

        <SideBarItem
          title="تنظیمات"
          theme={theme}
          icon={<AiOutlineSetting size={20} />}
          url="setting"
          subItem={[
            { title: "تنظیمات صرافی", url: "/exchange-setting" },
          ]}
        />
        <SideBarItem
          title="اعلانات"
          url="/notifications"
          theme={theme}
          icon={<IoNotificationsOutline size={20} />}
        />
      

        <hr className={`w-100 horizontal ${theme} my-1`} />
        <li className="nav-link yekan-Medium is-size-7 px-0">سودها</li>
        <SideBarItem
          title="سودها"
          url="/profits/"
          theme={theme}
          icon={<AiOutlineLineChart size={20} />}
        />
        <SideBarItem
          title="گزارشات"
          url="/reports/"
          theme={theme}
          icon={<AiOutlineBarChart size={20} />}
        />
        
        <hr className={`w-100 horizontal ${theme} my-1`} />
        <li className="nav-link yekan-Medium is-size-7 px-0">سایت</li>
        <SideBarItem
          title=" مقالات"
          theme={theme}
          icon={<HiOutlineNewspaper size={20} />}
          url="articles"
          subItem={[
            { title: "لیست مقالات", url: "/articles" },
            { title: "دسته‌ بندی‌ها ", url: "/articles/articles-category" },
          ]}
        />
        <SideBarItem
          title=" سوالات متداول"
          url="faq"
          theme={theme}
          icon={<RiDoubleQuotesL size={20} />}
          subItem={[
            { title: "دسته بندی‌ها ", url: "/faq-category" },
            { title: "لیست سوالات متداول", url: "/faq" },
          ]}
        />
        <SideBarItem
          title="پشتیبانی "
          url="/tickets"
          theme={theme}
          icon={<RiWechatLine size={20} />}
        /> */}