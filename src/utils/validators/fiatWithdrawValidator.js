
import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const fiatWithdrawValidator = {
    approved: Yup.object().shape({
        refId: Yup.string().required(requiredMessage("کد پیگیری")),
    }),
    reject: Yup.object().shape({
        message : Yup.string().required(requiredMessage("پیغام")),
    }),

}
export default fiatWithdrawValidator