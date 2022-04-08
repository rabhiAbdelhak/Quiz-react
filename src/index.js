import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//local imports 
import './index.css'
import App from "./App";
import { AppContextProvider } from "./Context";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>
);