const FormikInitialValues = {
    auth: {
        login: {
            email: "",
            // email: "mahdis.rezavandi@yahoo.com",
            password: "",
            // password: "Mahdis9876",
        },
        generateOtp: {
            email: "",
            nonce: "",
            confirmSource: "sms",
        },
        confirmOtp: {
            email: "",
            nonce: "",
            confirmSource: "sms",
            otpText: "",
        },
        forgetPass: {
            // email: "mahdis.rezavandi@yahoo.com",
            email: "",
        }
    },
    fiat: {
        volumeLimit: {
            fiatDepositLow: "",
            fiatDepositHigh: "",
            fiatWithdrawLow: "",
            fiatWithdrawHigh: "",
            fiatBuyLow: "",
            fiatBuyHigh: "",
            fiatSellLow: "",
            fiatSellHigh: "",
        },
    },
    identity: {
        search: {
            firstName: "",
            lastName: "",
            nationalCode: "",
            email: "",
            mobile: "",
            verified: "",
        }
    },
    article: {
        form: {
            title: "dsdsd",
            page_title: "",
            ispublished: false,
            meta_tag: "",
            meta_description: "",
            meta_keyword: "",
            url: "",
            summary: "",
            categories: "",
            author: "",
            publish_time: new Date()
        }
    },
    admin: {
        form: {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            password: "",
            // isActive : "",
        },
        search: {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
        }
    },
    session: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        isRevoked: "",
    },
    customer: {
        search: {
            email: "",
            mobile: "",
            isActive: "",
            isVerified: "",
            nationalCode: "",
            lastName: "",
            firstName: ""
        }
    },
    bankAccount: {
        search: {
            email: "",
            // bank: "",
            card: "",
            sheba: "",
            verified: "",
            firstName: "",
            lastName: "",
            // bankAccountNumber: ""
        }
    },
    ticket: {
        createTicket: {
            title: "",
            description: "",
        },
        search: {
            status: "",
            title: "",
            email: "",
            ticketID: "",
            mobile: "",
        }
    },
    activitie: {
        start: new Date(),
        end: new Date(),
        action: "",
    },
    spotWallets: {
        customerEmail: "",
        currency: "",
        isActive: "",
    },
    currency: {
        name: "",
        symbol: "",
        faName: "",
        isActive: "",
        // isMain: "",
        depositIsSupport: "",
        withdrawIsSupport: "",
        search_keys: ""
    },
    orders: {
        startAt: "",
        endAt: "",
        pageNumber: "",
        perPage: "",
        marketId: "",
        orderId: "",
        mobile: "",
        pairedSymbol: "",
        baseAsset: "",
        quoteAsset: "",
        zone: "",
        type: "",
        limitStatus: "",
        side: "",
        status: "",
        spotAsset: "",
        email: "",
        status: "",
    },
    faq: {
        question: "",
        answer: "",
        category: ""
    },
    referenceCurrency: {
        up: "",
        down: "",
    },
    transactions: {
        startAt: "",
        endAt: "",
        status: "",
        email: "",
        refId: "",
        trackingCode: "",
        currency:"",
    },
}

export default FormikInitialValues