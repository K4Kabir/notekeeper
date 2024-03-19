import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ColorProvider from "./context/ColorProvide.jsx";
import { RecoilRoot } from "recoil";
import { Toaster } from "sonner";

const currentTheme = JSON.parse(localStorage.getItem("theme")) || true;

const darkTheme = createTheme({
  palette: {
    mode: currentTheme ? "dark" : "light",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <Toaster position="bottom-left" />
      <ColorProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ColorProvider>
    </RecoilRoot>
  </React.StrictMode>
);
