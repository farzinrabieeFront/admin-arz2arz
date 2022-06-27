import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const faqValidator = {
    category: Yup.object().shape({
        title: Yup.string().required(requiredMessage("عنوان دسته بندی"))
            .min(3, "عنوان دسته بندی باید حداقل ۳ کاراکتر باشد"),
    }),
    create: Yup.object().shape({
        category: Yup.string().required(requiredMessage("دسته بندی")),
        question: Yup.string().required(requiredMessage("عنوان سوال"))
            .min(3, "عنوان سوال باید حداقل ۳ کاراکتر باشد"),
        answer: Yup.string().required(requiredMessage("پاسخ"))
            .min(3, "متن پاسخ باید حداقل ۳ کاراکتر باشد"),
    }),

}
export default faqValidator