import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { AuthContextProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthContextProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </AuthContextProvider> */}
  </StrictMode>
);
