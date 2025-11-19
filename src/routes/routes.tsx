import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { LazyProductListing, LazyProductDetails, LazyShoppingCart } from "../pages/LazyPages";
import { PageLoadingFallback } from "../components/LoadingFallback";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoadingFallback />}>
            <LazyProductListing />
          </Suspense>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <Suspense fallback={<PageLoadingFallback />}>
            <LazyProductDetails />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<PageLoadingFallback />}>
            <LazyShoppingCart />
          </Suspense>
        ),
      },
    ],
  },
]);