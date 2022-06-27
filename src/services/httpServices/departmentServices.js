import endPoints from "../endPoints";
import axios from "../Http";

const departmentServices = {
    get: () => {
        return axios.get(endPoints.department);
    },
    post: (body) => {
        return axios.post(endPoints.department, body);
    },
    
}

export default departmentServices;
