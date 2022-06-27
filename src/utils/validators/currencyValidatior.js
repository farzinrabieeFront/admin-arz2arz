import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const currencyValidatior = {
    edit: Yup.object().shape({
        faName: Yup.string().matches(regexes.persianLetters, "لطفا به فارسی وارد کنید"),
    }),
}
export default currencyValidatior