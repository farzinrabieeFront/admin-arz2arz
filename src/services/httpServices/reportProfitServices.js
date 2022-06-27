import endPoints from "../endPoints";
import axios from "../Http";

const reportProfitServices = {
    get: (params = {}) => {
        return axios.get(endPoints.reportProfit, { params });
    },
}

export default reportProfitServices
