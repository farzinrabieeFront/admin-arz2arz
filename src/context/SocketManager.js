import { createContext, useContext, Component } from "react";
import io from "socket.io-client";
import { withRouter } from "react-router-dom";
import { cookieServices } from "../services";

export const SocketContext = createContext({});

// defining a useWebsocket hook for functional components
export const useWebsocket = () => useContext(SocketContext);

class SocketManager extends Component {
  state = {
    prices: {},
    allOpenOrders: [],
    allSpotOrders: [],
    dailyOrders: "",
    onlineUsers: "",
    allUsers: "",
    lastFiatOrders: [],
    newAdminUpdate: {},
  };

  socket = null;

  constructor(props) {
    super(props);
    // this.pathname = props.pathname;

    this.socket = io.connect("http://194.5.192.82:8089/", {
      transports: ["websocket"],
      rejectUnauthorized: false,
      secure: true,
      reconnectionDelayMax: 10000,
      extraHeaders: {
        admin_access_token: cookieServices.get("access_token"),
        admin_refresh_token: cookieServices.get("refresh_token"),
      },
      query: {
        admin_access_token: cookieServices.get("access_token"),
        admin_refresh_token: cookieServices.get("refresh_token"),
      },
    });

    //listeners

    this.socket.on("allOpenOrders", (allOpenOrders) => {
      this.setState({
        ...this.state,
        allOpenOrders,
      });
    });

    this.socket.on("allSpotOrders", (allSpotOrders) => {
      this.setState({
        ...this.state,
        allSpotOrders,
      });
    });

    this.socket.on("prices", (prices) => {
      this.setState({
        ...this.state,
        prices,
      });
    });

    this.socket.on("dailyOrders", (dailyOrders) => {
      this.setState({
        ...this.state,
        dailyOrders,
      });
    });
    this.socket.on("onlineUsers", (onlineUsers) => {
      this.setState({
        ...this.state,
        onlineUsers,
      });
    });
    this.socket.on("allUsers", (allUsers) => {
      this.setState({
        ...this.state,
        allUsers,
      });
    });
    this.socket.on("lastFiatOrders", (lastFiatOrders) => {
      this.setState({
        ...this.state,
        lastFiatOrders,
      });
    });
    this.socket.on("newAdminUpdate", (newAdminUpdate) => {
      this.setState({
        ...this.state,
        newAdminUpdate,
      });
    });
  }

  componentWillUnmount() {
    try {
      this.socket !== null && this.socket.disconnect();
    } catch (e) {
      // socket not connected
    }
  }

  //emiters


  render() {

    let values = {
      allOpenOrders: this.state.allOpenOrders,
      allSpotOrders: this.state.allSpotOrders,
      prices: this.state.prices,
      dailyOrders: this.state.dailyOrders,
      onlineUsers: this.state.onlineUsers,
      allUsers: this.state.allUsers,
      lastFiatOrders: this.state.lastFiatOrders,
      newAdminUpdate: this.state.newAdminUpdate,
    };

    let emiters = {
      tradeFeeCall: this.tradeFeeCall,
    };

    return (
      <SocketContext.Provider
        value={{
          socket: this.socket,
          ...values,
          ...emiters,
        }}
      >
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default withRouter(SocketManager);
