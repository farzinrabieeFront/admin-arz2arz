

import endPoints from "../endPoints";
import axios from "../Http";

const smartContractServices = {
    list: (params = {}) => {
        return axios.get(endPoints.smartContract, { params });
    },
    single: (id) => {
        return axios.get(endPoints.smartContract + `${id}/`);
    },
    create: (body) => {
        return axios.post(endPoints.smartContract, body);
    },

}

export default smartContractServices;