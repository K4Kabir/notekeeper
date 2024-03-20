import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import jwtAxios from "../libs/jwtAxios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import AppProvider from "../components/AppProvider";

const Register = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
          setLoading(true);
          e.preventDefault();
          jwtAxios
            .post("/User/register", data)
            .then((res) => {
              setLoading(false);
              if (res.data.succes) {
                toast.success("Registration Success Please login!");
              } else {
                toast.error(res.data.message);
              }
            })
            .then(() => {
              navigate("/login");
            })
            .catch((e) => {
              toast.error(e.message || "Something went wrong");
            });
        }}
      >
        <Paper sx={{ width: "25rem", p: 5 }} elevation={3}>
          <Typography variant="h4">Register</Typography>
          <Stack mt={4} spacing={"1rem"}>
            <TextField
              required
              onChange={(e) => handleInput(e)}
              name="username"
              label="Username"
              type="text"
            />
            <TextField
              required
              onChange={(e) => handleInput(e)}
              name="password"
              label="password"
              type="password"
            />
            <LoadingButton
              type={"submit"}
              loading={loading}
              name={"Register"}
              icon={""}
            />
            <Typography textAlign={"center"} variant="caption">
              Already Registered! <Link href="/login">Login</Link>
            </Typography>
          </Stack>
        </Paper>
      </form>
    </Box>
  );
};

export default AppProvider(Register);
