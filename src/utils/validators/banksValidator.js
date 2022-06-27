import * as Yup from "yup";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const banksValidator = {
  bank: Yup.object().shape({
    title: Yup.string()
      .required(requiredMessage("نام بانک"))
      .min(3, "نام بانک باید حداقل 3 کاراکتر باشد"),
    hardNumber: Yup.number()
      .required(requiredMessage("کد 6 رقمی"))
      .min(6, "کد ورودی باید 6 رقم باشد")
      .max(6, "کد ورودی باید 6 رقم باشد"),
  }),
};
export default banksValidator;
