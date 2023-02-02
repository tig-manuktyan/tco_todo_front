import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { TcoUIControllerProvider } from "context";
import App from "App";
import "css/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Create a client
const queryClient = new QueryClient();

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TcoUIControllerProvider>
        <App />
      </TcoUIControllerProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
