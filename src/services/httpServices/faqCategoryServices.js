
import endPoints from "../endPoints";
import axios from "../Http";

export const faqCategoryServices = {
  list: (params = {}) => {
    return axios.get(endPoints.faqCategory, { params });
  },
  create: (body) => {
    return axios.post(endPoints.faqCategory, body);
  },
  single: (id) => {
    return axios.get(endPoints.faqCategory + `${id}/`);
  },
  update: (id, body) => {
    return axios.patch(endPoints.faqCategory + `${id}/`, body);
  },
  delete: (id) => {
    return axios.delete(endPoints.faqCategory + `${id}/`);
  },
  search: (params = {}) => {
    return axios.get(endPoints.faqCategory + "search/", { params })
  }
}

export default faqCategoryServices;