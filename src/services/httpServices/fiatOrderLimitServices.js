
import endPoints from "../endPoints";
import axios from "../Http";

const fiatOrderLimitServices = {
    get: (params = {}) => {
        return axios.get(endPoints.fiatOrderLimit, { params });
    },
    post: (body) => {
        return axios.post(endPoints.fiatOrderLimit, body);
    },
    current: (body) => {
        return axios.get(endPoints.fiatOrderLimit + "/current", body);
    },
};

export default fiatOrderLimitServices;
