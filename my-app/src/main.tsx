import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; //named import

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./route/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
