import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import MenuNav from "./components/MenuNav";
import Home from "./reservation/Home";
import LoginUser from "./auth-user/Login";
import LoginHotel from "./auth-hotel/login";
import RegisterUser from "./auth-user/Register";
import RegisterHotel from "./auth-hotel/register";
import Profile from "./user/Profile";
import ProfileBooking from "./user/ProfileBooking";

function App() {
  return (
    <BrowserRouter>
      <MenuNav />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login-user" component={LoginUser} />
        <Route exact path="/login-hotel" component={LoginHotel} />
        <Route exact path="/register-user" component={RegisterUser} />
        <Route exact path="/register-hotel" component={RegisterHotel} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute
          exact
          path="/profile/bookings"
          component={ProfileBooking}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
