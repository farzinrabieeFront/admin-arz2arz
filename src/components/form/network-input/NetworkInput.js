import { useEffect, useState } from "react";
import Styles from "./NetworkInput.module.scss";
import { Form } from "react-bootstrap";
import { HiChevronLeft } from "react-icons/all";
//pics
import bitcoinIcon from "../../../assets/images/currency-icons/BitCoin_ICON.png";
import lightcoinIcon from "../../../assets/images/currency-icons/LightCoin_ICON.png";
//components
import CustomizedModal from "../../modal/Modal";
import CustomizedInput from "../input/Input";
import NetworksCurrencyList from "./network-currency-list/NetworksCurrencyList";

export default function NetworkInput({ className, isValid, onChange, value }) {
  const [activeNetworkList, setActiveNetworkList] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");

  useEffect(() => {
    onChange(selectedNetwork);
    setActiveNetworkList(false);
  }, [selectedNetwork]);

  return (
    <>
      <CustomizedModal show={activeNetworkList} className="p-0">
        <NetworksCurrencyList
          close={() => setActiveNetworkList(false)}
          onChange={(network) => setSelectedNetwork(network)}
        />
      </CustomizedModal>
      <div>
        <label className={`${Styles.selectionLabel} yekan-Medium px-1 is-size-7`}>
          انتخاب شبکه
        </label>
      </div>
      <div className="podition-relative pointer">
        <CustomizedInput
          type="button"
          value={selectedNetwork || "برای انتخاب شبکه کلیک کنید."}
          className={`${Styles.networkInputCustomized} is-size-6 text-gray-regular`}
          onClick={() => setActiveNetworkList(true)}
          isValid={selectedNetwork}
        />
        <div>
          <span className={`link-CurrencySelection ${Styles.ModalLink}`}>
            <span className="yekan-Bold">انتخاب شبکه </span>
            <HiChevronLeft />
          </span>
        </div>
      </div>
      {/* 
      <div>
        <label className={`${Styles.selectionLabel} yekan-Medium px-1 is-size-7`}>
          انتخاب ارز
        </label>
      </div>
      <div
        className={`${Styles.selection} ${className} p-2 rounded-10 d-flex justify-content-between align-items-center pointer`}
        onClick={() => setActiveCurrencyList(true)}
      >
        <div className="d-flex align-items-center">
          <img
            className={`${Styles.imgIcon} ml-2`}
            src={lightcoinIcon}
            alt="lightcoinIcon"
          />

          <span className="m-0 yekan-Medium text-dark is-size-6">
            {PersianCurrencyname}
          </span>
          <span className="mr-1 text-gainsboro is-size-7">
            {englishCurrencyName}
          </span>
        </div>
        <div>
          <span className="link-CurrencySelection">
            <span className="yekan-Bold">انتخاب ارز </span>
            <HiChevronLeft />
          </span>
        </div>
      </div>
      {errorMessage ? (
        <Form.Text className="text-danger is-size-7 text-left pl-3">
          {errorMessage}
        </Form.Text>
      ) : null}
      {guidText && !errorMessage ? (
        <Form.Text className="text-gainsboro is-size-8 mr-2">
          {guidText}
        </Form.Text>
      ) : null} */}
    </>
  );
}
