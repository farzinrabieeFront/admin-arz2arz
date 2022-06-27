
import axios from "../Http";
import endPoints from "../endPoints";


const twoFaServices = {
    patch: (id, body) => {
        return axios.patch(endPoints.customer + `2fa/${id}`, body);
    },
}

export default twoFaServices