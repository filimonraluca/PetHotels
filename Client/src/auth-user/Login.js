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
import { loginUser, createUser} from "../actions/auth";
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
    const createData = await createUser(user);
    console.log(createData);
    const data = {
      email: response.profileObj.email,
      firstName: response.profileObj.familyName,
      lastName: response.profileObj.givenName,
      token: response.tokenId,
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
    height: "70vh",
    width: "30vw",
    margin: "20px auto",
  };
  const handleSubmit = async (e) => {
    if (email === undefined) email = "";
    e.preventDefault();
    console.log({
      email,
      password,
    });
    const data = await loginUser({
      email,
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
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="Enter email"
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
          style={{ margin: "20px 0" }}
          fullWidth
        >
          Log in
        </Button>
        <GoogleLogin  style={{margin:"10px auto"}}
          clientId="758960901115-cs1pffg689v2qopd4lvlrqmfl1ivph3n.apps.googleusercontent.com"
          buttonText="LOG IN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <Typography style={{margin:"20px auto"}}>
          Do you have an account?
          <Link href="/register">Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};
export default Login;
