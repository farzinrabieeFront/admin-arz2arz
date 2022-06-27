import endPoints from "../endPoints";
import axios from "../Http";

const sessionServices = {
    list: (params = {}) => {
        return axios.get(endPoints.session, { params });
    },
    single: (id, params = {}) => {
        return axios.get(endPoints.session + `admin/${id}/`, { params });
    },
    search: (params = {}) => {
        return axios.get(endPoints.session + "search/", { params })
    },
    delete: (id) => {
        return axios.delete(endPoints.session + `${id}/`);
    },
}

export default sessionServices;