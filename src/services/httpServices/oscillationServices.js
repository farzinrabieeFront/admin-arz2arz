import endPoints from "../endPoints";
import axios from "../Http";

const oscillationServices = {
    list: (params = {}) => {
        return axios.get(endPoints.oscillation, { params });
    },
    post: (body) => {
        return axios.post(endPoints.oscillation, body);
    },
    current: (params = {}) => {
        return axios.get(endPoints.oscillation + `current/`, { params });
    },
}

export default oscillationServices;
