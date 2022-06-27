import React, { Component, createContext, useContext } from "react";
import { withRouter } from "react-router-dom";
import { adminServices, authServices, cookieServices } from "../services";
import { Toastify } from "../utils";
import { connect } from "react-redux";
import { logoutUserAction, setUserDataAction } from "../redux/actions/user";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

class AuthProvider extends Component {
    state = {
        loading: false,
    }

    history = null;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.history = this.props.history;
    }

    signIn = async (vals) => {
        try {
            this.setState({ loading: true })
            const { data, status } = await authServices.login(vals)
            if (status === 200 && data.success) {
                // const { active2faSources, ...resData } = data.data
                // this.setState(
                //     {
                //         ...this.state,
                //         ...resData
                //     },
                //     () => this.check2faMethod(active2faSources)
                // )
                Toastify.success(data.message)
                cookieServices.set("access_token", data.data.access_token)
                cookieServices.set("refresh_token", data.data.refresh_token)
                this.history.push("/profile/");
                this.getUserData()
            }
        } catch (error) {
            Toastify.error(error.message)
        } finally {
            this.setState({ loading: false })
        }
    }


    check2faMethod = async (vals) => {
        if (vals.length > 1) {
            console.log("no response");
        } else {
            this.generateOtp(vals[0])
        }
    }

    generateOtp = async (vals) => {
        try {
            const { email, nonce } = this.state
            const body = {
                confirmSource: vals,
                email,
                nonce
            }
            const { data, status } = await authServices.generateOtp(body)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                const { nonce, expiryDate, resendOTPNonce } = data.data;
                this.setState(
                    {
                        ...this.state,
                        ...data.data,
                        confirmSource: vals,
                    }
                )
                const location = {
                    pathname: 'otp',
                    state: {
                        nonce,
                        expiryDate,
                        resendOTPNonce,
                        email,
                        confirmSource: vals,
                    }
                }
                this.history.push(location)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    resendOtp = async () => {
        try {
            const { nonce, confirmSource, resendOTPNonce, email } = this.state
            let body = {
                confirmSource,
                email,
                nonce: resendOTPNonce
            }
            let params = {
                resendOTP: true
            }
            const { data, status } = await authServices.resendOtp(body, params)

            if (status === 201 && data.success) {
                Toastify.success(data.message)
                const { expiryDate, ...resData } = data.data;

                this.setState({
                    ...this.state,
                    ...resData,
                    confirmSource,
                });
                const location = {
                    pathname: "otp",
                    state: {
                        nonce,
                        expiryDate,
                        resendOTPNonce,
                        email,
                        confirmSource,
                    },
                };

                this.history.push(location);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    confirmOtp = async (vals) => {
        try {
            this.setState({ loading: true })
            const { confirmSource, nonce, email } = this.state
            let body = {
                otpText: vals,
                confirmSource,
                nonce,
                email,
            }
            const { data, status } = await authServices.confirmOtp(body);
            if (status === 200 && data.success) {
                Toastify.success(data.message)
                cookieServices.set("access_token", data.data.access_token)
                cookieServices.set("refresh_token", data.data.refresh_token)
                this.history.push("/profile/");
                this.getUserData()
            }

        } catch (error) {
            Toastify.error(error.message)
        } finally {
            this.setState({ loading: false })
        }
    }

    forgetPassword = async (vals) => {
        try {
            this.setState({ loading: true })
            const { data, status } = await authServices.forgetPass.forgetPassword(vals)
            if (status === 200 && data.success) {
                const { active2faSources, ...resData } = data.data
                this.setState(
                    {
                        ...this.state,
                        ...resData
                    },
                    () => this.forgetPassCheck2faMethod(active2faSources)
                )
            }
        } catch (error) {
            Toastify.error(error.message)
        } finally {
            this.setState({ loading: false })
        }
    }

    forgetPassCheck2faMethod = async (vals) => {
        if (vals.length > 1) {
            console.log("no response");
        } else {
            this.forgetPassGenerateOtp(vals[0])
        }
    }

    forgetPassGenerateOtp = async (vals) => {
        try {
            const { email, nonce } = this.state
            const body = {
                confirmSource: vals,
                email,
                nonce
            }
            const { data, status } = await authServices.forgetPass.generateOtp(body)
            if (status === 201 && data.success) {
                Toastify.success(data.message)
                const { nonce, expiryDate, resendOTPNonce } = data.data;
                this.setState(
                    {
                        ...this.state,
                        ...data.data,
                        confirmSource: vals,
                    }
                )
                const location = {
                    pathname: 'forget-password-otp',
                    state: {
                        nonce,
                        expiryDate,
                        resendOTPNonce,
                        email,
                        confirmSource: vals,
                    }
                }
                this.history.push(location)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    forgetPassResendOtp = async () => {
        try {
            const { nonce, confirmSource, resendOTPNonce, email } = this.state
            let body = {
                confirmSource,
                email,
                nonce: resendOTPNonce
            }
            let params = {
                resendOTP: true
            }
            const { data, status } = await authServices.forgetPass.resendOtp(body, params)

            if (status === 201 && data.success) {
                Toastify.success(data.message)
                const { expiryDate, ...resData } = data.data;

                this.setState({
                    ...this.state,
                    ...resData,
                    confirmSource,
                });
                const location = {
                    pathname: 'forget-password-otp',
                    state: {
                        nonce,
                        expiryDate,
                        resendOTPNonce,
                        email,
                        confirmSource,
                    },
                };

                this.history.push(location);
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    forgetPassConfirmOtp = async (vals) => {
        try {
            this.setState({ loading: true })
            const { confirmSource, nonce, email } = this.state
            let body = {
                ...vals,
                confirmSource,
                nonce,
                email,
            }
            const { data, status } = await authServices.forgetPass.confirmOtp(body);
            if (status === 200 && data.success) {
                Toastify.success(data.message)
                const location = {
                    pathname: 'login',
                }
                this.history.push(location)
            }
        } catch (error) {
            Toastify.error(error.message)
        } finally {
            this.setState({ loading: false })
        }
    }

    getUserData = async () => {
        try {
            const { status, data } = await adminServices.current()
            if (status === 200 && data.success) {
                this.props.saveUserData(data.data)
            }
        } catch (error) {
            Toastify.error(error.message)
        }
    }

    signOut = async () => {
        try {
            const { status, data } = await authServices.logout()
            if (status === 200 && data.success) {
                this.props.clearUserData()
                this.history.push("/login")
                cookieServices.remove("access_token")
                cookieServices.remove("refresh_token")
            }
        } catch (error) {
            Toastify.error(error.message)
        }
 
    }
    render() {
        let values = {
            loading: this.state.loading,
            signIn: this.signIn,
            signOut: this.signOut,
            generateOtp: this.generateOtp,
            confirmOtp: this.confirmOtp,
            resendOtp: this.resendOtp,
            forgetPassword: this.forgetPassword,
            check2faMethod: this.check2faMethod,
            forgetPassCheck2faMethod: this.forgetPassCheck2faMethod,
            forgetPassGenerateOtp: this.forgetPassGenerateOtp,
            forgetPassConfirmOtp: this.forgetPassConfirmOtp,
            forgetPassResendOtp: this.forgetPassResendOtp,
        }
        return (
            <AuthContext.Provider value={values}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}
const mapStateToProps = function (state) {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveUserData: (data) => dispatch(setUserDataAction(data)),
        clearUserData: () => dispatch(logoutUserAction()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AuthProvider)
);