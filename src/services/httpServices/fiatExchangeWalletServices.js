import endPoints from "../endPoints";
import axios from "../Http";

const fiatExchangeWalletServices = {
    get: (params = {}) => {
        return axios.get(endPoints.fiatExchangeWallet, { params });
    },
    post: (body) => {
        return axios.post(endPoints.fiatExchangeWallet, body);
    },
    current: (body) => {
        return axios.get(endPoints.fiatExchangeWallet + "/current", body);
    },
};

export default fiatExchangeWalletServices;

