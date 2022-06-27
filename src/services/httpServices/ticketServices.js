import axios from "axios";
import endPoints from "../endPoints";

const ticketServices = {
  list: (params = {}) => {
    return axios.get(endPoints.ticket, { params });
  },
  categoryList: () => {
    return axios.get(endPoints.ticket + "/category");
  },
  categorySlingle: () => {
    return axios.get(endPoints.ticket + "/category");
  },
  update: (id, body) => {
    return axios.get(endPoints.ticket + `${id}/`, body);
  },
  detail: (id) => {
    return axios.get(endPoints.ticket + `${id}/message`);
  },
  changeStatus: (id, body) => {
    return axios.patch(endPoints.ticket + `changeStatus/${id}`, body);
  },
  create: (body) => {
    return axios.post(endPoints.ticket + "message", body);
  },
  createTicket: (body) => {
    return axios.post(endPoints.ticket, body);
  },
  search: (params = {}) => {
    return axios.get(endPoints.ticket + "search", { params });
  },
  changeDepartment: (id, body) => {
    return axios.patch(endPoints.ticket + `changeDepartment/${id}`, body);
  },
};

export default ticketServices;
