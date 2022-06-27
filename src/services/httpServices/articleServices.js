import endPoints from "../endPoints";
import axios from "../Http";

const articleServices = {
  list: (params = {}) => {
    return axios.get(endPoints.article, { params });
  },
  create: (body) => {
    return axios.post(endPoints.article, body);
  },
  detail: (id) => {
    return axios.get(endPoints.article + `${id}/`);
  },
  update: (id, body) => {
    return axios.patch(endPoints.article + `${id}/`, body);
  },
  delete: (id) => {
    return axios.delete(endPoints.article + `${id}/`);
  },
  search: (params = {}) => {
    return axios.get(endPoints.article + "search/", { params })
  }
}

export default articleServices;