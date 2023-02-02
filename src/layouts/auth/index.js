import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import bgImage from "assets/images/bg-sign-in-cover.e5dabb486682cd2b2bf1.jpeg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registration } from "http/userAPI";
import { login } from "http/userAPI";
import { useMutation } from "react-query";
import { useTcoUIController } from "context";
import { setAuth } from "context";

const Auth = () => {
  const [controller, dispatch] = useTcoUIController();
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const routePathname = pathname.split("/")[1] === "register";
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const { mutate: register } = useMutation((formData) => registration(formData), {
    onSuccess: (response) => {
      navigate('/login');
    },
    onError: (error) => {
      setErrorMessage(error)
    }
  });

  const { mutate: userLogin } = useMutation((formDataLogin) => login(formDataLogin), {
    onSuccess: (response) => {
      console.log(response.token);
      localStorage.setItem('token', response.token);
      setAuth(dispatch, true)
    },
    onError: (error) => {
      setErrorMessage(error)
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (routePathname) {
      register({ email, password })
    } else {
      userLogin({ email, password })
    }
  };
  console.log(errorMessage, "errorMessage");
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={"100vh"}
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card sx={{ padding: "30px 20px 40px 20px" }}>
        <Typography mb={2} variant="h5" textAlign={"center"} component="h5">
          {routePathname ? "Sign Up" : "Sign In"}
        </Typography>
        <Box component="form" onSubmit={submitHandler}>
          <Box mb={2}>
            <TextField
              fullWidth
              required
              type="email"
              id="email"
              label="Email"
              size="small"
              error={errorMessage}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              id="password"
              variant="outlined"
              required
              fullWidth
              type={showPassword ? "text" : "password"}
              size="small"
              error={errorMessage}
              helperText={errorMessage && errorMessage.response?.data?.error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button variant="contained" type="submit" fullWidth>
            {routePathname ? "Sign Up" : "Sign in"}
          </Button>
          <Box mt={3} mb={1} textAlign="center">
            <Typography
              variant="button"
              color="text"
              textTransform={"lowercase"}
            >
              Don&apos;t have an account?{" "}
              {routePathname ? (
                <Link to={"/login"}>Sign in</Link>
              ) : (
                <Link to={"/register"}>Sign up</Link>
              )}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Auth;
