import { Route, Redirect } from "react-router-dom";
import { cookieServices } from "./services";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "./redux/actions/user";

export default function PrivateRoute(props) {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { Exact, Path, children } = props;

  const access_token = cookieServices.get("access_token");
  const refresh_token = cookieServices.get("refresh_token");


  const conditionHandler = access_token && refresh_token;
  const condition = conditionHandler;

  if (!condition) {
    dispatch(logoutUserAction());

  }
  if (condition) {
    // console.log(condition);
  }

  return (
    <Route
      path={Path}
      exact={Exact}
      render={() =>
        condition ? children : <Redirect to="/login" push exact={true} />
      }
    />
  );
}


