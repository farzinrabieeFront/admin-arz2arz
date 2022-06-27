
import * as Yup from "yup";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const activityValidator = {
    edit: Yup.object().shape({
        message: Yup.string().required(requiredMessage("پیام"))
            .min(8, "متن پیام باید حداقل ۸ کاراکتر باشد"),
    }),
}
export default activityValidator