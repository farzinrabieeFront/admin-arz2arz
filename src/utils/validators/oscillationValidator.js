
import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const oscillationValidator = {
    create: Yup.object().shape({
        percentage: Yup.string().required(requiredMessage("درصد اختلاف"))
            .matches(regexes.englishNumbers, {
                message: "لطفا اعداد انگلیسی وارد کنید",
                excludeEmptyString: false,
            }),
        name: Yup.string().required(requiredMessage("توضیحات"))
            .min(3, "توضیحات باید حداقل ۳ کاراکتر باشد")

    }),
}
export default oscillationValidator