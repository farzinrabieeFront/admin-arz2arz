
import endPoints from "../endPoints";
import axios from "../Http";

const inactivityIntervalServices = {
    list: (params = {}) => {
        return axios.get(endPoints.activities.inactivityInterval, { params });
    },
    single: (params = {}) => {
        return axios.get(endPoints.activities.inactivityInterval + `action`, { params });
    },
    create: (body) => {
        return axios.post(endPoints.activities.inactivityInterval, body);
    },
    delete: (params = {}) => {
        return axios.delete(endPoints.activities.inactivityInterval + `action`, { params });
    },

}

export default inactivityIntervalServices;