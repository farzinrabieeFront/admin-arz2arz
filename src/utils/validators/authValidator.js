import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const authValidator = {
    login: Yup.object().shape({
        email: Yup.string().required(requiredMessage("ایمیل")).email("فرمت ایمیل اشتباه است"),
        password: Yup.string().required(requiredMessage("رمز عبور")),
    }),
    forgetPass: Yup.object().shape({
        email: Yup.string().required(requiredMessage("ایمیل")).email("فرمت ایمیل اشتباه است"),
    }),
    password: Yup.object().shape({
        password: Yup.string().required(requiredMessage("رمز عبور"))
            .matches(regexes.password.numberRequire, {
                message: "رمز عبور باید حداقل شامل یک عدد باشد",
                excludeEmptyString: false,
            })
            .matches(regexes.password.upperCaseRequire, {
                message: "رمز عبور باید حداقل شامل یک حرف بزرگ باشد",
                excludeEmptyString: false,
            })
            .matches(regexes.password.symbolRequire, {
                message: "رمز عبور باید شامل حداقل یک سیمبل(!@#$%^&*) باشد",
                excludeEmptyString: false,
            })
            .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    })
}
export default authValidator