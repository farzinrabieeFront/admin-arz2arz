import { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import { TiChevronLeft, BsArrowRight, GoHome } from "react-icons/all";
import { Form, Formik, FastField } from "formik";
import { Link } from "react-router-dom";
import FormikInitialValues from "../../../utils/constants/formikInitialValues";
//components
import AuthTemplate from "../../../components/auth/template/Template";
import CustomizedInput from "../../../components/form/input/Input";
import CustomizedButton from "../../../components/form/button/Button";
import { toast } from "react-toastify";
import { authServices } from "../../../services";
import { useAuth, useTheme } from "../../../context";
import { authValidator } from "../../../utils/validators";

const ForgetPassword = (props) => {
    document.title = "ارز تو ارز | بازیابی رمز عبور";
    const { theme } = useTheme();
    const { loading, forgetPassword } = useAuth();

    const onSubmit = async (vals) => {
        try {
            await forgetPassword(vals)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthTemplate title="بازیابی رمز عبور" className="py-3 px-0 px-md-3 d-flex flex-wrap mt-3 align-content-center">
            <Col lg={12}>
                <Formik
                    initialValues={FormikInitialValues.auth.forgetPass}
                    validationSchema={authValidator.forgetPass}
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
                                    <Link to="/login" className="pointer link yekan-Bold center-content decoration"><BsArrowRight className="ml-1" size="14" />بازگشت</Link>
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

export default ForgetPassword;
