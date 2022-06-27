
import endPoints from "../endPoints";
import axios from "../Http";

const priceRefCurrencyServices = {
    get: (params = {}) => {
        return axios.get(endPoints.refCurrency.price, { params });
    },
    post: (body) => {
        return axios.post(endPoints.refCurrency.price, body);
    },
    current: (body) => {
        return axios.get(endPoints.refCurrency.price + "/current", body);
    },
};

export default priceRefCurrencyServices;
