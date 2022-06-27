import endPoints from "../endPoints";
import axios from "../Http";

const customerServices = {
    list: (params = {}) => {
        return axios.get(endPoints.customer, { params });
    },
    single: (id) => {
        return axios.get(endPoints.customer + `${id}/`);
    },
    update: (id, body) => {
        return axios.patch(endPoints.customer + `${id}/`, body);
    },
    search: (params = {}) => {
        return axios.get(endPoints.customer + "search/", { params })
    },
    wallets: (params = {}) => {
        return axios.get(endPoints.customer + "wallet/", { params })
    },
    changeWalletStatus: (id, params = {}) => {
        return axios.get(endPoints.customer + `wallet/changeStatus/${id}`, { params })
    }
}

export default customerServices;