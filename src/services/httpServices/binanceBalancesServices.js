import endPoints from "../endPoints";
import axios from "../Http";

const binanceBalancesServices = {
  list: (params = {}) => {
    return axios.get(endPoints.binance, { params });
  },

}

export default binanceBalancesServices;

