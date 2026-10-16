import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; //named import

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./route/router";
import { WishlistProvider } from "./context/WishlistContext";

createRoot(document.getElementById("root")!).render(
//   <StrictMode>
    <WishlistProvider>
        <RouterProvider router={router} />
    </WishlistProvider>

//   </StrictMode>,
);
