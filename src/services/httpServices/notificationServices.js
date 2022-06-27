
import endPoints from "../endPoints";
import axios from "../Http";

export const notificationServices = {
    create: (body) => {
        return axios.post(endPoints.notification, body);
    },
    list: (params = {}) => {
        return axios.get(endPoints.notification, { params });
    },
    single: (id) => {
        return axios.get(endPoints.notification + `${id}/`);
    },
    private: (body) => {
        return axios.post(endPoints.notification + `privateNotification/`, body);
    }
}

export default notificationServices;