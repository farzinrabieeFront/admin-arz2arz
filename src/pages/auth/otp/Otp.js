import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TiChevronLeft, BsArrowRight, GoHome } from "react-icons/all";
import { Form, Formik, FastField } from "formik";
import { useSelector, useDispatch } from 'react-redux';
import Styles from './Otp.module.scss';
//components
import AuthTemplate from "../../../components/auth/template/Template";
import CustomizedInput from "../../../components/form/input/Input";
import CustomizedButton from "../../../components/form/button/Button";
import { authServices, cookieServices } from "../../../services";
import { toast } from "react-toastify";
import CustomizedOtp from '../../../components/form/otp-input/CustomizedOtp'
import { useAuth, useTheme } from "../../../context";
import { Link } from "react-router-dom";
import * as math from 'mathjs';

const Otp = (props) => {
  document.title = "ارز تو ارز | رمز یکبار مصرف";
  const intervalTimerRef = useRef(null);
  const { theme } = useTheme();
  const { loading, confirmOtp, resendOtp } = useAuth();
  const { expiryDate } = props.location.state
  /** states & variables */
  const [minutesTimer, setMinutesTimer] = useState(0);
  const [secondsTimer, setSecondsTimer] = useState(0);
  const [otp, setOtp] = useState('')


  useEffect(() => {
    if (otp.length === 6) {
      handleSendOtp(otp)
    }
  }, [otp])

  useEffect(() => {
    if (expiryDate) {
      intervalTimerRef.current = setInterval(() => {
        const distance = expiryDate - new Date().getTime();
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance > 0) {
          setMinutesTimer(minutes);
          setSecondsTimer(seconds);
        } else {
          clearInterval(intervalTimerRef.current);
        }
      }, 1000);
    }
    return () => {
      clearInterval(intervalTimerRef.current);
    };
  }, [expiryDate]);

  const handleSendOtp = async (vals) => {
    try {
      await confirmOtp(vals)
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <AuthTemplate title="رمز یکبار مصرف" className="py-3 px-0 px-md-3 d-flex flex-wrap mt-3 align-content-center">
      <Col lg={12}>
        <div className="d-flex flex-wrap">
          <Col lg={12}>
            <div className={Styles.otp}>
              <CustomizedOtp
                value={otp}
                name="otpText"
                handleChange={(vals) => setOtp(vals)}
              />
            </div>
          </Col>
          <Col lg={12} className="mt-3">
            <div className="w-100 center-content is-size-6">
              <span className={`${minutesTimer || secondsTimer ? "" : "pointer text-purple decoration"} yekan-Bold`}
                onClick={() => { if (!(minutesTimer || secondsTimer)) resendOtp() }}
              >ارسال مجدد کد
              </span>
              {minutesTimer || secondsTimer ?
                <>
                  <span className="mx-2 yekan-Bold">:</span>
                  <span className="FaNum">{minutesTimer}:{secondsTimer}</span>
                </>
                : null
              }

            </div>
          </Col>
           
          <Col lg={12} className="mt-3">
            <CustomizedButton
              isFullWidth
              type="submit"
              className="rounded-5 "
              size="lg"
              isLoading={loading}
              variant={theme === "dark" ? "lightBlue" : "darkBlue"}
              onClick={() => handleSendOtp(otp)}
            >
              <span className="is-size-5 yekan-ExtraBold d-flex align-items-center justify-content-center">
                ورود
                <TiChevronLeft className="mr-2" />
              </span>
            </CustomizedButton>
          </Col>
          <Col lg={12} className="mt-3">
            <div className="w-100 is-size-7 d-flex justify-content-between">
              <Link to="/login" className="pointer link yekan-Bold center-content decoration"><BsArrowRight className="ml-1" size="14" />بازگشت</Link>
              <Link to="/" className="pointer text-purple yekan-Bold center-content"><GoHome className="ml-1" size="14" />بازگشت به صفحه اصلی</Link>
            </div>
          </Col>
        </div>

      </Col>
    </AuthTemplate >
  );
};

export default Otp;
