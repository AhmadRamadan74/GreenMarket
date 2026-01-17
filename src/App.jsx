import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Categories from "./components/Categories/Categories.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Products from "./components/Products/Products.jsx";
import Brands from "./components/Brands/Brands.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import Register from "./components/Register/Register.jsx";
import AllOrders from "./components/AllOrders/AllOrders.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";
import Wishlist from "./components/Wishlist/Wishlist.jsx";
import WishlistContextProvider from "./context/WishlistContext.jsx";
import EmailVerification from "./components/EmailVerification/EmailVerification.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile.jsx";
import UserAddress from "./components/UserAddress/UserAddress.jsx";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword.jsx";
import SubCategoriesPage from "./components/SubCategories/SubCategories.jsx";
import SubCategories from "./components/SubCategories/SubCategories.jsx";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "subcategories/:categoryId",
        element: (
          <ProtectedRoute>
            <SubCategories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "emailVerification", element: <EmailVerification /> },
      { path: "resetPassword", element: <ResetPassword /> },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "updateprofile",
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "useraddress",
        element: (
          <ProtectedRoute>
            <UserAddress />
          </ProtectedRoute>
        ),
      },
      {
        path: "updatepassword",
        element: (
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const query = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={query}>
          <UserContextProvider>
            <WishlistContextProvider>
              <CartContextProvider>
                <RouterProvider router={routers}></RouterProvider>
                <ReactQueryDevtools />
                <Toaster />
              </CartContextProvider>
            </WishlistContextProvider>
          </UserContextProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;