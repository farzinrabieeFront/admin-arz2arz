 

import endPoints from "../endPoints";
import axios from "../Http";

const accessLevelServices = {
  list: () => {
    return axios.get(endPoints.accessLevel);
  },
  create: (body) => {
    return axios.post(endPoints.accessLevel, body);
  },
  single: (id) => {
    return axios.get(endPoints.accessLevel + `${id}/`);
  },
  update: (id, body) => {
    return axios.patch(endPoints.accessLevel + `${id}/`, body);
  },
  
  search: (params = {}) => {
    return axios.get(endPoints.accessLevel + "search/", { params })
  }
}

export default accessLevelServices;