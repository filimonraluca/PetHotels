import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import MenuNav from "./components/MenuNav";
import Home from "./reservation/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./user/Profile";

function App() {
  return (
    <BrowserRouter>
      <MenuNav />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
