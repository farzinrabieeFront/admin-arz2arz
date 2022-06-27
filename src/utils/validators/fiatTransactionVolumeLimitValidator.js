import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const fiatTransactionVolumeLimitValidator = {
    create: Yup.object().shape({

        fiatDepositLow: Yup.string().required(requiredMessage("کمترین حد خرید"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        fiatDepositHigh: Yup.string().required(requiredMessage("بیشترین حد خرید"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        fiatWithdrawLow: Yup.string().required(requiredMessage("کمترین حد فروش"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        fiatWithdrawHigh: Yup.string().required(requiredMessage("بیشترین حد فروش"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
    }),
}
export default fiatTransactionVolumeLimitValidator