import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import Inbox from "../components/Inbox";
import ProductGrid, { productGridLoader } from "../components/ProductGrid";
import Register from "../components/Register";
import { AppLayout } from "../components/AppLayout";
import ProductDetail, { type Product } from "../components/ProductDetail";
import axios from "axios";
import {RouteErrorBoundary} from "../components/RouteErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Inbox />,
      },
      {
        path: "products",
        Component: ProductGrid,
        loader: productGridLoader,
        ErrorBoundary: RouteErrorBoundary
      },
      {
        path: "products/:id",
        Component: ProductDetail,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

// export const router = createBrowserRouter(
//     createRoutesFromElements(
//         <>
//             <Route path="/" element={ <AppLayout />}>
//                 <Route index element = { <Inbox /> } />
//                 <Route path='products' element={ <ProductGrid /> } />
//                 <Route path='products/:id' element={ <ProductDetail /> } />
//                 <Route path='register' Component={ Register } />
//             </Route>
//         </>
//     )
// );
