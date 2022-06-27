import endPoints from "../endPoints";
import axios from "../Http";

const bankServices = {
  list: (params = {}) => {
    return axios.get(endPoints.banks, { params });
  },
  single: (id) => {
    return axios.get(endPoints.banks + `${id}/`);
  },
  create: (body) => {
    return axios.post(endPoints.banks, body);
  },
  update: (id, body) => {
    return axios.patch(endPoints.banks + `${id}/`, body);
  },
  delete: (id) => {
    return axios.delete(endPoints.banks + `${id}/`);
  },
};

export default bankServices;
