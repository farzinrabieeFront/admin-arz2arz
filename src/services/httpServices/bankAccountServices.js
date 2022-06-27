import endPoints from "../endPoints";
import axios from "../Http";

const bankAccountServices = {
    list: (params = {}) => {
        return axios.get(endPoints.bankAccount, { params });
    },
    single: (id) => {
        return axios.get(endPoints.bankAccount + `${id}/`);
    },
    create: (body) => {
        return axios.post(endPoints.bankAccount, body);
    },
    update: (id, body) => {
        return axios.patch(endPoints.bankAccount + `${id}/`, body);
    },
    search: (params = {}) => {
        return axios.get(endPoints.bankAccount + "search/", { params })
    },
    verifybankAccount: function (id, body) {
        return axios.patch(endPoints.bankAccount + `verify/${id}`, body);
    },
    banned: function (id, body) {
        return axios.patch(endPoints.bankAccount + `ban/${id}`, body);
    },
}

export default bankAccountServices;