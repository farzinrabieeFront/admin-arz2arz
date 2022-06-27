
import endPoints from "../endPoints";
import axios from "../Http";

export const faqServices = {
  list: (params = {}) => {
    return axios.get(endPoints.faq, { params });
  },
  create: (body) => {
    return axios.post(endPoints.faq, body);
  },
  single: (id) => {
    return axios.get(endPoints.faq + `${id}/`);
  },
  update: (id, body) => {
    return axios.patch(endPoints.faq + `${id}/`, body);
  },
  delete: (id) => {
    return axios.delete(endPoints.faq + `${id}/`);
  },
  search: (params = {}) => {
    return axios.get(endPoints.faq + "search/", { params })
  }
}

export default faqServices;