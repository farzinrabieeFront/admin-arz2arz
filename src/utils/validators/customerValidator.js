import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const customerValidator = {
    edit: Yup.object().shape({
        mobile: Yup.string().required(requiredMessage("موبایل"))
            .matches(regexes.mobile, {
                message: "شماره موبایل وارد شده اشتباه است",
                excludeEmptyString: false,
            }),
    }),
}
export default customerValidator