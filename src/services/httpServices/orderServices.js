import endPoints from "../endPoints";
import axios from "../Http";

const orderServices = {
    get: (params = {}) => {
        return axios.get(endPoints.orders, { params });
    },
    fiat:{
        get: (params = {}) => {
            return axios.get(endPoints.fiatOrders, { params });
        },
    }
}

export default orderServices
