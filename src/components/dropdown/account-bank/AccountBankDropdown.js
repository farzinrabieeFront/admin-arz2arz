import { forwardRef, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CustomizedInput from "../../form/input/Input";
import Styles from "./AccountBankDropdown.module.scss";

const AccountBankDropdown = forwardRef(
  (
    {
      label = "",
      placeholder = "",
      plaintext = false,
      readOnly = false,
      disabled = false,
      onChange = () => false,
      className = "",
      labelClassName = "",
      options = [],
      errorMessage,
      guidText,
      isValid
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState("");

    useEffect(() => {
      if (selectedCard) {
        setIsOpen(false);
        onChange(selectedCard);
      }
    }, [selectedCard]);

    return (
      <Form.Group className={`position-relative mb-0`}>
        {label ? (
          <Form.Label
            className={`${Styles.selectLabel}  ${labelClassName} px-1 is-size-7 text-black `}
          >
            {label}
          </Form.Label>
        ) : null}
       
          <label className="w-100">
            <CustomizedInput
              type="button"
              value={selectedCard ? selectedCard : "انتخاب کنید"}
              className={`${Styles.select} ${className} form-select is-size-6 px-4 py-2 pointer`}
              onClick={() => setIsOpen(prev=>!prev)}
              onBlur={() =>
                setTimeout(() => {
                  setIsOpen(false);
                }, 200)
              }
              errorMessage={!isOpen && errorMessage}
              guidText={guidText}
              isValid={isValid}
            />
          </label>
          <ul className={`${Styles.optionsCard} mb-0`} hidden={!isOpen}>
            {options.map((item, index) => (
              <li
                key={`card-${index}`}
                className={`px-3 py-2 pointer d-flex justify-content-between ${
                  item.accepted || Styles.deactiveCard
                }`}
                onClick={() =>item.accepted && setSelectedCard(item.number)}
              >
                <span>{item.number}</span>
                {!item.accepted ? (
                  <span className="is-size-8 text-danger mr-2">
                    ( تایید نشده )
                  </span>
                ) : null}
              </li>
            ))}
            <li className={`px-4 py-2 pointer link text-center`}>
              افزودن کارت
            </li>
          </ul>
     
        {/* {errorMessage ? (
          <Form.Text className="text-danger is-size-7 text-left mt-0">
            {errorMessage}
          </Form.Text>
        ) : null} */}
        
      </Form.Group>
    );
  }
);
export default AccountBankDropdown;
