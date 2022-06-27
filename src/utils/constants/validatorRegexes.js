const regexes = {
  mobile: /^(9|09|\+989)[0-3|9]\d{8}$/,
  password: {
    englishOnly: /[a-zA-Z]+?/,
    lowerCaseRequire: /(?=.*[a-z])/,
    upperCaseRequire: /(?=.*[A-Z])/,
    numberRequire: /(?=.*[0-9])/,
    symbolRequire: /(?=.*[!@#$%^&*])/,
  },
  number: /\d/,
  englishNumbers: /[Z0-9]/,
  persianLetters: /^[\u0600-\u06FF\s]+$/,
  nationalCode: /^\d{10}$/,
  postalCode: /^\d{10}$/,
  city: /^0\d{2,3}$/,
  phone: /^\d{8}$/,
};
export default regexes;
