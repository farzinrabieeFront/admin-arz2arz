import endPoints from "../endPoints";
import axios from "../Http";

const onlineAdminServices = {
  list: (params = {}) => {
    return axios.get(endPoints.onlineAdmin, { params });
  },
  create: (body) => {
    return axios.post(endPoints.onlineAdmin, body);
  },
  single: (id) => {
    return axios.get(endPoints.onlineAdmin + `${id}/`);
  },
  update: (id, body) => {
    return axios.patch(endPoints.onlineAdmin + `${id}/`, body);
  },

  search: (params = {}) => {
    return axios.get(endPoints.onlineAdmin + "search/", { params })
  },
  current: () => {
    return axios.get(endPoints.onlineAdmin + "current/")
  }
}

export default onlineAdminServices;