
import axios from "../Http";
import endPoints from "../endPoints";


const walletServices = {
  list: (params = {}) => {
    return axios.get(endPoints.wallet, { params });
  },
  changeStatus:(id)=>{
    return axios.get(endPoints.wallet + `changeStatus/${id}/`)
  }
}

export default walletServices