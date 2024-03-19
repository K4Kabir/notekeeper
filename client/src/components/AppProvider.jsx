import { Box } from "@mui/material";
import Header from "./Header";
const AppProvider = (WrappedComponent) => {
  const WithHeader = (props) => {
    return (
      <>
        <Box sx={{ height: "calc(100vh - 4rem)" }}>
          <Header />
          <WrappedComponent {...props} />
        </Box>
      </>
    );
  };
  return WithHeader;
};

export default AppProvider;
