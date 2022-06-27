import { useEffect, useState } from "react";
import Styles from "./CurrencyInput.module.scss";
import { HiChevronLeft } from "react-icons/all";
import { currency_list } from "./currency-list/data";

//pics
import bitcoinIcon from "../../../assets/images/currency-icons/BitCoin_ICON.png";
import lightcoinIcon from "../../../assets/images/currency-icons/LightCoin_ICON.png";
//components
import CurrencyList from "./currency-list/CurrencyList";
import CustomizedModal from "../../modal/Modal";
import { Form } from "react-bootstrap";

export default function CurrencyInput({
  className,
  PersianCurrencyname,
  englishCurrencyName,
  onChange,
  errorMessage,
  guidText,
  value,
}) {
  const [activeCurrencyList, setActiveCurrencyList] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currency_list[0]);

  useEffect(() => {
    if (selectedCurrency.english_name) {
      onChange(selectedCurrency.english_name);
      setActiveCurrencyList(false);
    }
  }, [selectedCurrency]);

  return (
    <>
      <CustomizedModal show={activeCurrencyList} className="p-0">
        <CurrencyList
          close={() => setActiveCurrencyList(false)}
          onChange={(currency) => setSelectedCurrency(currency)}
        />
      </CustomizedModal>
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
            src={`/images/crypto-currencies/${selectedCurrency.english_name}.png`}
            alt="lightcoinIcon"
          />

          <span className="m-0 yekan-Medium text-dark is-size-6">
            {selectedCurrency.persian_name}
          </span>
          <span className="mr-1 text-gainsboro is-size-7">
            {selectedCurrency.english_name}
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
      ) : null}
    </>
  );
}
