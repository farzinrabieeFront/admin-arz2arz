import React, { useState } from "react";
import Styles from "./CurrencyList.module.scss";
import { RiCloseFill, FiSearch, BiCaretUp, BiCaretDown } from "react-icons/all";
import { currency_list } from "./data";

const CurrencyList = ({ close, onChange }) => {
  const [searchBox, setSearchBox] = useState("");
  return (
    <div className={`${Styles.search} pb-2`}>
      <div className={`${Styles.head} border-bottom pb-3 px-2`}>
        <div className="d-flex align-items-center justify-content-between">
          <span className="darkBlue h6 mb-0">انتخاب ارز</span>
          <span className="text-gray-blue">
            <RiCloseFill size="25" className="pointer" onClick={close} />
          </span>
        </div>
        <div className="mt-3  text-right">
          <div className={`${Styles.input} rounded-pill`}>
            <FiSearch className={`${Styles.icon} text-gainsboro`} size="25" />
            <input
              className="text-gainsboro small"
              placeholder="جستجو نام ارز؛ به عنوان مثال: بیت کوین یا Bitcoin یا BTC"
              onChange={(e) => setSearchBox(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={`${Styles.card} pt-2 `}>
        {!searchBox ? (
          <>
            <div>
              <p
                className={`${Styles.title} is-size-6 mb-2 text-gray-blue p-1 text-center`}
              >
                ارزهای مهم و معروف
              </p>
              {currency_list
                .filter((item) => item.isMain)
                .map((item, index) => (
                  <div
                    className={`${Styles.items} transition py-1 px-2 d-flex align-items-center justify-content-between`}
                    onClick={() => onChange(item)}
                  >
                    <div className="d-flex align-items-center">
                      <span className={`${Styles.img} ml-2`}>
                        <img
                          src={`/images/crypto-currencies/${item.english_name}.png`}
                          // src={bitcoinIcon}
                        />
                      </span>
                      <span className="text-right">
                        <span className="is-size-7 text-gray-blue mb-1 font-weight-bold d-block">
                          {item.persian_name}
                        </span>
                        <span className="is-size-7 text-gainsboro d-block mb-0">
                          {item.english_name}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className="text-left">
                        <span className="is-size-7 text-gray-blue text-left is-size-6 font-weight-bold mb-1 d-block ltr">
                          {item.price}
                        </span>
                        <span
                          className={`is-size-7 text-left is-size-6 d-flex align-items-center mb-0 ltr ${
                            item.percent.includes("-")
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {item.percent.includes("-") ? (
                            <BiCaretDown className="mr-1" />
                          ) : (
                            <BiCaretUp className="mr-1" />
                          )}
                          {item.percent}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div>
              <p
                className={`${Styles.title} is-size-6 mb-2 text-gray-blue p-1 text-center`}
              >
                سایر ارزها
              </p>
              {currency_list
                .filter((item) => !item.isMain)
                .map((item, index) => (
                  <div
                    className={`${Styles.items} transition py-1 px-2 d-flex align-items-center justify-content-between`}
                    onClick={() => onChange(item)}
                  >
                    <div className="d-flex align-items-center">
                      <span className={`${Styles.img} ml-2`}>
                        <img
                          src={`/images/crypto-currencies/${item.english_name}.png`}
                          // src={bitcoinIcon}
                        />
                      </span>
                      <span className="text-right">
                        <span className="is-size-7 text-gray-blue mb-1 font-weight-bold d-block">
                          {item.persian_name}
                        </span>
                        <span className="is-size-7 text-gainsboro d-block mb-0">
                          {item.english_name}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className="text-left">
                        <span className="is-size-7 text-gray-blue text-left is-size-6 font-weight-bold mb-1 d-block ltr">
                          {item.price}
                        </span>
                        <span
                          className={`is-size-7 text-left is-size-6 d-flex align-items-center mb-0 ltr ${
                            item.percent.includes("-")
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {item.percent.includes("-") ? (
                            <BiCaretDown className="mr-1" />
                          ) : (
                            <BiCaretUp className="mr-1" />
                          )}
                          {item.percent}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <>
            <div>
              <p
                className={`${Styles.title} is-size-6 mb-2 text-gray-blue p-1 text-center`}
              >
                نتیجه جستجو
              </p>
              {currency_list
                .filter(
                  (item) =>
                    item.english_name.includes(searchBox) ||
                    item.persian_name.includes(searchBox) ||
                    item.symbol.includes(searchBox)
                )
                .map((item, index) => (
                  <div
                    className={`${Styles.items} transition py-1 px-2 d-flex align-items-center justify-content-between`}
                    onClick={() => onChange(item)}
                  >
                    <div className="d-flex align-items-center">
                      <span className={`${Styles.img} ml-2`}>
                        <img
                          src={`/images/crypto-currencies/${item.english_name}.png`}
                        />
                      </span>
                      <span className="text-right">
                        <span className="is-size-7 text-gray-blue mb-1 font-weight-bold d-block">
                          {item.persian_name}
                        </span>
                        <span className="is-size-7 text-gainsboro d-block mb-0">
                          {item.english_name}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span className="text-left">
                        <span className="is-size-7 text-gray-blue text-left is-size-6 font-weight-bold mb-1 d-block ltr">
                          {item.price}
                        </span>
                        <span
                          className={`is-size-7 text-left is-size-6 d-flex align-items-center mb-0 ltr ${
                            item.percent.includes("-")
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {item.percent.includes("-") ? (
                            <BiCaretDown className="mr-1" />
                          ) : (
                            <BiCaretUp className="mr-1" />
                          )}
                          {item.percent}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default CurrencyList;

{
  /*
        
          <div>
            <div
              className={`${Styles.items} transition pb-2 d-flex align-items-center justify-content-between`}
            >
              <div className="d-flex align-items-center">
                <span className={`${Styles.img} ml-2`}>
                  <img src={bitcoinIcon} />
                </span>
                <span className="text-right">
                  <span className="is-size-7 text-gray-blue mb-1 font-weight-bold d-block">
                    بیت کوین
                  </span>
                  <span className="is-size-7 text-gainsboro d-block mb-0">
                    Bitcoin
                  </span>
                </span>
              </div>
              <div>
                <span className="text-left">
                  <span className="is-size-7 text-gray-blue text-left is-size-6 font-weight-bold mb-1 d-block ltr">
                    4,930,366,298 IRR
                  </span>
                  <span className="is-size-7 text-left text-success is-size-6 d-block mb-0 ltr">
                    <BiCaretUp /> 12.81%
                  </span>
                </span>
              </div>
            </div>
            <div
              className={`${Styles.items} transition py-2 d-flex align-items-center justify-content-between`}
            >
              <div className="d-flex align-items-center">
                <span className={`${Styles.img} ml-2`}>
                  <img src={bitcoinIcon} />
                </span>
                <span className="text-right">
                  <span className="is-size-7 text-gray-blue mb-1 font-weight-bold d-block">
                    بیت کوین
                  </span>
                  <span className="is-size-7 text-gainsboro d-block mb-0">
                    Bitcoin
                  </span>
                </span>
              </div>
              <div>
                <span className="text-left">
                  <span className="is-size-7 text-gray-blue text-left is-size-6 font-weight-bold mb-1 d-block ltr">
                    4,930,366,298 IRR
                  </span>
                  <span className="is-size-7 text-left text-success is-size-6 d-block mb-0 ltr">
                    <BiCaretUp /> 12.81%
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className={`${Styles.title} is-size-6 mb-2 text-gray-blue p-1 text-center`}>
            سایر ارزها
          </p>
          <div>
            <div
              className={`${Styles.items} transition pb-2 d-flex align-items-center justify-content-between`}
            >
              <div className="d-flex align-items-center">
                <span className={`${Styles.img} ml-2`}>
                  <img src={litecoinIcon} />
                </span>
                <span className="text-right">
                  <span className="is-size-7 text-gray-blue mb-1 font-weight-bold d-block">
                    تتر
                  </span>
                  <span className="is-size-7 text-gainsboro d-block mb-0">
                    Tether-USDT
                  </span>
                </span>
              </div>
              <div>
                <span className="text-left">
                  <span className="is-size-7 text-gray-blue text-left is-size-6 font-weight-bold mb-1 d-block ltr">
                    4,930,366,298 IRR
                  </span>
                  <span className="is-size-7 text-left text-success is-size-6 d-block mb-0 ltr">
                    <BiCaretUp /> 12.81%
                  </span>
                </span>
              </div>
            </div>
            <div
              className={`${Styles.items} transition pt-2  d-flex align-items-center justify-content-between`}
            >
              <div className="d-flex align-items-center">
                <span className={`${Styles.img} ml-2`}>
                <img src={litecoinIcon} />
                </span>
                <span className="text-right">
                  <span className="is-size-7 text-gray-blue mb-1 font-weight-bold d-block">
                    لایت کوین
                  </span>
                  <span className="is-size-7 text-gainsboro d-block mb-0">
                    Litecoin-LTC
                  </span>
                </span>
              </div>
              <div>
                <span className="text-left">
                  <span className="is-size-7 text-gray-blue text-left is-size-6 font-weight-bold mb-1 d-block ltr">
                    4,930,366,298 IRR
                  </span>
                  <span className="is-size-7 text-left text-danger is-size-6 d-block mb-0 ltr">
                    <BiCaretDown /> 12.81%
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
