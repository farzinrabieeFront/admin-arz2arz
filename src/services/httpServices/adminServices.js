import endPoints from "../endPoints";
import axios from "../Http";

const adminServices = {
  list: (params = {}) => {
    return axios.get(endPoints.admin, { params });
  },
  create: (body) => {
    return axios.post(endPoints.admin, body);
  },
  single: (id) => {
    return axios.get(endPoints.admin + `${id}/`);
  },
  update: (id, body) => {
    return axios.patch(endPoints.admin + `${id}/`, body);
  },

  search: (params = {}) => {
    return axios.get(endPoints.admin + "search/", { params })
  },
  current: () => {
    return axios.get(endPoints.admin + "current/")
  }
}

export default adminServices;