import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { getUsers, login } from "../../services/services";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate =  useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async () => {
    const res = await login(data);
    localStorage.setItem("token", res.token);

    navigate('/dashboard');
    const users = await getUsers();
    console.log(users);
    console.log(res);
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ padding: 30, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "50%" }}>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              variant="standard"
              value={data.username}
              onChange={onChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              variant="standard"
              type={"password"}
              value={data.password}
              onChange={onChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={onSubmit}>
              {" "}
              Login{" "}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
