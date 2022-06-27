import { lazy } from "react";
import PrivateRoute from "./PrivateRoute";
import { Route, Switch, useLocation } from "react-router-dom";
import LayoutPanel from "./layout/Layout";
import SocketManager from "./context/SocketManager";

const Login = lazy(() => import("./pages/auth/login/Login"));
const ForgetPassword = lazy(() => import("./pages/auth/forget-password/ForgetPassword"));
const Otp = lazy(() => import("./pages/auth/otp/Otp"));
const AuthMethod = lazy(() => import("./pages/auth/auth-method/AuthMethod"));
const ForgetPasswordOtp = lazy(() => import("./pages/auth/forget-password-otp/ForgetPasswordOtp"));
const DashBoardPage = lazy(() => import("./pages/dashboard/DashBoard"));
const UsersPage = lazy(() => import("./pages/users/Users"));
const DetailUserPage = lazy(() => import("./pages/users/DetailUser"));
const AdminsPage = lazy(() => import("./pages/admins/Admins"));
const OnlineAdminPage = lazy(() => import("./pages/admins/online-admins/OnlineAdmin"));
const CreateAdmin = lazy(() => import("./pages/admins/CreateAdmin"));
const EditAdmin = lazy(() => import("./pages/admins/EditAdmin"));
const SessionPage = lazy(() => import("./pages/admins/sessions/SessionPage"));
const ActivitiesPage = lazy(() => import("./pages/activities/Activities"));
const ProfitsPage = lazy(() => import("./pages/profits/Profits"));
const ReportsPage = lazy(() => import("./pages/reports/Reports"));
const VerificationPage = lazy(() => import("./pages/verifications/Verifications"));
const DetailVerificationPage = lazy(() => import("./pages/verifications/DetailVerification"));
const FiatTransactionsPage = lazy(() => import("./pages/transactions/fiat/FiatTransactions"));
const SpotTransactionsPage = lazy(() => import("./pages/transactions/spot/SpotTransactions"));
const OrdersPage = lazy(() => import("./pages/orders/Orders"));
const OpenOrdersPage = lazy(() => import("./pages/orders/OpenOrders"));
const FiatOrdersPage = lazy(() => import("./pages/orders/FiatOrders"));
const MarketOrdersPage = lazy(() => import("./pages/orders/MarketOrders"));
const LimitOrdersPage = lazy(() => import("./pages/orders/LimitOrders"));
const ExchangeSettingPage = lazy(() => import("./pages/exchange/setting/Setting"));
const ExchangeWalletsPage = lazy(() => import("./pages/exchange/wallets/ExchangeWallets"));
const BinanceWalletsPage = lazy(() => import("./pages/exchange/binance-wallets/BinanceWallets"));
const WalletsPage = lazy(() => import("./pages/wallets/SpotWallets"));
const BankAccountsPage = lazy(() => import("./pages/bank-account/BankAccounts"));
const BanksPage=lazy(()=>import("./pages/bank/Banks"))
const DetailBankAccounts = lazy(() => import("./pages/bank-account/DetailBankAccounts"));
const TicketsPage = lazy(() => import("./pages/ticket/Tickets"));
const ChatTicketPage = lazy(() => import("./pages/ticket/chat-page/ChatTicket"));
const TicketFormPage = lazy(() => import("./pages/ticket/ticket-form/CreateTicketForm"));
const CurrenciesPage = lazy(() => import("./pages/currency/Currencies"));
const ArticlesPage = lazy(() => import("./pages/articles/Articles"));
const CreateArticleForm = lazy(() => import("./pages/articles/CreateArticleForm"));
const SettingArticleForm = lazy(() => import("./pages/articles/SettingArticleForm"));
const EditArticleForm = lazy(() => import("./pages/articles/EditArticleForm"));
const NotificationsPage = lazy(() => import("./pages/notifications/Notifications"));
const WithdrawCommissions = lazy(() => import("./pages/commissions/withdraw/WithdrawCommissions"));
const MarketCommissions = lazy(() => import("./pages/commissions/market/MarketCommissions"));
const LimitCommissions = lazy(() => import("./pages/commissions/limit/LimitCommissions"));
const FiatCommission = lazy(() => import("./pages/commissions/fiat/FiatCommission"));
const FaqPage = lazy(() => import("./pages/faq/Faq"));
const FaqCategoryPage = lazy(() => import("./pages/faq-category/FaqCategory"));
const LimitationPage = lazy(() => import("./pages/ref-currency/limitation/Limitation"));
const PriceRefCurrency = lazy(() => import("./pages/ref-currency/price/PriceRefCurrency"));
const VolumeRefCurrency = lazy(() => import("./pages/ref-currency/volume/VolumeRefCurrency"));
// const SettingPage = lazy(() => import("./pages/setting/Setting"));
const ProfilePage = lazy(() => import("./pages/profile/Profile"));
const FiatTransactionlimit = lazy(() => import("./pages/fiat/setting/Limitation"));
const SpotTransactionlimit = lazy(() => import("./pages/spot/setting/Limitation"));
const FiatOrderlimit = lazy(() => import("./pages/orders/setting/fiat/Limitation"));
const SpotFiatOrder = lazy(() => import("./pages/orders/setting/spot-fiat/SpotFiatOrder"));
const FiatExchangeWallet = lazy(() => import("./pages/exchange/fiat-exchange-wallet/FiatExchangeWallet"));
const FiatWithdrawPage = lazy(() => import("./pages/fiat/withdraw/FiatWithdraw"));
const SingleFiatWithdrawPage = lazy(() => import("./pages/fiat/withdraw/SingleFiatWithdraw"));

