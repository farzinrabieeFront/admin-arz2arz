
import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const fiatExchangeWalletValidator = {
    volume: Yup.object().shape({
        volume: Yup.string().required(requiredMessage("حجم"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
    }),

}
export default fiatExchangeWalletValidator