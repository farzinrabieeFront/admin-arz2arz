import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import {
  RiEditBoxLine,
  RiLockPasswordLine,
  RiLogoutCircleLine,
} from "react-icons/all";
import Styles from "./SettigsDropdown.module.scss";

const SettigsDropdown = () => {
  return (
    <>
      <DropdownButton
        className={`${Styles.position} header-dropdown pointer`}
        id="dropdown-item-button"
        title="title"
      >
        <Dropdown.Item
          as="button"
          className={`${Styles.buttons} is-size-6 mb-2 text-black hover-text-blue`}
        >
          <a href="/">
            <RiEditBoxLine className="ml-1" size="16" />
            تنظیمات
          </a>
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          className={`${Styles.buttons} is-size-6 mb-2 text-black hover-text-blue`}
        >
          <a href="/">
            <RiLockPasswordLine className="ml-1" size="16" />
            تغییر رمز عبور
          </a>
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          className={`${Styles.buttons} is-size-6 text-black hover-text-blue`}
        >
          <a href="/">
            <RiLogoutCircleLine className="ml-1" size="16" />
            خروج
          </a>
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export default SettigsDropdown;
