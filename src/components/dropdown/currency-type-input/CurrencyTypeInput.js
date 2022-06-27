import { forwardRef, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CustomizedInput from "../../form/input/Input";
import Styles from "./CurrencyTypeInput.module.scss";

const CurrencyTypeInput = forwardRef(
  (
    {
      label = "",
      onChange = () => false,
      className = "",
      options = [],
      errorMessage,
      maxLength,
      name,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchCurrency, setSearchCurrency] = useState("");

    useEffect(() => {
      if (searchCurrency && !isOpen) setIsOpen(true);
    }, [searchCurrency]);

    const handleSelectCurrency = (currency) => {
      setSearchCurrency(currency);
      onChange(currency)
    };

    return (
      <Form.Group
        className={`position-relative mb-0`}
        onBlur={() =>
          setTimeout(() => {
            setIsOpen(false);
          }, 100)
        }
      >
        <label className="w-100">
          <CustomizedInput
            label={label}
            type="text"
            name={name}
            onChange={(e) => setSearchCurrency(e.target.value)}
            value={searchCurrency || 'انتخاب کنید'}
            className={`${Styles.select} ${className} form-select is-size-7 px-4 py-2 pointer`}
            onClick={() => {
              setIsOpen((prev) => !prev);
              setSearchCurrency('');
            }}
            errorMessage={errorMessage}
            maxLength={maxLength}
          />
        </label>
        <ul className={`${Styles.optionsCard} mb-0`} hidden={!isOpen}>
          {options
            .filter((item) => item.includes(searchCurrency))
            .map((item, index) => (
              <li
                key={`card-${index}`}
                className={`px-3 py-2 pointer d-flex justify-content-between`}
                onClick={() => handleSelectCurrency(item)}
              >
                <span>{item}</span>
              </li>
            ))}
        </ul>
      </Form.Group>
    );
  }
);
export default CurrencyTypeInput;
