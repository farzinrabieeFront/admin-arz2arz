import endPoints from "../endPoints";
import axios from "../Http";

const authorServices = {
  list: () => {
    return axios.get(endPoints.author);
  },
  create: (body) => {
    return axios.post(endPoints.author, body);
  },
  update: (id, body) => {
    return axios.put(endPoints.author + `${id}/`, body);
  },
  delete: (id) => {
    return axios.delete(endPoints.author + `${id}/`);
  },
}

export default authorServices;

