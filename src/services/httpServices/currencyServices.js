import endPoints from "../endPoints";
import axios from "../Http";

const currencyServices = {
  get: (params = {}) => {
    return axios.get(endPoints.currency, { params });
  },
  single: (id) => {
    return axios.get(endPoints.currency + `${id}/`);
  },
  search: (params = {}) => {
    return axios.get(endPoints.currency + "search/", { params });
  },
  edit: (id, body) => {
    return axios.patch(endPoints.currency + `${id}/`, body);
  },
}

export default currencyServices