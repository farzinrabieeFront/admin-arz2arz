import { useState } from "react";
import { Col } from "react-bootstrap";
import Styles from './AuthMethod.module.scss';
//components
import AuthTemplate from "../../../components/auth/template/Template";
import { authServices } from "../../../services";
import { Toastify } from "../../../utils";

const AuthMethod = (props) => {
  document.title = "ارز تو ارز | انتخاب روش ورود";
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateOtp = async (vals) => {
    try {
      setIsLoading(true);
      vals = {
        // otpText: vals,
        confirmSource: "sms",
        nonce: props.location.state.nonce,
        email: props.location.state.email,
      };

      const { data, status } = await authServices.generateOtp(vals);

      if (status === 201 && data.success) {
        Toastify.success(data.message)
        props.history.push({
          pathname: "otp",
          state: {
            // ttl: data.timeToLive,
            expiryDate: data.data.expiryDate,
            nonce: data.data.nonce,
            resendOTPNonce: data.data.resendOTPNonce,
            confirmSource: "sms",
            email: props.location.state.email,
          },
        });
      }
    } catch (error) {
      Toastify.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <AuthTemplate title="انتخاب روش ورود" className="py-3 px-0 px-md-3 d-flex flex-wrap mt-3 align-content-center">

      <Col lg={12}>

        <div className="d-flex flex-wrap">
          <Col lg={12} className="mt-4">
            <div className="pointer form-control" onClick={handleGenerateOtp}>sms</div>
          </Col>
        </div>

      </Col>
    </AuthTemplate >
  );
};

export default AuthMethod;
