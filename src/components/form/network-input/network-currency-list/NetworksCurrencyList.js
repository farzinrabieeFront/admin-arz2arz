import React from "react";
import Styles from "./NetworksCurrencyList.module.scss";
import CustomizedAlert from "../../alert/Alert";
import { RiCloseFill, TiInfoLarge } from "react-icons/all";

const sample_data = [{}];

export default function NetworksCurrencyList({ onChange, close }) {
  let index = 0;
  return (
    <div>
      <div className={`${Styles.head} border-bottom px-2`}>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="darkBlue h6 mb-0">انتخاب ارز</span>
          <span className="text-gray-blue">
            <RiCloseFill size="25" className="pointer" onClick={close} />
          </span>
        </div>

        <div className="col-12 is-size-7 mt-1 mb-2 px-0 text-primary  yekan-Bold d-flex align-items-center">
          <span>
            <TiInfoLarge size={30} className="px-1" />
          </span>
          <span>
            برای جلوگیری از گم شدن دارایی در تراکنش انتقالات از صحت اطلاعات شبکه
            مورد نظر اطمینان کامل پیدا کنید.
          </span>
        </div>
      </div>
      <ul className="mt-1">
        <li
          className="justify-content-between p-3 border-bottom pointer"
          key={`network-${index}`}
          onClick={() => onChange("BEP2")}
        >
          <div>
            <div className="yekan-Bold">BEP2</div>
            <div className="is-size-6 text-gainsboro ">Binance Chain (BNB)</div>
          </div>
          <div>
            <div className="text-left yekan-Bold ">0.000068 ETH</div>
            <div className="FaNum text-left is-size-6 yekan-Light">
              =$0.175648
            </div>
          </div>
        </li>
        <li
          className="justify-content-between p-3 border-bottom pointer"
          key={`network-${index}`}
          onClick={() => onChange("BEP20(BSC)")}
        >
          <div>
            <div className="yekan-Bold">BEP20(BSC)</div>
            <div className="is-size-6 text-gainsboro ">Binance Smart Chain</div>
          </div>
          <div>
            <div className="text-left yekan-Bold ">0.000068 ETH</div>
            <div className="FaNum text-left is-size-6 yekan-Light">
              =$0.175648
            </div>
          </div>
        </li>
        <li
          className="justify-content-between p-3 pointer"
          key={`network-${index}`}
          onClick={() => onChange("ERC20")}
        >
          <div>
            <div className="yekan-Bold">ERC20</div>
            <div className="is-size-6 text-gainsboro ">Ethereum (ETH)</div>
          </div>
          <div>
            <div className="text-left yekan-Bold ">0.008 ETH</div>
            <div className="FaNum text-left is-size-6 yekan-Light">=$20.66</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
