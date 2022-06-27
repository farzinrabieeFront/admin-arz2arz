
import axios from "../Http";
import endPoints from "../endPoints";


const exchangeWalletServices = {
  list: (params = {}) => {
    return axios.get(endPoints.exchangeWallet, { params });
  },
  changeStatus: (id) => {
    return axios.get(endPoints.exchangeWallet + `changeStatus/${id}/`)
  }
}

export default exchangeWalletServices