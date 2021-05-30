import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import Header from "../components/LoginHeader";
import PetsIcon from "@material-ui/icons/Pets";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import { loginUser, createUser, loginGoogle } from "../actions/auth";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const responseGoogle = async (response) => {
    const user = {
      googleId: response.profileObj.googleId,
      firstName: response.profileObj.familyName,
      lastName: response.profileObj.givenName,
      email: response.profileObj.email,
    };
    const res = await loginGoogle(user);
    const data = {
      user: res.data.user,
      token:res.data.token,
    };
    //const res = await sendToken(token);
    localStorage.setItem("auth-token", JSON.stringify(data));
    dispatch({
      type: "LOGGED_IN_USER",
      payload: data,
    });
    history.push("/profile");
  };

  let [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const paperStyle = {
    padding: 20,
    margin: "20px auto",
  };
  const fieldStyle = { margin: "10px" };
  const handleSubmit = async (e) => {
    if (email === undefined) email = "";
    e.preventDefault();
    const data = await loginUser({
      email,
      password,
    });
    console.log(data);
    if (data.success === false) toast.error(data.data.message);
    else {
      toast.success("LoggedIn successfully");
      localStorage.setItem("auth-token", JSON.stringify(data.data));
      dispatch({
        type: "LOGGED_IN_USER",
        payload: data.data,
      });
      history.push("/profile");
    }
  };
  return (
    <>
      <Header></Header>
      <Grid container direction="row" justify="center" alignItems="center">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#3f51b5" }}>
              <PetsIcon />
            </Avatar>
            <h2>Log in</h2>
          </Grid>
          <Grid>
            <TextField
              style={fieldStyle}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter email"
              required
            />
            <TextField
              style={fieldStyle}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter password"
              type="password"
              required
            />
          </Grid>
          <Grid>
            <Button
              fullWidth
              type="submit"
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              style={{ margin: "20px auto" }}
            >
              Log in
            </Button>
          </Grid>
          <Grid align="center">
            <GoogleLogin
              style={{ margin: "10px auto" }}
              clientId="758960901115-cs1pffg689v2qopd4lvlrqmfl1ivph3n.apps.googleusercontent.com"
              buttonText="LOG IN WITH GOOGLE"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Grid>
          <Typography style={{ margin: "20px auto" }}>
            Do you have an account?
            <Link href="/register">Sign up</Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};
export default Login;
