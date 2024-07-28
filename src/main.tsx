import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import BuscaTarifas from "./pages/PagesTarifas/BuscaTarifas/index.tsx";

const router = createBrowserRouter([
  {
    path: "/busca",
    element: <BuscaTarifas />,
  },
  {
    path: "/tarifas",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
