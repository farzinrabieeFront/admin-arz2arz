import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { BsDot, RiMailLine } from "react-icons/all";
import { Link } from "react-router-dom";
import Styles from './NotificationsDropdown.module.scss';

const NotificationsDropdown = ({ title }) => {
  return (
    <>
      <DropdownButton
        className={`${Styles.position} notifications-dropdown pointer`}

        id="dropdown-item-button"
        title={title}
      >
        <Dropdown.ItemText className="gray is-size-6 mb-2">
          اعلانات
        </Dropdown.ItemText>
        <Dropdown.Item as="CustomToggle" className={`${Styles.buttons} is-size-6 mb-2 d-flex flex-wrap border-bottom-lightGray`} >
          <div className="d-flex align-items-start flex-wrap w-100 overflow-hidden">
            <div className="text-gainsboro col-1 p-0 pl-2">
              <RiMailLine size="25" />{" "}
            </div>
            <div className="col-11 p-0">
              <h6 className="is-size-6">
                <BsDot className="text-danger" size="25" />
                تغییر قیمت بیت کوین در ۲۴ ساعت گذشته در صرافی
              </h6>
              <p className="is-size-7 mb-2 text-gainsboro">
                تست تست تست تست تست تست تست تست تست تست تست تست تست تست تست تست
                تست تست تست .
              </p>
              <p className="mb-0 text-gray-blue is-size-7 text-left">
                <span>۱۳۹۹/۱۰/۱۴</span> | <span>۱۳:۳۱:۴۸</span>
              </p>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          as="CustomToggle"

          className={`${Styles.buttons} is-size-6 mb-2 d-flex flex-wrap  `}
        >
          <div className="d-flex align-items-start flex-wrap w-100 overflow-hidden">
            <div className="text-gainsboro col-1 p-0 pl-2">
              <RiMailLine size="25" />{" "}
            </div>
            <div className="col-11 p-0">
              <h6 className="is-size-6 text-gray-blue">
                تغییر قیمت بیت کوین در ۲۴ ساعت گذشته در صرافی
              </h6>
              <p className="is-size-7 mb-2 text-gainsboro">
                تست تست تست تست تست تست تست تست تست تست تست تست تست تست تست تست
                تست تست تست .
              </p>
              <p className="mb-0 text-gray-blue is-size-7 text-left">
                <span>۱۳۹۹/۱۰/۱۴</span> | <span>۱۳:۳۱:۴۸</span>
              </p>
            </div>
          </div>
        </Dropdown.Item>
        <Link to="/notifications">
          <div className="is-size-7 mb-2 text-center link ">همه اعلانات</div>
        </Link>
      </DropdownButton>
    </>
  );
};

export default NotificationsDropdown;
