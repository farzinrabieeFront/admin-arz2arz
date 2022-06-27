import { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import { TiChevronLeft, HiLockOpen,GoHome } from "react-icons/all";
import { Form, Formik, FastField } from "formik";
import FormikInitialValues from "../../../utils/constants/formikInitialValues";
//components
import AuthTemplate from "../../../components/auth/template/Template";
import CustomizedInput from "../../../components/form/input/Input";
import CustomizedButton from "../../../components/form/button/Button";
import { toast } from "react-toastify";
import { authServices } from "../../../services";
import { useAuth, useTheme } from "../../../context";
import { authValidator } from "../../../utils/validators";
import { Link } from "react-router-dom";

const Login = (props) => {
    document.title = "ارز تو ارز | ورود به ادمین پنل";
    const { theme } = useTheme();
    const { loading, signIn, forgetPass } = useAuth();

    const onSubmit = async (vals) => {
        try {
            await signIn(vals)
        } catch (error) {
            console.log(error);
        }
    }
    const handleForgetPass = async () => {
        try {
            await forgetPass()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <AuthTemplate title="ورود" className="py-3 px-0 px-md-3 d-flex flex-wrap mt-3 align-content-center">

            <Col lg={12}>
                <Formik
                    initialValues={FormikInitialValues.auth.login}
                    validationSchema={authValidator.login}
                    onSubmit={onSubmit}
                >
                    {({ isValid, dirty }) => (
                        <Form className="d-flex flex-wrap">
                            <Col lg={12} className="mb-3">
                                <FastField
                                    name="email"
                                    label="ایمیل"
                                    largeLabel
                                    as={CustomizedInput}
                                />
                            </Col>
                            <Col lg={12} className="mb-3">
                                <FastField
                                    type="password"
                                    name="password"
                                    label="رمز عبور"
                                    largeLabel
                                    as={CustomizedInput}
                                />
                            </Col>
                            <Col lg={12} className="mt-4">
                                <CustomizedButton
                                    isFullWidth
                                    type="submit"
                                    className="rounded-5 is-size-5 yekan-ExtraBold center-content"
                                    size="lg"
                                    isLoading={loading}
                                    variant={theme === "dark" ? "lightBlue" : "darkBlue"}
                                // disabled={isLoading || !(isValid && dirty)}
                                >
                                    تایید و ادامه
                                    <TiChevronLeft className="mr-2" />
                                </CustomizedButton>
                            </Col>
                            <Col lg={12} className="mt-3">
                                <div className="w-100 is-size-7 d-flex justify-content-between">
                                    {/* <Link to="/forget-password" className="pointer link center-content yekan-Bold decoration"><HiLockOpen className="ml-1" size="14" />فراموشی رمز عبور</Link> */}
                                    <Link to="/" className="pointer text-purple yekan-Bold center-content"><GoHome className="ml-1" size="14" />بازگشت به صفحه اصلی</Link>
                                </div>
                            </Col>
                        </Form>
                    )}
                </Formik>
            </Col>
        </AuthTemplate>
    );
};

export default Login;
