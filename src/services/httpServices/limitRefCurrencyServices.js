import endPoints from "../endPoints";
import axios from "../Http";

const limitRefCurrencyServices = {
    get: (params = {}) => {
        return axios.get(endPoints.refCurrency.limitation, { params });
    },
    post: (body) => {
        return axios.post(endPoints.refCurrency.limitation, body);
    },
    current: (body) => {
        return axios.get(endPoints.refCurrency.limitation + "/current", body);
    },
    usdt: {
        get: (params = {}) => {
            return axios.get(endPoints.refCurrency.limitation + "/fiatRefCurrencySalesLimit", { params });
        },
        post: (body) => {
            return axios.post(endPoints.refCurrency.limitation + "/fiatRefCurrencySalesLimit", body);
        },
        current: (body) => {
            return axios.get(endPoints.refCurrency.limitation + "/fiatRefCurrencySalesLimit/current", body);
        },
    }
};

export default limitRefCurrencyServices;