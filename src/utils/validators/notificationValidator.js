import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const notificationValidator = {
    create: Yup.object().shape({
        title: Yup.string().required(requiredMessage("عنوان"))
            .min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
        status: Yup.string().required(requiredMessage("نوع پیغام")),
        description: Yup.string().required(requiredMessage("توضیحات"))
            .min(3, "توضیحات باید حداقل ۳ کاراکتر باشد"),

    }),
}
export default notificationValidator