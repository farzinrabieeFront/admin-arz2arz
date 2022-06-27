import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const identityValidator = {
    edit: Yup.object().shape({
        adminMessage: Yup.string().required(requiredMessage("پیغام"))
            .min(8, "متن پیغام باید حداقل ۸ کاراکتر باشد"),
    }),
}
export default identityValidator