export default function Routing() {
    const { pathname } = useLocation();
    return (
        <Switch>
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/forget-password"} component={ForgetPassword} />
            <Route exact path={"/otp"} component={Otp} />
            <Route exact path={"/auth-method"} component={AuthMethod} />
            <Route exact path={"/forget-password-otp"} component={ForgetPasswordOtp} />
            <SocketManager pathname={pathname}>
                <PrivateRoute>
                    <LayoutPanel>
                        <Route path="/" exact>
                            <DashBoardPage />
                        </Route>
                        <Route path="/users" exact>
                            <UsersPage />
                        </Route>
                        <Route path="/users/:id" exact>
                            <DetailUserPage />
                        </Route>
                        <Route path="/admins/" exact>
                            <AdminsPage />
                        </Route>
                        <Route path="/admins/online-admins" exact>
                            <OnlineAdminPage />
                        </Route>
                        <Route path="/admins/create-admin" exact>
                            <CreateAdmin />
                        </Route>
                        <Route path="/admins/edit-admin/:id" exact>
                            <EditAdmin />
                        </Route>
                        <Route path="/admins/sessions/" exact>
                            <SessionPage />
                        </Route>
                        <Route path="/activities" exact>
                            <ActivitiesPage />
                        </Route>
                        <Route path="/verifications" exact>
                            <VerificationPage />
                        </Route>
                        <Route path="/verifications/:id" exact>
                            <DetailVerificationPage />
                        </Route>
                        <Route path="/fiat-transactions" exact>
                            <FiatTransactionsPage />
                        </Route>
                        <Route path="/spot-transactions" exact>
                            <SpotTransactionsPage />
                        </Route>
                        <Route path="/orders" exact>
                            <OrdersPage />
                        </Route>
                        <Route path="/open-orders" exact>
                            <OpenOrdersPage />
                        </Route>
                        <Route path="/fiat-orders" exact>
                            <FiatOrdersPage />
                        </Route>
                        <Route path="/market-orders" exact>
                            <MarketOrdersPage />
                        </Route>
                        <Route path="/limit-orders" exact>
                            <LimitOrdersPage />
                        </Route>
                        <Route path="/wallets" exact>
                            <WalletsPage />
                        </Route>
                        <Route path="/banks" exact>
                            <BanksPage />
                        </Route>
                        <Route path="/bank-accounts" exact>
                            <BankAccountsPage />
                        </Route>
                        <Route path="/bank-accounts/:id" exact>
                            <DetailBankAccounts />
                        </Route>
                        <Route path="/tickets" exact>
                            <TicketsPage />
                        </Route>
                        <Route path="/tickets/:id" exact>
                            <ChatTicketPage />
                        </Route>
                        <Route path="/ticket/new-ticke/:id" exact>
                            <TicketFormPage />
                        </Route>
                        <Route path="/currencies" exact>
                            <CurrenciesPage />
                        </Route>
                        <Route path="/articles" exact>
                            <ArticlesPage />
                        </Route>
                        <Route path="/articles/create-article" exact>
                            <CreateArticleForm />
                        </Route>
                        <Route path="/articles/articles-category" exact>
                            <SettingArticleForm />
                        </Route>
                        <Route path="/articles/edit-article/:articleId" exact>
                            <EditArticleForm />
                        </Route>
                        <Route path="/withdraw-commissions/" exact>
                            <WithdrawCommissions />
                        </Route>
                        <Route path="/market-order-commissions/" exact>
                            <MarketCommissions />
                        </Route>
                        <Route path="/limit-order-commissions/" exact>
                            <LimitCommissions />
                        </Route>
                        <Route path="/fiat-order-commissions/" exact>
                            <FiatCommission />
                        </Route>
                        <Route path="/notifications/" exact>
                            <NotificationsPage />
                        </Route>
                        <Route path="/profits/" exact>
                            <ProfitsPage />
                        </Route>
                        <Route path="/reports/" exact>
                            <ReportsPage />
                        </Route>
                        <Route path="/exchange-setting/" exact>
                            <ExchangeSettingPage />
                        </Route>
                        <Route path="/exchange-wallets/" exact>
                            <ExchangeWalletsPage />
                        </Route>
                        <Route path="/binance-wallets/" exact>
                            <BinanceWalletsPage />
                        </Route>
                        <Route path="/faq/" exact>
                            <FaqPage />
                        </Route>
                        <Route path="/faq-category/" exact>
                            <FaqCategoryPage />
                        </Route>
                        <Route path="/ref-currency/limitation" exact>
                            <LimitationPage />
                        </Route>
                        <Route path="/ref-currency/price" exact>
                            <PriceRefCurrency />
                        </Route>
                        <Route path="/ref-currency/volume" exact>
                            <VolumeRefCurrency />
                        </Route>
                        <Route path="/profile" exact>
                            <ProfilePage />
                        </Route>
                        <Route path="/fiat-transaction-limit/" exact>
                            <FiatTransactionlimit />
                        </Route>
                        <Route path="/spot-transaction-limit/" exact>
                            <SpotTransactionlimit />
                        </Route>
                        <Route path="/order/setting/fiat-order-limit/" exact>
                            <FiatOrderlimit />
                        </Route>
                        <Route path="/order/setting/spot-fiat-order/" exact>
                            <SpotFiatOrder />
                        </Route>
                        <Route path="/fiat-exchange-wallet/" exact>
                            <FiatExchangeWallet />
                        </Route>
                        <Route path="/fiat/fiat-withdraw/" exact>
                            <FiatWithdrawPage />
                        </Route>
                        <Route path="/fiat/fiat-withdraw/:id" exact>
                            <SingleFiatWithdrawPage />
                        </Route>
                    </LayoutPanel>
                </PrivateRoute>
            </SocketManager>
        </Switch>
    )
}
