import endPoints from "../endPoints";
import axios from "../Http";

const profitServices = {
    get: (params = {}) => {
        return axios.get(endPoints.profit, { params });
    },
}

export default profitServices
