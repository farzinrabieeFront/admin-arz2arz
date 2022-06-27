import * as Yup from "yup";

const requiredMessage = (name) => `وارد کردن ${name} الزامی است`;

const articleValidator = {
  create: Yup.object().shape({
    title: Yup.string()
      .required(requiredMessage("عنوان مقاله"))
      .min(3, "عنوان مقاله باید حداقل ۳ کاراکتر باشد "),
    page_title: Yup.string()
      .required(requiredMessage("عنوان مرورگر"))
      .min(3, "عنوان مرورگر باید حداقل ۳ کاراکتر باشد "),
    url: Yup.string()
      .required(requiredMessage("Url"))
      .min(3, "Url باید حداقل ۳ کاراکتر باشد "),
    categories: Yup.string().required(requiredMessage("دسته بندی")),
    author: Yup.string().required(requiredMessage("نویسنده")),
    meta_description: Yup.string()
      .required(requiredMessage(",توضیحات Meta"))
      .min(3, "توضیحات Meta باید حداقل ۳ کاراکتر باشد "),
    meta_keyword: Yup.string()
      .required(requiredMessage("کلمات کلیدی"))
      .min(3, "کلمات کلیدی باید حداقل ۳ کاراکتر باشد "),
    meta_tag: Yup.string()
      .required(requiredMessage("تگ ها"))
      .min(3, "تگ ها باید حداقل ۳ کاراکتر باشد "),
    summary: Yup.string()
      .required(requiredMessage("توضیحات مختصر"))
      .min(3, "توضیحات مختصر باید حداقل ۳ کاراکتر باشد "),
    summary: Yup.string()
      .required(requiredMessage("توضیحات مختصر"))
      .min(3, "توضیحات مختصر باید حداقل ۳ کاراکتر باشد "),
  }),
};
export default articleValidator;
