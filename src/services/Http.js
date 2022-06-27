import axios from "axios";
import { authServices, cookieServices } from ".";
// const baseUrl = `${process.env.HOSEINI_FINANCE_BASE_URL}`;
// const baseUrl = "http://194.5.192.82:4000/api/v1/admin";
// const baseUrl = "http://194.5.192.82:4000/api/v1/admin";

axios.interceptors.request.use(
  (config) => {
    // config.baseURL = baseUrl;
    if (
      cookieServices.get("access_token") &&
      cookieServices.get("refresh_token")
    ) {
      config.headers["access_token"] = cookieServices.get("access_token");
      config.headers["refresh_token"] = cookieServices.get("refresh_token");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const { status } = error.response;

    /** Do something with response error */
    if (status >= 400 && status < 500) {
      if (status === 400) {
        return Promise.reject(error.response.data);
      } else if (status === 401) {
        // if (error.response.data.redirectToRefresh) {
          try {
            const { data, status } = await authServices.refreshToken();
            if (status === 200 && data.success) {
              cookieServices.set("accessToken", data.access_token);
            }
          } catch (error) {}
        // } else if (error.response.data.redirectToLogin) {
        //   cookieServices.remove("refreshToken");
        //   cookieServices.remove("accessToken");
        //   window.location.replace("/login");
        // }
      } else if (status === 403) {
        return Promise.reject(error.response.data);
      } else if (status === 404) {
        return Promise.reject(error.response.data);
      } else if (status === 422) {
        return Promise.reject(error.response.data);
      }
    } else if (status >= 500) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

const methods = {
  axios,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default methods;
