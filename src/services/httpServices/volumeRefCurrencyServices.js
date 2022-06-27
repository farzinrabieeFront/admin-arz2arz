import endPoints from "../endPoints";
import axios from "../Http";

const volumeRefCurrencyServices = {
    get: (params = {}) => {
        return axios.get(endPoints.refCurrency.volume, { params });
    },
    post: (body) => {
        return axios.post(endPoints.refCurrency.volume, body);
    },
    current: (body) => {
        return axios.get(endPoints.refCurrency.volume + "/current", body);
    },
};

export default volumeRefCurrencyServices;