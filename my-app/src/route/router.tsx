import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Inbox from "../components/Inbox";
import ProductGrid from "../components/ProductGrid";
import Register from "../components/Register";
import { AppLayout } from "../components/AppLayout";
import ProductDetail from "../components/ProductDetail";

// export const router = createBrowserRouter([
//     //route config with data mode 
// ])


export const router = createBrowserRouter(
    createRoutesFromElements( 
        <>
            <Route path="/" element={ <AppLayout />}>
                <Route index element = { <Inbox /> } />
                <Route path='products' element={ <ProductGrid /> } />
                <Route path='products/:id' element={ <ProductDetail /> } />
                <Route path='register' Component={ Register } />
            </Route>
        </>
    )
);