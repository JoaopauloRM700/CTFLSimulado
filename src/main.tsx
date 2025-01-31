import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./styles/style.css";
import App from "./App";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Elemento #root não encontrado no documento!");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <HelmetProvider> 
      <App />
    </HelmetProvider>
  </StrictMode>
);
