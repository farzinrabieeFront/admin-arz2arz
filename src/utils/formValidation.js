import * as Yup from "yup";
const requiredMessage = (name) => `* وارد کردن ${name} الزامی است .`;

export const loginFormSchema = Yup.object().shape({
  phone: Yup.string()
    .required(requiredMessage("شماره تلفن"))
    .matches(/^(0?)9\d{9}$/i, "شماره تلفن را درست وارد کنید"),
  password: Yup.string()
    .required(requiredMessage("رمز عبور"))
    .matches(/(?=.*[0-9])/, {
      message: "رمزعبور باید حداقل شامل یک عدد باشد",
      excludeEmptyString: false,
    })
    .matches(/(?=.*[a-z])/, {
      message: "رمزعبور باید حداقل شامل یک حرف کوچک باشد",
      excludeEmptyString: false,
    })
    .matches(/(?=.*[A-Z])/, {
      message: "رمزعبور باید حداقل شامل یک حرف بزرگ باشد",
      excludeEmptyString: false,
    })
    .matches(/(?=.*[!@#$%^&*])/, {
      message: "رمزعبور باید شامل حداقل یک سیمبل(!@#$%^&*) باشد",
      excludeEmptyString: false,
    })
    .matches(/(?=.{8,})/, {
      message: "طول رمز عبور باید حداقل ۸ کاراکتر باشد",
      excludeEmptyString: false,
    }),
});