
import endPoints from "../endPoints";
import axios from "../Http";

const exchangeActivityServices = {
     
    get: (params = {}) => {
        return axios.get(endPoints.activities.exchange , { params });
    },
    create: (body) => {
        return axios.post(endPoints.activities.exchange , body);
    },
    // delete: (body) => {
    //     return axios.post(endPoints.activities.exchange + `activityFilter/`, body);
    // },

}

export default exchangeActivityServices;