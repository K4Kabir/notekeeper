import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppProvider from "../components/AppProvider";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Stack
      p={"5rem"}
      height={"100vh"}
      direction={{ sm: "collumn", md: "collumn", lg: "row" }}
      alignItems={"center"}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2rem", lg: "4rem" },
            }}
          >
            Enjoy Note Taking with your Friends
          </Typography>
        </motion.div>
        <motion.Typography
          variant="caption"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Put down your thoughts down in one app, share with your friends and
          loved ones.
        </motion.Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Button onClick={() => navigate("/login")} variant="outlined">
            Login
          </Button>
          <Button onClick={() => navigate("/register")} variant="outlined">
            Signup
          </Button>
        </Box>
      </Box>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src="/images/HomeS.svg"
          style={{ objectFit: "contain" }}
          width={"500px"}
          height={"500px"}
        />
      </motion.div>
    </Stack>
  );
};

export default AppProvider(Home);
