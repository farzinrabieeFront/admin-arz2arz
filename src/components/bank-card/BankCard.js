import { useEffect, useState } from "react";
import Styles from "./BankCard.module.scss";
import { RiDeleteBin5Line } from "react-icons/ri";
//pics
// import addCardPic from "../../assets/images/add-card.png";
import samanBankLogo from "../../assets/images/saman-bank-logo.png";
//components
import CustomizedModal from "../modal/Modal";
// import AddCardForm from "../add-card-form/AddCardForm";

const BankCard = ({ other = false, data, onClick = () => false }) => {
  const [showModal, setShowModal] = useState(false);
   
  return (
    <>
      <CustomizedModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        header={() => <span className="text-blue is-size-6">افزودن کارت جدید</span>}
      >
        {/* <AddCardForm closeModal={() => setShowModal(false)} /> */}
      </CustomizedModal>
      <div
        className={`${Styles.BankCard} shadow card-style center-content h-100`}
        onClick={onClick}
      >
        <div className="blur h-100 w-100 p-3 d-flex flex-wrap align-content-between z-index-99">
          <div className={`${Styles.img} f-100 mb-3 text-center`}>
            {/* <img src={samanBankLogo} alt=""/> */}
            <span className="darkBlue yekan-ExtraBold">{data.bank}</span>
          </div>
          <div className="f-100 mb-3">
            <p className="mb-0 text-center is-size-3 yekan-Bold ltr word-spacing-1 text-dark FaNum">{data.card}</p>
          </div>
          <div className="f-100 mb-3">
            <p className="mb-0 text-center is-size-5 yekan-Bold word-spacing-1 text-dark FaNum d-flex align-items-center justify-content-between">
              <span className="is-size-7 ml-2">شماره حساب</span>
              <span className="FaNum">{data.bankAccountNumber}</span>
            </p>
          </div>
          <div className="f-100">
            <p className="mb-0 text-left is-size-6 yekan-Light ltr word-spacing-1 text-dark en">{data.sheba}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default BankCard;
