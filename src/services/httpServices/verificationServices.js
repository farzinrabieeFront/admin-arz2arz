import endPoints from "../endPoints";
import axios from "../Http";



const verificationServices = {
  getData: function (params = {}) {
    return axios.get(endPoints.verification, { params });
  },
  getOneData: (id) => {
    return axios.get(endPoints.verification + `${id}/`);
  },
  create: function (id, body) {
    return axios.post(endPoints.verification + `${id}/`, body);
  },
  update: function (id, body) {
    return axios.patch(endPoints.verification + `${id}`, body);
  },
  verifyIdentity: function (id, body) {
    return axios.patch(endPoints.verification + `verifyIdentity/${id}`, body);
  },
  search: function (params = {}) {
    return axios.get(endPoints.verification + `search/`, { params });
  },
};

export default verificationServices;
