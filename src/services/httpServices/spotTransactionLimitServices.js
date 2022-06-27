

import endPoints from "../endPoints";
import axios from "../Http";

const spotTransactionLimitServices = {
    get: (params = {}) => {
        return axios.get(endPoints.spotTransactionLimit, { params });
    },
    post: (body) => {
        return axios.post(endPoints.spotTransactionLimit, body);
    },
    current: (body) => {
        return axios.get(endPoints.spotTransactionLimit + "/current", body);
    },
};

export default spotTransactionLimitServices;
