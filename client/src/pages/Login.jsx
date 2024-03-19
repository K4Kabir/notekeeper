import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Link, Paper, Stack, TextField, Typography } from "@mui/material";
import jwtAxios from "../libs/jwtAxios";
import { userAtom } from "../context/atoms";
import { useRecoilState } from "recoil";
import LoadingButton from "../components/LoadingButton";
import { toast } from "sonner";

const Login = () => {
  const [data, setData] = useState({});
  const [loggedInUser, setLoggedInUser] = useRecoilState(userAtom);
  const [isLoading, setIsLoading] = useState(false);

  console.log(loggedInUser, "LLU");

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      height={"100vh"}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          jwtAxios
            .post("/User/login", data)
            .then((res) => {
              setIsLoading(false);
              if (res.data.success) {
                setLoggedInUser({
                  isAuthenticated: true,
                  user: res.data.message,
                });
                toast.success("Login Success");
              } else {
                setLoggedInUser({
                  isAuthenticated: false,
                  user: {},
                });
                toast.success(res.data.message);
              }
            })
            .catch((e) => {
              console.log(e);
              toast.success(e.message);
            });
        }}
      >
        <Paper sx={{ width: "25rem", height: "25rem", p: 5 }} elevation={3}>
          <Typography variant="h4">Login</Typography>
          <Stack mt={4} spacing={"1rem"}>
            <TextField
              required
              name="username"
              onChange={(e) => handleInput(e)}
              label="Username"
              type="text"
            />
            <TextField
              required
              name="password"
              label="password"
              type="password"
              onChange={(e) => handleInput(e)}
            />
            <LoadingButton
              type={"submit"}
              loading={isLoading}
              name={"Login"}
              icon={""}
            />
            <Typography textAlign={"center"} variant="caption">
              Not Registered yet! <Link href="/register">Click here</Link>
            </Typography>
          </Stack>
        </Paper>
      </form>
    </Box>
  );
};

export default Login;
