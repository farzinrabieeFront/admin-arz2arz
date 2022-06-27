
import endPoints from "../endPoints";
import axios from "../Http";

const roleServices = {
    get: () => {
        return axios.get(endPoints.role);
    },
    create: (body) => {
        return axios.post(endPoints.role, body);
    },
    delete: (body) => {
        return axios.delete(endPoints.role, { data: body });
    },

}

export default roleServices;
