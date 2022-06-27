

import endPoints from "../endPoints";
import axios from "../Http";

const fiatTransactionLimitServices = {
    get: (params = {}) => {
        return axios.get(endPoints.fiatTransactionLimit, { params });
    },
    post: (body) => {
        return axios.post(endPoints.fiatTransactionLimit, body);
    },
    current: (body) => {
        return axios.get(endPoints.fiatTransactionLimit + "/current", body);
    },
};

export default fiatTransactionLimitServices;
