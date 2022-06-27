import React from "react";
import Styles from "./VerificationCard.module.scss";
import { Col, Button } from "react-bootstrap";
import { BiChevronsLeft, RiUserFollowLine, FiChevronLeft } from "react-icons/all";

const VerificationCard = () => {
  return (
    <div className={`${Styles.verifyCard} py-3 px-4 mb-3 card-style d-flex text-white justigy-content-start align-items-center`}>
      <Col lg={2} className="px-0">
        <Button variant="warning" className={`${Styles.button} rounded-pill is-size-6 text-dark font-weight-bold py-2`} size="md">
          <RiUserFollowLine size="20" className={`${Styles.svg} ml-1`} /> شروع احراز هویت<FiChevronLeft size="20" className="" />
        </Button>
      </Col>
      <Col lg={9} >
        <div lg={9} className={`${Styles.steps} align-items-stretch d-flex`}>
          <Col lg={4} className="d-flex align-items-center justify-content-between">
            <span>
              <p className="text-lightBlue yekan-ExtraBold mb-2">1. اطلاعات کابری</p>
              <p className="is-size-7 mb-2">ورود اطلاعات فردی کاربر</p>
            </span>
            <span className="text-center mb-0"><BiChevronsLeft size="50" className={Styles.svg} /></span>
          </Col>
          <Col lg={4} className="d-flex align-items-center justify-content-between">
            <span>
              <p className="text-lightBlue yekan-ExtraBold mb-2">2. بارگزاری مدارک</p>
              <p className="is-size-7 mb-2">بارگزاری مدارک هویتی و ویدیو</p>
            </span>
            <span className="text-center mb-0"><BiChevronsLeft size="50" className={Styles.svg} /></span>
          </Col>

          <Col lg={4}>
            <span> <p className="text-lightBlue yekan-ExtraBold mb-2">3. ضبط ویدیو</p>
              <p className="is-size-7 mb-0">معاملات، پس از تایید اطلاعات از
                سمت صرافی امکان پذیر است</p>
            </span>
          </Col>
        </div>
      </Col>
    </div>
  );
};
export default VerificationCard;
