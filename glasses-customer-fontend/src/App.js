import React from "react";
import "./App.css";

import { BrowserRouter } from "react-router-dom";

import { InformationProvider } from "./context/InformationContext";
import { CartProvider } from "./context/CartContext";

import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <InformationProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </InformationProvider>
  );
};

export default App;
