import { Box, CircularProgress } from "@mui/material";

const MainLoader = () => {
  return (
    <Box sx={{ position: "fixed", top: "50%", left: "50%" }}>
      <CircularProgress />
    </Box>
  );
};

export default MainLoader;
