import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const ticketValidator = {
    create: Yup.object().shape({
        category:Yup.string().required(requiredMessage('دسته بندی')),
        title: Yup.string().required(requiredMessage("موضوع"))
            .min(3, "موضوع باید حداقل ۳ کاراکتر باشد"),
        description: Yup.string().required(requiredMessage("متن پیام"))
            .min(3, "متن پیام باید حداقل ۳ کاراکتر باشد"),
    }),
    chat: Yup.object().shape({
        message: Yup.string().required(requiredMessage("پیغام"))
            .min(3, "متن پیغام باید حداقل ۳ کاراکتر باشد"),
    }),
    
}
export default ticketValidator