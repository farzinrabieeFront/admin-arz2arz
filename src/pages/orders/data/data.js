const OrdersData = {
    side: [
        { _id: "BUY", title: "خرید" },
        { _id: "SELL", title: "فروش" },
    ],
    status: [
        { _id: "NEW", title: "NEW" },
        { _id: "PENDING", title: "PENDING" },
        { _id: "CHECKING", title: "CHECKING" },
        { _id: "FILLED", title: "FILLED" },
        { _id: "PARTIALLY_FILLED", title: "PARTIALLY_FILLED" },
        { _id: "PENDING_CANCEL", title: "PENDING_CANCEL" },
        { _id: "EXPIRED", title: "EXPIRED" },
        { _id: "REJECTED", title: "REJECTED" },
        { _id: "CANCELED", title: "CANCELED" },
    ],
    fiatStatus:[
        { _id: "CONFIRMED", title: "CONFIRMED" },
        { _id: "WAITING", title: "WAITING" },
        { _id: "FAILED", title: "FAILED" },
    ],
}
export default OrdersData

