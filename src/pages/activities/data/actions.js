const ActivityActions = {
  titleActions: [
    "صرافی",
    "واریز تومانی",
    "برداشت تومانی",
    "واریز ارزی",
    "برداشت ارزی",
    "معاملات خرید و فروش",
    "معاملات تبدیل ارز",
    "معاملات اتوماتیک",
  ],
  actions: [
    { _id: "spotDeposit", title: "واریز ارزی" },
    { _id: "spotWithdraws", title: "برداشت ارزی" },
    { _id: "fiatWithdraw", title: "برداشت تومانی" },
    { _id: "fiatDeposit", title: "واریز تومانی" },
    { _id: "trade", title: "معاملات تبدیل ارز" },
    { _id: "limitTrade", title: "معاملات اتوماتیک" },
    { _id: "fiatTrade", title: "معاملات خرید و فروش" },
  ],
  side: [
    { _id: "buy", title: "خرید" },
    { _id: "sell", title: "فروش" },
    { _id: "both", title: "خرید و فروش" },
  ],
};

export default ActivityActions;
