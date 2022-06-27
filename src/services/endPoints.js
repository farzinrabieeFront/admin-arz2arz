let baseUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://194.5.192.82:4000/api/v1/admin"
    : "https://main.arz2arz.net/api/v1/admin";
// const baseUrl = "https://194.5.192.82:4000/api/v1/admin";
let trade =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://194.5.192.82:8088/v1/main"
    : "http://backend.arz2arz.com/tbackend/v1/main";



const endPoints = {
  auth: {
    login: `${baseUrl}/auth/login/`,
    logout: `${baseUrl}/auth/logout/`,
    generateOtp: `${baseUrl}/auth/login/generateOTP/`,
    confirmOtp: `${baseUrl}/auth/login/confirmOtp/`,
    refreshToken: `${baseUrl}/auth/renewAccessToken/`,
    forgetPass: {
      forgetPassword: `${baseUrl}/auth/forgetPassword/`,
      generateOtp: `${baseUrl}/auth/forgetPassword/generateOTP/`,
      confirmOtp: `${baseUrl}/auth/forgetPassword/confirmOtp/`,
    },
  },
  binance: `${baseUrl}/exchange/financial/balance`,
  admin: `${baseUrl}/adminManagement/`,
  onlineAdmin: `${baseUrl}/adminManagement/onlineAdmins/`,
  session: `${baseUrl}/session/`,
  customer: `${baseUrl}/customer/customerManagement/`,
  article: `${baseUrl}/article/`,
  category: `${baseUrl}/category/`,
  ticket: `${baseUrl}/ticket/`,
  user: `${baseUrl}/user/`,
  ticketMessage: `${baseUrl}/ticketMessage/`,
  verification: `${baseUrl}/customer/identity/`,
  author: ``,
  accessLevel: `${baseUrl}/admin-type/`,
  commissions: `${baseUrl}/commissions/`,
  oscillation: `${baseUrl}/exchange/financial/oscillation/`,
  banks: `${baseUrl}/bank/`,
  bankAccount: `${baseUrl}/customer/bankAccount/`,
  wallet: `${baseUrl}/spot/wallet/`,
  exchangeWallet: `${baseUrl}/spot/exchangeWallet/`,
  activities: {
    inactivityInterval: `${baseUrl}/exchange/setting/inactivityInterval/`,
    exchange: `${baseUrl}/exchange/setting/exchangeActivity/`,
  },
  department: `${baseUrl}/department/`,
  role: `${baseUrl}/role/`,
  smartContract: `${baseUrl}/spot/smart-contract/`,

  // refrence: `${baseUrl}/exchange/financial/referenceCurrency`,
  orders: `${baseUrl}/exchange/financial/order/`,
  fiatOrders: `${baseUrl}/exchange/financial/fiatOrder/`,
  transactions: {
    fiat: {
      deposit: `${baseUrl}/fiat/deposit/`,
      withdraw: `${baseUrl}/fiat/withdraw/`,
    },
    spot: {
      deposit: `${baseUrl}/spot/deposit/`,
      withdraw: `${baseUrl}/spot/withdraw/`,
    },
  },
  // profit: `${baseUrl}/exchange/financial/profit/`,
  profit: `${baseUrl}/profit/`,
  reportProfit: `${baseUrl}/exchange/financial/profit/`,
  faqCategory: `${baseUrl}/faqManagement/`,
  faq: `${baseUrl}/faqManagement/question/`,
  currency: `${baseUrl}/spot/currency/`,
  refCurrency: {
    price: `${baseUrl}/exchange/financial/referenceCurrency`,
    volume: `${baseUrl}/exchange/financial/referenceCurrency/AssetVolumeManagement`,
    limitation: `${baseUrl}/exchange/financial/referenceCurrencyLimit`,
  },
  notification: `${baseUrl}/notifications/`,
  fiatOrderLimit: `${baseUrl}/fiat/fiatBuySellVolumeLimit/`,
  fiatTransactionLimit: `${baseUrl}/fiat/fiatDepositWithdrawVolumeLimit/`,
  spotTransactionLimit: `${baseUrl}/spot/DepositWithdrawVolumeLimit/`,
  fiatExchangeWallet: `${baseUrl}/fiat/fiatExchangeWallet`,
};
export default endPoints;
