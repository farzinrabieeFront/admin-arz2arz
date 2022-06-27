import endPoints from "../endPoints";
import axios from "../Http";

const categoryServices = {
  list: (params = {}) => {
    return axios.get(endPoints.category, { params });
  },
  create: (body) => {
    return axios.post(endPoints.category, body);
  },
  update: (id, body) => {
    return axios.patch(endPoints.category + `${id}/`, body);
  },
  delete: (id) => {
    return axios.delete(endPoints.category + `${id}/`);
  },
}

export default categoryServices;

