import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { Toaster } from "sonner";
import App from "./App.jsx";
import ColorProvider from "./context/ColorProvide.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <Toaster position="bottom-left" closeButton />
      <ColorProvider>
        <App />
      </ColorProvider>
    </RecoilRoot>
  </React.StrictMode>
);
