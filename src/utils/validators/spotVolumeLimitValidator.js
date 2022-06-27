import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const spotVolumeLimitValidator = {
    create: Yup.object().shape({

        spotDepositLow: Yup.string().required(requiredMessage("کمترین حد خرید"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        spotDepositHigh: Yup.string().required(requiredMessage("بیشترین حد خرید"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        spotWithdrawLow: Yup.string().required(requiredMessage("کمترین حد فروش"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        spotWithdrawHigh: Yup.string().required(requiredMessage("بیشترین حد فروش"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
    }),
}
export default spotVolumeLimitValidator