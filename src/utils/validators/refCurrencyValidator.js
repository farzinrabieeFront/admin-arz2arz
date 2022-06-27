import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const refCurrencyValidator = {
    price: Yup.object().shape({
        down: Yup.string().required(requiredMessage("قیمت خرید"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        up: Yup.string().required(requiredMessage("قیمت فروش"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),

    }),
    limitation: Yup.object().shape({
        buy: Yup.string().required(requiredMessage("حد خرید"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        sell: Yup.string().required(requiredMessage("حد فروش"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
    }),
    USDTlimitation: Yup.object().shape({
        salesLimit: Yup.string().required(requiredMessage("حد فروش تتر"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
    }),
    volume: Yup.object().shape({
        volume: Yup.string().required(requiredMessage("حجم"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        price: Yup.string().required(requiredMessage("قیمت ارز مرجع"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
    }),

}
export default refCurrencyValidator