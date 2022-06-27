import endPoints from "../endPoints";
import axios from "../Http";

const commissionServices = {
    list: (params = {}) => {
        return axios.get(endPoints.commissions, { params });
    },
    post: (body) => {
        return axios.post(endPoints.commissions, body);
    },
    current: (params = {}) => {
        return axios.get(endPoints.commissions + `current/`, { params });
    },
}

export default commissionServices;
