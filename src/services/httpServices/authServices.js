import { cookieServices } from "..";
import endPoints from "../endPoints";
import axios from "../Http";

const authServices = {
  login: function (body) {
    return axios.post(endPoints.auth.login, body);
  },

  logout: function () {
    return axios.delete(endPoints.auth.logout);
  },

  generateOtp: function (body) {
    return axios.post(endPoints.auth.generateOtp, body);
  },
  confirmOtp: function (body) {
    return axios.post(endPoints.auth.confirmOtp, body);
  },
  resendOtp: function (body, params = {}) {
    return axios.post(endPoints.auth.generateOtp, body, { params });
  },
  refreshToken: function () {
    return axios.get(endPoints.auth.refreshToken);
  },
  forgetPass: {
    forgetPassword: function (body) {
      return axios.post(endPoints.auth.forgetPass.forgetPassword, body);
    },
    generateOtp: function (body) {
      return axios.post(endPoints.auth.forgetPass.generateOtp, body);
    },
    confirmOtp: function (body) {
      return axios.post(endPoints.auth.forgetPass.confirmOtp, body);
    },
    resendOtp: function (body, params = {}) {
      return axios.post(endPoints.auth.forgetPass.generateOtp, body, {
        params,
      });
    },
  },
};

export default authServices;
