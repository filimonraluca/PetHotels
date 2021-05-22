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
import PetsIcon from "@material-ui/icons/Pets";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import { loginUser, createUser, sendToken } from "../actions/auth";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const responseGoogle = async (response) => {
    console.log(response.tokenId);
    const user = {
      googleId: response.profileObj.googleId,
      firstName: response.profileObj.familyName,
      lastName: response.profileObj.givenName,
      email: response.profileObj.email,
    };
    const data = await createUser(user);
    console.log(data);
    const token = {
      token: response.tokenId,
    };
    const res = await sendToken(token);
    console.log(res);
  };

  let [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: "30vw",
    margin: "20px auto",
  };
  const handleSubmit = async (e) => {
    if (username === undefined) username = "";
    e.preventDefault();
    console.log({
      username,
      password,
    });
    const data = await loginUser({
      username,
      password,
    });
    console.log(data);
    if (data.success === false) toast.error(data.data.message);
    else {
      toast.success("LoggedIn successfully");
      console.log(data.data.token);
      localStorage.setItem("auth-token", JSON.stringify(data.data));
      dispatch({
        type: "LOGGED_IN_USER",
        payload: data.data,
      });
      history.push("/profile");
    }
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={{ backgroundColor: "#3f51b5" }}>
            <PetsIcon />
          </Avatar>
          <h2>Log in</h2>
        </Grid>
        <TextField
          onChange={(e) => setUserName(e.target.value)}
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          style={{ margin: "10px 0" }}
          fullWidth
        >
          Log in
        </Button>
        <GoogleLogin
          clientId="758960901115-cs1pffg689v2qopd4lvlrqmfl1ivph3n.apps.googleusercontent.com"
          buttonText="LOG IN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          width={140}
        />
        <Typography>
          <Link href="#">Forgot password?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account?
          <Link href="#">Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default Login;
