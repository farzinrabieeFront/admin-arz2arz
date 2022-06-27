import endPoints from "../endPoints";
import axios from "../Http";

const activitiesServices = {
  get: (params = {}) => {
    return axios.get(endPoints.activities + `activityFilter/`, { params });
  },
  create: (body) => {
    return axios.post(endPoints.activities + `activityFilter/`, body);
  },
   
}

export default activitiesServices;