import * as Yup from "yup";
import regexes from "../constants/validatorRegexes";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const adminValidator = {
  create: Yup.object().shape({
    firstName: Yup.string()
      .required(requiredMessage("نام"))
      .min(3, "نام باید حداقل ۳ کاراکتر باشد "),
    lastName: Yup.string()
      .required(requiredMessage("نام خانوادگی"))
      .min(3, "نام خانوادگی باید حداقل ۳ کاراکتر باشد"),
    mobile: Yup.string()
      .required(requiredMessage("موبایل"))
      .matches(regexes.mobile, {
        message: "شماره موبایل وارد شده اشتباه است",
        excludeEmptyString: false,
      }),
    email: Yup.string()
      .required(requiredMessage("ایمیل"))
      .email("فرمت ایمیل اشتباه است"),
    password: Yup.string()
      .required(requiredMessage("رمز عبور"))
      // .matches(regexes.password.englishOnly, {
      //     message: "رمز عبور باید حروف انگلیسی باشد",
      //     excludeEmptyString: false,
      // })
      .matches(regexes.password.numberRequire, {
        message: "رمز عبور باید حداقل شامل یک عدد باشد",
        excludeEmptyString: false,
      })
      .matches(regexes.password.upperCaseRequire, {
        message: "رمز عبور باید حداقل شامل یک حرف بزرگ باشد",
        excludeEmptyString: false,
      })
      .matches(regexes.password.lowerCaseRequire, {
        message: "رمز عبور باید حداقل شامل یک حرف کوچک باشد",
        excludeEmptyString: false,
      })
      .matches(regexes.password.symbolRequire, {
        message: "رمز عبور باید شامل حداقل یک سیمبل(!@#$%^&*) باشد",
        excludeEmptyString: false,
      })
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
  }),

  edit: Yup.object().shape({
    firstName: Yup.string()
      .required(requiredMessage("نام"))
      .min(3, "نام باید حداقل ۳ کاراکتر باشد "),
    lastName: Yup.string()
      .required(requiredMessage("نام خانوادگی"))
      .min(3, "نام خانوادگی باید حداقل ۳ کاراکتر باشد"),
    mobile: Yup.string()
      .required(requiredMessage("موبایل"))
      .matches(regexes.mobile, {
        message: "شماره موبایل وارد شده اشتباه است",
        excludeEmptyString: false,
      }),
    email: Yup.string()
      .required(requiredMessage("ایمیل"))
      .email("فرمت ایمیل اشتباه است"),
  }),

  role: Yup.object().shape({
    roleName: Yup.string().required(requiredMessage("سطح دسترسی")),
    department: Yup.string().required(requiredMessage("دپارتمان")),
  }),

  // search: Yup.object().shape({
  //     firstName: Yup.string().min(3, "نام باید حداقل ۳ کاراکتر باشد "),
  //     lastName: Yup.string().min(3, "نام خانوادگی باید حداقل ۳ کاراکتر باشد"),
  //     mobile: Yup.string()
  //         .matches(regexes.mobile, {
  //             message: "شماره موبایل وارد شده اشتباه است",
  //             excludeEmptyString: false,
  //         }),
  //     email: Yup.string().email("فرمت ایمیل اشتباه است"),
  // }),
};
export default adminValidator;
