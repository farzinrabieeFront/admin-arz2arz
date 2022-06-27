import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const fiatVolumeLimitValidator = {
    create: Yup.object().shape({
      
        fiatBuyLow: Yup.string().required(requiredMessage("کمترین حد خرید"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        fiatBuyHigh: Yup.string().required(requiredMessage("بیشترین حد خرید"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        fiatSellLow: Yup.string().required(requiredMessage("کمترین حد فروش"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        fiatSellHigh: Yup.string().required(requiredMessage("بیشترین حد فروش"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
    }),
}
export default fiatVolumeLimitValidator