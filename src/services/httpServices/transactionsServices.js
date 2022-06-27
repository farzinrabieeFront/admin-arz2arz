
import endPoints from "../endPoints";
import axios from "../Http";

const transactionsServices = {
    fiat: {
        deposit: {
            get: (params = {}) => {
                return axios.get(endPoints.transactions.fiat.deposit, { params });
            },
        },
        withdraw: {
            get: (params = {}) => {
                return axios.get(endPoints.transactions.fiat.withdraw, { params });
            },
            single: (id) => {
                return axios.get(endPoints.transactions.fiat.withdraw + `${id}/`);
            },
            assign: (id, body) => {
                return axios.patch(endPoints.transactions.fiat.withdraw + `assign/${id}/`, body);
            },
            confirm: (id, body) => {
                return axios.patch(endPoints.transactions.fiat.withdraw + `confirm/${id}/`, body);
            },
            cancel: (id, body) => {
                return axios.patch(endPoints.transactions.fiat.withdraw + `cancel/${id}/`, body);
            },
        },
    },
    spot: {
        deposit: {
            get: (params = {}) => {
                return axios.get(endPoints.transactions.spot.deposit, { params });
            },
        },
        withdraw: {
            get: (params = {}) => {
                return axios.get(endPoints.transactions.spot.withdraw, { params });
            },
        },
    },

}

export default transactionsServices
