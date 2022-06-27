import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { TiChevronLeft, BsArrowRight, GoHome } from "react-icons/all";
import { Form, Formik, FastField } from "formik";
//components
import AuthTemplate from "../../../components/auth/template/Template";
import CustomizedInput from "../../../components/form/input/Input";
import CustomizedButton from "../../../components/form/button/Button";
import { authServices, cookieServices } from "../../../services";
import { toast } from "react-toastify";
import CustomizedOtp from '../../../components/form/otp-input/CustomizedOtp';
import { useAuth, useTheme } from "../../../context";
import { authValidator } from "../../../utils/validators";
import { Link } from "react-router-dom";
import { Toastify } from "../../../utils";

const ForgetPasswordOtp = (props) => {
    document.title = "ارز تو ارز | رمز یکبار مصرف";
    const intervalTimerRef = useRef(null);
    const { theme } = useTheme();
    const { loading, forgetPassConfirmOtp, forgetPassResendOtp } = useAuth();
    const { expiryDate } = props.location.state
    /** states & variables */
    const [minutesTimer, setMinutesTimer] = useState(0);
    const [secondsTimer, setSecondsTimer] = useState(0);
    const [otp, setOtp] = useState('')



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
        if (otp) {
            try {
                let body = {
                    ...vals,
                    otpText: otp
                }
                await forgetPassConfirmOtp(body)
            } catch (error) {
                console.log(error);
            }
        } else {
            Toastify.error('وارد کردن رمز یکبار مصرف الزامی می‌باشد')
        }

    }

    return (
        <AuthTemplate title="رمز یکبار مصرف" className="py-3 px-0 px-md-3 d-flex flex-wrap mt-3 align-content-center">

            <Col lg={12}>

                <Formik
                    initialValues={{ password: "" }}
                    validationSchema={authValidator.password}
                    onSubmit={handleSendOtp}
                >
                    {({ isValid, dirty }) => (
                        <Form className="d-flex flex-wrap">
                            <Col lg={12} className="mb-4">
                                <FastField
                                    name="password"
                                    label="رمز عبور جدید "
                                    placeholder="رمز عبور جدید خود را وارد کنید"
                                    largeLabel
                                    type="password"
                                    as={CustomizedInput}
                                />
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label className="is-size-6 text-gainsboro form-label">رمز یکبار مصرف ارسال شده به موبایل خود را وارد کنید</label>
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
                                        onClick={() => { if (!(minutesTimer || secondsTimer)) forgetPassResendOtp() }}
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
                                    className="rounded-5 is-size-5 yekan-ExtraBold center-content"
                                    size="lg"
                                    isLoading={loading}
                                    variant={theme === "dark" ? "lightBlue" : "darkBlue"}
                                // disabled={isLoading || !(isValid && dirty)}
                                >
                                    ثبت
                                    <TiChevronLeft className="mr-2" />
                                </CustomizedButton>
                            </Col>
                            <Col lg={12} className="mt-3">
                                <div className="w-100 is-size-7 d-flex justify-content-between">
                                    <Link to="/forget-password" className="pointer link yekan-Bold center-content decoration"><BsArrowRight className="ml-1" size="14" />بازگشت</Link>
                                    <Link to="/" className="pointer text-purple yekan-Bold center-content"><GoHome className="ml-1" size="14" />بازگشت به صفحه اصلی</Link>
                                </div>
                            </Col>
                        </Form>
                    )}
                </Formik>
            </Col>
        </AuthTemplate >
    );
};

export default ForgetPasswordOtp;
